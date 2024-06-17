function CheckBox({ key, value, checked, onChange, children }) {
  return (
    <div className="flex flex-col items-center gap-3" onClick={onChange}>
      <div
        key={key}
        className={`border-2 rounded-full w-8 h-8 flex justify-center items-center ${
          checked ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <div
          className={`rounded-full ${
            checked ? "bg-blue-500" : "bg-gray-500"
          } w-3 h-3`}
        ></div>
      </div>
      <span className="text-sm whitespace-nowrap">{children}</span>
    </div>
  );
}

export default CheckBox;
