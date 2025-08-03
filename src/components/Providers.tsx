"use client";

import React, { ReactNode } from "react";
import { SearchProvider } from "@/context/SearchContext";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <SearchProvider>{children}</SearchProvider>;
}
