import React from "react";
import "./Button.scss";

const Button = (props) => {
  return (
    <button
      {...props}
      className={
        props.className +
        " button rounded-xl text-[20px] " +
        (props?.primary ? " !bg-brown-accent !text-white " : " ")
      }
    />
  );
};

export default Button;
