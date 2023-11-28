import constructor from "../../assets/constructor.png";
import Button from "../Button/Button";
import { NachinkaSelect } from "./NachinkaSelect";
import { useState, useEffect } from "react";

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
  const nachinkaSitnoe = ["Ветчина", "Капуста", "Рыба", "Грибы"];
  const [isSweet, setIsSweet] = useState(true);
  const [nachinkas, setNachinkas] = useState([]);

  useEffect(() => {
    setNachinkas([(isSweet ? nachinkasSweet : nachinkaSitnoe)[0]]);
    nachinkasAvailable = isSweet ? nachinkasSweet : nachinkaSitnoe;
    console.log("change");
  }, [isSweet]);
  if (nachinkasAvailable.length === 0)
    nachinkasAvailable = isSweet ? nachinkasSweet : nachinkaSitnoe;

  function addNachinka() {
    if (nachinkas.length < maxNachinkas)
      setNachinkas([...nachinkas, nachinkasAvailable[0]]);
  }
  function removeNachinka(e) {
    setNachinkas(nachinkas.filter((_, i) => !(i == e.parentElement.id)));
  }
  function changeNachinka(index, val) {
    console.log("change", index, val)
    nachinkas[parseInt(index)] = val;
    setNachinkas(nachinkas);
  }
  function changeBase(e) {
    setIsSweet(e.target.value == "1");
  }
  console.log(nachinkas);

  return (
    <div className="flex flex-col h-[calc(100vh_-_158px)] p-0 xxs:p-5 pb-8 gap-y-6 text-brown-accent font-medium">
      <div>
        <p className="text-[25px]">Конструктор пирогов</p>
      </div>
      <div>
        <img src={constructor} alt="" />
      </div>
      <div>
        <p className="text-[18px]">
          тесто слоеное, свинина, говядина, лук, морковь, сливочное масло,
          картофель, соль, перец, яичный желто
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <select defaultValue="1" onChange={changeBase}>
            <option value="0">Сытный</option>
            <option value="1">Сладкий</option>
          </select>
          <div>Вес</div>
        </div>
        {nachinkas.map((el, i) => (
          <NachinkaSelect
            key={Math.random()}
            id={i}
            value={el}
            onChange={changeNachinka}
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
