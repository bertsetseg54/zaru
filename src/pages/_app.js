import "@/styles/globals.css";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { SagsProvider } from "../context/SagsContext";
import { OrdersProvider } from "../context/OrderContext";
import { UserProvider } from "../context/UserContext";
import { ProductsProvider } from "../context/ProductContext";
import { OrgProvider } from "@/context/OrgContext";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noLayoutRouter = ["/dashboard", "/login", "/orderform"];
  const isNoLayout = noLayoutRouter.includes(router.pathname);

  return (
    <OrgProvider>
      <ProductsProvider>
        <UserProvider>
          <SagsProvider>
            <OrdersProvider>
              {isNoLayout ? (
                <Component {...pageProps} />
              ) : (
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              )}
            </OrdersProvider>
          </SagsProvider>
        </UserProvider>
      </ProductsProvider>
    </OrgProvider>
  );
}
