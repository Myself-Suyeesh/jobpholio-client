"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Banner from "@/components/dashboard/Banner";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/functions/apiFetch";
import addApplicationImg from "@/public/assets/illustrations/add-application-illustration.webp";
import MetricsCard from "@/components/dashboard/MetricsCard";
import { Card, CardContent } from "@/components/ui/card";
import addApplicationIllustration from "@/public/assets/empty-icons/add-application.webp";
import LottieLoader from "@/components/LottieLoader";
import AddApplicationDialog from "@/components/applications/AddApplicationDialog";
import ApplicationTrendsCard from "@/components/dashboard/ApplicationTrendsCard";
import UpcomingInterviewsCard from "@/components/dashboard/UpcomingInterviewsCard";
import RecentActivityCard from "@/components/dashboard/RecentActivityCard";
import NeedsAttentionCard from "@/components/dashboard/NeedsAttentionCard";
import { useUser } from "@/hooks/useUser";
import { DashboardData } from "@/lib/types/dashboard-details";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );
  const { userInfo } = useUser();

  useEffect(() => {
    getDashboardData();
  }, []);

  async function getDashboardData() {
    const url = "/dashboard";

    const res = await apiFetch(url, {
      method: "GET",
      credentials: "include",
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
    <LottieLoader />
  ) : (
    <>
      {isError ? (
        <div>Something went wrong</div>
      ) : isDataEmpty ? (
        <div className="h-[calc(100vh-100px)] flex flex-col items-center justify-center gap-4">
          <p className="text-2xl">Welcome, {userInfo.identity.name}! 👋</p>
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
        dashboardData && (
          <div className="flex flex-col gap-4">
            <Banner user={userInfo?.identity?.name} />
            <MetricsCard metrics={dashboardData.metrics} />
            <div
              className="grid
        grid-cols-[minmax(0,1fr)_500px_300px]
        gap-4"
            >
              <ApplicationTrendsCard />
              <UpcomingInterviewsCard />

              <Card className="rounded-md! h-[360px] flex flex-col">
                <CardContent className="flex-1 min-h-0">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Image
                      src={addApplicationIllustration}
                      alt={"Empty Application Illustration"}
                      width={200}
                      height={200}
                    />
                    <div className="w-full flex flex-col justify-center gap-1">
                      <p className="font-semibold text-xl">Keep going</p>
                      <p className="font-medium text-sm text-sidebar-foreground!">
                        You’ve added 1 application so far. <br />
                        Track more to get better insights.
                      </p>
                    </div>
                    <div className="w-full flex flex-col justify-center gap-2">
                      <AddApplicationDialog
                        onApplicationAdded={getDashboardData}
                      />
                      <p className="font-semibold text-sm text-sidebar-foreground!">
                        Connecting to more sources is <br /> coming soon.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div
              className="grid
        grid-cols-[minmax(0,1fr)_650px]
        gap-4"
            >
              <RecentActivityCard data={dashboardData.recentActivity} />
              <NeedsAttentionCard
                data={dashboardData.needsAttentionApplications}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Dashboard;
