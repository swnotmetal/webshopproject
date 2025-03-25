import { NewProduct} from "../types";
import toNewEntry from "./EntryUtils";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;

};

const parseName = (name: unknown):string => {
    if(!name || !isString(name)) {
        throw new Error ('Incorrect or missing correct name');
    }
    return name;
};

const parseDate = (date: unknown):string => {
    if(!date || !isString(date)) {
        throw new Error ('Incorrect or missing correct date');
    }
    return date;
};

const parsePrice = (price: unknown):number => {
    if(!price || !isNumber(price)) {
        throw new Error ('Incorrect or missing correct price');
    }
    return price;
};

const parseImage = (image: unknown):string => {
    if(!image || !isString(image)) {
        throw new Error ('Incorrect or missing correct image');
    }
    return image;
};


const toNewProduct = (object: unknown): NewProduct => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing correct product');
    }
    console.log('Input object:', object);
    if ('name' in object && 'production_date' in object && 'expiry_date' in object && 'price' in object && 'image_url' in object) {
        const newProductEntry: NewProduct = {
            name: parseName(object.name),
            production_date: parseDate(object.production_date),
            expiry_date: parseDate(object.expiry_date),
            price: parsePrice(object.price),
            image_url: parseImage(object.image_url),
            entries: []
        };
        if ('entries' in object && Array.isArray(object.entries)) {
            console.log('Entries before parsing:', object.entries);
            newProductEntry.entries = object.entries.map(entry => toNewEntry(entry));
            console.log('Entries after parsing:', newProductEntry.entries);
        }

        if ('description' in object && isString(object.description)) {
            newProductEntry.description = object.description;
        }

        return newProductEntry;
    }
    throw new Error('Incorrect or missing correct product');
};

export default toNewProduct;