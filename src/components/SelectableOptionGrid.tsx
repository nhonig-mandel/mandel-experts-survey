"use client";

import type { KeyboardEvent } from "react";

type SelectableOptionGridProps = {
  title: string;
  description?: string;
  options: readonly string[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  maxSelections?: number;
  maxSelectionMessage?: string;
};

export function SelectableOptionGrid({
  title,
  description,
  options,
  selectedValues,
  onToggle,
  maxSelections,
  maxSelectionMessage,
}: SelectableOptionGridProps) {
  const isSelected = (value: string) => selectedValues.includes(value);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, value: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(value);
    }
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold text-[#123B63]">{title}</h2>
        {description ? <p className="text-sm text-slate-600">{description}</p> : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {options.map((option) => {
          const selected = isSelected(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              onKeyDown={(event) => handleKeyDown(event, option)}
              className={`flex min-h-16 items-center justify-between rounded-2xl border px-4 py-3 text-right text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#123B63] ${
                selected
                  ? "border-[#123B63] bg-[#123B63] text-white shadow-sm"
                  : "border-slate-200 bg-[#F6F8FA] text-[#123B63] hover:border-[#123B63] hover:bg-[#EAF1F7]"
              }`}
              aria-pressed={selected}
            >
              <span>{option}</span>
              <span className="mr-3 h-5 w-5 rounded-full border border-current text-center text-xs leading-5">
                {selected ? "✓" : ""}
              </span>
            </button>
          );
        })}
      </div>
      {maxSelections && maxSelections > 0 && selectedValues.length >= maxSelections ? (
        <p className="mt-4 text-sm text-[#B42318]">{maxSelectionMessage}</p>
      ) : null}
    </section>
  );
}
