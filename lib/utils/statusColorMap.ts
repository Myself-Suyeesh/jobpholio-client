import { ApplicationStatus } from "../types/application-details";

export const statusColorMap: Record<ApplicationStatus, string> = {
  applied: "bg-status-applied-background text-status-applied-foreground",
  on_hold: "bg-status-hold-background text-status-hold-foreground",
  interview: "bg-status-interview-background text-status-interview-foreground",
  offer: "bg-status-offer-background text-status-offer-foreground",
  rejected: "bg-status-rejected-background text-status-rejected-foreground",
};

//  --status-applied-background: #e6f1fb;
//   --status-applied-foreground: #0c447c;

//   --status-hold-background: #faeeda;
//   --status-hold-foreground: #633806;

//   --status-interview-background: #eaf3de;
//   --status-interview-foreground: #27500a;

//   --status-rejected-background: #fcebeb;
//   --status-rejected-foreground: #501313;

//   --status-offer-background: #639922;
//   --status-offer-foreground: #ffffff;
