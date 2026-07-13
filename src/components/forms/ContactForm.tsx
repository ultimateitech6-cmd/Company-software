"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import CustomButton from "../shared/CustomButton";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(8, { message: "Please enter a valid phone number (min 8 digits)." }),
  requirementType: z.enum(["erp", "crm", "both", "custom"]),
  numberOfUsers: z.enum(["1-10", "11-50", "51-200", "200+"]),
  preferredTime: z.enum(["morning", "afternoon", "evening"]),
  message: z.string().min(5, { message: "Message must be at least 5 characters." }),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      phone: "",
      requirementType: "erp",
      numberOfUsers: "11-50",
      preferredTime: "morning",
      message: "",
    },
  });

  const onSubmit = async (data: ContactValues) => {
    setIsSubmitting(true);
    try {
      const formattedMessage = `Company: ${data.companyName} | Requirement: ${data.requirementType} | Users: ${data.numberOfUsers} | Preferred Time: ${data.preferredTime} | Message: ${data.message}`;
      
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
    } catch (error) {
      console.error("Error submitting contact form lead:", error);
      alert("Failed to send your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl text-center shadow-lg space-y-6">
        <div className="flex justify-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          Enquiry Form Submitted!
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-450 leading-relaxed max-w-md mx-auto">
          Thank you for contacting YourCompany Software Solutions. We have received your detailed inquiry. One of our senior product consultants will email or call you within 2 hours to confirm your custom sandbox demo schedule.
        </p>
        <CustomButton variant="outline" onClick={() => setIsSuccess(false)}>
          Submit Another Request
        </CustomButton>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
        Submit ERP/CRM Enquiry Form
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                }
              })}
              className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white ${
                errors.name ? "border-red-500 focus:ring-red-500" : "border-slate-300 dark:border-slate-800"
              }`}
              placeholder="Sarah Jenkins"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("companyName")}
              className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white ${
                errors.companyName ? "border-red-500 focus:ring-red-500" : "border-slate-300 dark:border-slate-800"
              }`}
              placeholder="Vanguard Manufacturing"
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs mt-1">{errors.companyName.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Work Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-slate-300 dark:border-slate-800"
              }`}
              placeholder="sjenkins@vanguard.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register("phone", {
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/[^0-9\s+\-()]/g, "");
                }
              })}
              className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white ${
                errors.phone ? "border-red-500 focus:ring-red-500" : "border-slate-300 dark:border-slate-800"
              }`}
              placeholder="+1 (555) 019-9122"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Requirement <span className="text-red-500">*</span>
            </label>
            <select
              {...register("requirementType")}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 dark:text-white text-sm"
            >
              <option value="erp">ERP Software</option>
              <option value="crm">CRM Software</option>
              <option value="both">Both ERP & CRM</option>
              <option value="custom">Custom Module</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              User Seats <span className="text-red-500">*</span>
            </label>
            <select
              {...register("numberOfUsers")}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 dark:text-white text-sm"
            >
              <option value="1-10">1 - 10 Users</option>
              <option value="11-50">11 - 50 Users</option>
              <option value="51-200">51 - 200 Users</option>
              <option value="200+">200+ Users</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Preferred Time <span className="text-red-500">*</span>
            </label>
            <select
              {...register("preferredTime")}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-800 rounded-lg bg-white dark:bg-slate-950 dark:text-white text-sm"
            >
              <option value="morning">Morning (9AM - 12PM)</option>
              <option value="afternoon">Afternoon (1PM - 4PM)</option>
              <option value="evening">Evening (4PM - 6PM)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Requirement Specifications <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={4}
            {...register("message")}
            className={`w-full px-3.5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-950 dark:border-slate-800 dark:text-white ${
              errors.message ? "border-red-500 focus:ring-red-500" : "border-slate-300 dark:border-slate-800"
            }`}
            placeholder="Please detail your current software pain points, legacy databases to migrate, and custom reporting needs..."
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
          )}
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
              Sending Request...
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Book Integration Consultation
            </>
          )}
        </CustomButton>
      </form>
    </div>
  );
}
