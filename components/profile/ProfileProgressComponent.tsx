"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2Icon, Circle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
const ProfileProgressComponent = () => {
  return (
    <Card className=" flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="font-semibold text-xl">
            Progress completion
          </CardTitle>
          <CardDescription className="font-medium text-sm text-sidebar-foreground!">
            85%
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <Progress value={85} />
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <CheckCircle2Icon
              fill="#1D862C"
              color="white"
              size={24}
              nonScalingStroke
              strokeWidth={1.5}
            />

            <p className="text-muted-foreground!">Personal Information</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CheckCircle2Icon
              fill="#1D862C"
              color="white"
              size={24}
              nonScalingStroke
              strokeWidth={1.5}
            />

            <p className="text-muted-foreground!">Professional details</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <CheckCircle2Icon
              fill="#1D862C"
              color="white"
              size={24}
              nonScalingStroke
              strokeWidth={1.5}
            />

            <p className="text-muted-foreground!">Job preferences</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Circle
              fill="white"
              size={24}
              nonScalingStroke
              strokeWidth={1.5}
              className="text-sidebar-foreground"
            />

            <p className="text-muted-foreground!">Add atleast one document</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileProgressComponent;
