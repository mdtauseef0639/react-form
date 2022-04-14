const CheckBoxGroup = ({ label, name, onChange, options, checkedProp }) => {
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
              type="checkbox"
              value={opt}
              onChange={onChange}
              checked={checkedProp.includes(opt)}
            />{" "}
            {opt}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CheckBoxGroup;
