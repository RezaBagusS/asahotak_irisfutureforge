import Image from "next/image";
import AOlogo from "./assets/AsahOtak.webp";
import FormLogin from "@/app/components/molecules/formLogin";

async function Login() {

  return (
    <div className="cust-outer-container w-full flex h-screen">
      <div className="relative hidden lg:w-7/12 bg-custPrimary lg:flex justify-center items-center">
        <Image src={AOlogo} alt="AOLogo" height={120} />
      </div>
      <FormLogin />
    </div>
  );
}

export default Login;
