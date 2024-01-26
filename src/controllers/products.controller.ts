import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ProductService } from '@services/products.service';
import { Product } from '@/schemas';

export class ProductController {
  public product = Container.get(ProductService);

  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      const orderBy = req.query.orderBy as string;
      const products = await this.product.findAllProducts(page, pageSize, orderBy);

      res.status(200).json({ data: products, message: 'Find all products' });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      const product: Product = await this.product.findProductById(productId);

      res.status(200).json({ data: product, message: 'Find product by Id' });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const product: Product = await this.product.createProduct(req.body);

      res.status(200).json({ data: product, message: 'Create a new product' });
    } catch (error) {
      next(error);
    }
  };
  public updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      const product: Product = await this.product.updateProduct(productId, req.body);

      res.status(200).json({ data: product, message: 'Update product' });
    } catch (error) {
      next(error);
    }
  };
  public deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      const product: Product = await this.product.deleteProduct(productId);

      res.status(200).json({ data: product, message: 'Delete product' });
    } catch (error) {
      next(error);
    }
  };

  public getProductCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const isFlat = req.query.format === 'flat';
      const categories = await this.product.findAllCategories(isFlat);

      res.status(200).json({ data: categories, message: 'Find all categories' });
    } catch (error) {
      next(error);
    }
  };
}
