const Input = ({ label, type = "text", name, value, onChange }) => {
  return (
    <div className="form-group">
      <div className="group-label">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="group-data">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="form-input"
        />
      </div>
    </div>
  );
};

export default Input;
