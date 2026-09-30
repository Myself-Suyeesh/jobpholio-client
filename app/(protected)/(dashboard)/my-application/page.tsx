"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ApplicationParentComponent from "@/components/applications/ApplicationTableContainer";

const MyApplication = () => {
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-100px)] overflow-y-hidden">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-primary! text-4xl font-semibold">
            My Applications
          </p>
          <p className="text-md text-sidebar-foreground! font-medium">
            All your job applications, organized in one place.
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <Button
            variant="outline"
            disabled
            className="p-5! border! border-border!"
          >
            Export
          </Button>
          <Button className={"p-5!"}>Add Application</Button>
        </div>
      </div>
      <ApplicationParentComponent />
    </div>
  );
};

export default MyApplication;
