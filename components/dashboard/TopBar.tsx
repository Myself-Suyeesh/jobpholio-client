import React from "react";
import { ModeToggle } from "../mode-toggle";
import { SearchForm } from "../search-form";

const TopBar = () => {
  return (
    <div className="w-full shrink-0 bg-white px-5 py-3 border-b border-solid border-sidebar-border">
      <div className="w-full flex items-center justify-between">
        <p>TopBar</p>
        <SearchForm />
        <ModeToggle />
      </div>
    </div>
  );
};

export default TopBar;
