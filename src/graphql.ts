
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface ProductRequest {
    userId?: Nullable<string>;
    page?: Nullable<number>;
    limit?: Nullable<number>;
    search?: Nullable<string>;
    from?: Nullable<string>;
    to?: Nullable<string>;
}

export interface CreateIngredientBody {
    userId: string;
    name: string;
    description: string;
    status: string;
    unit: string;
}

export interface CreateProductBody {
    userId: string;
    name: string;
    description: string;
    categoryId: string;
    productVariants: ProductVariantBody[];
    status: string;
    quantity: number;
    ingredients: string[];
    unit: string;
    price: number;
    sku: string;
    image?: Nullable<string>;
    tags?: Nullable<string[]>;
}

export interface ProductVariantBody {
    name: string;
    sku: string;
    status: string;
    attributes: JSON;
}

export interface RegisterBody {
    username: string;
    password: string;
    email: string;
    name: string;
    role?: Nullable<string>;
}

export interface ChangePasswordBody {
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
    getProducts(params: ProductRequest): Nullable<ProductsResponse> | Promise<Nullable<ProductsResponse>>;
    getProduct(slug: string): Nullable<Product> | Promise<Nullable<Product>>;
    getUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createIngredient(body: CreateIngredientBody): Ingredient | Promise<Ingredient>;
    createProduct(body: CreateProductBody): Product | Promise<Product>;
    updateProduct(id: string, body: CreateProductBody): Product | Promise<Product>;
    deleteProduct(slug: string, userId: string): Product | Promise<Product>;
    login(username: string, password: string): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
    register(body: RegisterBody): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
    forgotPassword(password: string): Nullable<User> | Promise<Nullable<User>>;
    changePassword(body: ChangePasswordBody): Nullable<User> | Promise<Nullable<User>>;
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
