"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FilterIcon } from "lucide-react";
import { IFilterSchema, IFilterState } from "@/types/list.types";

type FilterDialogProps<T> = {
  filterSchema: IFilterSchema<T>;
  onFilter: (filters: IFilterState) => void;
};

export function FilterDialog<T>({ filterSchema, onFilter }: Readonly<FilterDialogProps<T>>) {
  const [filters, setFilters] = useState<IFilterState>({});

  const handleFilterChange = (key: string, value: string | boolean | number | string[]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <FilterIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {filterSchema.map((item) => (
            <div key={item.key} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={item.key} className="text-right">
                {item.label}
              </Label>
              {item.type === "input" && (
                <Input
                  id={item.key}
                  className="col-span-3"
                  value={(filters[item.key] as string) || ""}
                  onChange={(e) => handleFilterChange(item.key, e.target.value)}
                />
              )}
              {item.type === "checkbox" && (
                <Checkbox
                  id={item.key}
                  checked={(filters[item.key] as boolean) || false}
                  onCheckedChange={(checked) => handleFilterChange(item.key, checked)}
                />
              )}
              {item.type === "radio" && item.options && (
                <RadioGroup
                  className="col-span-3"
                  value={filters[item.key] as string}
                  onValueChange={(value) => handleFilterChange(item.key, value)}
                >
                  {item.options.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`${item.key}-${option}`} />
                      <Label htmlFor={`${item.key}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
              {item.type === "select" && item.options && (
                <Select
                  value={filters[item.key] as string}
                  onValueChange={(value) => handleFilterChange(item.key, value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {item.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              {item.type === "range" && item.min !== undefined && item.max !== undefined && (
                <Slider
                  className="col-span-3"
                  min={item.min}
                  max={item.max}
                  step={1}
                  value={[(filters[item.key] as number) || item.min]}
                  onValueChange={([value]) => handleFilterChange(item.key, value)}
                />
              )}
            </div>
          ))}
        </div>
        <Button onClick={handleApplyFilters}>Apply Filters</Button>
      </DialogContent>
    </Dialog>
  );
}
