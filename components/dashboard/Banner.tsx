import React from "react";

const Banner = () => {
  return (
    <div className="bg-[url('/assets/dashboard-banner-background.png')] bg-cover bg-center flex flex-col gap-1 text-center text-white! bg-blue-300 p-5 rounded">
      <p className="font-light text-sm">GOOD TO SEE YOU AGAIN</p>
      <p className="text-4xl ">Welcome back, John</p>
      <p className="text-sm">
        Your job search is moving forward. Here’s the latest
      </p>
    </div>
  );
};

export default Banner;
