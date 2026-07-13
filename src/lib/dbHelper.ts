import fs from "fs";
import path from "path";
import { PricingPlan, Testimonial, BlogPost } from "@/types";

interface DbSchema {
  pricingPlans: PricingPlan[];
  testimonials: Testimonial[];
  blogPosts: BlogPost[];
}

export function getDb(): DbSchema {
  const dbPath = path.join(process.cwd(), "src/data/db.json");
  if (!fs.existsSync(dbPath)) {
    return { pricingPlans: [], testimonials: [], blogPosts: [] };
  }
  try {
    const fileData = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    console.error("Error reading database from helper:", error);
    return { pricingPlans: [], testimonials: [], blogPosts: [] };
  }
}
