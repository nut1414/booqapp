export function SelectBox({ onChange, value, name, className, id, children, label, noWidth }) {
  const width = noWidth ? "" : "w-96"
  return (
    <div className={className}>
      {label ? (
        <>
          <label htmlFor={id ? id : name} className="m-3 font-bold">
            {label}{" "}
          </label>
          <br></br>
        </>
      ) : (
        ""
      )}
      <select
        name={name}
        id={id ? id : name}
        value={value}
        onChange={onChange}
        className={`p-2 rounded-full ${width} bg-white text-gray-900 m-3 drop-shadow-sm border border-black `}
      >
        {children}
      </select>
    </div>
  );
}