import React, { useContext } from "react";
import icon from "../../icons/bak.svg";
import logo from "../../icons/logo.svg";
import Button from "../Button/Button";
import cart from "../../icons/cart.svg";
import { useTelegram } from "../../hooks/useTelegram";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const history = useNavigate();

  function onClickUsername() {
    history("/lk");
    //  alert(user.id);

    //{user?.username ? user?.username : "darkmeleee" }
    //             <Button className={'username'} onClick={onClickUsername}>Личный кабинет</Button>
  }

  function onReturnButtonClick() {
    history(-1);
  }
  function gotoCart() {
    history("/cart");
  }

  return (
    <div className="flex flex-row w-screen justify-between md:justify-around place-items-center p-5">
      <div className="cursor-pointer w-[36px] h-[24px]">
        <a onClick={onReturnButtonClick}>
          <img
            src={icon}
            className="username"
            onClick={onReturnButtonClick}
          ></img>
        </a>
      </div>
      <div className="logo cursor-pointer h-[118px]">
        <img src={logo} onClick={onClickUsername}></img>
      </div>
      <div className="cursor-pointer flex">
        <span className="absolute h-6 w-6 place-items-center place-content-center flex self-start ml-[22px] -mt-[4px] z-10 bg-brown-accent rounded-full border-[1px] text-white border-white">
          {cartItems.reduce((acc, item) => (acc += item.quantity), 0)}
        </span>
        <img src={cart} className="relative z-0s" onClick={gotoCart} />
      </div>
    </div>
  );
};

export default Header;
