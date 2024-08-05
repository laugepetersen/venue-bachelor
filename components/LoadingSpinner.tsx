import * as React from "react";

interface LoadingSpinnerProps {
  size?: number;
}
export default function LoadingSpinner({ size = 24 }: LoadingSpinnerProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
      <style>
        {
          "@keyframes spinner_T6mA{8.3%{transform:rotate(30deg)}16.6%{transform:rotate(60deg)}25%{transform:rotate(90deg)}33.3%{transform:rotate(120deg)}41.6%{transform:rotate(150deg)}50%{transform:rotate(180deg)}58.3%{transform:rotate(210deg)}66.6%{transform:rotate(240deg)}75%{transform:rotate(270deg)}83.3%{transform:rotate(300deg)}91.6%{transform:rotate(330deg)}to{transform:rotate(360deg)}}"
        }
      </style>
      <g
        style={{
          transformOrigin: "center",
          animation: "spinner_T6mA .75s step-end infinite",
        }}
      >
        <path d="M11 1h2v5h-2z" fill="currentColor" opacity={0.14} />
        <path
          d="m16.634 1.974 1.732 1-2.5 4.33-1.732-1z"
          opacity={0.29}
          fill="currentColor"
        />
        <path
          d="m21.026 5.634 1 1.732-4.33 2.5-1-1.732z"
          opacity={0.43}
          fill="currentColor"
        />
        <path d="M23 11v2h-5v-2z" opacity={0.57} fill="currentColor" />
        <path
          d="m22.026 16.634-1 1.732-4.33-2.5 1-1.732z"
          opacity={0.71}
          fill="currentColor"
        />
        <path
          d="m18.366 21.026-1.732 1-2.5-4.33 1.732-1z"
          opacity={0.86}
          fill="currentColor"
        />
        <path d="M13 23h-2v-5h2z" fill="currentColor" />
      </g>
    </svg>
  );
}
