const InputWithLabel = ({ id, label, name, type, value, onChange }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
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
