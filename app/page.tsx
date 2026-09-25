import Link from "next/link";
import { redirect } from "next/navigation";

const Home = () => {
  redirect("/login");

  return (
    <div className="ml-7">
      <div className="text-5xl underline m-7">Home</div>
    </div>
  );
};

export default Home;
