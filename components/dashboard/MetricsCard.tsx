import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "../ui/card";

type MetricsCardProps = {
  metrics: DashboardMetrics;
};

const metricLabels: Record<keyof DashboardMetrics, string> = {
  totalApplications: "Total Application",
  activeApplications: "Active",
  onHold: "On Hold",
  interviewsScheduled: "Interviews Scheduled",
  needsAttentionCount: "Needs Attention",
};

const metricOrder: (keyof DashboardMetrics)[] = [
  "totalApplications",
  "activeApplications",
  "onHold",
  "interviewsScheduled",
];
const MetricsCard = ({ metrics }: MetricsCardProps) => {
  console.log(metrics);
  return (
    <div className="grid grid-cols-4 gap-3">
      {metricOrder.map((key) => (
        <div key={key}>
          <Card className="rounded-md! p-4! shadow-md">
            <CardContent className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <p className="text-md font-medium">{metricLabels[key]}</p>
                <p className="text-4xl font-semibold">
                  {metrics[key] < 10 && metrics[key] > 0
                    ? `0${metrics[key]}`
                    : metrics[key]}
                </p>
              </div>
              <div className="flex flex-row gap-1">
                {metrics[key] === 0 ? (
                  <ArrowDownRight size={20} className="text-destructive" />
                ) : (
                  <ArrowUpRight size={20} className="text-emerald-600" />
                )}

                <p className="text-sidebar-foreground!">
                  15% more than last month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default MetricsCard;
