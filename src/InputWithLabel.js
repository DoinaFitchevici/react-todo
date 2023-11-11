const InputWithLabel = ({ id, label, type, value, onChange }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </>
  );
};
export default InputWithLabel;
