
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface ProductRequest {
    userId: string;
    page?: Nullable<number>;
    limit?: Nullable<number>;
    search?: Nullable<string>;
    from?: Nullable<string>;
    to?: Nullable<string>;
}

export interface CreateProductInput {
    userId: string;
    name: string;
    description: string;
    categoryId: string;
    productVariants: ProductVariantInput[];
    status: string;
}

export interface ProductVariantInput {
    name: string;
    sku: string;
    status: string;
    attributes: JSON;
}

export interface Product {
    id: string;
    name: string;
    description?: Nullable<string>;
    slug: string;
    productVariants?: Nullable<Nullable<ProductVariant>[]>;
    status?: Nullable<string>;
    isDeleted?: Nullable<boolean>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export interface ProductVariant {
    id: string;
    name: string;
    sku: string;
    status: string;
    attributes?: Nullable<JSON>;
    isDeleted?: Nullable<boolean>;
}

export interface ProductsResponse {
    data?: Nullable<Product[]>;
    total: number;
    page: number;
    limit: number;
}

export interface IQuery {
    getProducts(data: ProductRequest): Nullable<ProductsResponse> | Promise<Nullable<ProductsResponse>>;
    getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createProduct(input: CreateProductInput): Product | Promise<Product>;
    updateProduct(id: string, input: CreateProductInput): Product | Promise<Product>;
    deleteProduct(slug: string, userId: string): Product | Promise<Product>;
    login(username: string, password: string): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    access_token: string;
}

export type JSON = any;
type Nullable<T> = T | null;
