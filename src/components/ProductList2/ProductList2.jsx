import React, { useState } from "react";
import "./ProductList2.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const history = useNavigate();
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();
  const { isLoading, isError, data, error, refetch } = useQuery(
    ["sladkoe"],
    () =>
      axios
        .get("https://backend-trcq.onrender.com/api/dish/getSladkoe")
        .then((res) => res.data),
  );

  const onSendData = useCallback(() => {
    const data1 = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    history("/form", { state: data1 });
  }, [addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  if (isLoading) return "Загрузка...";

  if (error) {
    return "An error has occurred: " + error.message;
    console.log;
  }

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить ${getTotalPrice(newItems)}`,
      });
    }
  };

  return (
    <div>
      <div className={"list"}>
        {data.map((item) => (
          <ProductItem product={item} onAdd={onAdd} className={"item"} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
