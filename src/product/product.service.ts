import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import {
  CreateIngredientInput,
  Ingredient,
  ProductsResponse,
} from 'src/graphql';

interface ProductGrpcService {
  getProducts(data: {
    page: number;
    limit: number;
  }): Observable<ProductsResponse>;
  createIngredient(data: CreateIngredientInput): Observable<Ingredient>;
}

@Injectable()
export class ProductService implements OnModuleInit {
  private productService: ProductGrpcService;

  constructor(@Inject('PRODUCT_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductGrpcService>('ProductService');
  }

  async getProducts({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<ProductsResponse> {
    const response = await firstValueFrom(
      this.productService.getProducts({ page, limit }),
    );
    const data = response?.data || [];
    return { data, ...response };
  }

  async createIngredient(payload: CreateIngredientInput): Promise<Ingredient> {
    const response = await firstValueFrom(
      this.productService.createIngredient(payload),
    );
    return response;
  }
}
