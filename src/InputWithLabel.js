import { useRef, useEffect } from "react";

const InputWithLabel = ({ id, children, type, value, onChange }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        ref={inputRef}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
export default InputWithLabel;
