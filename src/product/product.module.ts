import { Module } from '@nestjs/common';
import { GrpcClientModule } from '../grpc-client/grpc-client.module';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { GraphQLScalarType } from 'graphql';

@Module({
  imports: [GrpcClientModule],
  providers: [
    ProductResolver,
    ProductService,
    {
      provide: 'JSON',
      useValue: new GraphQLScalarType({
        name: 'JSON',
        description: 'JSON custom scalar type',
        serialize: (value) => value,
        parseValue: (value) => value,
        parseLiteral: (ast) => ast,
      }),
    },
  ],
  controllers: [],
  exports: [ProductService],
})
export class ProductModule {}
