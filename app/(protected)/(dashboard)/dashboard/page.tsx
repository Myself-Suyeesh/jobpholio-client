"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Banner from "@/components/dashboard/Banner";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/functions/apiFetch";
import addApplicationImg from "@/public/assets/illustrations/add-application-illustration.webp";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    getDashboardData();
  }, []);

  async function getDashboardData() {
    const url = process.env.NEXT_PUBLIC_API_URL + "/dashboard";
    const token = localStorage.getItem("accessToken");

    const res = await apiFetch(url, {
      method: "GET",
    });
    if (res.success) {
      res.data?.metrics?.totalApplications
        ? setDashboardData(res.data)
        : setIsDataEmpty(true);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  }

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <>
      {isError ? (
        <div>Something went wrong</div>
      ) : isDataEmpty ? (
        <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-4">
          <p className="text-2xl">Welcome, John! 👋</p>
          <Image
            src={addApplicationImg}
            alt="Add-Appkication-Illustration"
            width={300}
            height={200}
          />
          <div className="w-1/2 flex flex-col justify-center items-center gap-4">
            <p className="text-center font-medium text-4xl">
              Ready to add your first Application?
            </p>
            <span className="w-2/3 text-center font-medium text-sidebar-foreground">
              Add your first application and keep every opportunity, update,
              interview, and next step organized in one place.
            </span>
            <Button className={"p-5!"}>Add Application</Button>
          </div>
        </div>
      ) : (
        <Banner />
      )}
    </>
  );
};

export default Dashboard;
