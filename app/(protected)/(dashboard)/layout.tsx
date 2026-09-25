import { AppSidebar } from "@/components/app-sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="h-screen overflow-hidden">
            <TopBar />
            <main className="min-h-0 flex-1 overflow-y-auto p-5 gap-5">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
