"use client";

import { cn } from "@/lib/utils";
import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
  // type?: HTMLInputTypeAttribute | "textarea" | "select";
  // placeholder?: string;
  // width?: string;
  // className?: string;
  // name?: string;
}

export default function Input({
  label = "Label",
  name,
  className,
  width = "100%",
  errorMessage,
  ...props
}: InputProps) {
  return (
    <div>
      <div
        style={{ width: width }}
        className={cn(
          "flex flex-col border min-h-14 py-2 px-3 transition-all",
          errorMessage ? "border-[red]" : "border-color-border",
          className
        )}
      >
        <label className="text-sm font-medium" htmlFor={name}>
          {label}
        </label>

        <input className="outline-none" name={name} {...props} />
      </div>
      <p className="text-right text-[red] text-xs mt-1">{errorMessage}</p>
    </div>
  );
}
