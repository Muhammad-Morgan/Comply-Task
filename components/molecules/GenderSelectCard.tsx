import * as React from "react";
import { GENDER_OPTIONS, SimpleOption } from "@/lib/lists";
import { GenericSelect } from "../atoms/Inputs";
import { cn } from "@/lib/utils";

type GenderProps = {
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  getLabel: (options: SimpleOption[], value: string) => string;
  extraStyling?: string;
};

const GenderSelectCard = ({
  gender,
  setGender,
  getLabel,
  extraStyling,
}: GenderProps) => {
  const selectId = React.useId(); // unique id keeps label/trigger tied together.
  const helperId = `${selectId}-helper`;

  return (
    <div>
      {/* Label describes the select and informs assistive tech about the required nature. */}
      <label
        className="mb-2 block text-base font-medium text-slate-900"
        htmlFor={selectId}
        id={`${selectId}-label`}
      >
        Gender <span className="text-destructive">*</span>{" "}
      </label>
      <div className="relative">
        {/* GenericSelect handles the dropdown chrome while these props keep it controlled and accessible. */}
        <GenericSelect
          value={gender || undefined}
          onValueChange={setGender}
          options={GENDER_OPTIONS}
          placeholder="Select gender"
          triggerClassName={cn(
            `w-full appearance-none rounded-lg border ${
              gender ? "border-slate-200" : "border-destructive"
            } bg-white px-4 pr-10 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-100`,
            extraStyling
          )}
          triggerProps={{
            id: selectId,
            "aria-describedby": helperId,
            "aria-labelledby": `${selectId}-label`,
            "aria-required": true,
            "aria-invalid": gender ? false : true,
          }}
        />
      </div>
      {/* Helper text echoes the current value so screen readers hear updates. */}
      <p
        id={helperId}
        className="mt-1 text-xs text-slate-500"
        aria-live="polite"
      >
        Selected: {gender ? getLabel(GENDER_OPTIONS, gender) : "None"}
      </p>
    </div>
  );
};

export default GenderSelectCard;
