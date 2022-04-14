const RadioGroup = ({ label, name, onChange, options, checkedProp }) => {
  return (
    <div className="form-group">
      <div className="group-label">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="group-data">
        {options.map((opt, idx) => (
          <span key={idx}>
            {" "}
            <input
              name={name}
              type="radio"
              value={opt}
              onChange={onChange}
              checked={opt === checkedProp}
            />{" "}
            {opt}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
