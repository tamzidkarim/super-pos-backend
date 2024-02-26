import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { ProductService } from '@services/products.service';
import { Product } from '@/schemas';
import { RequestWithUser } from '@/interfaces/auth.interface';

export class ProductController {
  public product = Container.get(ProductService);

  public getProducts = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id || '88ed344f-73bb-49f8-be63-b4b36b1926ca';
      const page = Number(req.query.page);
      const pageSize = Number(req.query.pageSize);
      const orderBy = req.query.orderBy as string;
      const products = await this.product.findAllProducts(page, pageSize, orderBy, userId);

      res.status(200).json({ data: products, message: 'Find all products' });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      const product = await this.product.findProductById(productId);

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
  public createProductCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const category = await this.product.createCategory(req.body);

      res.status(200).json({ data: category, message: 'Create a new category' });
    } catch (error) {
      next(error);
    }
  };
  public updateProductCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = req.params.id;
      const category = await this.product.updateCategory(categoryId, req.body);

      res.status(200).json({ data: category, message: 'Update category' });
    } catch (error) {
      next(error);
    }
  };
  public deleteProductCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = req.params.id;
      const category = await this.product.deleteCategory(categoryId);

      res.status(200).json({ data: category, message: `Category with ID ${categoryId} has been deleted` });
    } catch (error) {
      next(error);
    }
  };

  public getAllFavoriteProducts = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user?.id || '76ba8e61-a61d-4544-9b7c-1e1763b83168';
      const favoriteProducts = await this.product.getAllFavoriteProducts(userId);

      res.status(200).json({ data: favoriteProducts, message: 'Find all favorite products' });
    } catch (error) {
      next(error);
    }
  };

  public addProductToFavorites = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      const userId = req.user?.id || '76ba8e61-a61d-4544-9b7c-1e1763b83168';
      console.log(userId, productId);
      const result = await this.product.addProductToFavorites(productId, userId);

      res.status(200).json({ data: result, message: 'Product added to favorites' });
    } catch (error) {
      next(error);
    }
  };

  public removeProductFromFavorites = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      const userId = req.user?.id || '76ba8e61-a61d-4544-9b7c-1e1763b83168';
      const result = await this.product.removeProductFromFavorites(productId, userId);

      res.status(200).json({ data: result, message: 'Product removed from favorites' });
    } catch (error) {
      next(error);
    }
  };

  // get all units
  public getProductUnits = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const units = await this.product.findAllUnits();

      res.status(200).json({ data: units, message: 'Find all units' });
    } catch (error) {
      next(error);
    }
  };

  // create new unit
  public createProductUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const unit = await this.product.createUnit(req.body);

      res.status(200).json({ data: unit, message: 'Create a new unit' });
    } catch (error) {
      next(error);
    }
  };

  // update unit
  public updateProductUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const unitId = req.params.id;
      const unit = await this.product.updateUnit(unitId, req.body);

      res.status(200).json({ data: unit, message: 'Update unit' });
    } catch (error) {
      next(error);
    }
  };

  // delete unit
  public deleteProductUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const unitId = req.params.id;
      const unit = await this.product.deleteUnit(unitId);

      res.status(200).json({ data: unit, message: 'Delete unit' });
    } catch (error) {
      next(error);
    }
  };

  // add unit to product
  public addProductUnit = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      const unitId = req.body.unitId;
      const price = req.body.price;
      const newProductUnit = await this.product.addUnitToProduct(productId, unitId, price);

      res.status(200).json({ data: newProductUnit, message: 'Add unit to product' });
    } catch (error) {
      next(error);
    }
  };
}
