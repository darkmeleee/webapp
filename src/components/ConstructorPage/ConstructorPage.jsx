import constructor from "../../assets/constructor.png";
import Button from "../Button/Button";
import { NachinkaSelect } from "./NachinkaSelect";
import { useState, useEffect } from "react";
import "./ConstructorPage.scss"
import { Select } from "./Select";

export const ConstructorPage = (props) => {
  const maxNachinkas = 3;

  let nachinkasAvailable = [];
  const nachinkasSweet = [
    "Брусника",
    "Клубника",
    "Карамель",
    "Сгущенка",
    "Микс ягод",
  ];
  const nachinkasSitnoe = ["Ветчина", "Капуста", "Рыба", "Грибы"];
  const [isSweet, setIsSweet] = useState(true);
  const [nachinkas, setNachinkas] = useState([]);

  useEffect(() => {
    setNachinkas([(isSweet ? nachinkasSweet : nachinkasSitnoe)[0]]);
    nachinkasAvailable = isSweet ? nachinkasSweet : nachinkasSitnoe;
    console.log("change");
  }, [isSweet]);
  if (nachinkasAvailable.length === 0)
    nachinkasAvailable = isSweet ? nachinkasSweet : nachinkasSitnoe;

  function addNachinka() {
    if (nachinkas.length < maxNachinkas)
      setNachinkas([...nachinkas, nachinkasAvailable[0]]);
  }
  function removeNachinka(e) {
    if (nachinkas.length === 1) return;

    setNachinkas(nachinkas.filter((_, i) => !(i == e.parentElement.id)));
  }
  function changeNachinka(index, val) {
    console.log("change", index, val);
    nachinkas[parseInt(index)] = val;
    setNachinkas(nachinkas);
  }
  function changeBase(val) {
    setIsSweet(val == "1");
  }
  console.log(nachinkas);

  return (
    <div className="flex flex-col h-[calc(100vh_-_158px)] p-0 xxs:p-5 pb-8 px-4 gap-y-6 text-brown-accent font-medium">
      <div>
        <p className="text-[25px]">Конструктор пирогов</p>
      </div>
      <div>
        <img src={constructor} alt="" />
      </div>
      <div>
        <p className="text-[18px]">
          тесто слоеное, свинина, говядина, лук, морковь, сливочное масло,
          картофель, соль, перец, яичный желток
        </p>
      </div>
      <div className="flex flex-col gap-y-[15px]">
        <div className="flex gap-x-4">
          {/* <select className="select" defaultValue="1" onChange={changeBase}>
            <option value="0">Сытный</option>
            <option value="1">Сладкий</option>
          </select> */}
          <Select defaultValue={1} onChange={(_, newValue) => changeBase(newValue)}>
            <Select.Option value={0}>Сытный</Select.Option>
            <Select.Option value={1}>Сладкий</Select.Option>
          </Select>
          <div className="btn">Вес</div>
        </div>
        {nachinkas.map((el, i) => (
          <NachinkaSelect
            key={Math.random()}
            id={i}
            value={el}
            valueChanged={changeNachinka}
            onRemove={removeNachinka}
            available={nachinkasAvailable}
          />
        ))}
      </div>
      <Button
        onClick={addNachinka}
        className="text-[18px] text-left font-medium !p-0"
      >
        +&nbsp;Добавить начинку
      </Button>
      <div className="spacer mt-auto"></div>
      <div className="text-[25px]">Цена: {550}&nbsp;₽</div>
      <div>
        <Button primary className="w-full font-normal">
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
};
