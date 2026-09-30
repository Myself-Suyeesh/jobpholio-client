import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export function SidebarOpt() {
  return (
    <Card className="gap-2 py-4 bg-sidebar-primary rounded-md">
      <CardHeader className="px-4">
        <CardTitle className="text-lg">Sync job applications</CardTitle>
        <CardDescription className="text-sidebar-foreground!">
          We’re working on integrating LinkedIn, Naukri and more to keep your
          JobPholio up-to-date automatically
        </CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <p className="w-full text-sm rounded-md! text-center bg-blue-50 text-blue-500! border! border-blue-500! px-1! py-2! cursor-not-allowed">
          Coming Soon
        </p>
      </CardContent>
    </Card>
  );
}
