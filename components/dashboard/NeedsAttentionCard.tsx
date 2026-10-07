import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import emptyAttentionIcon from "@/public/assets/empty-icons/empty-needs-attention.webp";
import { ApplicationListItem } from "@/lib/types/application-details";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CardTableComponent from "./CardTableComponent";

const NeedsAttentionCard = ({ data }: { data: ApplicationListItem[] }) => {
  return (
    <Card className="rounded-md! h-[380px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold text-xl">
              Needs attention
            </CardTitle>
            <CardDescription className="font-medium text-sm text-sidebar-foreground!">
              A few things worth checking
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
                You’re all caught up. If any application needs your attention
                they will appear here.
              </p>
            </div>
          </div>
        ) : (
          <CardTableComponent data={data} type="attention" />
        )}
      </CardContent>
    </Card>
  );
};

export default NeedsAttentionCard;
