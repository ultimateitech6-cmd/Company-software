import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, ChevronRight } from "lucide-react";
import { blogPosts } from "@/data/siteData";
import CTASection from "@/components/shared/CTASection";
import type { Metadata } from "next";
import { getDb } from "@/lib/dbHelper";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

// Dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const db = getDb();
  const currentBlogPosts = db.blogPosts && db.blogPosts.length > 0 ? db.blogPosts : blogPosts;
  const post = currentBlogPosts.find((p) => p.slug === slug && p.isPublished !== false);

  if (!post) {
    return {
      title: "Article Not Found | YourCompany Software Solutions",
      description: "This blog article does not exist or has been moved.",
    };
  }

  return {
    title: `${post.title} | YourCompany Software Solutions Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      images: [
        {
          url: post.image,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
  };
}


// Custom Markdown Parser to avoid dependency warnings on React 19
function renderContent(content: string) {
  return content.trim().split("\n\n").map((block, idx) => {
    // Header check
    if (block.startsWith("### ")) {
      return (
        <h3 key={idx} className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">
          {block.replace("### ", "")}
        </h3>
      );
    }
    
    // Header 2 check
    if (block.startsWith("## ")) {
      return (
        <h2 key={idx} className="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-4 border-b border-slate-100 pb-2">
          {block.replace("## ", "")}
        </h2>
      );
    }

    // Bullet list checks
    if (block.startsWith("- ") || block.startsWith("* ")) {
      return (
        <ul key={idx} className="list-disc pl-6 my-4 space-y-2.5 text-slate-650 dark:text-slate-350">
          {block.split("\n").map((line, lIdx) => (
            <li key={lIdx} className="leading-relaxed">
              {line.replace(/^[-*]\s+/, "")}
            </li>
          ))}
        </ul>
      );
    }

    // Ordered list checks
    if (/^\d+\.\s+/.test(block)) {
      return (
        <ol key={idx} className="list-decimal pl-6 my-4 space-y-2.5 text-slate-650 dark:text-slate-350">
          {block.split("\n").map((line, lIdx) => (
            <li key={lIdx} className="leading-relaxed">
              {line.replace(/^\d+\.\s+/, "")}
            </li>
          ))}
        </ol>
      );
    }

    // Paragraph tag fallback
    return (
      <p key={idx} className="text-slate-650 dark:text-slate-350 leading-relaxed mb-5">
        {block}
      </p>
    );
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const db = getDb();
  const currentBlogPosts = db.blogPosts && db.blogPosts.length > 0 ? db.blogPosts : blogPosts;
  const post = currentBlogPosts.find((p) => p.slug === slug && p.isPublished !== false);

  if (!post) {
    notFound();
  }

  // Filter out recent related articles (excluding this one and drafts)
  const relatedPosts = currentBlogPosts.filter((p) => p.slug !== slug && p.isPublished !== false).slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Blog Detail Header Shell */}
      <section className="-mt-20 pt-30 pb-6 md:pt-36 md:pb-8 bg-slate-50 dark:bg-slate-900 border-b border-slate-105 dark:border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog Posts
          </Link>

          <span className="inline-flex items-center px-3 py-1 rounded bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Author line info */}
          <div className="flex items-center gap-4 flex-wrap border-t border-slate-200/80 pt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover bg-slate-100"
            />
            <div className="text-left">
              <span className="block text-sm font-bold text-slate-900 dark:text-white leading-none">
                {post.author.name}
              </span>
              <span className="block text-xs text-slate-500 mt-1 leading-none">
                {post.author.role}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400 md:ml-auto">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.publishedAt}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main post page contents */}
      <section className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Cover image */}
          <div className="aspect-video w-full overflow-hidden rounded-3xl mb-12 shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          {/* Formatted body */}
          <article className="max-w-3xl mx-auto border-b border-slate-100 dark:border-slate-800/80 pb-12">
            {renderContent(post.content)}
          </article>

          {/* Tags */}
          <div className="max-w-3xl mx-auto pt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-500 bg-slate-50 border border-slate-100 dark:bg-slate-900 dark:border-slate-800"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Related Insights & Articles
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <div
                key={relatedPost.slug}
                className="bg-white dark:bg-slate-905 rounded-2xl border border-slate-100 dark:border-slate-800/80 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all group"
              >
                <Link href={`/blog/${relatedPost.slug}`} className="block aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                  />
                </Link>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-indigo-650 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                      {relatedPost.category}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white mt-2.5 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                    </h4>
                  </div>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 mt-4"
                  >
                    Read Post <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-footer CTA */}
      <CTASection />
    </div>
  );
}
