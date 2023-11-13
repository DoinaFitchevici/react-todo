const InputWithLabel = ({ id, children, name, type, value, onChange }) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        name={name}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
export default InputWithLabel;
