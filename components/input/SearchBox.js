export function SearchBox({ defaultValue, value,onChange, placeholder, name }) {
  return (
    <div className="bg-white border-black border flex items-center rounded-full p-1 align-middle text-black">
      <input
        type="search"
        className="focus:outline-none outline-none m-1 text-black"
        defaultValue={defaultValue}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <button className="text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    </div>
  );
}