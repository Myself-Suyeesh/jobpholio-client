export type WorkType = "remote" | "hybrid" | "onsite";

export type IdentityType = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export type ProfileType = {
  phone?: string;
  location?: string;
  timezone?: string;
  bio?: string;
};

export type ProfessionalType = {
  headline?: string;
  yearsOfExperience?: number;
  skills?: string[];
  summary?: string;
};

export type JobPreferencesType = {
  roles?: string[];
  locations?: string[];
  workTypes?: WorkType[];
  industries?: string[];
  weeklyApplicationGoal?: number;
};

export type UserProfile = {
  id: string;
  identity: IdentityType;
  profile?: ProfileType;
  professional?: ProfessionalType;
  jobPreferences?: JobPreferencesType;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
};

export interface UpdateProfileRequest {
  identity?: Omit<IdentityType, "email">;
  profile?: Partial<ProfileType>;
  professional?: Partial<ProfessionalType>;
  jobPreferences?: Partial<JobPreferencesType>;
}
