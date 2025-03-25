import appSer from "../services/appSer";
import {Product, NewProduct, Entry} from "../types";

const productResolver = {
    Query: {
        getProducts: async ():  Promise<Product[]> => {
            return await appSer.getProduct();
        },
        getProduct: async (_: unknown, {id}: {id: string}): Promise<Product | null> => {
            return await appSer.getProductEntry(id);
        }
    },
    Mutation: {
        addProduct: async (_: unknown, {product}: {product: NewProduct}): Promise<Product> => {
            return await appSer.addProduct(product);
        },
        deleteProduct: async (_: unknown, {id}: {id: string}): Promise<Product | null> => {
            return await appSer.removeProduct(id);
        },
        addEntry: async (_: unknown, {entry, productId}: {entry: Entry, productId: string}):  Promise<Product | null> => {
            const product = await appSer.findById(productId);
            if (!product) {
                throw new Error(`Product with id ${productId} not found`);
            }
            return await appSer.addEntry(entry, product);
        }
    }
};

export default productResolver;

