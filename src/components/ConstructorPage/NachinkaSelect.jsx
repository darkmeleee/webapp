import { createRef, useRef, useState } from "react";
import { Select } from "./Select";

export const NachinkaSelect = (props) => {
  const [value, setValue] = useState(props?.value ?? props.available[0]);
  const select = createRef();

  function onSelect(val) {
    setValue(val);
    props?.valueChanged(props.id, val);
  }
  return (
    <div className="flex gap-x-4 font-medium" id={props.id}>
      <Select
        className=""
        defaultValue={value}
        ref={select}
        onChange={(_, newVal) => onSelect(newVal)}
      >
        {props.available.map((el) => (
          <Select.Option key={el} value={el}>
            {el}
          </Select.Option>
        ))}
      </Select>
      {/* <select
        className=""
        name="nachinka[]"
        onChange={onSelect}
        defaultValue={value}
        ref={select}
      >
        {props.available.map((el) => (
          <option key={el}>{el}</option>
        ))}
      </select> */}
      {props.id === 0 ? (
        ""
      ) : (
        <button onClick={() => props?.onRemove(select.current)}>Удалить</button>
      )}
    </div>
  );
};
