"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useDemoModal } from "./DemoModalContext";
import CustomButton from "./CustomButton";

export default function FloatingDemoButton() {
  const [visible, setVisible] = useState(false);
  const { openDemoModal } = useDemoModal();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 240);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-6 z-50 flex flex-col items-center gap-3">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-xl shadow-indigo-900/30 transition-all duration-200 hover:scale-110 hover:-translate-y-0.5 cursor-pointer"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Book a Demo Button */}
      <CustomButton
        variant="primary"
        size="md"
        onClick={() => openDemoModal()}
        className="shadow-xl shadow-slate-900/20"
      >
        Book a Demo
      </CustomButton>
    </div>
  );
}

