import type { ComponentProps, ReactNode } from "react";
import type { Control, ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox, type CheckboxProps } from "./ui/checkbox";
import { Input } from "./ui/input";

type BaseProps<T extends FieldValues> = {
  className?: string;
  name: Path<T>;
  control: Control<T, any>;
  label?: ReactNode;
  helper?: ReactNode;
  render?: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
};
type FieldInputProps<T extends FieldValues> = BaseProps<T> & {
  type: "input";
  inputProps?: ComponentProps<"input">;
};
type FieldCheckboxProps<T extends FieldValues> = BaseProps<T> & {
  type: "checkbox";
  checkboxProps?: CheckboxProps;
};
type InputFieldProps<T extends FieldValues> = FieldInputProps<T> | FieldCheckboxProps<T>;

export function InputField<T extends FieldValues>(props: Readonly<InputFieldProps<T>>) {
  const { control, name, type, label, render, className, helper } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {(() => {
              if (render) {
                return render(field);
              }

              let Com;
              switch (type) {
                case "input":
                  Com = <Input {...field} {...props.inputProps} />;
                  break;
                case "checkbox":
                  Com = <Checkbox {...field} {...props.checkboxProps} />;
                  break;
                default:
                  throw new Error("Invalid type");
              }
              return Com;
            })()}
          </FormControl>
          {helper && <FormDescription>{helper}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
