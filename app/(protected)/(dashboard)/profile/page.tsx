"use client";
import { useState } from "react";
import type { UserProfile } from "@/lib/types/user-details";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Box,
  BriefcaseBusiness,
  Camera,
  CheckCircle2Icon,
  Circle,
  Edit,
  Link2,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { formatName, getInitials } from "@/lib/functions/getInitials";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import EditDialogComponent from "@/components/profile/EditDialogComponent";
import ProfileDetailsComponent from "@/components/profile/ProfileDetailsComponent";

const ProfilePage = () => {
  const { userInfo } = useUser();

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[url('/assets/banners/profile-banner.webp')] bg-cover bg-center flex flex-col gap-1 text-primary! p-5 rounded">
        <div className="w-full h-fit flex justify-end">
          <Button
            className={
              "bg-white! text-foreground! shadow-md! flex flex-row gap-1 text-sm! cursor-default!"
            }
          >
            <BadgeCheck type="fill" size={16} />
            Badge
          </Button>
        </div>
        <div className="flex flex-row gap-8 ">
          <div className="relative shrink-0">
            <Avatar className="h-40 w-40 border-[5px] border-white shadow-md after:border-none!">
              <AvatarImage
                src={userInfo.identity.avatarUrl}
                alt="Profile Image"
              />
              <AvatarFallback className="bg-blue-50 text-3xl border-none! font-semibold text-primary!">
                {getInitials(userInfo.identity.name)}
              </AvatarFallback>
            </Avatar>
            {/* <button
              type="button"
              className="absolute bottom-5 right-2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-white text-primary-600 shadow-sm transition hover:bg-blue-50"
            >
              <Camera className="h-4 w-4" />
            </button> */}
          </div>
          <div className="flex flex-col gap-2 max-w-1/2">
            <p className="text-4xl font-semibold!">
              {formatName(userInfo.identity.name) || "NA"}
            </p>
            <p className="text-lg font-medium">
              {userInfo?.professional?.headline || "Frontend Developer"}
            </p>
            <p className="text-sm font-medium max-w-5/6">
              {userInfo?.profile?.bio || "NA"}
            </p>
            <div className="flex flex-row justify-between max-w-5/6 mt-4">
              <div className="flex flex-row items-center gap-2">
                <MapPin size={16} />
                <p className="text-sm font-medium">
                  {userInfo?.profile?.location || "NA"}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Mail size={16} />
                <p className="text-sm font-medium">
                  {userInfo.identity.email || "NA"}
                </p>
              </div>
              <div className="flex flex-row items-center gap-2">
                <Phone size={16} />
                <p className="text-sm font-medium">
                  {userInfo?.profile?.phone || "NA"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <ProfileDetailsComponent userInfo={userInfo} />
        <div className="rounded-md! w-full! h-fit! flex flex-col gap-4">
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

                  <p className="text-muted-foreground!">
                    Add atleast one document
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* <Card className=" flex flex-col">
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
                    size={28}
                    nonScalingStroke
                    strokeWidth={1.5}
                  />

                  <p className="text-muted-foreground!">Personal Information</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
                    size={28}
                    nonScalingStroke
                    strokeWidth={1.5}
                  />

                  <p className="text-muted-foreground!">Personal Information</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <CheckCircle2Icon
                    fill="#1D862C"
                    color="white"
                    size={28}
                    nonScalingStroke
                    strokeWidth={1.5}
                  />

                  <p className="text-muted-foreground!">Professional details</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <CheckCircle2Icon
                    fill="#1D862C"
                    color="white"
                    size={28}
                    nonScalingStroke
                    strokeWidth={1.5}
                  />

                  <p className="text-muted-foreground!">Job preferences</p>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <CheckCircle2Icon
                    fill="#1D862C"
                    color="white"
                    size={28}
                    nonScalingStroke
                    strokeWidth={1.5}
                  />

                  <p className="text-muted-foreground!">
                    Add atleast one document
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};
{
  /* <AvatarUpload /> */
}

export default ProfilePage;
