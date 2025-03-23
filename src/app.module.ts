import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      formatError: (err) => (
        console.log(err),
        {
          message: err?.message,
          status: err.extensions?.code,
          locations: err.locations,
          path: err.path,
        }
      ),
    }),
    UserModule,
    AuthModule,
    ProductModule,
  ],
})
export class AppModule {}
