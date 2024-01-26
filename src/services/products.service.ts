import { db } from '@/db';
import { HttpException } from '@/exceptions/HttpException';
import { Product, categories, products, Categories } from '@/schemas';
import { asc, desc, eq } from 'drizzle-orm';
import { Service } from 'typedi';

@Service()
export class ProductService {
  public async findAllProducts(page = 1, pageSize = 10, orderBy = 'asc'): Promise<Product[]> {
    const offset = (page - 1) * pageSize;
    const allProducts = await db
      .select()
      .from(products)
      .limit(pageSize)
      .offset(offset)
      .orderBy(orderBy == 'asc' ? asc(products.id) : desc(products.id));
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
}
