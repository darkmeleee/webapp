import React from "react";
import "./Button.scss";
import PropTypes from "prop-types";

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

Button.propTypes = {
  primary: PropTypes.bool,
};

export default Button;
