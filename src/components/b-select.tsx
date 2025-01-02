import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { type ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export default function BSelect<T>({
  options,
  getLabel,
  getValue,
  renderOption,
  placeholder = "Select an option",
  ...props
}: Readonly<BSelectProps<T>>) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<T[]>(
    props.value ? (Array.isArray(props.value) ? props.value : [props.value]) : []
  );

  function getOptionValue(value: T): string | null | number {
    if (getValue) return getValue(value);
    if (typeof value !== "object" || !value) return String(value);

    if ("id" in value) {
      return value.id as string;
    }
    if ("value" in value) {
      return value.value as string;
    }

    return value as unknown as string;
  }

  function getOptionLabel(value: T): ReactNode {
    if (getLabel) return getLabel(value);

    if (typeof value !== "object" || !value) return value as ReactNode;

    if ("label" in value) return value.label as string;

    return value as unknown as string;
  }

  const handleSelect = (option: T) => {
    let newSelected: T[];
    if (!props.multiple) {
      newSelected = [option];
    } else {
      newSelected = selected.some((item) => getOptionValue(item) === getOptionValue(option))
        ? selected.filter((item) => getOptionValue(item) !== getOptionValue(option))
        : [...selected, option];
    }
    setSelected(newSelected);
    props.multiple ? props.onChange?.(newSelected) : props.onChange?.(option);
  };

  const handleRemove = (option: T) => {
    const newSelected = selected.filter((item) => getOptionValue(item) !== getOptionValue(option));
    setSelected(newSelected);
    props.multiple && props.onChange?.(newSelected);
  };

  const getSinglePlaceholder = () => (selected.length > 0 ? getOptionLabel(selected[0]) : placeholder);
  const getMulitpPlaceholder = () =>
    selected.length > 0 ? (
      selected.map((option) => (
        <div key={getOptionValue(option)} className="flex items-center gap-x-2 border rounded">
          {getOptionLabel(option)}
          <button onClick={() => handleRemove(option)}>
            <X />
          </button>
        </div>
      ))
    ) : (
      <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
        {placeholder}
      </Button>
    );

  return (
    <div className="bg-green-200">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="h-11 bg-input border-0 hover:bg-input/80 hover:border ">
          {!props.multiple ? (
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between text-base font-normal px-3"
            >
              {getSinglePlaceholder()}
            </Button>
          ) : (
            <div className="flex flex-wrap gap-2">{getMulitpPlaceholder()}</div>
          )}
        </PopoverTrigger>
        <PopoverContent className="!w-full p-0 bg-green-200">
          <Command className="w-full ">
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandGroup>
                {options?.map((option) => (
                  <CommandItem key={getOptionValue(option)} onSelect={() => handleSelect(option)}>
                    <div>
                      <span className="absolute right-2 flex top-0 bottom-0 my-auto h-3.5 w-3.5 items-center justify-center">
                        {selected.some((item) => getOptionValue(item) === getOptionValue(option)) && "✓"}
                      </span>
                    </div>
                    {renderOption ? renderOption(option) : getOptionLabel(option)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          {/* <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>Profile</CommandItem>
              <CommandItem>Billing</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command> */}
        </PopoverContent>
      </Popover>
    </div>
  );
}
