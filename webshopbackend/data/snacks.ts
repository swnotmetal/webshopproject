
import { ProductWithEntry } from '../types';

const snacks: ProductWithEntry[] = [


    {
        "id": "5",
        "name": "Spicy Chips",
        "production_date": "2024-09-10",
        "expiry_date": "2024-10-10",
        "price": 2.2,
        "image_url": "https://t4.ftcdn.net/jpg/01/07/19/99/360_F_107199932_swDni95HIOZpXsUdLCyVwM4lC3seSPtB.jpg"
    },
    {
        "id": "6",
        "name": "Cheese Chips",
		"entries": [
			{
				"calories": 100,
				"fat": 5,
				"carbohydrates": 10,
				"protein": 2
			}
		],
        "production_date": "2024-09-15",
        "expiry_date": "2024-10-15",
        "price": 2.8,
		"description": "Cheese Chips are a delicious snack that is perfect for any occasion. They are made with real cheese and have a crispy, crunchy texture that is sure to satisfy your cravings. Whether you are looking for a quick and easy snack to enjoy on the go or a tasty treat to share with friends, Cheese Chips are the perfect choice. Try them today and experience the delicious taste of real cheese in every bite!",
        "image_url": "https://t4.ftcdn.net/jpg/02/16/06/95/360_F_216069513_fABX2vApquC0Uh6XSBEQ06SzPVluI6Zn.jpg"
    }

];

export default snacks;