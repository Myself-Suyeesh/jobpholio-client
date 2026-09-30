export type EmploymentType =
  | "full_time"
  | "part_time"
  | "contract"
  | "internship";
export type ApplicationStatus =
  | "applied"
  | "on_hold"
  | "interview"
  | "offer"
  | "rejected";
export type ApplicationSource =
  | "linkedin"
  | "naukri"
  | "indeed"
  | "company_site"
  | "manual"
  | "other";

export type ApplicationListItem = {
  id: string;
  company: CompanyDetails;
  job: JobDetails;
  source: ApplicationSource;
  dateApplied: Date;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CompanyDetails = {
  name: string;
  website?: string;
};
export type JobDetails = {
  title: string;
  location?: string;
  employmentType?: EmploymentType;
  jobUrl?: string;
  salary?: {
    min?: number;
    max?: number;
    currency?: string;
  };
};

export type ApplicationsData = {
  data: ApplicationListItem[];
  meta: MetaData;
};

export type MetaData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
