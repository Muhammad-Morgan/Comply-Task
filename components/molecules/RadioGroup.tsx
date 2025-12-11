import { cn } from "@/lib/utils";
import { GenericCheckboxRadio } from "../atoms/CheckboxRadio";
type RadioGroupItem = {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
};

type RadioGroupProps = {
  className?: string;
  radioList: RadioGroupItem[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
};

const RadioGroup = ({
  className,
  radioList,
  value,
  onChange,
  name = "radio-group",
}: RadioGroupProps) => {
  return (
    <div
      className={cn(
        "bg-primary-50 w-[200px] rounded-lg shadow-md p-3 mx-auto",
        className
      )}
    >
      <h3 className="text-xl mb-4">Radio Group</h3>
      {radioList.length > 0
        ? radioList.map(({ label, value: optionValue, disabled, id }) => (
            <GenericCheckboxRadio
              key={id}
              kind="radio"
              name={name}
              label={label}
              value={optionValue}
              checked={value === optionValue}
              onChange={onChange}
              disabled={disabled}
              id={id}
            />
          ))
        : null}
    </div>
  );
};

export default RadioGroup;
