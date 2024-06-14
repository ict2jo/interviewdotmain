function Form({ children, action, width }) {
  return (
    <form
      className={`bg-white rounded-2xl ${width} p-8 m-auto min-w-[420px]`}
      action={action}
    >
      {children}
    </form>
  );
}

export default Form;
