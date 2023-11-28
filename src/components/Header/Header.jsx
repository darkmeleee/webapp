import React from "react";
import icon from "../../icons/bak.svg";
import logo from "../../icons/logo.svg";
import Button from "../Button/Button";
import cart from '../../icons/cart.svg'
import { useTelegram } from "../../hooks/useTelegram";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, onClose } = useTelegram();
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
    <div className="flex flex-row w-screen justify-between place-items-center p-5">
      <div className="cursor-pointer">
        <a onClick={onReturnButtonClick}>
          <img
            src={icon}
            className="username"
            onClick={onReturnButtonClick}
          ></img>
        </a>
      </div>
      <div className="logo cursor-pointer h-[118px]">
        <img src={logo} onClick={onReturnButtonClick}></img>
      </div>
      <div className="cursor-pointer">
        <img src={cart} onClick={gotoCart}/>
      </div>
    </div>
  );
};

export default Header;
