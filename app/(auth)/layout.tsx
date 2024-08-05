import Button from "@/components/Button";
import Input from "@/components/form/Input";
import { url } from "inspector";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function layout(props: AuthLayoutProps) {
  const { children } = props;

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[black] grid place-items-center py-20 relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-60"
        style={{
          backgroundImage: "url(https://picsum.photos/1440/800?blur=10)",
        }}
      ></div>
      <div className="p-14 w-[500px] bg-white rounded-xl z-10 shadow-lg relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
