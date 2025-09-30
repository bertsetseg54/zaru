"use client";

import { createContext, useContext, useState } from "react";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const addOrder = (orderItems) => {
    setOrders((prev) => [...prev, { id: Date.now(), items: orderItems }]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}
