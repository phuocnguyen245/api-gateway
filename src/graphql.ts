
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

export interface CreateIngredientInput {
    userId: string;
    name: string;
    description: string;
    status: string;
    unit: string;
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

export interface RegisterInput {
    username: string;
    password: string;
    email: string;
    name: string;
    role?: Nullable<string>;
}

export interface ChangePasswordInput {
    oldPassword: string;
    newPassword: string;
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

export interface Ingredient {
    id: string;
    name: string;
    unit?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
    isDeleted?: Nullable<boolean>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export interface ProductsResponse {
    data?: Nullable<Product[]>;
    total: number;
    page: number;
    limit: number;
}

export interface IQuery {
    getProducts(data: ProductRequest): Nullable<ProductsResponse> | Promise<Nullable<ProductsResponse>>;
    getUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createIngredient(input: CreateIngredientInput): Ingredient | Promise<Ingredient>;
    createProduct(input: CreateProductInput): Product | Promise<Product>;
    updateProduct(id: string, input: CreateProductInput): Product | Promise<Product>;
    deleteProduct(slug: string, userId: string): Product | Promise<Product>;
    login(username: string, password: string): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
    register(input: RegisterInput): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
    forgotPassword(password: string): Nullable<User> | Promise<Nullable<User>>;
    changePassword(input: ChangePasswordInput): Nullable<User> | Promise<Nullable<User>>;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthResponse {
    id: string;
    name: string;
    email?: Nullable<string>;
    role: string;
    access_token: string;
    refresh_token: string;
}

export type JSON = any;
type Nullable<T> = T | null;
