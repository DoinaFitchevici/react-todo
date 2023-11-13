import { useRef, useEffect } from "react";

const InputWithLabel = ({ id, children, name, type, value, onChange }) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </>
  );
};

export default InputWithLabel;
