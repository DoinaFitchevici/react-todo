import { useRef, useEffect } from "react";

const InputWithLabel = ({
  id,
  children,
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 100,
          fontVariant: "small-caps",
        }}
        htmlFor={id}
      >
        {children}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </>
  );
};

export default InputWithLabel;
