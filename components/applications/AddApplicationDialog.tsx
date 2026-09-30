import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BriefcaseBusiness,
  BuildingComplex,
  FileText,
  SquarePlus,
} from "lucide-react";

const AddApplicationDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button variant="default" className={"p-5! w-full"}>
              <SquarePlus size={16} />
              Add Application
            </Button>
          }
        />
        <DialogContent
          className="sm:max-w-sm min-w-1/2 p-0"
          showCloseButton={false}
        >
          <DialogHeader className="p-5! border-b! border-sidebar-border!">
            <DialogTitle className={"font-semibold! text-2xl!"}>
              Application details
            </DialogTitle>
            <DialogDescription className={"text-sm! text-sidebar-foreground!"}>
              Track a job application and keep your progress organised.
            </DialogDescription>
          </DialogHeader>
          <div className="px-5! max-h-[70vh] overflow-y-auto">
            <FieldGroup>
              <div className="flex flex-col gap-4 pb-5 border-b! border-sidebar-border!">
                <div className="flex flex-row items-center gap-6">
                  <div className="p-3 bg-gray-50 rounded-md! border! border-sidebar-border!">
                    <BuildingComplex size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg!">
                      Company information
                    </p>
                    <p className="text-sm text-sidebar-foreground!">
                      Let us know which company you applied to.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Field>
                    <Label htmlFor="company-name">
                      Company Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="company-name"
                      name="company-name"
                      className="h-10"
                      placeholder="e.g. Google, Microsoft"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="company-website">
                      Company website{" "}
                      <span className="text-sidebar-foreground!">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="company-website"
                      name="company-website"
                      className="h-10"
                      placeholder="e.g. https://company.com"
                    />
                  </Field>
                </div>
              </div>
              <div className="flex flex-col gap-4 pb-5 border-b! border-sidebar-border!">
                <div className="flex flex-row items-center gap-6">
                  <div className="p-3 bg-gray-50 rounded-md! border! border-sidebar-border!">
                    <BriefcaseBusiness size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg!">Job details</p>
                    <p className="text-sm text-sidebar-foreground!">
                      Tell us about the role and where it’s located.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Field>
                    <Label htmlFor="role">
                      Job title / Role{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="role"
                      name="role"
                      className="h-10"
                      placeholder="e.g. Product Designer"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="employment-type">
                      Employment type{" "}
                      <span className="text-sidebar-foreground!">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="employment-type"
                      name="employment-type"
                      className="h-10"
                      placeholder="e.g. Full-time, Part-time"
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Field>
                    <Label htmlFor="location">
                      Location{" "}
                      <span className="text-sidebar-foreground!">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      className="h-10"
                      placeholder="e.g. San Francisco, CA"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="salary">
                      Salary{" "}
                      <span className="text-sidebar-foreground!">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="salary"
                      name="salary"
                      className="h-10"
                      placeholder="Min-Max-Curr"
                    />
                  </Field>
                </div>
              </div>
              <div className="flex flex-col gap-4 pb-5 ">
                <div className="flex flex-row items-center gap-6">
                  <div className="p-3 bg-gray-50 rounded-md! border! border-sidebar-border!">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-lg!">
                      Application details
                    </p>
                    <p className="text-sm text-sidebar-foreground!">
                      Track the status, source and link to the job posting.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Field>
                    <Label htmlFor="application-date">
                      Application date{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="application-date"
                      name="application-date"
                      className="h-10"
                      placeholder="e.g. Sep 25, 2026"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="application-status">
                      Application status{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="application-status"
                      name="application-status"
                      className="h-10"
                      placeholder="e.g. Applied, Interviewing"
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Field>
                    <Label htmlFor="source">
                      Source <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="source"
                      name="source"
                      className="h-10"
                      placeholder="e.g. LinkedIn, Indeed"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="job-link">
                      Job link{" "}
                      <span className="text-sidebar-foreground!">
                        (optional)
                      </span>
                    </Label>
                    <Input
                      id="job-link"
                      name="job-link"
                      className="h-10"
                      placeholder="e.g. https://careers.google.com"
                    />
                  </Field>
                </div>
              </div>
            </FieldGroup>
          </div>
          <DialogFooter className="p-5! border-t! border-sidebar-border!">
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddApplicationDialog;
