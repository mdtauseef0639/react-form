const Button = ({ name, type, onClick, label }) => {
  return (
    <button type={type} onClick={onClick} className="form-btn" name={name}>
      {label}
    </button>
  );
};

export default Button;
