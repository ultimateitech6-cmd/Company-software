"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type RequirementType = "erp" | "crm" | "both" | "custom";

interface DemoModalContextType {
  isOpen: boolean;
  requirementType: RequirementType | null;
  openDemoModal: (type?: RequirementType) => void;
  closeDemoModal: () => void;
}

const DemoModalContext = createContext<DemoModalContextType | undefined>(undefined);

export function DemoModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [requirementType, setRequirementType] = useState<RequirementType | null>(null);

  const openDemoModal = (type?: RequirementType) => {
    if (type) {
      setRequirementType(type);
    } else {
      setRequirementType(null);
    }
    setIsOpen(true);
  };

  const closeDemoModal = () => {
    setIsOpen(false);
    setRequirementType(null);
  };

  return (
    <DemoModalContext.Provider
      value={{
        isOpen,
        requirementType,
        openDemoModal,
        closeDemoModal,
      }}
    >
      {children}
    </DemoModalContext.Provider>
  );
}

export function useDemoModal() {
  const context = useContext(DemoModalContext);
  if (context === undefined) {
    throw new Error("useDemoModal must be used within a DemoModalProvider");
  }
  return context;
}
