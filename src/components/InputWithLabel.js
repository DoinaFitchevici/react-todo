import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

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
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

InputWithLabel.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default InputWithLabel;
