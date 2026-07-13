import { MetadataRoute } from "next";
import { blogPosts } from "@/data/siteData";
import { getDb } from "@/lib/dbHelper";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ultimateenterprise.org";
  const db = getDb();
  const currentBlogs = db.blogPosts && db.blogPosts.length > 0 ? db.blogPosts : blogPosts;

  const targetCities = [
    "delhi",
    "noida",
    "gurgaon",
    "mumbai",
    "bangalore",
    "pune",
    "hyderabad",
    "chennai",
    "kolkata",
  ];

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

  // Dynamic location landing page routes
  const locationRoutes = targetCities.flatMap((city) => [
    {
      url: `${baseUrl}/erp-software/${city}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/crm-software/${city}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
  ]);

  return [...staticRoutes, ...blogRoutes, ...locationRoutes];
}
