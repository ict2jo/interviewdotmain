function Button({ children, type }) {
  const base = "font-bold hover:opacity-50";

  const styles = {
    outline:
      base +
      " border-2 border-solid border-primary-500 text-black py-2 w-16 h-10 rounded-full",
    smBlue: base + " bg-primary-500 text-white py-2 w-16 h-10 rounded-full",
    longBlue: base + " bg-primary-500 text-white py-2 w-full h-10 rounded-full",
    mdBlue: base + " bg-primary-500 rounded-3xl px-[3rem] py-3 text-white",
    longWhite:
      base +
      " bg-white text-black py-2 px-4 w-full h-10 rounded-full border border-black",
    smGray:
      base +
      " bg-gray-400 text-gray-700 py-2 px-2 rounded-xl w-14 h-8 text-[10px] absolute right-5 top-2 font-bold hover:opacity-90",
  };

  return <button className={styles[type]}>{children}</button>;
}

export default Button;
