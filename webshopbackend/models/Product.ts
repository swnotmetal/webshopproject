import mongoose from "mongoose";
import { v4 as uuid } from 'uuid';
import { Product, Entry } from "../types";

const EntrySchema = new mongoose.Schema<Entry>({
    calories: Number,
    fat: Number,
    carbohydrates: Number,
    protein: Number
});

const ProductSchema = new mongoose.Schema<Product>({
    id: { type: String, default: uuid, unique: true },
    name: String,
    production_date: Date,
    expiry_date: Date,
    price: Number,
    image_url: String,
    description: String,
    entries: [EntrySchema]
});

const productModel = mongoose.model('Product', ProductSchema);

export default productModel;