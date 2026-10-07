import { ApplicationListItem } from "./application-details";

export type DashboardMetrics = {
  totalApplications: number;
  activeApplications: number;
  interviewsScheduled: number;
  onHold: number;
  needsAttentionCount: number;
};

export type DashboardData = {
  metrics: DashboardMetrics;
  recentActivity: ApplicationListItem[];
  needsAttentionApplications: ApplicationListItem[];
  upcomingInterviews: any[];
};
