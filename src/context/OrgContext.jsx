"use client";
import { createContext, useContext, useState } from "react";

const OrgContext = createContext();

export const OrgProvider = ({ children }) => {
  const [org, setOrg] = useState({
    ner: "",
    name: "",
    image: null,
    phone: "",
    email: "",
    website: "",
    type: "",
    address: "",
    products: [],
  });

  return (
    <OrgContext.Provider value={{ org, setOrg }}>
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = () => useContext(OrgContext);
