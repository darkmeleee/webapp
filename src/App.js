import "./App.scss";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import ProductList from "./pages/ListPage/ListPage";
import Form from "./pages/Form/Form";
import Order from "./pages/Order/Order";
import Lk from "./pages/Lk/Lk";
import Registration from "./pages/Registration/Registration";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProductPage } from "./pages/ProductPage/ProductPage";
import { ConstructorPage } from "./pages/ConstructorPage/ConstructorPage";
import { CartPage } from "./pages/CartPage/CartPage";
import { CartProvider } from "./context/CartContext";
import { StagingPage } from "./pages/StagingPage/StagingPage";
import { StatusPage } from "./pages/StatusPage/StatusPage";
import { OrderReadyPage } from "./pages/OrderReadyPage/OrderReadyPage";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import { OrderPage } from "./pages/OrderPage/OrderPage";
const queryClient = new QueryClient({});

function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route index element={<ProductList />} />
            <Route path={"form"} element={<Form />} />
            <Route path={"order"} element={<Order />} />
            <Route path={"lk"} element={<Lk></Lk>} />
            <Route path={"reg"} element={<Registration>/</Registration>} />
            <Route path={"product/:id"} element={<ProductPage />} />
            <Route path={"constructor"} element={<ConstructorPage />} />
            <Route path={"cart"} element={<CartPage />} />
            <Route path={"staging"} element={<StagingPage />} />
            <Route path={"status/:orderId"} element={<StatusPage />} />
            <Route path={"orderReady"} element={<OrderReadyPage />} />
            <Route path={"history"} element={<OrderHistory />} />
            <Route path={"history/order/:id"} element={<OrderPage />} />
          </Routes>
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
