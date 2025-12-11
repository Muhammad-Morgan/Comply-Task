"use client";
import * as React from "react";
import SuccessModalDialog from "../organisms/SuccessModalDialog";
import {
  CATEGORY_OPTIONS,
  GENDER_OPTIONS,
  INTEREST_OPTIONS,
  SimpleOption,
} from "@/lib/lists";
import { PersonalInfoSchemaType, PreferencesSchemaType } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

type SubmitPageProps = {
  data: Partial<PersonalInfoSchemaType & PreferencesSchemaType>;
  onReset: () => void;
  openState: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const getLabel = (options: SimpleOption[], value?: string) => {
  if (!value) return "";
  return options.find((option) => option.value === value)?.label ?? value;
};

type SummaryRow = {
  key: string;
  label: string;
  value: React.ReactNode;
};

const SubmitPage = ({ data, onReset, openState, setOpen }: SubmitPageProps) => {
  const interestLabels = (data.interests ?? []).map((interest) =>
    getLabel(INTEREST_OPTIONS, interest)
  );

  const summaryRows: SummaryRow[] = [
    { key: "name", label: "Name", value: data.name || "—" },
    { key: "email", label: "Email", value: data.email || "—" },
    {
      key: "gender",
      label: "Gender",
      value: getLabel(GENDER_OPTIONS, data.gender) || "Not provided",
    },
    {
      key: "country",
      label: "Country",
      value: data.country || "Not provided",
    },
    {
      key: "age",
      label: "Age",
      value: typeof data.age === "number" ? data.age : "—",
    },
    {
      key: "category",
      label: "Category",
      value: getLabel(CATEGORY_OPTIONS, data.category) || "Not provided",
    },
    {
      key: "interests",
      label: "Interests",
      value:
        interestLabels.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-end">
            {interestLabels.map((label) => (
              <span
                key={label}
                className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
              >
                {label}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-slate-500">Not provided</span>
        ),
    },
  ];

  const modalSummary = summaryRows.map((row) => ({
    label: row.label,
    value:
      row.key === "interests"
        ? interestLabels.length > 0
          ? interestLabels.join(", ")
          : "Not provided"
        : row.value,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Review & Submit</h2>
      <p className="text-slate-600">
        Double-check the details below before finishing the flow.
      </p>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-subtle">
        <div className="border-b border-slate-100 px-6 py-4">
          <p className="text-lg font-semibold text-slate-900">User Summary</p>
        </div>
        <Table className="text-base">
          <TableBody>
            {summaryRows.map((row) => (
              <TableRow
                key={row.key}
                className="border-b border-slate-100 last:border-0"
              >
                <TableCell className="w-1/3 text-sm font-medium text-slate-500">
                  {row.label}:
                </TableCell>
                <TableCell className="w-2/3 text-right text-sm font-semibold text-slate-900">
                  {row.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-base font-semibold text-emerald-900">
            Ready to submit
          </p>
          <p className="text-sm text-emerald-900/80">
            Review all information carefully before submitting. You can go back
            to make changes.
          </p>
        </div>
      </div>

      <SuccessModalDialog
        open={openState}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          onReset();
        }}
        title="Ready to submit"
        description="Here is a quick look at your submission details."
        confirmLabel="Add Another User"
        cancelLabel="Close"
        summary={modalSummary}
      />
    </div>
  );
};

export default SubmitPage;
