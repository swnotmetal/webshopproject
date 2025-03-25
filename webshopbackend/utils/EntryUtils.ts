
import { Entry } from '../types';

const isNumber = (num: unknown): num is number => {
    return typeof num === 'number' || num instanceof Number;
};


const parseCalories = (calories: unknown):number => {
    if(!calories || !isNumber(calories)) {
        throw new Error ('Incorrect or missing correct calories');
    }
    return calories;
};

const parseFat = (fat: unknown):number => {
    if(!fat || !isNumber(fat)) {
        throw new Error ('Incorrect or missing correct fat');
    }
    return fat;
};

const parseCarbohydrates = (carbohydrates: unknown):number => {
    if(!carbohydrates || !isNumber(carbohydrates)) {
        throw new Error ('Incorrect or missing correct carbohydrates');
    }
    return carbohydrates;
};

const parseProtein = (protein: unknown):number => {
    if(!protein || !isNumber(protein)) {
        throw new Error ('Incorrect or missing correct protein');
    }
    return protein;
};

const toNewEntry = (object: unknown): Entry => {
    if (! object || typeof object !== 'object') {
        throw new Error('Incorrect or missing correct entry');
    }
    if ('calories' in object && 'fat' in object && 'carbohydrates' in object && 'protein' in object) {
        const newEntry: Entry = {
            calories: parseCalories(object.calories),
            fat: parseFat(object.fat),
            carbohydrates: parseCarbohydrates(object.carbohydrates),
            protein: parseProtein(object.protein)
        };
        return newEntry;
    }
    throw new Error('Incorrect or missing correct entry');
};

export default toNewEntry;