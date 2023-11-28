import { createRef, useRef, useState } from "react";

export const NachinkaSelect = (props) => {
  const [value, setValue] = useState(props?.value ?? props.available[0]);
  const select = createRef();

  function onSelect(e) {
    setValue(e.target.value);
  }
  return (
    <div className="flex justify-between" id={props.id}>
      <select
        className=""
        name="nachinka[]"
        onSelect={onSelect}
        onChange={console.log}
        defaultValue={value}
        ref={select}
      >
        {props.available.map((el) => (
          <option key={el}>{el}</option>
        ))}
      </select>
      <button onClick={() => props?.onRemove(select.current)}>Удалить</button>
    </div>
  );
};
