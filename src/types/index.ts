
export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to look up Lucide icons dynamically
}

export interface ERPModule {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface CRMFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
}

export interface Industry {
  id: string;
  title: string;
  description: string;
  iconName: string;
  benefits: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string; // Markdown or long text
  category: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  tags: string[];
  isPublished?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}
