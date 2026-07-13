"use client";

import { useEffect, useState } from "react";
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

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed right-4 bottom-6 z-50">
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
