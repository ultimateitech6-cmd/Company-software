import { MetadataRoute } from "next";
import { blogPosts } from "@/data/siteData";
import { getDb } from "@/lib/dbHelper";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ultimateitech.com";
  const db = getDb();
  const currentBlogs = db.blogPosts && db.blogPosts.length > 0 ? db.blogPosts : blogPosts;

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/erp-software",
    "/crm-software",
    "/features",
    "/industries",
    "/pricing",
    "/case-studies",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = currentBlogs.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}
