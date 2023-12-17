import React, { useCallback, useEffect, useState } from "react";
import "./Registration.scss";
import { useTelegram } from "../../hooks/useTelegram";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import styled from "styled-components";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
// https://webapp-bot.onrender.com/

const Lk = () => {
  const { user, tg } = useTelegram();
  const history = useNavigate();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const locations = {
    city: "Екатеринбург",
  };
  const Button = styled.button`
    background-color: black;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
  `;

  const onChangeName = (e) => {
    setUsername(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  function sellRabstvo() {
    // alert(`user: ${username} | ${phone} | ${email} | ${street.unrestricted_value}`);
    //console.log(street);
    console.log();
    axios({
      method: "post",
      url: "https://backend-trcq.onrender.com/api/user/create",
      headers: {},
      data: {
        name: username,
        number: phone,
        tgid: user.id,
        email: email,
        adress: street,
      },
    });
    history("/");
  }

  return (
    <div className={"form"}>
      <h1>Регистрация нового пользователя</h1>
      <input
        className={"input"}
        type="text"
        placeholder={"Имя"}
        value={username}
        onChange={onChangeName}
      />
      <input
        className={"input"}
        type="tel"
        placeholder={"Телефон"}
        value={phone}
        onChange={onChangePhone}
      />
      <input
        className={"input"}
        type="email"
        placeholder={"Email"}
        value={email}
        onChange={onChangeEmail}
      />
      <br></br>
      <AddressSuggestions
        token="69a955bf27ce46407c3c605bcd923a96458d519b"
        value={street}
        onChange={setStreet}
        filterLocations={locations}
        inputProps={{
          placeholder: "Адрес",
        }}
      />

      <br></br>

      <label>
        <input type="checkbox" />
        Согласен на обработку персональных данных.
      </label>

      <Button onClick={sellRabstvo}>Сохранить</Button>
    </div>
  );
};

export default Lk;
