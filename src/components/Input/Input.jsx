export const Input = ({
  onChange,
  value,
  placeholder,
  type = "text",
  className,
}) => {
  return (
    <input
      className={
        "input border-solide border-[1px] border-brown-accent text-brown-accent text-[22px] bg-white rounded-[50px] py-[4px] pl-[15px] " +
        className
      }
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
