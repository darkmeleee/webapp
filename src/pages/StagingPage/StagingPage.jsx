import { FormControl, FormGroup, RadioGroup } from "@mui/material";
import { RadioButton } from "../../components/RadioButton/RadioButton";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { useQuery } from "react-query";
import { useContext } from 'react';
import { useTelegram } from "../../hooks/useTelegram";
import axios from "axios";
import { useState, useEffect } from "react";
import { CheckboxButton } from "../../components/Checkbox/Checkbox";
import { Select } from "../../components/Select/Select";
import { useNavigate } from "react-router-dom";
import { CenteredLoading } from "../../components/CenteredLoading/CenteredLoading";
import { CartContext } from "../../context/CartContext";
import { YooCheckout, ICreatePayment  } from '@a2seven/yoo-checkout';
const { v4: uuidv4 } = require('uuid');











  
export const StagingPage = ({}) => {
  const history = useNavigate();
  const { user, tg } = useTelegram();


  const addresses = [
    "ул.Белореченская, д.36/1",
    "ул.Пушкина, д.14",
    "ул.Пушкина, д.14",
  ];
  const availableChange = [1000, 5000];

  const { isLoading, isError, data, error, refetch, isFetched } = useQuery(
    ["userdata"],
    async () =>
      axios
       // .get(`${process.env.REACT_APP_API_URL}/api/user/get?id=${user.id}`)
          .get(`${process.env.REACT_APP_API_URL}/api/user/get?id=866684831`)
        .then((res) => res.data)
  );

  const [shipType, setShipType] = useState("delivery");
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [deliverQuick, setDeliverQuick] = useState(true);
  const [paymentType, setPaymentType] = useState("cardOnline");
  const [selfPickupAddress, setSelfPickupAddress] = useState(addresses[0]);
  const { cartItems, addToCart, getCartTotal, clearCart} = useContext(CartContext);

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
      setPhone(data.number ?? "");
      setEmail(data.email ?? "");
      setAddress(data.adress ?? "");
    }
  }, [data]);

  if (isLoading) return <CenteredLoading/>;

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
  const deliverQuickChange = (e) => {
    setDeliverQuick(e.target.checked);
  };

  async function performOrder() {
     // process.env.REACT_APP_API_URL+ '/api/order/create',  
     var total = getCartTotal();
   if(paymentType == "cardOnline" && shipType == "delivery"){  
    await axios.post(process.env.REACT_APP_API_URL+ '/api/order/create', {
      "price": total,
      "pickup": 1,
      "status": "INWORK",
      "sostav": JSON.stringify(cartItems),
      "authorId": 866684831
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async function (response) {
      const orderId = response.data.id;
      const price = response.data.price;
      const currentHost = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

      

      await axios.post(process.env.REACT_APP_API_URL+ '/api/order/createPayment', {
       "price": price,
       "orderId": orderId,
       "url": `${currentHost}/orderReady?id=${orderId}`
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(async function(response) {
        
          window.location.replace(response.data.url);
          clearCart();
        
      })
   
    })}
    else{
          await axios.get(process.env.REACT_APP_API_URL+ '/api/user/get?id=' + user.id)
        //await axios.get(process.env.REACT_APP_API_URL+ '/api/user/get?id=866684831')
        .then(async function (response) {
          await axios.post(process.env.REACT_APP_API_URL+ '/api/order/create', {
            "price": total,
            "pickup": 1,
            "status": "INWORK",
            "sostav": JSON.stringify(cartItems),
           // "authorId": response.data.id
            "authorId": 866684831
          }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      .then(async function (response) {
        const orderId = response.data.id;
        clearCart()
        history(`/orderReady`, { state: { orderId: orderId } })
        
        
    })
  }) 
  }

 
 

          
    
    
  }

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
            {deliverQuick ? (
              <Input disabled={true} value="В ближайшее время" />
            ) : (
              <Select className="w-[90%]" />
            )}
            <FormControl>
              <FormGroup onChange={deliverQuickChange}>
                <CheckboxButton
                  defaultChecked={true}
                  checked={deliverQuick}
                  name={"deliverQuick"}
                  labelClassName="text-[19px]"
                >
                  Доставить в ближайшее время
                </CheckboxButton>
              </FormGroup>
            </FormControl>
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
                <RadioButton
                  labelClassName="!text-[19px]"
                  value={"cardCourier"}
                >
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
                      onClick={() => {
                        setChange(el);
                      }}
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
        <Button primary onClick={performOrder} className="w-full font-normal">
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
