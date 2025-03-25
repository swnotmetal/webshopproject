import { Document } from "mongodb";

export interface Product extends Document {
    id: string;
    name: string;
    production_date: string;
    expiry_date: string;
    price: number;
    image_url: string;
    entries?: Entry[];
    description?: string;
}

export interface UserInDB {

    id: string;

    username: string;

    password: string; // hashed


}

export interface UserPublic {
    id: string;
    username: string;
  }

  export interface UserAuthResponse {
    id: string;
    username: string;
    token: string;
  }


export interface Entry {
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;
}


export type ProductWithoutID = Omit<Product, 'id'>;
export type NewProduct = Omit<Product, 'id'>;


