"use client";

import * as React from "react";
import jobPholioLogo from "@/public/logos/jobpholio-light-logo.webp";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderIcon,
  UsersIcon,
  CameraIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  CommandIcon,
  ChartPie,
  LogOutIcon,
} from "lucide-react";
import Image from "next/image";
import { SidebarOpt } from "./sidebar-opt";
import { UserProfile } from "@/lib/types/user-details";
import { apiFetch } from "@/lib/functions/apiFetch";
import { useRouter } from "next/navigation";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  userDetails: UserProfile;
};

export const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <ChartPie />,
    },
    {
      title: "My Application",
      url: "/my-application",
      icon: <ListIcon />,
    },
    {
      title: "Insights",
      url: "/insights",
      icon: <ChartBarIcon />,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings2Icon />,
    },
    {
      title: "Help & Support",
      url: "/support-help",
      icon: <CircleHelpIcon />,
    },
  ],
};

export function AppSidebar({ userDetails, ...props }: AppSidebarProps) {
  const router = useRouter();

  async function handleLogOut() {
    const url = "/auth/logout";
    const result = await apiFetch(url, {
      method: "POST",
      credentials: "include",
    });

    if (!result.success) {
      console.log("Something went wrong");
    }
    router.push("/login");
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5! bg-white!"
              render={<a href="/dashboard" />}
            >
              <Image
                src={jobPholioLogo}
                alt="JobPholio Logo"
                width={100}
                height={26}
              />
            </SidebarMenuButton>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-4">
        <SidebarOpt />
        <NavUser user={userDetails.identity} />
        <SidebarMenuButton
          onClick={() => {
            handleLogOut();
          }}
          className=" text-destructive hover:bg-white! hover:text-destructive!"
        >
          <LogOutIcon />
          Log out
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
