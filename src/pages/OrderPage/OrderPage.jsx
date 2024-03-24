import React, { useContext, useState } from "react";
import { useCallback, useEffect } from "react";
import OrderItem2 from "../../components/OrderItem/OrderItem2"

import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { CenteredLoading } from "../../components/CenteredLoading/CenteredLoading";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Button from "../../components/Button/Button";

export const OrderPage = (props) => {
  const { id } = useParams();
  const { isLoading, isSuccess, data, error } = useQuery(
    ["products", id],
    () =>
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/order/get?id=${id}`)
        .then((res) => res.data),
        
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
    },
  );

  if (isLoading) return <CenteredLoading/>;
  console.log(data)
  
  const product = data;
  

  return (
    <div className="flex flex-col h-[calc(100vh_-_158px)] p-3 pb-8 gap-y-5 text-brown-accent">
      <div className="w-full p-name">
        <span className="text-[25px] font-medium">Состав заказа:</span>
      </div>
      <div className="w-full p-desc">
        <p className="text-[18px] font-medium ">{product.name} (1)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product.price}&nbsp;₽</p>
        {JSON.parse(data.sostav).map((item) => (
          <OrderItem2
            key={item.id}
            order={item}
            className={"item"}
          />
        ))}
      </div>
      <div className="spacer mt-auto"></div>
    
     
    </div>
  );
};
