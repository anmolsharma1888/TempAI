import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import React from 'react'

export default function DropDownField({ label, value, options, onHandleStyleChange }) {
    return (
        <div>
            <label>{label}</label>
            <Select onValueChange={(v) => onHandleStyleChange(v)} defaultValue={value}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={value} />
                </SelectTrigger>
                <SelectContent>
                    {options?.map((option, index) => (
                        <SelectItem value={option} key={index}>{option}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

        </div>
    )
}
