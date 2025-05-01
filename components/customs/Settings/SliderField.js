"use client";
import React, { useMemo, useCallback } from "react";
import { Slider } from "@/components/ui/slider";

export default function SliderField({ label, value, onHandleStyleChange }) {
  // Parse value to number, fallback to 0 if invalid
  const numericValue = useMemo(() => {
    const parsed = parseInt(value);
    return isNaN(parsed) ? 0 : parsed;
  }, [value]);

  // Handle change with a check to avoid unnecessary updates
  const handleChange = useCallback(
    (val) => {
      const newValue = `${val[0]}px`; // Ensure consistent format
      if (newValue !== value) {
        onHandleStyleChange(newValue);
      }
    },
    [value, onHandleStyleChange]
  );

  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{label}</label>
      <Slider
        value={[numericValue]} // Controlled value as an array
        onValueChange={handleChange}
        max={100}
        step={1}
        disabled={!value} // Disable if value is undefined
      />
      <span className="text-sm text-gray-500">{value || '0px'}</span>
    </div>
  );
}