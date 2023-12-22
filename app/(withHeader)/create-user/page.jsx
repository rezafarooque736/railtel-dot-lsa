import SignUpForm from "@/components/auth-components/signup-form";

const page = () => {
  return (
    <div className="p-4 px-8 mt-10 overflow-y-auto border rounded-md bg-slate-100 border-slate-300 w-96">
      <SignUpForm />
    </div>
  );
};

export default page;
