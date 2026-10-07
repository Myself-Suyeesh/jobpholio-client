import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import emptyChartIcon from "@/public/assets/empty-icons/empty-charts.webp";

const ApplicationTrendsCard = () => {
  return (
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
              This feature is on the way. Stay tuned for insights into your
              application trends.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationTrendsCard;
