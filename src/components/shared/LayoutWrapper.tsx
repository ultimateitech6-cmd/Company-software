"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingDemoButton from "./FloatingDemoButton";
import DemoPopupModal from "./DemoPopupModal";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/control-panel");

  if (isAdminPath) {
    return (
      <main className="flex-grow flex flex-col min-h-screen">
        {children}
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <FloatingDemoButton />
      <main className="flex-grow pt-28 flex flex-col">
        {children}
      </main>
      <Footer />
      <DemoPopupModal />
    </>
  );
}
