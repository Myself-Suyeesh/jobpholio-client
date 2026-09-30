import React from "react";
import { ApplicationListItem } from "@/lib/types/application-details";
import { Button } from "../ui/button";
import { Briefcase, ExternalLink, MapPin, X } from "lucide-react";
import CompanyAvatar from "./CompanyAvatar";
import Link from "next/link";

const ApplicationDetailsComponent = ({
  applicationSelected,
  handleClose,
}: {
  applicationSelected: ApplicationListItem | null;
  handleClose: () => void;
}) => {
  return (
    <div className="h-full border border-sidebar-border bg-white p-4 flex flex-col gap-5">
      {!applicationSelected ? (
        <div className="h-full flex items-center justify-center">
          No Application Selected yet.
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CompanyAvatar
                companyName={applicationSelected?.company.name}
                domain={applicationSelected?.company.website}
              />
              <div>
                <p className="text-xl font-semibold text-primary">
                  {applicationSelected?.company?.name}
                </p>
                <Link
                  href={applicationSelected?.company?.website || "#"}
                  target="none"
                  className="flex items-center gap-2 text-primary-600! font-medium"
                >
                  <p className="text-sm">
                    {applicationSelected?.company?.website}
                  </p>
                  <ExternalLink className="" size={12} />
                </Link>
              </div>
            </div>
            {/* // TODO: re-enable if we allow closing the details panel */}
            {/* <Button variant={"ghost"} onClick={() => handleClose()}>
              <X />
            </Button> */}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-2xl font-medium">
              {applicationSelected?.job.title}
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-sidebar-foreground!">
                <MapPin size={14} />
                <p className="text-sm font-medium">
                  {applicationSelected?.job.location}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sidebar-foreground!">
                <Briefcase size={14} />
                <p className="text-sm font-medium">
                  {applicationSelected?.job.employmentType
                    ?.replace("_", " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase())}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationDetailsComponent;
