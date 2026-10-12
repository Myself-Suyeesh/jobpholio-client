"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Box, BriefcaseBusiness, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import EditDialogComponent from "@/components/profile/EditDialogComponent";
import type { UserProfile } from "@/lib/types/user-details";
import { formatName } from "@/lib/functions/getInitials";

interface ProfileDetailsComponentProps {
  userInfo: UserProfile;
}

const ProfileDetailsComponent = ({
  userInfo,
}: ProfileDetailsComponentProps) => {
  const skills = userInfo?.professional?.skills ?? [];
  return (
    <Card className="rounded-md! w-8/3! h-[calc(100vh-356px)]! flex flex-col">
      <CardContent className="flex flex-col flex-1 min-h-0 gap-4">
        <div className="w-full h-fit flex justify-between">
          <p className=" font-semibold! text-2xl! ">Details</p>
          <EditDialogComponent user={userInfo} />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-4">
            <div className="flex justify-center items-center p-2 rounded-md! bg-blue-50 text-blue-500! ">
              <User size={16} />
            </div>
            <p className="text-primary! font-semibold! text-xl! ">About me</p>
          </div>
          <div className="ml-12 max-w-[90%]">
            {userInfo?.professional?.summary || "NA"}
          </div>
        </div>
        <Separator
          orientation="horizontal"
          className="mx-2 h-0.5 bg-sidebar-border! data-vertical:self-auto"
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-4">
            <div className="flex justify-center items-center p-2 rounded-md! bg-blue-50 text-blue-500! ">
              <Box size={16} />
            </div>
            <p className="text-primary! font-semibold! text-xl! ">Skills</p>
          </div>
          <div className="ml-12 flex flex-wrap gap-5">
            {skills.length > 0 ? (
              skills?.map((item: string) => {
                return (
                  <Badge className="bg-blue-50 py-3! px-4 text-blue-700 text-sm dark:bg-blue-950 dark:text-blue-300 rounded-md!">
                    {item}
                  </Badge>
                );
              })
            ) : (
              <p>NA</p>
            )}
          </div>
        </div>
        <Separator
          orientation="horizontal"
          className="mx-2 h-0.5 bg-sidebar-border! data-vertical:self-auto"
        />
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-4">
            <div className="flex justify-center items-center p-2 rounded-md! bg-blue-50 text-blue-500! ">
              <BriefcaseBusiness size={16} />
            </div>
            <p className="text-primary! font-semibold! text-xl! ">
              Job preferences
            </p>
          </div>
          <div className="ml-12 flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <p>Preferred Roles: </p>
              {userInfo?.jobPreferences?.roles.length > 0 ? (
                userInfo?.jobPreferences?.roles.map((item: string, index) => {
                  return (
                    <p className="text-sm" key={item}>
                      {item}
                      {index < userInfo?.jobPreferences?.roles.length - 1 && (
                        <span>, </span>
                      )}
                    </p>
                  );
                })
              ) : (
                <p>NA</p>
              )}
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Preferred Locations: </p>
              {userInfo?.jobPreferences?.locations.length > 0 ? (
                userInfo?.jobPreferences?.locations.map(
                  (item: string, index) => {
                    return (
                      <p className="text-sm" key={item}>
                        {item}
                        {index <
                          userInfo?.jobPreferences?.locations.length - 1 && (
                          <span>, </span>
                        )}
                      </p>
                    );
                  },
                )
              ) : (
                <p>NA</p>
              )}
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Work Types: </p>
              {userInfo?.jobPreferences?.workTypes.length > 0 ? (
                userInfo?.jobPreferences?.workTypes.map(
                  (item: string, index) => {
                    return (
                      <p className="text-sm" key={item}>
                        {formatName(item)}
                        {index <
                          userInfo?.jobPreferences?.workTypes.length - 1 && (
                          <span>, </span>
                        )}
                      </p>
                    );
                  },
                )
              ) : (
                <p>NA</p>
              )}
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Industries: </p>
              {userInfo?.jobPreferences?.industries.length > 0 ? (
                userInfo?.jobPreferences?.industries.map(
                  (item: string, index) => {
                    return (
                      <p className="text-sm" key={item}>
                        {item}
                        {index <
                          userInfo?.jobPreferences?.industries.length - 1 && (
                          <span>, </span>
                        )}
                      </p>
                    );
                  },
                )
              ) : (
                <p>NA</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsComponent;
