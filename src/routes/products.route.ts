import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { ProductController } from '@/controllers/products.controller';

export class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();
  public product = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.product.getProducts);
    this.router.get(`${this.path}/categories`, this.product.getProductCategories);
    this.router.get(`${this.path}/favorite`, this.product.getAllFavoriteProducts);
    this.router.post(`${this.path}/categories`, this.product.createProductCategory);
    this.router.patch(`${this.path}/categories/:id`, this.product.updateProductCategory);
    this.router.delete(`${this.path}/categories/:id`, this.product.deleteProductCategory);
    this.router.post(`${this.path}`, this.product.createProduct);
    this.router.get(`${this.path}/:id`, this.product.getProductById);
    this.router.patch(`${this.path}/:id`, this.product.updateProduct);
    this.router.delete(`${this.path}/:id`, this.product.deleteProduct);
    this.router.post(`${this.path}/:id/favorite`, this.product.addProductToFavorites);
    this.router.delete(`${this.path}/:id/favorite`, this.product.removeProductFromFavorites);
  }
}
