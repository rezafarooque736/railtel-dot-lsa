const AuthLayout = ({ children }) => {
  return (
    <section className="grid w-full h-full place-content-center">
      <div className="p-8 border rounded-md bg-slate-100 border-slate-300 w-96">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
