import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateIngredientBody,
  ProductRequest,
  ProductsResponse,
} from '../graphql';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Query('getProducts')
  async getProducts(
    @Args('params') params: ProductRequest,
  ): Promise<ProductsResponse> {
    return this.productService.getProducts(params);
  }

  @Mutation('createIngredient')
  async createIngredient(@Args('body') data: CreateIngredientBody) {
    console.log({ data });
    return this.productService.createIngredient(data);
  }
}
