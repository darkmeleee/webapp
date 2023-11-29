import "./App.scss";
import { useEffect } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import Order from "./components/Order/Order";
import Lk from "./components/Lk/Lk";
import Registration from "./components/Registration/Registration";
import { QueryClient, QueryClientProvider } from "react-query";
import { ProductPage } from "./components/ProductPage/ProductPage";
import { ConstructorPage } from "./components/ConstructorPage/ConstructorPage";
import { CartPage } from "./components/CartPage/CartPage";
import { CartProvider } from "./context/CartContext";

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
            {/* <Route path={'sitnoe'} element={<ProductList />}/>
                <Route path={'sladkoe'} element={<ProductList2 />}/> */}
            <Route path={"reg"} element={<Registration>/</Registration>} />
            <Route path={"product/:id"} element={<ProductPage />} />
            <Route path={"constructor"} element={<ConstructorPage />} />
            <Route path={"cart"} element={<CartPage />} />
          </Routes>
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
