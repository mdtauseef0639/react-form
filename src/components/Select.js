const Select = ({ label, name, title, options, onChange, value }) => {
  return (
    <div className="form-group">
      <div className="group-label">
        <label htmlFor={name}>{label}</label>
      </div>
      <div className="group-data">
        <select
          name={name}
          onChange={onChange}
          className="form-input"
          value={value}
        >
          <option value="">{title}</option>
          {options.map((opt, idx) => (
            <option value={opt} key={idx}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
