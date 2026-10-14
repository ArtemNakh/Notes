"use client";

import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex items-center justify-between w-80 p-4 rounded-3xl shadow-sm border border-amber-200/60 font-sans transition-all duration-300",
          error: "bg-[#FFF9D6] text-[#5C4632] border-[#F2E3B3]",
          success: "bg-[#E2F0D9] text-[#3D5A2B] border-[#C5E1B4]",
          title: "text-sm font-semibold tracking-tight",
          description: "text-xs text-[#8C7A6B] mt-0.5",
          closeButton:
            "bg-transparent text-[#8C7A6B] hover:text-[#5C4632] transition-colors p-1 rounded-full",
        },
      }}
    />
  );
}
