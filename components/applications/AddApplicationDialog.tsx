import React, { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  BriefcaseBusiness,
  BuildingComplex,
  CalendarIcon,
  FileText,
  SquarePlus,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { currencies } from "@/lib/constants/currencyConstants";

import {
  employmentType,
  sourcelist,
  statusList,
} from "@/lib/constants/addApplicationConstants";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { getNumberOrNull } from "@/lib/functions/getNumberOrNull";
import { apiFetch } from "@/lib/functions/apiFetch";
import {
  ApplicationItem,
  ApplicationListItem,
} from "@/lib/types/application-details";

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }

  return !isNaN(date.getTime());
}

type FormErrors = {
  companyName?: string;
  role?: string;
  status?: string;
  source?: string;
  date?: string;
};

const AddApplicationDialog = ({
  onApplicationAdded,
}: {
  onApplicationAdded: () => void;
}) => {
  const [currency, setCurrency] = useState("INR");
  const [employment, setEmployment] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [open, setOpen] = React.useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));
  const selectedCurrency = currencies.find((item) => item.code === currency);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: Record<string, string> = {};
    const formData = new FormData(event.currentTarget);
    const companyName = String(formData.get("company-name") ?? "").trim();
    const role = String(formData.get("role") ?? "").trim();

    if (!companyName) {
      newErrors.companyName = "Company name is required.";
    }

    if (!role) {
      newErrors.role = "Job title / role is required.";
    }

    if (!status) {
      newErrors.status = "Application status is required.";
    }

    if (!source) {
      newErrors.source = "Source is required.";
    }

    if (!date) {
      newErrors.date = "Application date is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const applicationForm: any = {
      company: {
        name: formData.get("company-name"),
        website: formData.get("company-website"),
      },
      job: {
        title: formData.get("role"),
        location: formData.get("location"),
        employmentType: employment,
        salary: {
          min: getNumberOrNull(formData.get("min")),
          max: getNumberOrNull(formData.get("max")),
          currency: currency,
        },
      },
      source: source,
      status: status,
      dateApplied: date,
    };

    await createApplication(applicationForm);

    // Form is valid
    console.log("Submit application");
    // console.log("Submit application", Object.fromEntries(formData.entries()));
  };
  const resetForm = () => {
    setCurrency("INR");
    setEmployment(null);
    setStatus(null);
    setSource(null);

    setErrors({});

    const today = new Date();

    setDate(today);
    setMonth(today);
    setValue(formatDate(today));
  };

  const handleDialogChange = (isOpen: boolean) => {
    setDialogOpen(isOpen);

    if (!isOpen) {
      resetForm();
      setIsSuccess(false);
      setIsError(false);
    }
  };

  async function createApplication(data: ApplicationItem) {
    const url = process.env.NEXT_PUBLIC_API_URL + "/applications";

    const res = await apiFetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (!res.success) {
      setIsError(true);
    } else {
      setIsSuccess(true);
    }
    onApplicationAdded();
    resetForm();
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger
        render={
          <Button variant="default" className={"p-5!"}>
            <SquarePlus size={16} />
            Add Application
          </Button>
        }
      />
      <DialogContent
        className="sm:max-w-sm min-w-1/2 p-0"
        showCloseButton={false}
      >
        {!isError ? (
          isSuccess ? (
            <div>Successfully saved application</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <DialogHeader className="p-5! border-b! border-sidebar-border!">
                  <DialogTitle className={"font-semibold! text-2xl!"}>
                    Application details
                  </DialogTitle>

                  <DialogDescription
                    className={"text-sm! text-sidebar-foreground!"}
                  >
                    Track a job application and keep your progress organised.
                  </DialogDescription>
                </DialogHeader>

                <div className="px-5! max-h-[70vh] overflow-y-auto">
                  <FieldGroup>
                    {/* =====================================================
                COMPANY INFORMATION
                ===================================================== */}

                    <div className="flex flex-col gap-4 pb-5 border-b! border-sidebar-border!">
                      <div className="flex flex-row items-center gap-6">
                        <div className="p-3 bg-gray-50 rounded-md! border! border-sidebar-border!">
                          <BuildingComplex size={24} />
                        </div>

                        <div>
                          <p className="font-semibold text-lg!">
                            Company information
                          </p>

                          <p className="text-sm text-sidebar-foreground!">
                            Let us know which company you applied to.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <Field data-invalid={!!errors.companyName}>
                          <Label htmlFor="company-name">
                            Company Name{" "}
                            <span className="text-destructive">*</span>
                          </Label>

                          <Input
                            id="company-name"
                            name="company-name"
                            className="h-10"
                            placeholder="e.g. Google, Microsoft"
                            aria-invalid={!!errors.companyName}
                            onChange={() => {
                              setErrors((prev) => ({
                                ...prev,
                                companyName: "",
                              }));
                            }}
                          />

                          {errors.companyName && (
                            <FieldError>{errors.companyName}</FieldError>
                          )}
                        </Field>

                        <Field>
                          <Label htmlFor="company-website">
                            Company website{" "}
                            <span className="text-sidebar-foreground!">
                              (optional)
                            </span>
                          </Label>

                          <Input
                            id="company-website"
                            name="company-website"
                            className="h-10"
                            placeholder="e.g. https://company.com"
                          />
                        </Field>
                      </div>
                    </div>

                    {/* =====================================================
                JOB DETAILS
                ===================================================== */}

                    <div className="flex flex-col gap-4 pb-5 border-b! border-sidebar-border!">
                      <div className="flex flex-row items-center gap-6">
                        <div className="p-3 bg-gray-50 rounded-md! border! border-sidebar-border!">
                          <BriefcaseBusiness size={24} />
                        </div>

                        <div>
                          <p className="font-semibold text-lg!">Job details</p>

                          <p className="text-sm text-sidebar-foreground!">
                            Tell us about the role and where it’s located.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <Field data-invalid={!!errors.role}>
                          <Label htmlFor="role">
                            Job title / Role{" "}
                            <span className="text-destructive">*</span>
                          </Label>

                          <Input
                            id="role"
                            name="role"
                            className="h-10"
                            placeholder="e.g. Product Designer"
                            aria-invalid={!!errors.role}
                            onChange={() => {
                              setErrors((prev) => ({
                                ...prev,
                                role: "",
                              }));
                            }}
                          />

                          {errors.role && (
                            <FieldError>{errors.role}</FieldError>
                          )}
                        </Field>

                        <Field>
                          <Label>
                            Employment type{" "}
                            <span className="text-sidebar-foreground!">
                              (optional)
                            </span>
                          </Label>

                          <Select
                            value={employment}
                            onValueChange={(value) => {
                              setEmployment(value);
                            }}
                          >
                            <SelectTrigger className="h-10! border-[#d1d5db]!">
                              <SelectValue>
                                {
                                  employmentType.find(
                                    (item) => item.value === employment,
                                  )?.label
                                }
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {employmentType.map((item) => (
                                <SelectItem key={item.label} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <Field>
                          <Label htmlFor="location">
                            Location{" "}
                            <span className="text-sidebar-foreground!">
                              (optional)
                            </span>
                          </Label>

                          <Input
                            id="location"
                            name="location"
                            className="h-10"
                            placeholder="e.g. San Francisco, CA"
                          />
                        </Field>

                        <Field>
                          <Label htmlFor="salary">
                            Salary{" "}
                            <span className="text-sidebar-foreground!">
                              (optional)
                            </span>
                          </Label>

                          <div className="flex flex-row items-center gap-4">
                            <div className="w-1/2 h-10 flex flex-col justify-center items-center bg-gray-50 rounded-md! border! border-sidebar-border!">
                              <p>{selectedCurrency?.symbol}</p>
                            </div>

                            <Input
                              id="min"
                              name="min"
                              type="number"
                              className="h-10"
                              placeholder="Min"
                            />

                            <Input
                              id="max"
                              name="max"
                              type="number"
                              className="h-10"
                              placeholder="Max"
                            />

                            <Select
                              value={currency}
                              onValueChange={(value) =>
                                setCurrency(value ?? "INR")
                              }
                            >
                              <SelectTrigger className="h-10! border-[#d1d5db]!">
                                <SelectValue />
                              </SelectTrigger>

                              <SelectContent>
                                {currencies.map((currency) => (
                                  <SelectItem
                                    key={currency.code}
                                    value={currency.code}
                                  >
                                    {currency.symbol} {currency.code}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </Field>
                      </div>
                    </div>

                    {/* =====================================================
                APPLICATION DETAILS
                ===================================================== */}

                    <div className="flex flex-col gap-4 pb-5">
                      <div className="flex flex-row items-center gap-6">
                        <div className="p-3 bg-gray-50 rounded-md! border! border-sidebar-border!">
                          <FileText size={24} />
                        </div>

                        <div>
                          <p className="font-semibold text-lg!">
                            Application details
                          </p>

                          <p className="text-sm text-sidebar-foreground!">
                            Track the status, source and link to the job
                            posting.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* =================================================
                    APPLICATION DATE
                    ================================================= */}

                        <Field data-invalid={!!errors.date}>
                          <FieldLabel htmlFor="date-required">
                            Subscription Date
                          </FieldLabel>

                          <InputGroup className="h-10! border-[#d1d5db]!">
                            <InputGroupInput
                              className="h-10! rounded-br-none! rounded-tr-none! border-r-0! border-[#d1d5db]!"
                              id="date-required"
                              value={value}
                              aria-invalid={!!errors.date}
                              placeholder="June 01, 2025"
                              onChange={(e) => {
                                setValue(e.target.value);

                                const newDate = new Date(e.target.value);

                                if (isValidDate(newDate)) {
                                  setDate(newDate);
                                  setMonth(newDate);

                                  setErrors((prev) => ({
                                    ...prev,
                                    date: "",
                                  }));
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "ArrowDown") {
                                  e.preventDefault();
                                  setOpen(true);
                                }
                              }}
                            />

                            <InputGroupAddon
                              align="inline-end"
                              className="h-10!"
                            >
                              <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger
                                  render={
                                    <InputGroupButton
                                      id="date-picker"
                                      variant="ghost"
                                      size="icon-xs"
                                      aria-label="Select date"
                                    >
                                      <CalendarIcon />
                                      <span className="sr-only">
                                        Select date
                                      </span>
                                    </InputGroupButton>
                                  }
                                />

                                <PopoverContent
                                  className="w-auto overflow-hidden p-0"
                                  align="end"
                                  alignOffset={-8}
                                  sideOffset={10}
                                >
                                  <Calendar
                                    mode="single"
                                    selected={date}
                                    month={month}
                                    onMonthChange={setMonth}
                                    onSelect={(selectedDate) => {
                                      setDate(selectedDate);
                                      setValue(formatDate(selectedDate));

                                      setErrors((prev) => ({
                                        ...prev,
                                        date: "",
                                      }));

                                      setOpen(false);
                                    }}
                                  />
                                </PopoverContent>
                              </Popover>
                            </InputGroupAddon>
                          </InputGroup>
                          {errors.date && (
                            <FieldError>{errors.date}</FieldError>
                          )}
                        </Field>

                        {/* =================================================
                    STATUS
                    ================================================= */}

                        <Field data-invalid={!!errors.status}>
                          <Label>
                            Application status{" "}
                            <span className="text-destructive">*</span>
                          </Label>

                          <Select
                            value={status}
                            onValueChange={(value) => {
                              setStatus(value);

                              setErrors((prev) => ({
                                ...prev,
                                status: "",
                              }));
                            }}
                          >
                            <SelectTrigger
                              className="h-10! border-[#d1d5db]!"
                              aria-invalid={!!errors.status}
                            >
                              <SelectValue>
                                {
                                  statusList.find(
                                    (item) => item.value === status,
                                  )?.label
                                }
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {statusList.map((item) => (
                                <SelectItem key={item.label} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {errors.status && (
                            <FieldError>{errors.status}</FieldError>
                          )}
                        </Field>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* =================================================
                    SOURCE
                    ================================================= */}

                        <Field data-invalid={!!errors.source}>
                          <Label>
                            Source <span className="text-destructive">*</span>
                          </Label>

                          <Select
                            value={source}
                            onValueChange={(value) => {
                              setSource(value);

                              setErrors((prev) => ({
                                ...prev,
                                source: "",
                              }));
                            }}
                          >
                            <SelectTrigger
                              className="h-10! border-[#d1d5db]!"
                              aria-invalid={!!errors.source}
                            >
                              <SelectValue>
                                {
                                  sourcelist.find(
                                    (item) => item.value === source,
                                  )?.label
                                }
                              </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              {sourcelist.map((item) => (
                                <SelectItem key={item.label} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {errors.source && (
                            <FieldError>{errors.source}</FieldError>
                          )}
                        </Field>

                        {/* =================================================
                    JOB LINK
                    ================================================= */}

                        <Field>
                          <Label htmlFor="job-link">
                            Job link{" "}
                            <span className="text-sidebar-foreground!">
                              (optional)
                            </span>
                          </Label>

                          <Input
                            id="job-link"
                            name="job-link"
                            className="h-10"
                            placeholder="e.g. https://careers.google.com"
                          />
                        </Field>
                      </div>
                    </div>
                  </FieldGroup>
                </div>

                {/* =========================================================
            FOOTER
            ========================================================= */}

                <DialogFooter className="p-5! border-t! border-sidebar-border!">
                  <DialogClose
                    render={<Button variant="outline">Cancel</Button>}
                  />

                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </FieldGroup>
            </form>
          )
        ) : (
          <div>Something Went Wrong, Please try again later.</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddApplicationDialog;
