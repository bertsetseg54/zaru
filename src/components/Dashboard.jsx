// Dashboard.jsx
"use client";

import { useState } from "react";
import DashboardNav from "./DashboardNav";
import dynamic from "next/dynamic";

const Profile = dynamic(() => import("./Profile"), { ssr: false });
const SalesStats = dynamic(() => import("./SalesStats"), { ssr: false });
const ProductManager = dynamic(() => import("./ProductManager"), {
  ssr: false,
});
const OrderList = dynamic(() => import("./OrderList"), { ssr: false });

export default function Dashboard() {
  const [active, setActive] = useState("Пропайл");

  const renderContent = () => {
    switch (active) {
      case "Пропайл":
        return <Profile />;
      case "Борлуулалт":
        return <SalesStats />;
      case "Бүтээгдэхүүн":
        return <ProductManager />;
      case "Захиалгын жагсаалт":
        return <OrderList />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <DashboardNav active={active} setActive={setActive} />
      <main className="flex-1 p-6 md:p-8">{renderContent()}</main>
    </div>
  );
}
