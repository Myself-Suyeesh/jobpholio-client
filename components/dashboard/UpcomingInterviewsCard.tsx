import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import emptyCalendarIcon from "@/public/assets/empty-icons/empty-calendar.webp";

const UpcomingInterviewsCard = () => {
  return (
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
            <p className="font-semibold text-xl">No interviews scheduled yet</p>
            <p className="font-medium text-sm text-sidebar-foreground!">
              When you have interviews, they’ll appear here with date, details
              and preparation options
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingInterviewsCard;
