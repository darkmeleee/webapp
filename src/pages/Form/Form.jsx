import React, { useCallback, useEffect, useState } from "react";
import { userColumns } from "../Form/datatablesource";
import "./datatable.scss";

import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";
import { DataGrid } from "@mui/x-data-grid";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

const Form = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subject, setSubject] = useState("physical");
  const { tg } = useTelegram();
  const history = useNavigate();

  const location = useLocation();
  const data11 = location.state;
  const products = data11.products;
  console.log(data11);

  const onSendData = useCallback(() => {
    /* fetch('https://webapp-bot.onrender.com/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data11)

        })    }, [products])*/
    history("/order", { state: data11 });
  });

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Оформить заказ",
    });
    tg.MainButton.show();
  }, []);

  /* useEffect(() => {
        if(!street || !country) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [country, street])*/

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };

  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">Корзина</div>
      <DataGrid
        className="datagrid"
        rows={products}
        columns={userColumns}
        pageSize={9}
      />
    </div>
  );
};

export default Form;
