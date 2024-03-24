import React, { useContext, useState } from "react";
import "./OrderHistory.scss";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import OrderItem from "../../components/OrderItem/OrderItem"

import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { CenteredLoading } from "../../components/CenteredLoading/CenteredLoading";

const OrderHistory = () => {
  const { tg, queryId, user } = useTelegram();
  const { cartItems, addToCart, getCartTotal } = useContext(CartContext);
  const { isLoading, isSuccess, data, error } = useQuery(["orders"], () =>
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/order/getUserOrders?id=866684831`) 
      .then((res) => res.data),
  );
  let sweet = [];
  let sitnoe = [];
  

 // const history = useNavigate();
 //     history("/form", { state: data1 });

  const [isSweet, setIsSweet] = useState(true);
 
  const onSendData = useCallback(() => {
    const data1 = {
      products: cartItems,
      totalPrice: getCartTotal(),
      queryId,
    };
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

  

  return (
    <div className="page p-1 pt-4 xxs:p-5">
     
      <div className="flex flex-wrap gap-x-4 gap-y-5">
        {data.map((item) => (
          <OrderItem
            key={item.id}
            order={item}
            className={"item"}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
