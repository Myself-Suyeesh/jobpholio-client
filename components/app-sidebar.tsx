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
} from "lucide-react";
import Image from "next/image";
import { SidebarOpt } from "./sidebar-opt";
import { UserProfile } from "@/lib/types/user-details";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  userDetails: UserProfile | null;
};

const data = {
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
        <NavUser user={userDetails?.identity} />
      </SidebarFooter>
    </Sidebar>
  );
}
