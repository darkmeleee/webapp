import React, { useCallback, useEffect, useState } from "react";
import "./Registration.scss";
import { useTelegram } from "../../hooks/useTelegram";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { Input } from "../../components/Input/Input";
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
    background-color: #683b2b;
    border-radius: 57px;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    margin: 10px 10px;
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
  

 async function sellRabstvo() {
    // alert(`user: ${username} | ${phone} | ${email} | ${street.unrestricted_value}`);
    //console.log(street);
  
   await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/create`,
      headers: {},
      data: {
        name: username,
        number: phone,
        tgid: user.id,
        email: email,
        adress: street.value,
      },
    });
    history("/");
  }

  return (
    <div className={"form"}>
      <h1>Регистрация нового пользователя</h1>
      <Input value={username} onChange={onChangeName} placeholder="Имя" />
      <Input
        value={phone}
        onChange={onChangePhone}
        placeholder={"Телефон"}
        type="tel"
      />
      <Input
        value={email}
        onChange={onChangeEmail}
        placeholder="Email"
        type="email"
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
