import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import React from 'react'

export default function ToggleGroupField({ label, options, value, onHandleStyleChange , onOuterStyleChange}) {
  return (
    <div>
      <label>{label}</label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => {
          if (v) {
            if (onHandleStyleChange) {
              onHandleStyleChange(v);
            } else if (onOuterStyleChange) {
              onOuterStyleChange(v);
            }
          }
        }}

        className="flex gap-2 w-full"
      >
        {options.map((option, index) => (
          <ToggleGroupItem
            key={index}
            value={option?.value}
            className="flex-1 flex items-center justify-center"  // Important
          >
            <option.icon />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>


    </div>
  )
}

