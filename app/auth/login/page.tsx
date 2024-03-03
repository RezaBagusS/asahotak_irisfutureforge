import Image from "next/image";
import AOlogo from "../../assets/AO.png";
import bottomLogo from "../../assets/buttomLogo.png";
import FormLogin from "@/app/components/molecules/formLogin";

async function Login() {

  return (
    <div className="cust-outer-container w-full flex h-screen">
      <div className="relative hidden lg:w-7/12 bg-custPrimary lg:flex justify-center items-center">
        <Image src={AOlogo} alt="AOLogo" height={120} />
        <div className="flex flex-col items-center gap-3 absolute bottom-7">
          <h3 className="text-custWhite">Supported By:</h3>
          <Image src={bottomLogo} alt="bottomLogo" height={40} />
        </div>
      </div>
      <FormLogin />
    </div>
  );
}

export default Login;
