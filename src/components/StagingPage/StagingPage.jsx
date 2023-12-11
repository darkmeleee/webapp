import { FormControl, RadioGroup } from "@mui/material";
import { RadioButton } from "../RadioButton/RadioButton";
import Button from "../Button/Button";
import { Input } from "../Input/Input";
import { useQuery } from "react-query";
import axios from "axios";
import { useState, useEffect } from "react";

export const StagingPage = ({}) => {
  const addresses = [
    "ул.Пушкина, д.14",
    "ул.Пушкина, д.14",
    "ул.Пушкина, д.14",
  ];
  const availableChange = [1000, 5000];

  const { isLoading, isError, data, error, refetch, isFetched } = useQuery(
    ["userdata"],
    async () =>
      axios
        .get(`https://backend-trcq.onrender.com/api/user/get?id=0`)
        .then((res) => res.data)
  );

  const [shipType, setShipType] = useState("delivery");
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [deliverQuick, setDeliverQuick] = useState(true);
  const [paymentType, setPaymentType] = useState("cash");
  const [selfPickupAddress, setSelfPickupAddress] = useState(addresses[0]);
  const [change, setChange] = useState(1000);
  function getButtonLabelPaymentType() {
    switch (paymentType) {
      case "cardOnline":
        return "К оплате";
      case "cardCourier":
        return "К оплате";
      case "cash":
        return "Далее";
    }
  }
  function getButtonLabelShipType() {
    switch (shipType) {
      case "delivery":
        return getButtonLabelPaymentType();
      case "selfpickup":
        return "Готово";
    }
  }
  const [buttonLabel, setButtonLabel] = useState(getButtonLabelPaymentType());

  useEffect(() => {
    setButtonLabel(getButtonLabelPaymentType());
  }, [paymentType]);
  useEffect(() => {
    setButtonLabel(getButtonLabelShipType());
  }, [shipType]);

  const [username, setUsername] = useState();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (isFetched) {
      console.log(data);
      setUsername(data.name ?? "");
      setPhone(data.name ?? "");
      setEmail(data.name ?? "");
    }
  }, [data]);

  if (isLoading) return <center>Загрузка...</center>;

  if (error) {
    return "An error has occurred: " + error.message;
  }

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
  const shipTypeChange = (e) => {
    setShipType(e.target.value);
  };
  const paymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };
  const selfPickupAddressChange = (e) => {
    setSelfPickupAddress(addresses[e.target.value]);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh_-_158px)] p-3 pb-8 gap-y-5 text-brown-accent">
      <div>
        <p className="text-[25px] font-medium">Оформление заказа</p>
      </div>
      <FormControl>
        <RadioGroup
          className="!flex-row !place-content-between"
          name="shipType"
          defaultValue={"delivery"}
          onChange={shipTypeChange}
        >
          <RadioButton value={"delivery"}>Доставка</RadioButton>
          <RadioButton value={"selfpickup"}>Самовывоз</RadioButton>
        </RadioGroup>
      </FormControl>

      {shipType === "delivery" ? (
        <>
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
          <Input
            value={address}
            onChange={onChangeAddress}
            placeholder="Адрес"
          />

          <div>
            <p className="text-[22px]">Укажите время доставки</p>
            <Input
              value={deliveryTime}
              disabled={deliverQuick}
              placeholder=""
            />
            ЧЕКБОКС СДЕЛАЕШЬ
            {/* Checkbox */}
          </div>

          <div>
            <p className="text-[22px]">Оплата</p>
            <FormControl>
              <RadioGroup
                className="!font-sans"
                name="paymentType"
                defaultValue={"cardOnline"}
                onChange={paymentTypeChange}
              >
                <RadioButton labelClassName="!text-[19px]" value={"cardOnline"}>
                  Картой онлайн
                </RadioButton>
                <RadioButton labelClassName="!text-[19px]" value={"cardCourier"}>
                  Картой курьеру
                </RadioButton>
                <RadioButton labelClassName="!text-[19px]" value={"cash"}>
                  Наличными
                </RadioButton>
              </RadioGroup>
            </FormControl>
            {paymentType === "cash" ? (
              <>
                <p className="text-[22px] py-2">Понадобится сдача</p>
                <div className="flex gap-x-5">
                  {availableChange.map((el) => (
                    <Button
                      key={el}
                      primary={change === el}
                      onClick={() => {setChange(el)}}
                      className="w-fit"
                      rounded
                    >
                      {el} ₽
                    </Button>
                  ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div className="paymentType flex flex-col h-full p-3 pb-8 gap-y-5 text-brown-accent">
          <FormControl>
            <RadioGroup
              className="gap-y-[20px] "
              name="paymentType"
              defaultValue={0}
              onChange={selfPickupAddressChange}
            >
              {addresses.map((el, i) => (
                <RadioButton
                  labelPlacement="start"
                  className="!text-[25px] border-b-2 border-b-[rgba(104,59,43,0.62)] !place-content-between !ml-0"
                  key={i}
                  value={i}
                >
                  {el}
                </RadioButton>
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      )}

      <div>
        <Button primary to="/staging" className="w-full font-normal">
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
