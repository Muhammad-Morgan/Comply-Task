import { fireEvent, render, screen } from "@testing-library/react";
import type { SelectHTMLAttributes } from "react";
import { vi } from "vitest";
import GenderSelectCard from "../molecules/GenderSelectCard";
import { SimpleOption } from "@/lib/lists";

vi.mock("@/components/atoms/Inputs", () => ({
  GenericSelect: ({
    options,
    placeholder,
    onValueChange,
    value,
    triggerProps,
  }: {
    options: SimpleOption[];
    placeholder?: string;
    onValueChange: (value: string) => void;
    value?: string;
    triggerProps?: SelectHTMLAttributes<HTMLSelectElement>;
  }) => (
    <select
      data-testid="gender-select"
      aria-label={placeholder}
      value={value ?? ""}
      onChange={(event) => onValueChange(event.target.value)}
      {...triggerProps}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
}));

const getLabel = (options: SimpleOption[], value: string) =>
  options.find((opt) => opt.value === value)?.label ?? "";

test("announces the selected value in the helper text", () => {
  render(
    <GenderSelectCard gender="female" setGender={() => {}} getLabel={getLabel} />
  );

  expect(screen.getByText(/Selected:/i)).toHaveTextContent("Selected: Female");
});

test("calls the setter when the user chooses a new option", () => {
  const setGender = vi.fn();

  render(<GenderSelectCard gender="" setGender={setGender} getLabel={getLabel} />);

  fireEvent.change(screen.getByTestId("gender-select"), {
    target: { value: "male" },
  });

  expect(setGender).toHaveBeenCalledWith("male");
});
