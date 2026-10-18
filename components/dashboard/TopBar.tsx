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
        {/* <p className="text-sm text-primary!">
          
        </p> */}

        <div className="relative flex-1 max-w-xl overflow-hidden  py-2 rounded-lg text-amber-700">
          {/* Double-width layout rail leveraging the custom global.css keyframe */}
          <div className="flex w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused] cursor-pointer">
            {/* Lead Segment Block */}
            <div className="inline-block pr-12 text-sm font-medium tracking-wide">
              JobPholio is a work in progress. Found an issue? Share your
              feedback, it may already be fixed or still be in progress. Every
              report helps!
            </div>

            {/* Mirror Link Loop Block */}
            <div
              className="inline-block pr-12 text-sm font-medium tracking-wide"
              aria-hidden="true"
            >
              JobPholio is a work in progress. Found an issue? Share your
              feedback, it may already be fixed or still be in progress. Every
              report helps!
            </div>
          </div>
        </div>
        {/* <SearchForm /> */}
        {/* <ModeToggle /> */}
      </div>
    </div>
  );
};

export default TopBar;
