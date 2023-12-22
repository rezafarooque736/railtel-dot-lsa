import Header from "@/components/header";

const WithHeaderLyout = ({ children }) => {
  return (
    <section className="flex flex-col items-center w-full h-full">
      <Header />
      <div className="mt-20">{children}</div>
    </section>
  );
};

export default WithHeaderLyout;
