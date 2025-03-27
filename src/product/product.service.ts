import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import {
  CreateIngredientBody,
  Ingredient,
  ProductRequest,
  ProductsResponse,
} from 'src/graphql';

interface ProductGrpcService {
  getProducts(params: ProductRequest): Observable<ProductsResponse>;
  createIngredient(data: CreateIngredientBody): Observable<Ingredient>;
}

@Injectable()
export class ProductService implements OnModuleInit {
  private productService: ProductGrpcService;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductGrpcService>('ProductService');
  }

  async getProducts(params: ProductRequest): Promise<ProductsResponse> {
    const response = await firstValueFrom(
      this.productService.getProducts(params),
    );
    const data = response?.data || [];
    return { data, ...response };
  }

  async createIngredient(payload: CreateIngredientBody): Promise<Ingredient> {
    const response = await firstValueFrom(
      this.productService.createIngredient(payload),
    );
    return response;
  }
}
