import React, { useEffect, useState } from "react";
import "./Lk.css";
import { useTelegram } from "../../hooks/useTelegram";
import "react-dadata/dist/react-dadata.css";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { Input } from "../../components/Input/Input";
import { CenteredLoading } from "../../components/CenteredLoading/CenteredLoading";
const locations = {
  city: "Екатеринбург",
};
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

const Lk = () => {
  const { user, tg } = useTelegram();
  const { isLoading, isError, data, error, refetch, isFetched } = useQuery(
    ["userdata"],
    async () =>
      axios
       //.get(`${process.env.REACT_APP_API_URL}/api/user/get?id=${user.id}`)
        .get(`${process.env.REACT_APP_API_URL}/api/user/get?id=866684831`)
        .then((res) => res.data)
  );
  const [username, setUsername] = useState();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (isFetched) {-
      setUsername(data.name);
      setPhone(data.number);
      setEmail(data.email);
      setAddress(data.adress);
    }
  }, [data]);

  const Button = styled.button`
    background-color: #683b2b;
    border-radius: 57px;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
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
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  if (isLoading) return <CenteredLoading/>;

  if (error) {
    return "An error has occurred: " + error.message;
  }

  async function sellRabstvo() {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/api/user/update`,
      headers: {},
      data: {
        "id": 866684831,
        "name": username,
        "number": phone,
        "email": email,
        "adress": address.value
      }
    });
   
    <CenteredLoading></CenteredLoading>
  }

  return (
    <div className={"form"}>
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
      <AddressSuggestions
        token="69a955bf27ce46407c3c605bcd923a96458d519b"
        value={address}
        onChange={setAddress}
        filterLocations={locations}
        inputProps={{
          placeholder: "Адрес",
        }}
      />
      <p className="text1">Бонусы: {125} баллов</p>
      <Button onClick={sellRabstvo}>Сохранить</Button>
      <a href="/history">История заказов</a>
    </div>
    
  );
};

export default Lk;
