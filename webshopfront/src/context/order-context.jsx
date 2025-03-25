/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React, { useState, createContext } from "react";

export const OrderContext = createContext();

export const OrderContextProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    const addOrder = (newOrder) => {
        setOrders((prevOrders) => [...prevOrders, newOrder]);
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

