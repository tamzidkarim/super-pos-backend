import { NextFunction, Request, Response, Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { db } from '@/db';
import { products } from '@schemas';
import { categories, Categories } from '@/schemas/products/categories.schema';
import { asc, sql } from 'drizzle-orm';
import { productCategories } from '@/schemas/products/product-categories.schema';

export class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const allProducts = await db.select().from(products);
        res.status(201).json({ data: allProducts, message: 'products' });
      } catch (error) {
        next(error);
      }
    });
    this.router.get(`${this.path}/categories`, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const allCategories = await db.select().from(productCategories);
        const insertCategoriy = await db.insert(categories).values({ name: 'TV', parentId: 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a19' });
        // const allCategories = await db.select().from(categories).orderBy(asc(categories.parent_id), asc(categories.name));
        // const allCategoriesWithParent = await db.execute(
        //   sql`select "id", "name", "parent_id" from "categories" order by "categories"."parent_id" asc, "categories"."name" asc`,
        // );
        const allCategoriesWithParent = await db.execute(sql`select "product_id", "category_id" from "product_categories"`);

        res.status(201).json({ data: allCategories, message: 'allCategories' });
      } catch (error) {
        next(error);
      }
    });
  }
}
