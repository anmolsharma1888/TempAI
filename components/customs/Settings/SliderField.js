import { Slider } from "@/components/ui/slider"
import React from 'react'

export default function SliderField({ label, value, onHandleStyleChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-medium">{label}</label>
      <Slider 
        value={[parseInt(value)]} 
        onValueChange={(val) => onHandleStyleChange(val[0] + 'px')}
        max={100} 
        step={1}
      />
      <span className="text-sm text-gray-500">{value}</span>
    </div>
  );
}
