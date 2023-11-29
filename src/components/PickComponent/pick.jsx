import React from "react";
import "./pick.css";
import styled from "styled-components";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

const Pick = () => {
  const history = useNavigate();

  const Button = styled.button`
    background-color: blue;
    color: white;
    font-size: 20px;
    padding: 10px 60px;
    border-radius: 5px;
    margin: 10px 0px;
    cursor: pointer;
  `;

  function sayHello() {
    history("/sladkoe");
  }
  function Sitnie() {
    history("/sitnoe");
  }

  return (
    <div class="center">
      <Button onClick={Sitnie}>Сытные</Button>
      <br></br>
      <Button onClick={sayHello}>Сладкие</Button>
    </div>
  );
};

export default Pick;
