import React from "react";

interface JsonLdProps {
  schema: object;
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Pre-defined Organization schema
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "YourCompany Software Solutions",
  "url": "https://www.yourcompany-erp.com",
  "logo": "https://www.yourcompany-erp.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-800-555-0199",
    "contactType": "sales",
    "areaServed": "US",
    "availableLanguage": "en",
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "100 Tech Venture Way, Suite 400",
    "addressLocality": "Silicon Valley",
    "addressRegion": "CA",
    "postalCode": "94025",
    "addressCountry": "US",
  },
});

// Pre-defined SoftwareApplication schema
export const getSoftwareSchema = (type: "ERP" | "CRM" | "HRMS" | "Combined") => {
  const name =
    type === "ERP"
      ? "YourCompany ERP Software Platform"
      : type === "CRM"
      ? "YourCompany CRM Customer Suite"
      : type === "HRMS"
      ? "YourCompany HRMS Human Resource Management System"
      : "YourCompany ERP, CRM & HRMS Combined Suite";

  const desc =
    type === "ERP"
      ? "Customizable ERP system mapping HR, payroll, inventory, and finance operations."
      : type === "CRM"
      ? "Fully integrated B2B customer relationship pipeline with automated nurturing follow-ups."
      : type === "HRMS"
      ? "End-to-end HRMS covering recruitment, attendance, payroll, performance, and statutory compliance."
      : "A unified enterprise platform joining CRM pipelines, back-office ERP modules, and full HRMS.";

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "operatingSystem": "All (Cloud-Native Web, Browser-Optimized)",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": type === "ERP" ? "99.00" : type === "HRMS" ? "99.00" : "249.00",
    },
    "description": desc,
  };
};

// Pre-defined FAQ schema
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
});
