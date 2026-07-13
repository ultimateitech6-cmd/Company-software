import React from "react";
import SectionHeading from "@/components/shared/SectionHeading";
import BlogCard from "@/components/shared/BlogCard";
import CTASection from "@/components/shared/CTASection";
import { blogPosts } from "@/data/siteData";
import type { Metadata } from "next";
import { getDb } from "@/lib/dbHelper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog & Insights | Customizable ERP & CRM | YourCompany Software Solutions",
  description: "Read our latest articles on operational strategy, customizable ERP modules, CRM lead nurturing, and business automation techniques.",
};

export default function BlogListingPage() {
  const db = getDb();
  const currentBlogPosts = (db.blogPosts && db.blogPosts.length > 0 ? db.blogPosts : blogPosts)
    .filter(post => post.isPublished !== false);

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Page Title Hero */}
      <section className="-mt-20 pt-36 pb-10 md:pt-44 md:pb-12 bg-slate-50 dark:bg-slate-900 border-b border-slate-105 dark:border-slate-800/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.06),transparent_45%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <SectionHeading
            badge="Insights & Articles"
            title="Operational Strategy & Technology Guides"
            subtitle="Deep dives into ERP system planning, CRM sales loops, lead pipeline management, and software customizations for growing businesses."
            align="center"
            className="mb-0"
          />
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="pt-10 pb-20 md:pt-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentBlogPosts.map((post, idx) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                category={post.category}
                publishedAt={post.publishedAt}
                readTime={post.readTime}
                image={post.image}
                author={post.author}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <CTASection />
    </div>
  );
}
