"use client";

import { ThemeProvider } from "next-themes";
import { AppContextProvider } from "@/context/AppContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppContextProvider>{children}</AppContextProvider>
    </ThemeProvider>
  );
}