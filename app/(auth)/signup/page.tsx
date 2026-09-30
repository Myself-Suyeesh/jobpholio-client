import SignupForm from "@/components/forms/SignupForm";

import Image from "next/image";
import jobPholioLogo from "@/public/logos/jobpholio-light-logo.webp";
import supportImage from "@/public/assets/images/login-page-img.webp";

const Signup = () => {
  return (
    <div className="h-screen ">
      <div className="flex justify-center items-center my-auto h-screen">
        <div className="w-2/4 h-full flex flex-col justify-center items-center">
          <div className="flex flex-col gap-6 w-2/3 min-w-109.25 py-6 px-11">
            <div className="flex flex-col gap-7">
              <Image src={jobPholioLogo} alt={""} width={128} height={33} />
              <div className="flex flex-col gap-2">
                <h2 className="font-semibold leading-8">Let’s get started</h2>
                <p>Create your account in just a few steps.</p>
              </div>
            </div>
            <SignupForm />
          </div>
        </div>
        <div className="h-screen w-2/4 flex justify-center">
          <Image
            src={supportImage}
            alt="Login Support Image"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
