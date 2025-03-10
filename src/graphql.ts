
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthResponse {
    access_token: string;
}

export interface IQuery {
    getUser(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    login(username: string, password: string): Nullable<AuthResponse> | Promise<Nullable<AuthResponse>>;
}

type Nullable<T> = T | null;
