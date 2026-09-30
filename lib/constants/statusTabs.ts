export const StatusTabs = [
  {
    label: "All",
    value: "all",
    styling: "",
  },
  {
    label: "Applied",
    value: "applied",
    styling: "",
  },
  {
    label: "On Hold",
    value: "on_hold",
    styling: "",
  },
  {
    label: "Interview",
    value: "interview",
    styling: "",
  },
  {
    label: "Offer",
    value: "offer",
    styling: "",
  },
  {
    label: "Rejected",
    value: "rejected",
    styling: "",
  },
] as const;

export type ApplicationStatus = (typeof StatusTabs)[number]["value"];
