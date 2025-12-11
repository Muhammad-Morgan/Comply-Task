import { GenericCheckboxRadio } from "@/components/atoms/CheckboxRadio";
import { cn } from "@/lib/utils";

export type CheckboxDemo = {
  id: string;
  label: string;
  disabled?: boolean;
  staticChecked?: boolean;
  defaultChecked?: boolean;
  interactive?: boolean;
};

type CheckboxGroupProps = {
  items: CheckboxDemo[];
  values: Record<string, boolean>;
  onChange: (id: string, checked: boolean) => void;
  legend?: string;
  className?: string;
};

export function CheckboxGroup({
  items,
  values,
  onChange,
  legend = "Category Preferences",
  className,
}: CheckboxGroupProps) {
  return (
    <section
      className={cn(
        "w-10/12 space-y-1 rounded-lg border-2 bg-primary-100 p-4",
        className
      )}
    >
      <legend className="mb-2 text-lg font-semibold text-slate-800">
        {legend}
      </legend>
      {items.map((item) => {
        const isInteractive = item.interactive;
        const interactiveValue = values[item.id] ?? false;

        return (
          <GenericCheckboxRadio
            id={item.id}
            key={item.id}
            kind="checkbox"
            label={item.label}
            disabled={item.disabled}
            checked={
              isInteractive
                ? interactiveValue
                : item.staticChecked
                ? true
                : undefined
            }
            defaultChecked={isInteractive ? undefined : item.defaultChecked}
            onChange={
              isInteractive
                ? (nextChecked) => onChange(item.id, nextChecked)
                : undefined
            }
          />
        );
      })}
    </section>
  );
}

export default CheckboxGroup;
