"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { apiFetch } from "@/lib/functions/apiFetch";

import { ApplicationListItem, MetaData } from "@/lib/types/application-details";

import { type ApplicationStatus } from "@/lib/constants/statusTabs";

import addApplicationImg from "@/public/assets/illustrations/add-application-illustration.webp";

import { Button } from "@/components/ui/button";

import ApplicationDetailsComponent from "./ApplicationDetailsComponent";

import { DataTable } from "@/components/data-table";

// ==================================================
// TYPES
// ==================================================

type Source = "all" | "linkedin" | "naukri" | "company_site";

type TimeFilter = "all" | "today" | "7_days" | "30_days" | "90_days";

type SortOption = "most_recent" | "oldest" | "company" | "role";

// ==================================================
// COMPONENT
// ==================================================

const ApplicationParentComponent = ({ refreshKey }: { refreshKey: number }) => {
  // ------------------------------------------------
  // Initial page state
  // ------------------------------------------------

  const [isLoading, setIsLoading] = useState(true);

  const [isDataEmpty, setIsDataEmpty] = useState(false);

  const [isError, setIsError] = useState(false);

  // ------------------------------------------------
  // Table loading
  // ------------------------------------------------

  const [isTableLoading, setIsTableLoading] = useState(false);

  // ------------------------------------------------
  // Application data
  // ------------------------------------------------

  const [applicationData, setApplicationData] = useState<ApplicationListItem[]>(
    [],
  );

  const [applicationMetaData, setApplicationMetaData] =
    useState<MetaData | null>(null);

  // ------------------------------------------------
  // Selected application
  // ------------------------------------------------

  const [selectedApplication, setSelectedApplication] =
    useState<ApplicationListItem | null>(null);

  // ==================================================
  // FILTER / PAGINATION STATE
  // ==================================================

  const [status, setStatus] = useState<ApplicationStatus>("all");

  const [search, setSearch] = useState("");

  const [source, setSource] = useState<Source>("all");

  const [time, setTime] = useState<TimeFilter>("all");

  const [sort, setSort] = useState<SortOption>("most_recent");

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(20);

  // ------------------------------------------------
  // Used to identify the first API request
  // ------------------------------------------------

  const isInitialLoad = useRef(true);

  // ==================================================
  // FETCH APPLICATIONS
  // ==================================================

  useEffect(() => {
    getApplicationData();
  }, [page, limit, status, search, source, time, sort, refreshKey]);

  async function getApplicationData() {
    const firstLoad = isInitialLoad.current;

    if (firstLoad) {
      setIsLoading(true);
    } else {
      setIsTableLoading(true);
    }

    try {
      const params = new URLSearchParams();

      params.set("page", String(page));

      params.set("limit", String(limit));

      if (status !== "all") {
        params.set("status", status);
      }

      if (search.trim()) {
        params.set("search", search.trim());
      }

      if (source !== "all") {
        params.set("source", source);
      }

      if (time !== "all") {
        const today = new Date();

        const dateFrom = new Date();

        if (time === "today") {
          dateFrom.setHours(0, 0, 0, 0);
        }

        if (time === "7_days") {
          dateFrom.setDate(today.getDate() - 7);
        }

        if (time === "30_days") {
          dateFrom.setDate(today.getDate() - 30);
        }

        if (time === "90_days") {
          dateFrom.setDate(today.getDate() - 90);
        }

        params.set("dateFrom", dateFrom.toISOString());

        params.set("dateTo", today.toISOString());
      }

      switch (sort) {
        case "most_recent":
          params.set("sortBy", "dateApplied");

          params.set("sortOrder", "desc");

          break;

        case "oldest":
          params.set("sortBy", "dateApplied");

          params.set("sortOrder", "asc");

          break;

        case "company":
          params.set("sortBy", "company");

          params.set("sortOrder", "asc");

          break;

        case "role":
          params.set("sortBy", "role");

          params.set("sortOrder", "asc");

          break;
      }

      const url = `/applications?${params.toString()}`;

      const res = await apiFetch(url, {
        method: "GET",
        credentials: "include",
      });

      if (res.success) {
        const applications = res.data ?? [];

        setApplicationData(applications);
        setSelectedApplication(applications[0]);
        setApplicationMetaData(res.meta ?? null);

        setIsError(false);

        // ------------------------------------------
        // Empty state
        //
        // Only use the full-page empty state
        // during the initial request.
        //
        // If a filter returns zero results,
        // DataTable itself should show "No results".
        // ------------------------------------------

        if (firstLoad) {
          setIsDataEmpty(applications.length === 0);
        } else {
          setIsDataEmpty(false);
        }
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);

      setIsError(true);
    } finally {
      if (firstLoad) {
        setIsLoading(false);
        isInitialLoad.current = false;
      } else {
        setIsTableLoading(false);
      }
    }
  }

  // ==================================================
  // STATUS
  // ==================================================

  const handleStatusChange = (newStatus: ApplicationStatus) => {
    setStatus(newStatus);

    // Whenever filter changes,
    // start from first page.
    setPage(1);
  };

  // ==================================================
  // SEARCH
  // ==================================================

  const handleSearchChange = (value: string) => {
    setSearch(value);

    setPage(1);
  };

  // ==================================================
  // SOURCE
  // ==================================================

  const handleSourceChange = (value: Source) => {
    setSource(value);

    setPage(1);
  };

  // ==================================================
  // TIME
  // ==================================================

  const handleTimeChange = (value: TimeFilter) => {
    setTime(value);

    setPage(1);
  };

  // ==================================================
  // SORT
  // ==================================================

  const handleSortChange = (value: SortOption) => {
    setSort(value);

    setPage(1);
  };

  // ==================================================
  // PAGE
  // ==================================================

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // ==================================================
  // LIMIT
  // ==================================================

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);

    setPage(1);
  };

  // ==================================================
  // ROW CLICK
  // ==================================================

  const handleClick = (id: string) => {
    const application = applicationData.find((item) => item.id === id);

    if (!application) {
      return;
    }

    setSelectedApplication(application);
  };

  // ==================================================
  // CLOSE DETAILS
  // ==================================================

  function handleClose() {
    setSelectedApplication(null);
  }

  const handleApplicationDelete = (id: string) => {
    getApplicationData();
  };

  // ==================================================
  // INITIAL FULL PAGE LOADING
  // ==================================================

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // ==================================================
  // ERROR
  // ==================================================

  if (isError) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <p>Something went wrong</p>
      </div>
    );
  }

  // ==================================================
  // EMPTY STATE
  // ==================================================

  if (isDataEmpty) {
    return (
      <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center gap-4">
        <p className="text-2xl">Welcome, John! 👋</p>

        <Image
          src={addApplicationImg}
          alt="Add Application Illustration"
          width={300}
          height={200}
        />

        <div className="flex w-1/2 flex-col items-center justify-center gap-4">
          <p className="text-center text-4xl font-medium">
            Ready to add your first Application?
          </p>

          <span className="w-2/3 text-center font-medium text-sidebar-foreground">
            Add your first application and keep every opportunity, update,
            interview, and next step organized in one place.
          </span>

          <Button className="p-5!">Add Application</Button>
        </div>
      </div>
    );
  }

  // ==================================================
  // APPLICATIONS
  // ==================================================

  return (
    <div
      className="
        grid
        h-[calc(100vh-150px)]
        grid-cols-[minmax(0,1fr)_450px]
        gap-4
      "
    >
      {/* ============================================
          APPLICATION TABLE
          ============================================ */}

      <div
        className="
          min-h-full
          rounded-md
          border
          border-sidebar-border
          bg-white
          py-4
        "
      >
        <DataTable
          data={applicationData}
          handleRowClick={handleClick}
          onDelete={handleApplicationDelete}
          status={status}
          search={search}
          source={source}
          time={time}
          sort={sort}
          page={page}
          limit={limit}
          meta={applicationMetaData}
          isLoading={isTableLoading}
          onStatusChange={handleStatusChange}
          onSearchChange={handleSearchChange}
          onSourceChange={handleSourceChange}
          onTimeChange={handleTimeChange}
          onSortChange={handleSortChange}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />
      </div>

      {/* ============================================
          APPLICATION DETAILS
          ============================================ */}

      <ApplicationDetailsComponent
        applicationSelected={selectedApplication}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ApplicationParentComponent;
