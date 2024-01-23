import { NextFunction, Request, Response, Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { db } from '@/db';
import { products } from '@schemas';

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
  }
}
