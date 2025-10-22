"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

function shouldShowSidebar(pathname: string): boolean {
  // List of public routes where sidebar should not be shown
  const publicRoutes = ["/", "/login", "/signup"];
  return !publicRoutes.includes(pathname);
}

export function SidebarProvider() {
  const pathname = usePathname();
  const showSidebar = shouldShowSidebar(pathname);

  if (!showSidebar) return null;
  return <Sidebar />;
}
