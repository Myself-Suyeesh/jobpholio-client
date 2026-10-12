"use client";

import { useState } from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";

interface MultiSelectComboboxProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export function MultiSelectCombobox({
  options,
  value,
  onChange,
  placeholder = "Select or type a value...",
}: MultiSelectComboboxProps) {
  const [inputValue, setInputValue] = useState("");

  const normalizedInput = inputValue.trim();

  // Include custom values and current selections in the available items.
  const items = Array.from(new Set([...options, ...value]));

  const addCustomValue = () => {
    if (!normalizedInput) return;

    const existing = value.some(
      (item) => item.toLowerCase() === normalizedInput.toLowerCase(),
    );

    if (!existing) {
      onChange([...value, normalizedInput]);
    }

    setInputValue("");
  };

  return (
    <Combobox
      multiple
      items={items}
      value={value}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      onValueChange={(nextValue) => {
        onChange(nextValue as string[]);
      }}
    >
      <ComboboxChips className="min-h-10 w-full">
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>

        <ComboboxChipsInput
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (event.key !== "Enter") return;

            const typedValue = inputValue.trim();

            if (!typedValue) return;

            const exactMatch = items.some(
              (item) => item.toLowerCase() === typedValue.toLowerCase(),
            );

            if (!exactMatch) {
              event.preventDefault();
              event.stopPropagation();
              addCustomValue();
            }
          }}
        />
      </ComboboxChips>

      <ComboboxContent className="w-full min-w-64">
        <ComboboxEmpty>
          {normalizedInput ? (
            <button
              type="button"
              className="w-full px-2 py-1.5 text-left text-sm"
              onClick={addCustomValue}
            >
              Add &quot;{normalizedInput}&quot;
            </button>
          ) : (
            "No options found."
          )}
        </ComboboxEmpty>

        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
