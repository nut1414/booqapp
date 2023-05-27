export function BankU({
  isMain,
  mainBankChange,
  name,
  bankNumber,
  bankType,
  onclick,
  noDelete,
  className,
}) {
  return (
    <div className={`${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="absolute top-2"
          checked={isMain}
          onChange={mainBankChange}
        />
        {/* <pre className="text-xl font-bold inline-flex font-serif">{name}    {lastname}</pre> */}
        <div className="inline-flex gap-5 text-xl font-bold mb-2 ml-10">
          <p>{name}</p>
        </div>
        {!noDelete && (
          <button
            className={
              "text-xl font-light  text-spooky-orange underline  transition-all float-right mr-32"
            }
            onClick={onclick}
          >
            Delete
          </button>
        )}
        <p className=" max-w-2xl break-words  ml-10">{bankNumber}</p>
        <p className=" max-w-2xl break-words mb-10 ml-10">{bankType}</p>
        <div className="border-b-2 border-black border-opacity-50 mb-10"></div>
      </div>
    </div>
  );
}
