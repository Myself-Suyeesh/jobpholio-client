import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { SidebarInput } from "@/components/ui/sidebar";
export function SearchForm({ ...props }: React.ComponentProps<"form">) {
  return (
    <form {...props} className="w-1/3">
      <div className="relative">
        <SidebarInput
          id="search"
          placeholder="Search applications, companies or roles..."
          className="h-8 pl-7 bg-[#F5F8FB]! border-[#556784] active:border-[#394558] focus:border-none"
        />
        <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none" />
      </div>
    </form>
  );
}
