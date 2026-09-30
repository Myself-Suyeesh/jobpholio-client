"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Banner from "@/components/dashboard/Banner";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/functions/apiFetch";
import addApplicationImg from "@/public/assets/illustrations/add-application-illustration.webp";
import MetricsCard from "@/components/dashboard/MetricsCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import emptyChartIcon from "@/public/assets/empty-icons/empty-charts.webp";
import emptyCalendarIcon from "@/public/assets/empty-icons/empty-calendar.webp";
import addApplicationIllustration from "@/public/assets/empty-icons/add-application.webp";
import emptyActivityIcon from "@/public/assets/empty-icons/empty-activity.webp";
import emptyAttentionIcon from "@/public/assets/empty-icons/empty-needs-attention.webp";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDataEmpty, setIsDataEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  useEffect(() => {
    getDashboardData();
  }, []);

  async function getDashboardData() {
    const url = process.env.NEXT_PUBLIC_API_URL + "/dashboard";

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
        dashboardData && (
          <div className="flex flex-col gap-4">
            <Banner />
            <MetricsCard metrics={dashboardData.metrics} />
            <div
              className="grid
        grid-cols-[minmax(0,1fr)_500px_300px]
        gap-4"
            >
              <Card className="rounded-md! h-[360px] flex flex-col">
                <CardHeader>
                  <CardTitle className="font-semibold text-xl">
                    Application Trends
                  </CardTitle>
                  <CardDescription className="font-medium text-sm text-sidebar-foreground!">
                    Track your applications activity over time.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                  <div className="w-full h-full bg-[url('/assets/empty-icons/blured-chart.webp')] bg-cover bg-center flex flex-col items-center justify-center gap-2">
                    <Image
                      src={emptyChartIcon}
                      alt={"Empty Chart Icon"}
                      width={100}
                      height={100}
                    />
                    <div className="w-2/3 flex flex-col items-center text-center justify-center gap-1">
                      <p className="font-semibold text-xl">Coming soon</p>
                      <p className="font-medium text-sm text-sidebar-foreground!">
                        This feature is on the way. Stay tuned for insights into
                        your application trends.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-md! h-[360px] flex flex-col">
                <CardHeader>
                  <CardTitle className="font-semibold text-xl">
                    Upcoming Interviews
                  </CardTitle>
                  <CardDescription className="font-medium text-sm text-sidebar-foreground!">
                    Your next interviews and important events
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Image
                      src={emptyCalendarIcon}
                      alt={"Empty Calendar Icon"}
                      width={100}
                      height={100}
                    />
                    <div className="w-2/3 flex flex-col items-center text-center justify-center gap-1">
                      <p className="font-semibold text-xl">
                        No interviews scheduled yet
                      </p>
                      <p className="font-medium text-sm text-sidebar-foreground!">
                        When you have interviews, they’ll appear here with date,
                        details and preparation options
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
                      <Button className="w-full! rounded-md!">
                        Add Application
                      </Button>
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
              <Card className="rounded-md! h-[380px] flex flex-col">
                <CardHeader>
                  <CardTitle className="font-semibold text-xl">
                    Recent activity
                  </CardTitle>
                  <CardDescription className="font-medium text-sm text-sidebar-foreground!">
                    Your latest application updates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Image
                      src={emptyActivityIcon}
                      alt={"Empty Activity Icon"}
                      width={100}
                      height={100}
                    />
                    <div className="w-2/3 flex flex-col items-center text-center justify-center gap-1">
                      <p className="font-semibold text-xl">
                        No recent activity yet
                      </p>
                      <p className="font-medium text-sm text-sidebar-foreground!">
                        We’ll show application updates, status changes, and
                        other activity here.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="rounded-md! h-[380px] flex flex-col">
                <CardHeader>
                  <CardTitle className="font-semibold text-xl">
                    Needs attention
                  </CardTitle>
                  <CardDescription className="font-medium text-sm text-sidebar-foreground!">
                    A few things worth checking
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 min-h-0">
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <Image
                      src={emptyAttentionIcon}
                      alt={"Empty Attention Icon"}
                      width={100}
                      height={100}
                    />
                    <div className="w-2/3 flex flex-col items-center text-center justify-center gap-1">
                      <p className="font-semibold text-xl">
                        Nothing needs your attention
                      </p>
                      <p className="font-medium text-sm text-sidebar-foreground!">
                        You’re all caught up. If any application needs your
                        attention they will appear here.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Dashboard;
