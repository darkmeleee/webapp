import React, { useContext, useState } from "react";
import "./ListPage.css";
import ProductItem from "../../components/ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { useNavigate } from "react-router-dom";
import { PirogiSwitch } from "../../components/Switch/Switch";
import { CartContext } from "../../context/CartContext";
import { CenteredLoading } from "../../components/CenteredLoading/CenteredLoading";

const ProductList = () => {
  const { cartItems, addToCart, getCartTotal } = useContext(CartContext);
  const { isLoading, isSuccess, data, error } = useQuery(["products"], () =>
    axios
      .get(`https://backend-trcq.onrender.com/api/dish/getAll`)
      .then((res) => res.data),
  );
  let sweet = [];
  let sitnoe = [];
  if (isSuccess) {
    sweet = data.filter((el) => el.type == 1);
    sitnoe = data.filter((el) => el.type == 0);
  }

  const history = useNavigate();
  const [isSweet, setIsSweet] = useState(true);
  const { tg, queryId } = useTelegram();
  const onSendData = useCallback(() => {
    const data1 = {
      products: cartItems,
      totalPrice: getCartTotal(),
      queryId,
    };
    history("/form", { state: data1 });
  }, [cartItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  if (isLoading) return <CenteredLoading/>;

  if (error) {
    return "Произошла ошибка: " + error.message;
  }

  const onAdd = (product) => {
    addToCart(product);

   
  };
  function pirogiSwitchToggle(e) {
    setIsSweet(!isSweet);
  }

  return (
    <div className="page p-1 pt-4 xxs:p-5">
      <div className="slider h-auto flex gap-x-[15px] py-4 w-full text-2xl place-items-center select-none">
        <label htmlFor="pirogi" className="sitn text-brown-accent">
          Сытные
        </label>
        <PirogiSwitch id="pirogi" onChange={pirogiSwitchToggle} />
        <label htmlFor="pirogi" className="slad text-brown-accent">
          Сладкие
        </label>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-5">
        {(isSweet ? sweet : sitnoe).map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            onAdd={onAdd}
            className={"item"}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
