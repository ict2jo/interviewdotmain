function Input({ placeholder, type = "text" }) {
  return (
    <input
      type={type}
      className="w-full h-12 px-2 bg-gray-100 rounded-xl placeholder-gray-600 text-xs"
      placeholder={placeholder}
    />
  );
}

export default Input;
