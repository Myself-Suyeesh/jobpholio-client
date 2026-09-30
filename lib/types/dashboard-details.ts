type DashboardMetrics = {
  totalApplications: number;
  activeApplications: number;
  interviewsScheduled: number;
  onHold: number;
  needsAttentionCount: number;
};

type DashboardData = {
  metrics: DashboardMetrics;
  recentApplications: any[];
  needsAttentionApplications: any[];
  upcomingInterviews: any[];
};
