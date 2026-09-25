import Image from "next/image";
import jobPholioLogo from "@/public/logos/jobpholio-light-logo.webp";
import LoginForm from "@/components/forms/LoginForm";

const Login = () => {
  return (
    <div className="h-screen ">
      <div className="flex justify-center items-center my-auto h-screen">
        <div className="flex flex-col gap-6 w-1/3 min-w-109.25 py-6 px-11">
          <div className="flex flex-col gap-7">
            <Image src={jobPholioLogo} alt={""} width={128} height={33} />
            <div className="flex flex-col gap-2">
              <h2 className="font-semibold leading-8">Good to see you again</h2>
              <p>Enter email and password to continue.</p>
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
