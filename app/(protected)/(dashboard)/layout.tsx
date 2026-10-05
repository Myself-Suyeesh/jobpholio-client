"use client";
import { AppSidebar } from "@/components/app-sidebar";
import TopBar from "@/components/dashboard/TopBar";
import { ThemeProvider } from "@/components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/useUser";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userInfo } = useUser();

  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>
          <AppSidebar userDetails={userInfo} />
          <SidebarInset className="h-screen overflow-hidden">
            <TopBar />
            <main className="min-h-0 flex-1 overflow-y-auto p-4 gap-4">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </ThemeProvider>
    </div>
  );
}
