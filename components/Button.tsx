"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  href?: string;
  size?: "small" | "base";
  variant?: "primary" | "secondary" | "danger" | "success";
  rounded?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  renderRight?: React.ReactNode;
  renderLeft?: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const {
    title,
    href,
    size,
    rounded,
    variant,
    className,
    disabled,
    type,
    renderLeft,
    renderRight,
  } = props;
  const sizeStyles =
    size === "small" ? "px-4 h-10 text-sm font-medium" : "px-6 h-14";
  const roundedStyles = rounded ? "rounded-full" : "rounded-xl";
  const variantStyles =
    variant === "secondary"
      ? "bg-color-background-subtle border-color-border"
      : variant === "danger"
      ? "bg-transparent border border-[#f16a6a] text-[#f16a6a]"
      : variant === "success"
      ? "bg-[#4a9c53] text-white"
      : "bg-primary text-white border-primary";
  const defaultStyles =
    "inline-flex items-center border border-solid font-medium";
  return href ? (
    <Link
      href={href}
      onClick={props.onClick}
      className={cn(
        sizeStyles,
        roundedStyles,
        variantStyles,
        defaultStyles,
        renderRight || renderLeft ? "justify-between" : "justify-center",
        className
      )}
    >
      {renderLeft}
      {title}
      {renderRight}
    </Link>
  ) : (
    <button
      {...props}
      onClick={props.onClick}
      disabled={disabled}
      type={type}
      className={cn(
        sizeStyles,
        roundedStyles,
        variantStyles,
        defaultStyles,
        renderRight || renderLeft ? "justify-between" : "justify-center",
        className
      )}
    >
      {renderLeft}
      {title}
      {renderRight}
    </button>
  );
}
