"use client";
import React from "react";
import { Lottie } from "lottie-react";
import animationData from "@/public/lottie/lurkingCat.json";

const LottieLoader = () => {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center">
      <div style={{ width: 300, height: 300 }}>
        <Lottie src={animationData} loop={true} autoplay={true} />
      </div>
      <p className="w-full text-2xl! font-semibold text-center!">Loading...</p>
    </div>
  );
};

export default LottieLoader;
