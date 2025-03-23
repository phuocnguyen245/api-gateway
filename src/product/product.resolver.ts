import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductRequest, ProductsResponse } from '../graphql';
import { ProductService } from './product.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Query('getProducts')
  async getProducts(
    @Args('data') data: ProductRequest,
  ): Promise<ProductsResponse> {
    console.log(data);

    return this.productService.getProducts({
      page: 0,
      limit: 10,
    });
  }
}
