"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Edit } from "lucide-react";
import { AvatarUpload } from "../AvatarUpload";
import { MultiSelectCombobox } from "@/components/MultiSelectCombobox";
import type { FileWithPreview } from "@/hooks/use-file-upload";

import type {
  UserProfile,
  UpdateProfileRequest,
  WorkType,
} from "@/lib/types/user-details";
import { apiFetch } from "@/lib/functions/apiFetch";
import { useUser } from "@/hooks/useUser";

const BIO_LIMIT = 160;
const SUMMARY_LIMIT = 500;

const skillOptions = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "Node.js",
  "Express",
  "MongoDB",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "REST APIs",
  "Git",
  "Figma",
];

const roleOptions = [
  "Frontend Developer",
  "React Developer",
  "UI Engineer",
  "Full Stack Developer",
  "Software Engineer",
  "UI/UX Designer",
];

const locationOptions = [
  "Remote",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Mumbai",
  "Pune",
  "Delhi",
];

const workTypeOptions: WorkType[] = ["remote", "hybrid", "onsite"];

const industryOptions = [
  "SaaS",
  "Fintech",
  "Developer Tools",
  "E-commerce",
  "Healthcare",
  "EdTech",
  "Enterprise Software",
];

interface EditDialogComponentProps {
  user: UserProfile;
}

