import { db } from '@/db';
import { HttpException } from '@/exceptions/HttpException';
import {
  Product,
  categories,
  products,
  Categories,
  userFavoriteProducts,
  NewUserFavoriteProducts,
  productUnits,
  NewProductUnit,
  NewCategories,
  units,
  NewUnit,
  Unit,
} from '@/schemas';
import { and, asc, desc, eq } from 'drizzle-orm';
import { Service } from 'typedi';

@Service()
export class ProductService {
  public async findAllProducts(page = 1, pageSize = 10, orderBy = 'asc', userId: string): Promise<Product[]> {
    const offset = (page - 1) * pageSize;
    const allProducts: Product[] = await db
      .select()
      .from(products)
      .limit(pageSize)
      .offset(offset)
      .orderBy(orderBy == 'asc' ? asc(products.id) : desc(products.id));

    if (userId) {
      const allFavProducts = await db.select().from(userFavoriteProducts).where(eq(userFavoriteProducts.userId, userId));
      allProducts.forEach(product => {
        product.isFavorite = allFavProducts.some(fav => fav.productId === product.id);
      });
      return allProducts;
    }
    return allProducts;
  }
  public async findProductById(productId: string): Promise<Product> {
    const singleProduct = await db.select().from(products).where(eq(products.id, productId));
    if (singleProduct.length === 0) throw new HttpException(409, `Product with id ${productId} not found`);
    return singleProduct[0];
  }
  public async createProduct(productData: Product): Promise<Product> {
    const newProduct = await db.insert(products).values(productData).returning();
    return newProduct[0];
  }
  public async updateProduct(productId: string, productData: Product): Promise<Product> {
    const updatedProduct = await db.update(products).set(productData).where(eq(products.id, productId)).returning();
    return updatedProduct[0];
  }
  public async deleteProduct(productId: string): Promise<Product> {
    const deletedProduct = await db.delete(products).where(eq(products.id, productId)).returning();
    return deletedProduct[0];
  }
  public async findAllCategories(isFlat: boolean): Promise<Categories[]> {
    const allCategories = await db.select().from(categories);
    const categoriesNested = [];
    const categoryById = {};

    for (const row of allCategories) {
      const category = { name: row.name, children: [] };

      categoryById[row.id] = category;

      if (row.parentId) {
        categoryById[row.parentId].children.push(category);
      } else {
        categoriesNested.push(category);
      }
    }
    return isFlat ? allCategories : categoriesNested;
  }
  public async createCategory(categoryData: NewCategories): Promise<NewCategories> {
    const newCategory = await db.insert(categories).values(categoryData).returning();
    return newCategory[0];
  }
  public async updateCategory(categoryId: string, categoryData: Categories): Promise<Categories> {
    const updatedCategory = await db.update(categories).set(categoryData).where(eq(categories.id, categoryId)).returning();
    return updatedCategory[0];
  }
  public async deleteCategory(categoryId: string): Promise<Categories> {
    const deletedCategory = await db.delete(categories).where(eq(categories.id, categoryId)).returning();
    return deletedCategory[0];
  }
  public async addProductToFavorites(productId: string, userId: string): Promise<NewUserFavoriteProducts> {
    const existingFavorite = await db
      .select()
      .from(userFavoriteProducts)
      .where(and(eq(userFavoriteProducts.productId, productId), eq(userFavoriteProducts.userId, userId)));

    if (existingFavorite.length > 0) throw new HttpException(409, `Product with id ${productId} already in favorites`);
    const result = await db.insert(userFavoriteProducts).values({ productId, userId }).returning();
    return result[0];
  }
  // get all favorite products
  public async getAllFavoriteProducts(userId: string): Promise<Product[]> {
    const allFavProducts = await db
      .select({ id: products.id, name: products.name, description: products.description })
      .from(products)
      .leftJoin(userFavoriteProducts, eq(userFavoriteProducts.productId, products.id))
      .where(eq(userFavoriteProducts.userId, userId));
    return allFavProducts;
  }
  // remove product from favorites
  public async removeProductFromFavorites(productId: string, userId: string): Promise<NewUserFavoriteProducts> {
    const result = await db
      .delete(userFavoriteProducts)
      .where(and(eq(userFavoriteProducts.productId, productId), eq(userFavoriteProducts.userId, userId)))
      .returning();
    return result[0];
  }
  public async findAllUnits(): Promise<NewUnit[]> {
    const allUnits = await db.select().from(units);
    return allUnits;
  }
  public async createUnit(unitData: NewUnit): Promise<NewUnit> {
    const newUnit = await db.insert(units).values(unitData).returning();
    return newUnit[0];
  }
  public async updateUnit(unitData: Unit): Promise<Unit> {
    const updatedUnit = await db.insert(units).values(unitData).returning();
    return updatedUnit[0];
  }
  public async deleteUnit(unitId: string): Promise<Unit> {
    const deletedUnit = await db.delete(units).where(eq(units.id, unitId)).returning();
    return deletedUnit[0];
  }
  public async addUnitToProduct(productId: string, unitId: string, price: string): Promise<NewProductUnit> {
    const product = await db.select().from(products).where(eq(products.id, productId));
    if (product.length === 0) {
      throw new HttpException(404, `Product with id ${productId} not found`);
    }

    const unit = await db.select().from(units).where(eq(units.id, unitId));
    if (unit.length === 0) {
      throw new HttpException(404, `Unit with id ${unitId} not found`);
    }

    const newProductUnit = await db.insert(productUnits).values({ productId, unitId, price }).returning();
    if (!newProductUnit) {
      throw new HttpException(500, 'Failed to add unit to product');
    }
    return newProductUnit[0];
  }
}
