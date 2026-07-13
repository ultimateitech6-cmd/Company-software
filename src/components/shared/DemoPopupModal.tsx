"use client";

import React, { useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDemoModal } from "./DemoModalContext";
import DemoModalForm from "../forms/DemoModalForm";

type RequirementType = "erp" | "crm" | "both" | "custom";

function SearchParamsTrigger() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { openDemoModal } = useDemoModal();

  useEffect(() => {
    const demo = searchParams.get("demo");
    if (demo) {
      openDemoModal(demo === "true" ? undefined : (demo as RequirementType));
      
      // Clean query parameter after trigger to avoid repeating actions on refresh
      const params = new URLSearchParams(searchParams.toString());
      params.delete("demo");
      const newQuery = params.toString() ? `?${params.toString()}` : "";
      router.replace(`${pathname}${newQuery}`, { scroll: false });
    }
  }, [searchParams, pathname, router, openDemoModal]);

  return null;
}

export default function DemoPopupModal() {
  const { isOpen, requirementType, closeDemoModal } = useDemoModal();

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsTrigger />
      </Suspense>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDemoModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 dark:border dark:border-slate-800"
            >
              {/* Close Button */}
              <button
                onClick={closeDemoModal}
                className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Request a Custom Demo
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Accelerate your business with our customizable ERP & CRM solutions.
                </p>
              </div>

              <DemoModalForm
                initialRequirementType={requirementType}
                onSuccessSubmit={closeDemoModal}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
