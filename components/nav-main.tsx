"use client";

import { Button } from "@/components/ui/button";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    isActive?: boolean;
  }[];
}) {
  const pathName = usePathname();
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const [path] = items.filter((item) => {
      return item.url === pathName;
    });
    setActiveItem(path ? path.title : "");
  }, [pathName]);

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <Link href={item.url} key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={activeItem === item.title}
                  onClick={() => setActiveItem(item.title)}
                  className="hover:bg-[#f5f5f5] hover:text-gray-500 mt-2"
                >
                  {item.icon}
                  <span className="text-[16px] font-medium">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
