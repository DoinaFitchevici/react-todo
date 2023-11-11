const InputWithLabel = ({ id, children, type, value, onChange }) => {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input type={type} id={id} value={value} onChange={onChange} />
    </>
  );
};
export default InputWithLabel;
