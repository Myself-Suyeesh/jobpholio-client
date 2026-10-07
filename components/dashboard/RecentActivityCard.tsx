import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import emptyActivityIcon from "@/public/assets/empty-icons/empty-activity.webp";
import { ApplicationListItem } from "@/lib/types/application-details";
import CardTableComponent from "./CardTableComponent";
import Link from "next/link";
import { ArrowRight, ArrowRightIcon } from "lucide-react";

const RecentActivityCard = ({ data }: { data: ApplicationListItem[] }) => {
  return (
    <Card className="rounded-md! h-[380px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold text-xl">
              Recent activity
            </CardTitle>
            <CardDescription className="font-medium text-sm text-sidebar-foreground!">
              Your latest application updates.
            </CardDescription>
          </div>
          {data.length > 0 && (
            <Link
              href={"/my-application"}
              className="flex items-center gap-2 text-primary-600!"
            >
              View all applications{" "}
              <span>
                <ArrowRight size={16} />
              </span>
            </Link>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        {!data.length ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Image
              src={emptyActivityIcon}
              alt={"Empty Activity Icon"}
              width={100}
              height={100}
            />
            <div className="w-2/3 flex flex-col items-center text-center justify-center gap-1">
              <p className="font-semibold text-xl">No recent activity yet</p>
              <p className="font-medium text-sm text-sidebar-foreground!">
                We’ll show application updates, status changes, and other
                activity here.
              </p>
            </div>
          </div>
        ) : (
          <CardTableComponent data={data} type="recentactivity" />
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
