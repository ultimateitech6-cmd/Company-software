"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import CustomButton from "../shared/CustomButton";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .regex(/^[a-zA-Z\s]+$/, { message: "Name must contain letters only." }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  phone: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits." })
    .regex(/^[0-9]{10}$/, { message: "Phone number must contain digits only." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  requirementType: z.enum(["erp", "crm", "hrms", "both", "custom"]),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface DemoModalFormProps {
  initialRequirementType?: "erp" | "crm" | "hrms" | "both" | "custom" | null;
  onSuccessSubmit?: () => void;
}

export default function DemoModalForm({
  initialRequirementType,
  onSuccessSubmit,
}: DemoModalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyName: "",
      phone: "",
      email: "",
      requirementType: (initialRequirementType as "erp" | "crm" | "hrms" | "both" | "custom") || "erp",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const formattedMessage = `Company: ${data.companyName} | Demo Request for: ${data.requirementType} | Message: ${data.message || "No additional message"}`;
      
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: formattedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setIsSuccess(true);
      reset();
      if (onSuccessSubmit) {
        // Allow parent components to handle post-submit close operations after a short delay
        setTimeout(onSuccessSubmit, 4000);
      }
    } catch (error) {
      console.error("Error submitting demo request lead:", error);
      alert("Failed to send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Demo Request Submitted!
        </h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-6">
          Thank you! Our systems integration specialist will reach out to you within the next 2 hours to schedule a custom demo for your team.
        </p>
        <div className="text-sm text-slate-400 dark:text-slate-500">
          Closing window in a few seconds...
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("name", {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
            }
          })}
          onKeyDown={(e) => {
            // Allow: backspace, delete, tab, escape, arrows, home, end
            const allowed = ["Backspace", "Delete", "Tab", "Escape", "ArrowLeft", "ArrowRight", "Home", "End", "Space"];
            if (allowed.includes(e.key)) return;
            // Block anything that isn't a letter or space
            if (!/^[a-zA-Z\s]$/.test(e.key)) e.preventDefault();
          }}
          maxLength={50}
          className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white ${
            errors.name ? "border-red-500 focus:ring-red-500" : "border-slate-300"
          }`}
          placeholder="Rahul Sharma"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("companyName")}
            className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white ${
              errors.companyName ? "border-red-500 focus:ring-red-500" : "border-slate-300"
            }`}
            placeholder="Acme Corp"
          />
          {errors.companyName && (
            <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Work Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            {...register("email")}
            className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white ${
              errors.email ? "border-red-500 focus:ring-red-500" : "border-slate-300"
            }`}
            placeholder="john@company.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            {...register("phone", {
              onChange: (e) => {
                // Strip everything except digits, then cap at 10
                e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
              }
            })}
            onKeyDown={(e) => {
              // Allow: backspace, delete, tab, escape, arrows
              const allowed = ["Backspace", "Delete", "Tab", "Escape", "ArrowLeft", "ArrowRight", "Home", "End"];
              if (allowed.includes(e.key)) return;
              // Block non-digit keys
              if (!/^[0-9]$/.test(e.key)) e.preventDefault();
              // Block if already 10 digits
              const current = (e.target as HTMLInputElement).value.replace(/[^0-9]/g, "");
              if (current.length >= 10) e.preventDefault();
            }}
            maxLength={10}
            inputMode="numeric"
            className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white ${
              errors.phone ? "border-red-500 focus:ring-red-500" : "border-slate-300"
            }`}
            placeholder="9876543210"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Requirement Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("requirementType")}
            className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 dark:border-slate-800 dark:text-white ${
              errors.requirementType ? "border-red-500 focus:ring-red-500" : "border-slate-300"
            }`}
          >
            <option value="erp">ERP Software</option>
            <option value="crm">CRM Software</option>
            <option value="hrms">HRMS Software</option>
            <option value="both">ERP + CRM + HRMS</option>
            <option value="custom">Custom Solutions</option>
          </select>
          {errors.requirementType && (
            <p className="text-red-500 text-xs mt-1">{errors.requirementType.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Brief Requirements Description
        </label>
        <textarea
          rows={3}
          {...register("message")}
          className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white"
          placeholder="Tell us about your team size, current bottlenecks, or customization needs..."
        />
      </div>

      <CustomButton
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2"
        variant="primary"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Scheduling Demo...
          </>
        ) : (
          "Book Custom Demo"
        )}
      </CustomButton>
    </form>
  );
}