const EditDialogComponent = ({ user }: EditDialogComponentProps) => {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(user.identity.name);
  const [bio, setBio] = useState(user.profile?.bio ?? "");
  const [headline, setHeadline] = useState(user.professional?.headline ?? "");
  const [location, setLocation] = useState(user.profile?.location ?? "");
  const [phone, setPhone] = useState(user.profile?.phone ?? "");
  const [summary, setSummary] = useState(user.professional?.summary ?? "");

  const [skills, setSkills] = useState<string[]>(
    user.professional?.skills ?? [],
  );
  const [roles, setRoles] = useState<string[]>(user.jobPreferences.roles ?? []);
  const [locations, setLocations] = useState<string[]>(
    user.jobPreferences.locations ?? [],
  );
  const [workTypes, setWorkTypes] = useState<WorkType[]>(
    user.jobPreferences.workTypes ?? [],
  );
  const [industries, setIndustries] = useState<string[]>(
    user.jobPreferences.industries ?? [],
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setUserInfo } = useUser();

  // Load the latest parent profile whenever the dialog opens.
  useEffect(() => {
    if (!dialogOpen) return;

    setName(user.identity.name);
    setBio(user.profile?.bio ?? "");
    setHeadline(user.professional?.headline ?? "");
    setLocation(user.profile?.location ?? "");
    setPhone(user.profile?.phone ?? "");
    setSummary(user.professional?.summary ?? "");

    setSkills(user.professional?.skills ?? []);
    setRoles(user.jobPreferences.roles ?? []);
    setLocations(user.jobPreferences.locations ?? []);
    setWorkTypes(user.jobPreferences.workTypes ?? []);
    setIndustries(user.jobPreferences.industries ?? []);

    setError("");
  }, [dialogOpen, user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    const payload: UpdateProfileRequest = {
      identity: {
        name: name.trim(),
      },
      profile: {
        bio,
        location: location.trim(),
        phone: phone.trim(),
      },
      professional: {
        headline: headline.trim(),
        skills,
        summary,
      },
      jobPreferences: {
        roles,
        locations,
        workTypes,
        industries,
      },
    };

    try {
      const formData = new FormData();

      // These field names must match parseProfileMultipart.
      if (payload.identity) {
        formData.append("identity", JSON.stringify(payload.identity));
      }

      if (payload.profile) {
        formData.append("profile", JSON.stringify(payload.profile));
      }

      if (payload.professional) {
        formData.append("professional", JSON.stringify(payload.professional));
      }

      if (payload.jobPreferences) {
        formData.append(
          "jobPreferences",
          JSON.stringify(payload.jobPreferences),
        );
      }

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const result = await apiFetch("/profile", {
        method: "PATCH",
        body: formData,
      });

      if (!result.success) {
        throw new Error(
          typeof result.error === "string"
            ? result.error
            : "Failed to update your profile.",
        );
      }

      setUserInfo(result.data.user as UserProfile);
      setAvatarFile(null);
      setDialogOpen(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDialogChange = (isOpen: boolean) => {
    setDialogOpen(isOpen);
  };

  const handleAvatarChange = useCallback((item: FileWithPreview | null) => {
    setAvatarFile(item?.file instanceof File ? item.file : null);
  }, []);

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="flex flex-row gap-1 border! border-sidebar-border! bg-white! text-sm! text-primary!"
          >
            <Edit size={16} />
            Edit profile
          </Button>
        }
      />

      <DialogContent className="min-w-1/2! p-0 sm:max-w-3xl">
        <DialogHeader className="border-b! border-sidebar-border! p-5!">
          <DialogTitle className="text-2xl! font-semibold!">
            Edit profile
          </DialogTitle>
          <DialogDescription className="w-5/6 text-sm! text-sidebar-foreground!">
            Update your profile and job preferences. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
            <FieldGroup>
              <AvatarUpload
                defaultAvatar={user.identity.avatarUrl}
                onFileChange={handleAvatarChange}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <Field>
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      minLength={2}
                      required
                      className="h-10"
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(event) =>
                        setBio(event.target.value.slice(0, BIO_LIMIT))
                      }
                      maxLength={BIO_LIMIT}
                      className="h-24 max-h-24 resize-none"
                      placeholder="Write a short introduction..."
                    />
                    <p className="text-right text-xs text-muted-foreground">
                      {bio.length}/{BIO_LIMIT}
                    </p>
                  </Field>
                  <Field>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="h-10"
                      placeholder="+91 9876543210"
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="location">Current location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(event) => setLocation(event.target.value)}
                      className="h-10"
                      placeholder="Bangalore, India"
                    />
                  </Field>
                  <Field>
                    <Label>Preferred roles</Label>
                    <MultiSelectCombobox
                      options={roleOptions}
                      value={roles}
                      onChange={setRoles}
                      placeholder="Select preferred roles..."
                    />
                  </Field>
                  <Field>
                    <Label>Work type</Label>
                    <MultiSelectCombobox
                      options={workTypeOptions}
                      value={workTypes}
                      onChange={(values) => setWorkTypes(values as WorkType[])}
                      placeholder="Select work types..."
                    />
                  </Field>
                </div>

                <div className="flex flex-col gap-4">
                  <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user.identity.email}
                      readOnly
                      className="h-10 cursor-not-allowed"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="summary">About Me</Label>
                    <Textarea
                      id="summary"
                      value={summary}
                      onChange={(event) =>
                        setSummary(event.target.value.slice(0, SUMMARY_LIMIT))
                      }
                      maxLength={SUMMARY_LIMIT}
                      className="h-24 max-h-24 resize-none"
                      placeholder="Describe your professional experience..."
                    />
                    <p className="text-right text-xs text-muted-foreground">
                      {summary.length}/{SUMMARY_LIMIT}
                    </p>
                  </Field>
                  <Field>
                    <Label htmlFor="headline">Role / Headline</Label>
                    <Input
                      id="headline"
                      value={headline}
                      onChange={(event) => setHeadline(event.target.value)}
                      className="h-10"
                      placeholder="Frontend Developer"
                    />
                  </Field>
                  <Field>
                    <Label>Skills</Label>
                    <MultiSelectCombobox
                      options={skillOptions}
                      value={skills}
                      onChange={setSkills}
                      placeholder="Select skills..."
                    />
                  </Field>

                  <Field>
                    <Label>Preferred locations</Label>
                    <MultiSelectCombobox
                      options={locationOptions}
                      value={locations}
                      onChange={setLocations}
                      placeholder="Select locations..."
                    />
                  </Field>

                  <Field>
                    <Label>Industries</Label>
                    <MultiSelectCombobox
                      options={industryOptions}
                      value={industries}
                      onChange={setIndustries}
                      placeholder="Select industries..."
                    />
                  </Field>
                </div>
              </div>

              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
            </FieldGroup>
          </div>

          <DialogFooter className="border-t! border-sidebar-border! p-5!">
            <Button
              type="button"
              variant="outline"
              disabled={saving}
              onClick={() => setDialogOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogComponent;
