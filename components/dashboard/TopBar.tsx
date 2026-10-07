import React from "react";
import { ModeToggle } from "../mode-toggle";
import { SearchForm } from "../search-form";
import { usePathname } from "next/navigation";
import { pathLabels } from "@/lib/constants/pathLables";

const TopBar = () => {
  const pathName = usePathname();
  const [pageLabel] = pathLabels.filter((item) => {
    return item.value === pathName;
  });

  return (
    <div className="w-full shrink-0 bg-white px-5 py-3 border-b border-solid border-sidebar-border">
      <div className="w-full flex items-center justify-between">
        <p className="text-lg font-semibold text-primary!">{pageLabel.label}</p>
        <SearchForm />
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopBar;
