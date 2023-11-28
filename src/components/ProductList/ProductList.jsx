import React, { useState } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import { useNavigate } from "react-router-dom";
import { PirogiSwitch } from "../Switch/Switch";

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const { isLoading, isSuccess, data, error } = useQuery(["products"], () =>
    axios
      .get("https://backend-trcq.onrender.com/api/dish/getAll")
      .then((res) => res.data)
  );
  let sweet = [];
  let sitnoe = []
  if (isSuccess) {
    sweet = data.filter((el) => el.type == 1);
    sitnoe = data.filter((el) => el.type == 0);
  }

  const history = useNavigate();
  const [addedItems, setAddedItems] = useState([]);
  const [isSweet, setIsSweet] = useState(true);
  const { tg, queryId } = useTelegram();
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

  if (isLoading) return <center>Загрузка...</center>;

  if (error) {
    return "Произошла ошибка: " + error.message;
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
  function pirogiSwitchToggle(e) {
    setIsSweet(!isSweet);
  }

  return (
    <div className="page p-5">
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
