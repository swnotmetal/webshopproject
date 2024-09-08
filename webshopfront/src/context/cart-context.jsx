/* eslint-disable react/prop-types */
import { createContext, useState, useCallback } from "react";
import snacksData from "../snacks";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < snacksData.length; i++) {
        cart[snacksData[i].id] = 0;
    }
    return cart;
};

export const ShopContextProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = useCallback((id) => {
        setCartItems(prevItems => ({
            ...prevItems,
            [id]: (prevItems[id] || 0) + 1,
        }));
    }, []);

    const removeFromCart = useCallback((id) => {
        setCartItems(prevItems => {
            if (prevItems[id] > 0) {
                return {
                    ...prevItems,
                    [id]: prevItems[id] - 1,
                };
            }
            return prevItems;
        });
    }, []);

    const clearCart = useCallback(() => {
        setCartItems(getDefaultCart());
    }, []);

    const contextValues = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    };

    console.log("cartItems", cartItems);

    return <ShopContext.Provider value={contextValues}>{children}</ShopContext.Provider>;
};