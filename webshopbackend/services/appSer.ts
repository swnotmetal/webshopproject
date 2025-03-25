/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NewProduct, Product } from '../types';
import { v4 as uuid } from 'uuid';
import { Entry } from '../types';
import productModel from '../models/Product';
import userModel from '../models/Users';
import { UserInDB, UserAuthResponse } from '../types';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const getProduct = async (): Promise<Product[]> => {
  return await productModel.find({});
};

const getProductEntry = async (id: string): Promise<Product | null> => {
  return await productModel.findById(id);
};

const addProduct = async (product: NewProduct): Promise<Product> => {
  const newProduct = new productModel({
    ...product,
    id: uuid(),
    entries: product.entries || [],
  });

  return await newProduct.save();
};

const removeProduct = async (id: string): Promise<Product | null> => {
  return await productModel.findOneAndDelete({ id });
};

const findById = async (id: string): Promise<Product | null> => {
  return await productModel.findOne({ id });
};

const addEntry = async (entry: Entry, productId: string): Promise<Product | null> => {
  return await productModel.findOneAndUpdate(
    { id: productId },
    { $push: { entries: entry } },
    { new: true }
  );
};

const findUserByUsername = async (username: string): Promise<UserInDB | null> => {
  return await userModel.findOne({ username });
};

const createUser = async (username: string, password: string) => {
  try {
    const newUser = new userModel({ username, password });
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error in appSer.createUser:", error);
    return null;
  }
};

const userLogin = async (username: string, password: string): Promise<UserAuthResponse | null> => {
  const user = await userModel.findOne({ username });
  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const userForToken = {
    username: user.username,
    id: user._id.toString(),
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  return {
    username: user.username,
    id: user._id.toString(),
    token,
  };
};

export default { getProduct, getProductEntry, addProduct, removeProduct, addEntry, findById, findUserByUsername, createUser, userLogin };
