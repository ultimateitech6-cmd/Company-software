"use client";

import React, { useState, useEffect } from "react";
import {
  Lock,
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  MessageSquare,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  Eye,
  EyeOff,
  Settings,
  Sparkles,
  ExternalLink,
  Save,
  Clock,
  ThumbsUp,
  X,
  Sun,
  Moon,
  Search
} from "lucide-react";
import { PricingPlan, Testimonial, BlogPost } from "@/types";

export default function AdminControlPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const [adminTheme, setAdminTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const saved = localStorage.getItem("adminTheme") as "dark" | "light" | null;
    if (saved) {
      setAdminTheme(saved);
    }
  }, []);

  const toggleAdminTheme = () => {
    const next = adminTheme === "dark" ? "light" : "dark";
    setAdminTheme(next);
    localStorage.setItem("adminTheme", next);
  };

  // Database Data States
  const [dbData, setDbData] = useState<{
    pricingPlans: PricingPlan[];
    testimonials: Testimonial[];
    blogPosts: BlogPost[];
  }>({
    pricingPlans: [],
    testimonials: [],
    blogPosts: []
  });

  // Leads Data States
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingTestimonialAvatar, setUploadingTestimonialAvatar] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "blog" | "avatar") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "blog") setUploadingImage(true);
    else setUploadingAvatar(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (response.ok && data.url) {
        if (type === "blog") {
          setBlogForm(prev => ({ ...prev, image: data.url }));
        } else {
          setBlogForm(prev => ({ ...prev, authorAvatar: data.url }));
        }
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      alert("Error uploading image");
    } finally {
      if (type === "blog") setUploadingImage(false);
      else setUploadingAvatar(false);
    }
  };

  const handleTestimonialAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTestimonialAvatar(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      const data = await response.json();
      if (response.ok && data.url) {
        setTestimonialForm(prev => ({ ...prev, avatar: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err) {
      alert("Error uploading image");
    } finally {
      setUploadingTestimonialAvatar(false);
    }
  };

  // Edit / Form Modals States
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  
  // Search state variables
  const [leadSearchQuery, setLeadSearchQuery] = useState("");
  const [blogSearchQuery, setBlogSearchQuery] = useState("");

  // Blog Edit / Add States
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    description: "",
    slug: "",
    category: "",
    readTime: "",
    image: "",
    content: "",
    tagsString: "",
    authorName: "",
    authorRole: "",
    authorAvatar: "",
    isPublished: true
  });

  // Testimonial Edit / Add States
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    avatar: "",
    rating: 5
  });

  // Pricing Edit States
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [pricingForm, setPricingForm] = useState({
    id: "",
    name: "",
    price: "",
    period: "month",
    description: "",
    ctaText: "",
    isPopular: false,
    featuresString: ""
  });

  // Local Storage Login check
  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setIsAuthenticated(true);
      fetchData(savedToken).finally(() => {
        setIsCheckingAuth(false);
      });
    } else {
      setIsCheckingAuth(false);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("adminToken", data.token);
        setIsAuthenticated(true);
        fetchData(data.token);
      } else {
        setLoginError(data.error || "Incorrect email or password.");
      }
    } catch (err) {
      setLoginError("Server communication failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  // Fetch all databases
  const fetchData = async (authToken?: string) => {
    setLoading(true);
    const token = authToken || localStorage.getItem("adminToken") || "";
    try {
      // 1. Fetch main DB
      const dbResponse = await fetch("/api/db");
      if (dbResponse.ok) {
        const data = await dbResponse.json();
        setDbData(data);
      }

      // 2. Fetch Leads
      const leadsResponse = await fetch("/api/leads", {
        headers: { "x-admin-password": token }
      });
      if (leadsResponse.ok) {
        const leadsData = await leadsResponse.json();
        setLeads(leadsData);
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Save full Database back to server
  const saveDbData = async (updatedDb: typeof dbData) => {
    setIsSaving(true);
    const token = localStorage.getItem("adminToken") || "";
    try {
      const response = await fetch("/api/db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": token
        },
        body: JSON.stringify(updatedDb)
      });
      if (response.ok) {
        setDbData(updatedDb);
        triggerSuccessToast("Changes saved successfully!");
      } else {
        alert("Failed to save changes.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving data.");
    } finally {
      setIsSaving(false);
    }
  };

  const triggerSuccessToast = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  // --- Lead Actions ---
  const updateLeadStatus = async (id: string, newStatus: string) => {
    const token = localStorage.getItem("adminToken") || "";
    try {
      const response = await fetch("/api/leads", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": token
        },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (response.ok) {
        setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
        triggerSuccessToast("Lead status updated!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead inquiry?")) return;
    const token = localStorage.getItem("adminToken") || "";
    try {
      const response = await fetch(`/api/leads?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": token }
      });
      if (response.ok) {
        setLeads(leads.filter(lead => lead.id !== id));
        triggerSuccessToast("Lead deleted.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // --- Pricing Actions ---
  const handleOpenPricingModal = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setPricingForm({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      period: plan.period,
      description: plan.description,
      ctaText: plan.ctaText,
      isPopular: plan.isPopular || false,
      featuresString: plan.features.join("\n")
    });
    setIsPricingModalOpen(true);
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedPlans = dbData.pricingPlans.map(plan => {
      if (plan.id === pricingForm.id) {
        return {
          id: pricingForm.id,
          name: pricingForm.name,
          price: pricingForm.price,
          period: pricingForm.period,
          description: pricingForm.description,
          ctaText: pricingForm.ctaText,
          isPopular: pricingForm.isPopular,
          features: pricingForm.featuresString.split("\n").filter(f => f.trim() !== "")
        };
      }
      return plan;
    });

    const newDb = { ...dbData, pricingPlans: updatedPlans };
    saveDbData(newDb);
    setIsPricingModalOpen(false);
  };

  // --- Blog Actions ---
  const handleOpenBlogModal = (blog: BlogPost | null = null) => {
    if (blog) {
      setEditingBlog(blog);
      setBlogForm({
        title: blog.title,
        description: blog.description,
        slug: blog.slug,
        category: blog.category,
        readTime: blog.readTime,
        image: blog.image,
        content: blog.content,
        tagsString: blog.tags.join(", "),
        authorName: blog.author.name,
        authorRole: blog.author.role,
        authorAvatar: blog.author.avatar,
        isPublished: blog.isPublished !== false
      });
    } else {
      setEditingBlog(null);
      setBlogForm({
        title: "",
        description: "",
        slug: "",
        category: "ERP & Operations",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
        content: "",
        tagsString: "ERP, Automation",
        authorName: "Admin Specialist",
        authorRole: "Technical Editor",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
        isPublished: true
      });
    }
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.slug) {
      alert("Title and Slug are required!");
      return;
    }

    const formattedBlog: BlogPost = {
      slug: blogForm.slug.trim().toLowerCase().replace(/\s+/g, "-"),
      title: blogForm.title,
      description: blogForm.description,
      category: blogForm.category,
      publishedAt: editingBlog ? editingBlog.publishedAt : new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: blogForm.readTime,
      image: blogForm.image,
      tags: blogForm.tagsString.split(",").map(t => t.trim()).filter(t => t !== ""),
      content: blogForm.content,
      author: {
        name: blogForm.authorName,
        role: blogForm.authorRole,
        avatar: blogForm.authorAvatar
      },
      isPublished: blogForm.isPublished
    };

    let updatedBlogs = [...dbData.blogPosts];
    if (editingBlog) {
      updatedBlogs = updatedBlogs.map(b => b.slug === editingBlog.slug ? formattedBlog : b);
    } else {
      // Check duplicate slug
      if (updatedBlogs.some(b => b.slug === formattedBlog.slug)) {
        alert("A blog post with this URL slug already exists!");
        return;
      }
      updatedBlogs.unshift(formattedBlog);
    }

    const newDb = { ...dbData, blogPosts: updatedBlogs };
    saveDbData(newDb);
    setIsBlogModalOpen(false);
  };

  const handleDeleteBlog = (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    const updatedBlogs = dbData.blogPosts.filter(b => b.slug !== slug);
    const newDb = { ...dbData, blogPosts: updatedBlogs };
    saveDbData(newDb);
  };

  // --- Testimonial Actions ---
  const handleOpenTestimonialModal = (test: Testimonial | null = null) => {
    if (test) {
      setEditingTestimonial(test);
      setTestimonialForm({
        name: test.name,
        role: test.role,
        company: test.company,
        content: test.content,
        avatar: test.avatar,
        rating: test.rating
      });
    } else {
      setEditingTestimonial(null);
      setTestimonialForm({
        name: "",
        role: "",
        company: "",
        content: "",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        rating: 5
      });
    }
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedTest: Testimonial = {
      id: editingTestimonial ? editingTestimonial.id : "t-" + Date.now(),
      name: testimonialForm.name,
      role: testimonialForm.role,
      company: testimonialForm.company,
      content: testimonialForm.content,
      avatar: testimonialForm.avatar,
      rating: Number(testimonialForm.rating)
    };

    let updatedTests = [...dbData.testimonials];
    if (editingTestimonial) {
      updatedTests = updatedTests.map(t => t.id === editingTestimonial.id ? formattedTest : t);
    } else {
      updatedTests.push(formattedTest);
    }

    const newDb = { ...dbData, testimonials: updatedTests };
    saveDbData(newDb);
    setIsTestimonialModalOpen(false);
  };

  const handleDeleteTestimonial = (id: string) => {
    if (!confirm("Are you sure you want to delete this client review?")) return;
    const updatedTests = dbData.testimonials.filter(t => t.id !== id);
    const newDb = { ...dbData, testimonials: updatedTests };
    saveDbData(newDb);
  };

  // --- lead pipeline breakdown metrics ---
  const newLeadsCount = leads.filter(l => l.status === "New" || !l.status).length;
  const contactedLeadsCount = leads.filter(l => l.status === "Contacted").length;
  const repliedLeadsCount = leads.filter(l => l.status === "Replied").length;
  const totalLeads = leads.length || 1;
  const newPercent = Math.round((newLeadsCount / totalLeads) * 100);
  const contactedPercent = Math.round((contactedLeadsCount / totalLeads) * 100);
  const repliedPercent = Math.round((repliedLeadsCount / totalLeads) * 100);

  // --- AUTH CHECK LOADING STATE ---
  if (isCheckingAuth) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 relative font-sans transition-colors duration-300 ${
        adminTheme === "dark" ? "bg-slate-950" : "bg-slate-50"
      }`}>
        <div className="w-8 h-8 border-4 border-indigo-650/20 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  // --- PASSWORD PROTECTION SCREEN ---
  if (!isAuthenticated) {
    const isDark = adminTheme === "dark";
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden font-sans transition-colors duration-300 ${
        isDark ? "bg-slate-950" : "bg-slate-50"
      }`}>
        {/* Floating Theme Switcher */}
        <div className="absolute top-6 left-6 z-30">
          <button
            onClick={toggleAdminTheme}
            type="button"
            className={`p-2.5 rounded-xl border transition-all cursor-pointer hover:scale-105 shadow-md flex items-center justify-center ${
              isDark 
                ? "bg-slate-900 border-slate-800 text-yellow-400 hover:bg-slate-850" 
                : "bg-white border-slate-200 text-indigo-600 hover:bg-slate-100"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>
        </div>

        {/* Abstract Glowing Rings */}
        <div className={`absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full blur-[120px] -z-10 transition-colors duration-300 ${
          isDark ? "bg-indigo-900/10" : "bg-indigo-500/5"
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full blur-[100px] -z-10 transition-colors duration-300 ${
          isDark ? "bg-emerald-950/10" : "bg-emerald-500/5"
        }`} />

        <div className={`w-full max-w-md border rounded-3xl p-8 relative transition-all duration-300 ${
          isDark 
            ? "bg-slate-900/40 backdrop-blur-xl border-slate-800/80 text-white shadow-2xl shadow-slate-950/80" 
            : "bg-white/80 backdrop-blur-xl border-slate-200/90 text-slate-900 shadow-xl shadow-slate-200/50"
        }`}>
          <div className="absolute top-0 right-0 p-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border transition-colors ${
              isDark 
                ? "text-indigo-400 bg-slate-850/60 border-slate-700/60" 
                : "text-indigo-600 bg-indigo-50 border-indigo-100"
            }`}>
              <Sparkles className="w-3 h-3" /> Secure Access
            </span>
          </div>

          <div className="text-center space-y-3 mb-8 mt-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto shadow-inner border transition-colors ${
              isDark 
                ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400" 
                : "bg-indigo-50 border-indigo-100 text-indigo-600"
            }`}>
              <Lock className="w-6 h-6" />
            </div>
            <h2 className={`text-2xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>Admin Console</h2>
            <p className={`text-xs leading-relaxed max-w-xs mx-auto ${isDark ? "text-slate-450" : "text-slate-500"}`}>
              Please enter your company software decryption credentials to access system parameters.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <label className={`block text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ultimate.com"
                className={`w-full px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/80 border transition-all duration-200 ${
                  isDark 
                    ? "bg-slate-950 border-slate-800 text-white placeholder-slate-700" 
                    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-450"
                }`}
              />
            </div>

            <div className="space-y-1.5 text-left">
              <label className={`block text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className={`w-full pl-4 pr-10 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/80 border transition-all duration-200 ${
                    isDark 
                      ? "bg-slate-950 border-slate-800 text-white placeholder-slate-700" 
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-450"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer transition-colors ${
                    isDark ? "text-slate-450 hover:text-white" : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className={`w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-850 hover:from-indigo-550 hover:to-indigo-800 text-white rounded-xl font-bold text-sm transition-all hover:-translate-y-0.5 cursor-pointer mt-2 ${
                isDark ? "shadow-lg shadow-indigo-950/50" : "shadow-md shadow-indigo-500/10"
              }`}
            >
              Verify Credentials & Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- MAIN AUTHENTICATED ADMIN DASHBOARD SCREEN ---
  return (
    <div className={`h-screen overflow-hidden flex flex-col md:flex-row font-sans relative transition-colors duration-300 ${
      adminTheme === "dark" 
        ? "bg-slate-950 text-slate-100" 
        : "bg-slate-50 text-slate-900"
    }`}>
      {/* Dynamic Saving Indicator Toast */}
      {isSaving && (
        <div className={`fixed bottom-6 right-6 border p-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-pulse ${
          adminTheme === "dark" ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
        }`}>
          <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-ping" />
          <span className="text-xs font-semibold">Synchronizing database...</span>
        </div>
      )}

      {successMessage && (
        <div className={`fixed bottom-6 right-6 border p-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 ${
          adminTheme === "dark" ? "bg-slate-900 border-emerald-500/25 text-slate-350" : "bg-white border-emerald-500/30 text-slate-700"
        }`}>
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-xs font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`w-full md:w-64 h-full overflow-y-auto flex flex-col justify-between flex-shrink-0 z-20 border-b md:border-b-0 md:border-r transition-colors duration-300 ${
        adminTheme === "dark" 
          ? "bg-slate-900/50 backdrop-blur-xl border-slate-800/80" 
          : "bg-white border-slate-200"
      }`}>
        <div className="p-6">
          <div className="mb-8 -mx-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={adminTheme === "dark" ? "/ultimate-itech-logo-white-v2.png" : "/ultimate-itech-logo-dark-v2.png"}
              alt="Ultimate Admin Logo"
              className="h-12 md:h-15 lg:h-18 w-auto object-contain contrast-[1.10] px-2"
              style={{ imageRendering: "-webkit-optimize-contrast" }}
            />
          </div>

          <nav className="space-y-1.5">
            {[
              { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
              { id: "leads", label: "Client Inquiries", icon: Users, badge: leads.length },
              { id: "pricing", label: "Pricing Editors", icon: CreditCard },
              { id: "blogs", label: "Blog Editor", icon: FileText, badge: dbData.blogPosts.length },
              { id: "testimonials", label: "Testimonials", icon: MessageSquare }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-indigo-650 text-white shadow-lg shadow-indigo-950/50"
                      : adminTheme === "dark"
                      ? "text-slate-400 hover:text-white hover:bg-slate-850/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </span>
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${
                      isActive ? "bg-white text-indigo-950" : "bg-slate-800 text-slate-300"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className={`p-6 border-t ${adminTheme === "dark" ? "border-slate-850" : "border-slate-200"}`}>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
              adminTheme === "dark" 
                ? "text-slate-450 hover:text-rose-450 hover:bg-rose-500/10" 
                : "text-slate-600 hover:text-rose-600 hover:bg-rose-500/5"
            }`}
          >
            <LogOut className="w-4 h-4" />
            Lock Console
          </button>
        </div>
      </aside>

      {/* Main Workspace Panel */}
      <main className="flex-1 h-full flex flex-col overflow-hidden w-full z-10 max-w-7xl mx-auto px-6 py-4 md:px-8 md:py-5">
        
        {/* Main Workspace Header (Fixed top nav) */}
        <header className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-3 mb-4 flex-shrink-0 transition-colors duration-300 ${
          adminTheme === "dark" ? "border-slate-800/80" : "border-slate-200"
        }`}>
          <div>
            <h2 className={`text-xl md:text-2xl font-black tracking-tight capitalize ${
              adminTheme === "dark" ? "text-white" : "text-slate-900"
            }`}>
              {activeTab === "overview" ? "Dashboard Command Center" : `${activeTab} Management`}
            </h2>
            <p className={`text-xs mt-0.5 ${adminTheme === "dark" ? "text-slate-455" : "text-slate-500"}`}>
              Edit public components, manage database files, and track warm client queries.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={toggleAdminTheme}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                adminTheme === "dark"
                  ? "bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-850"
                  : "bg-white border-slate-200 text-indigo-650 hover:text-indigo-850 hover:bg-slate-50"
              }`}
              title={adminTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {adminTheme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => fetchData()}
              disabled={loading}
              className={`px-3 py-1.5 border rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50 ${
                adminTheme === "dark" 
                  ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white" 
                  : "bg-white border-slate-200 text-slate-700 hover:text-slate-955 hover:bg-slate-50"
              }`}
            >
              {loading ? "Refreshing..." : "Sync Database"}
            </button>
            <a
              href="/"
              target="_blank"
              className="px-3 py-1.5 bg-indigo-650/10 hover:bg-indigo-650/20 border border-indigo-500/25 rounded-xl text-xs font-bold text-indigo-400 transition-colors flex items-center gap-1.5"
            >
              Visit Website <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Scrollable Workspace Body */}
        <div className="flex-1 overflow-y-auto pr-1 pb-4 no-scrollbar">
          {loading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div>
            {/* --- TAB 1: OVERVIEW PANEL --- */}
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Visual Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Pending Leads", val: leads.length, icon: Users, desc: "Form submissions", color: "text-emerald-500" },
                    { label: "Pricing Options", val: dbData.pricingPlans.length, icon: CreditCard, desc: "Public plans", color: "text-indigo-400" },
                    { label: "Blog Insights", val: dbData.blogPosts.length, icon: FileText, desc: "Articles active", color: "text-blue-400" },
                    { label: "Testimonials", val: dbData.testimonials.length, icon: MessageSquare, desc: "Social proof quotes", color: "text-purple-400" }
                  ].map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                      <div key={idx} className={`border rounded-2xl p-5 shadow-sm space-y-2 ${
                        adminTheme === "dark" ? "bg-slate-900/40 border-slate-850/80" : "bg-white border-slate-200"
                      }`}>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                          <Icon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <div className={`text-2xl font-black ${adminTheme === "dark" ? "text-white" : "text-slate-900"}`}>{stat.val}</div>
                        <p className={`text-[10px] ${adminTheme === "dark" ? "text-slate-450" : "text-slate-500"}`}>{stat.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* SVG Lead Chart Layout */}
                  <div className={`lg:col-span-2 border rounded-2xl p-5 shadow-sm space-y-3 ${
                    adminTheme === "dark" ? "bg-slate-900/40 border-slate-850/80" : "bg-white border-slate-200"
                  }`}>
                    <h3 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 ${
                      adminTheme === "dark" ? "text-slate-400" : "text-slate-650"
                    }`}>
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Lead Submission Analytics (Mock)
                    </h3>
                    
                    {/* SVG Chart */}
                    <div className="h-44 w-full flex items-end justify-between pt-4 px-2">
                      {[15, 30, 24, 45, 55, 38, 62].map((height, i) => (
                        <div key={i} className="flex flex-col items-center gap-2.5 w-[10%]">
                          <div className={`w-full rounded-lg overflow-hidden h-32 flex items-end ${
                            adminTheme === "dark" ? "bg-slate-850" : "bg-slate-100"
                          }`}>
                            <div 
                              className="w-full bg-gradient-to-t from-indigo-850 to-indigo-550 rounded-lg hover:opacity-80 transition-opacity" 
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <span className="text-[9px] text-slate-500 font-bold">Day {i+1}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lead Pipeline Breakdown Visual Chart */}
                  <div className={`lg:col-span-1 border rounded-2xl p-5 shadow-sm space-y-4 ${
                    adminTheme === "dark" ? "bg-slate-900/40 border-slate-850/80" : "bg-white border-slate-200"
                  }`}>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Pipeline Breakdown
                    </h3>
                    
                    <div className="space-y-3.5 pt-2">
                      {/* Metric 1: New */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className={`${adminTheme === "dark" ? "text-indigo-400" : "text-indigo-650"}`}>New Leads</span>
                          <span className="text-slate-500">{newLeadsCount} ({newPercent}%)</span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${adminTheme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}>
                          <div 
                            className="h-full bg-indigo-500 rounded-full transition-all duration-500" 
                            style={{ width: `${newPercent}%` }} 
                          />
                        </div>
                      </div>

                      {/* Metric 2: Contacted */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className={`${adminTheme === "dark" ? "text-amber-400" : "text-amber-650"}`}>In Contact</span>
                          <span className="text-slate-500">{contactedLeadsCount} ({contactedPercent}%)</span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${adminTheme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}>
                          <div 
                            className="h-full bg-amber-500 rounded-full transition-all duration-500" 
                            style={{ width: `${contactedPercent}%` }} 
                          />
                        </div>
                      </div>

                      {/* Metric 3: Replied */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span className={`${adminTheme === "dark" ? "text-emerald-400" : "text-emerald-650"}`}>Replied / Resolved</span>
                          <span className="text-slate-500">{repliedLeadsCount} ({repliedPercent}%)</span>
                        </div>
                        <div className={`w-full h-2 rounded-full overflow-hidden ${adminTheme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}>
                          <div 
                            className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                            style={{ width: `${repliedPercent}%` }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity summary (Full width row) */}
                  <div className={`lg:col-span-3 border rounded-2xl p-5 shadow-sm space-y-4 ${
                    adminTheme === "dark" ? "bg-slate-900/40 border-slate-850/80" : "bg-white border-slate-200"
                  }`}>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Latest Inquiries
                    </h3>
                    {leads.length === 0 ? (
                      <p className="text-xs text-slate-500">No recent leads found.</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {leads.slice(0, 3).map((lead) => (
                          <div key={lead.id} className={`p-3 rounded-xl border border-l-2 border-l-indigo-500 flex justify-between items-start ${
                            adminTheme === "dark" ? "bg-slate-955/60 border-slate-850" : "bg-slate-50 border-slate-200"
                          }`}>
                            <div>
                              <h4 className={`text-xs font-bold ${adminTheme === "dark" ? "text-white" : "text-slate-900"}`}>{lead.name}</h4>
                              <p className={`text-[10px] mt-1 truncate max-w-[150px] ${
                                adminTheme === "dark" ? "text-slate-450" : "text-slate-500"
                              }`}>{lead.email}</p>
                            </div>
                            <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                              lead.status === "New" 
                                ? "bg-indigo-500/10 text-indigo-400" 
                                : lead.status === "Contacted" 
                                  ? "bg-amber-500/10 text-amber-400" 
                                  : "bg-emerald-500/10 text-emerald-400"
                            }`}>
                              {lead.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

             {/* --- TAB 2: LEADS CONTROL --- */}
            {activeTab === "leads" && (
              <div className="space-y-4">
                {/* Search Bar */}
                <div className="relative max-w-xs">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search inquiries by client name or email..."
                    value={leadSearchQuery}
                    onChange={(e) => setLeadSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                      adminTheme === "dark" 
                        ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500" 
                        : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                </div>

                <div className={`border rounded-2xl overflow-hidden shadow-sm transition-colors ${
                  adminTheme === "dark" ? "bg-slate-900/40 border-slate-850/80" : "bg-white border-slate-200"
                }`}>
                  {leads.length === 0 ? (
                    <div className="p-12 text-center text-slate-500 text-xs">
                      No customer leads in database. Add inquiries using your contact/demo forms.
                    </div>
                  ) : (
                    (() => {
                      const filtered = leads.filter(l => {
                        const q = leadSearchQuery.toLowerCase().trim();
                        return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.message.toLowerCase().includes(q);
                      });
                      if (filtered.length === 0) {
                        return (
                          <div className="p-12 text-center text-slate-500 text-xs">
                            No matching leads found for "{leadSearchQuery}".
                          </div>
                        );
                      }
                      return (
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className={`border-b font-bold uppercase tracking-wider text-[10px] ${
                                adminTheme === "dark" ? "border-slate-800 bg-slate-850/40 text-slate-450" : "border-slate-200 bg-slate-100 text-slate-600"
                              }`}>
                                <th className="p-4">Client Contact</th>
                                <th className="p-4">Inquiry Excerpt</th>
                                <th className="p-4">Received At</th>
                                <th className="p-4">Status Flag</th>
                                <th className="p-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className={`divide-y ${adminTheme === "dark" ? "divide-slate-850" : "divide-slate-200"}`}>
                              {filtered.map((lead) => (
                                <tr key={lead.id} className={`transition-colors ${
                                  adminTheme === "dark" ? "hover:bg-slate-900/30" : "hover:bg-slate-50"
                                }`}>
                                  <td className="p-4">
                                    <span className={`font-bold block ${adminTheme === "dark" ? "text-white" : "text-slate-900"}`}>{lead.name}</span>
                                    <span className={`text-[10px] block mt-0.5 ${adminTheme === "dark" ? "text-slate-450" : "text-slate-500"}`}>{lead.email}</span>
                                  </td>
                                  <td className={`p-4 max-w-xs truncate font-medium ${adminTheme === "dark" ? "text-slate-350" : "text-slate-700"}`}>
                                    {lead.message}
                                  </td>
                                  <td className={`p-4 text-[10px] ${adminTheme === "dark" ? "text-slate-450" : "text-slate-500"}`}>
                                    {new Date(lead.createdAt).toLocaleString()}
                                  </td>
                                  <td className="p-4">
                                    <select
                                      value={lead.status}
                                      onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                                      className={`px-2.5 py-1 rounded font-bold text-[9px] border focus:outline-none cursor-pointer tracking-wider uppercase ${
                                        lead.status === "New"
                                          ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                                          : lead.status === "Contacted"
                                            ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                                            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                      }`}
                                    >
                                      <option value="New" className={adminTheme === "dark" ? "bg-slate-900 text-indigo-400" : "bg-white text-indigo-650"}>New</option>
                                      <option value="Contacted" className={adminTheme === "dark" ? "bg-slate-900 text-amber-400" : "bg-white text-amber-650"}>Contacted</option>
                                      <option value="Replied" className={adminTheme === "dark" ? "bg-slate-900 text-emerald-400" : "bg-white text-emerald-650"}>Replied</option>
                                    </select>
                                  </td>
                                  <td className="p-4 text-right space-x-2">
                                    <button
                                      onClick={() => setSelectedLead(lead)}
                                      className={`p-1.5 rounded transition-colors cursor-pointer inline-flex items-center ${
                                        adminTheme === "dark" ? "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-650 hover:text-slate-955"
                                      }`}
                                      title="View message details"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => deleteLead(lead.id)}
                                      className="p-1.5 bg-rose-500/10 hover:bg-rose-500/25 rounded text-rose-455 transition-colors cursor-pointer inline-flex items-center"
                                      title="Delete inquiry"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()
                  )}
                </div>
              </div>
            )}

            {/* --- TAB 3: PRICING PLANS EDITOR --- */}
            {activeTab === "pricing" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {dbData.pricingPlans.map((plan) => (
                  <div key={plan.id} className={`border rounded-3xl p-6 flex flex-col justify-between shadow-sm relative transition-colors ${
                    plan.isPopular 
                      ? "border-indigo-500/50" 
                      : adminTheme === "dark" 
                        ? "border-slate-850/80" 
                        : "border-slate-200"
                  } ${adminTheme === "dark" ? "bg-slate-900/40" : "bg-white"}`}>
                    {plan.isPopular && (
                      <span className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[9px] font-black uppercase bg-indigo-500 text-white tracking-widest">
                        Popular Choice
                      </span>
                    )}

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className={`text-lg font-black ${adminTheme === "dark" ? "text-white" : "text-slate-900"}`}>{plan.name}</h3>
                          <p className={`text-xs mt-1 leading-relaxed ${adminTheme === "dark" ? "text-slate-400" : "text-slate-600"}`}>{plan.description}</p>
                        </div>
                        <button
                          onClick={() => handleOpenPricingModal(plan)}
                          className="p-1.5 bg-indigo-650/10 hover:bg-indigo-650/20 text-indigo-400 rounded-lg border border-indigo-500/25 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className={`border-t pt-4 flex items-baseline gap-1 ${adminTheme === "dark" ? "border-slate-850" : "border-slate-200"}`}>
                        <span className={`text-3xl font-black ${adminTheme === "dark" ? "text-white" : "text-slate-900"}`}>{plan.price}</span>
                        <span className="text-xs text-slate-500">/ {plan.period}</span>
                      </div>

                      <ul className={`space-y-2.5 pt-4 text-xs ${adminTheme === "dark" ? "text-slate-350" : "text-slate-700"}`}>
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex gap-2 items-start">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={`mt-8 pt-4 border-t ${adminTheme === "dark" ? "border-slate-850" : "border-slate-200"}`}>
                      <span className={`w-full text-center py-2.5 rounded-xl border text-xs font-bold block ${
                        adminTheme === "dark" 
                          ? "border-slate-800 text-slate-300 bg-slate-950/40" 
                          : "border-slate-200 text-slate-700 bg-slate-100"
                      }`}>
                        {plan.ctaText}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* --- TAB 4: BLOGS EDITOR --- */}
            {activeTab === "blogs" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  {/* Search Bar */}
                  <div className="relative max-w-xs flex-1">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search articles by title, category, tags..."
                      value={blogSearchQuery}
                      onChange={(e) => setBlogSearchQuery(e.target.value)}
                      className={`w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                        adminTheme === "dark" 
                          ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500" 
                          : "bg-white border-slate-200 text-slate-900 placeholder-slate-400"
                      }`}
                    />
                  </div>

                  <button
                    onClick={() => handleOpenBlogModal(null)}
                    className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer flex-shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Create New Article
                  </button>
                </div>

                {(() => {
                  const filtered = dbData.blogPosts.filter(post => {
                    const q = blogSearchQuery.toLowerCase().trim();
                    return (
                      post.title.toLowerCase().includes(q) ||
                      post.category.toLowerCase().includes(q) ||
                      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(q)))
                    );
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="p-12 text-center text-slate-500 text-xs">
                        No articles match search term "{blogSearchQuery}".
                      </div>
                    );
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filtered.map((post) => (
                        <div key={post.slug} className={`border rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group transition-colors duration-300 ${
                          adminTheme === "dark" ? "bg-slate-900/40 border-slate-855/80" : "bg-white border-slate-200"
                        }`}>
                          <div className={`aspect-video relative overflow-hidden ${
                            adminTheme === "dark" ? "bg-slate-955" : "bg-slate-100"
                          }`}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                            />
                            <span className="absolute top-3 left-3 bg-indigo-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                              {post.category}
                            </span>
                            <span className={`absolute top-3 right-3 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${
                              post.isPublished !== false 
                                ? "bg-emerald-500/90 text-white" 
                                : "bg-amber-500/90 text-white"
                            }`}>
                              {post.isPublished !== false ? "Published" : "Draft"}
                            </span>
                          </div>

                          <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                            <div className="space-y-1.5">
                              <span className="text-[9px] text-slate-500 font-bold flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" /> {post.publishedAt}
                              </span>
                              <h4 className={`font-bold leading-snug line-clamp-2 text-xs md:text-sm ${adminTheme === "dark" ? "text-white" : "text-slate-900"}`}>{post.title}</h4>
                              <p className={`text-[11px] line-clamp-2 leading-relaxed ${adminTheme === "dark" ? "text-slate-455" : "text-slate-600"}`}>{post.description}</p>
                            </div>

                            <div className={`pt-3 border-t flex justify-between items-center ${adminTheme === "dark" ? "border-slate-850" : "border-slate-200"}`}>
                              <span className="text-[9px] text-slate-500 font-bold">{post.readTime}</span>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleOpenBlogModal(post)}
                                  className="p-1.5 bg-indigo-650/10 hover:bg-indigo-650/20 text-indigo-400 rounded border border-indigo-500/25 transition-colors cursor-pointer"
                                  title="Edit post"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(post.slug)}
                                  className="p-1.5 bg-rose-500/10 hover:bg-rose-500/25 text-rose-450 rounded border border-rose-500/25 transition-colors cursor-pointer"
                                  title="Delete post"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* --- TAB 5: TESTIMONIALS EDITOR --- */}
            {activeTab === "testimonials" && (
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={() => handleOpenTestimonialModal(null)}
                    className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Testimonial Quote
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {dbData.testimonials.map((test) => (
                    <div key={test.id} className={`border rounded-2xl p-4.5 flex flex-col justify-between shadow-sm transition-colors duration-300 ${
                      adminTheme === "dark" ? "bg-slate-900/40 border-slate-850/80" : "bg-white border-slate-200"
                    }`}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {Array.from({ length: test.rating }).map((_, i) => (
                            <span key={i} className="text-xs">★</span>
                          ))}
                        </div>

                        <p className={`text-[11.5px] leading-relaxed font-medium italic ${
                          adminTheme === "dark" ? "text-slate-350" : "text-slate-700"
                        }`}>
                          "{test.content}"
                        </p>
                      </div>

                      <div className={`pt-4 mt-5 border-t flex items-center justify-between ${
                        adminTheme === "dark" ? "border-slate-850" : "border-slate-200"
                      }`}>
                        <div className="flex items-center gap-2.5">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={test.avatar}
                            alt={test.name}
                            className={`w-8 h-8 rounded-full object-cover ${adminTheme === "dark" ? "bg-slate-955" : "bg-slate-100"}`}
                          />
                          <div className="text-left">
                            <h4 className={`text-[11px] font-bold leading-none ${adminTheme === "dark" ? "text-white" : "text-slate-900"}`}>{test.name}</h4>
                            <span className="text-[9.5px] text-slate-500 mt-1 block leading-none">
                              {test.role}, {test.company}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleOpenTestimonialModal(test)}
                            className="p-1 bg-indigo-650/10 hover:bg-indigo-650/20 text-indigo-400 rounded border border-indigo-500/20 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTestimonial(test.id)}
                            className="p-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded border border-rose-500/20 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
          )}
        </div>
      </main>

      {/* --- POPUP MODAL 1: VIEW LEAD DETAILS --- */}
      {selectedLead && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-black uppercase bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-2.5 py-0.5 rounded tracking-widest">
                  Lead Details
                </span>
                <h3 className="text-lg font-black text-white mt-2">{selectedLead.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs border-y border-slate-850 py-4">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                <span className="font-bold">Email:</span>
                <a href={`mailto:${selectedLead.email}`} className="text-indigo-400 hover:underline">{selectedLead.email}</a>
              </div>
              {selectedLead.phone && (
                <div className="flex items-center gap-2 text-slate-400">
                  <Phone className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                  <span className="font-bold">Phone:</span>
                  <a href={`tel:${selectedLead.phone}`} className="text-slate-300 hover:underline">{selectedLead.phone}</a>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4 flex-shrink-0 text-indigo-400" />
                <span className="font-bold">Submitted At:</span>
                <span className="text-slate-300">{new Date(selectedLead.createdAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="block text-[10px] font-bold text-slate-450 uppercase tracking-widest">Inquiry Message</span>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-850 leading-relaxed text-slate-300 whitespace-pre-wrap font-medium">
                {selectedLead.message}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <select
                value={selectedLead.status}
                onChange={(e) => {
                  updateLeadStatus(selectedLead.id, e.target.value);
                  setSelectedLead({ ...selectedLead, status: e.target.value });
                }}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="New">Status: New</option>
                <option value="Contacted">Status: Contacted</option>
                <option value="Replied">Status: Replied</option>
              </select>
              <a
                href={`mailto:${selectedLead.email}?subject=Regarding your inquiry at Ultimate Software&body=Hi ${selectedLead.name},%0D%0DThank you for reaching out to us. Regarding your message:%0D%0D"${selectedLead.message}"%0D%0D`}
                onClick={() => {
                  if (selectedLead.status === "New") {
                    updateLeadStatus(selectedLead.id, "Contacted");
                    setSelectedLead({ ...selectedLead, status: "Contacted" });
                  }
                }}
                className="px-4 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" /> Email Reply
              </a>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- POPUP MODAL 2: PRICING EDITOR FORM --- */}
      {isPricingModalOpen && editingPlan && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-black text-white">Edit {editingPlan.name} Parameters</h3>
              <button 
                onClick={() => setIsPricingModalOpen(false)}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePricing} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plan Name</label>
                  <input
                    type="text"
                    required
                    value={pricingForm.name}
                    onChange={(e) => setPricingForm({ ...pricingForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-955 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price Display</label>
                  <input
                    type="text"
                    required
                    value={pricingForm.price}
                    onChange={(e) => setPricingForm({ ...pricingForm, price: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-955 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. $99, Custom"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing Period</label>
                  <input
                    type="text"
                    required
                    value={pricingForm.period}
                    onChange={(e) => setPricingForm({ ...pricingForm, period: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-955 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. month, year"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">CTA Button Text</label>
                  <input
                    type="text"
                    required
                    value={pricingForm.ctaText}
                    onChange={(e) => setPricingForm({ ...pricingForm, ctaText: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-955 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Brief Description</label>
                <textarea
                  required
                  rows={2}
                  value={pricingForm.description}
                  onChange={(e) => setPricingForm({ ...pricingForm, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-955 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Plan Features (One per line)
                </label>
                <textarea
                  required
                  rows={4}
                  value={pricingForm.featuresString}
                  onChange={(e) => setPricingForm({ ...pricingForm, featuresString: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-955 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="isPopular"
                  checked={pricingForm.isPopular}
                  onChange={(e) => setPricingForm({ ...pricingForm, isPopular: e.target.checked })}
                  className="w-4 h-4 accent-indigo-650 cursor-pointer"
                />
                <label htmlFor="isPopular" className="font-bold text-slate-350 cursor-pointer select-none">
                  Highlight this plan as "Popular / Recommended"
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsPricingModalOpen(false)}
                  className="px-4 py-2 bg-slate-950 border border-slate-850 rounded-xl font-bold cursor-pointer hover:bg-slate-900 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Save Pricing Parameters
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- POPUP MODAL 3: BLOG EDITOR FORM --- */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl my-4">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-black text-white">
                {editingBlog ? `Edit Post: ${editingBlog.title}` : "Compose New Insight Post"}
              </h3>
              <button 
                onClick={() => setIsBlogModalOpen(false)}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-2.5 text-[11px]">
              {/* Row 1: Title and Category */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="col-span-2 space-y-0.5">
                  <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Blog Title</label>
                  <input
                    type="text"
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. ERP benefits in logistics"
                  />
                </div>
                <div className="col-span-1 space-y-0.5">
                  <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Category</label>
                  <input
                    type="text"
                    required
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Row 2: Slug, Read Time, Tags */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="space-y-0.5">
                  <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">URL Slug</label>
                  <input
                    type="text"
                    required
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50"
                    placeholder="e.g. erp-benefits"
                    disabled={!!editingBlog}
                  />
                </div>
                <div className="space-y-0.5">
                  <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Read Time</label>
                  <input
                    type="text"
                    required
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. 5 min read"
                  />
                </div>
                <div className="space-y-0.5">
                  <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Tags (Comma split)</label>
                  <input
                    type="text"
                    required
                    value={blogForm.tagsString}
                    onChange={(e) => setBlogForm({ ...blogForm, tagsString: e.target.value })}
                    className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. ERP, Automation"
                  />
                </div>
              </div>

              {/* Row 3: Cover Image with Upload Button & Action Icons */}
              <div className="space-y-1">
                <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Cover Image</label>
                <div className="flex gap-1.5 items-center">
                  <input
                    type="text"
                    required
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    className="flex-1 px-2.5 py-1 bg-slate-955 border border-slate-850/80 rounded-lg text-white text-[11px] focus:outline-none"
                    placeholder="Enter image URL or upload"
                  />
                  <label className="px-2.5 py-1 bg-indigo-650 hover:bg-indigo-550 text-white rounded-lg font-bold text-[10px] flex items-center justify-center cursor-pointer transition-colors whitespace-nowrap">
                    {uploadingImage ? "Uploading..." : "Upload File"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "blog")}
                      className="hidden"
                    />
                  </label>
                  {blogForm.image && (
                    <div className="flex gap-1 flex-shrink-0">
                      <a
                        href={blogForm.image}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 rounded border border-slate-700/60"
                        title="View image"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setBlogForm(prev => ({ ...prev, image: "" }))}
                        className="p-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-350 rounded border border-rose-500/20 cursor-pointer"
                        title="Clear image"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Row 4: Short Description */}
              <div className="space-y-1">
                <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={blogForm.description}
                  onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                  className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-[11px]"
                />
              </div>

              {/* Row 5: Main Content Text */}
              <div className="space-y-1">
                <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                  Main Content Text (Markdown)
                </label>
                <textarea
                  required
                  rows={4}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono leading-normal text-[11px]"
                  placeholder="### Section Header&#10;&#10;Paragraph text goes here."
                />
              </div>

              {/* Row 6: Author Info & Author Avatar with Action Icons */}
              <div className="border-t border-slate-850 pt-2.5 mt-1.5 space-y-2">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-0.5">
                    <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Author Name</label>
                    <input
                      type="text"
                      required
                      value={blogForm.authorName}
                      onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                      className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px]"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Author Role</label>
                    <input
                      type="text"
                      required
                      value={blogForm.authorRole}
                      onChange={(e) => setBlogForm({ ...blogForm, authorRole: e.target.value })}
                      className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest">Author Avatar</label>
                  <div className="flex gap-1.5 items-center">
                    <input
                      type="text"
                      required
                      value={blogForm.authorAvatar}
                      onChange={(e) => setBlogForm({ ...blogForm, authorAvatar: e.target.value })}
                      className="flex-1 px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none"
                      placeholder="Enter avatar URL or upload"
                    />
                    <label className="px-2.5 py-1 bg-indigo-650/20 hover:bg-indigo-650/30 text-indigo-400 border border-indigo-500/20 rounded-lg font-bold text-[10px] flex items-center justify-center cursor-pointer transition-colors whitespace-nowrap">
                      {uploadingAvatar ? "Uploading..." : "Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "avatar")}
                        className="hidden"
                      />
                    </label>
                    {blogForm.authorAvatar && (
                      <div className="flex gap-1 flex-shrink-0">
                        <a
                          href={blogForm.authorAvatar}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 rounded border border-slate-700/60"
                          title="View avatar"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setBlogForm(prev => ({ ...prev, authorAvatar: "" }))}
                          className="p-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-350 rounded border border-rose-500/20 cursor-pointer"
                          title="Clear avatar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Publish Toggle switch */}
              <div className="flex items-center gap-2 py-1.5 border-t border-slate-850 pt-2.5 mt-1">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={blogForm.isPublished}
                  onChange={(e) => setBlogForm({ ...blogForm, isPublished: e.target.checked })}
                  className="w-3.5 h-3.5 accent-indigo-650 cursor-pointer"
                />
                <label htmlFor="isPublished" className="font-bold text-slate-350 cursor-pointer select-none text-[10px]">
                  Publish this article immediately (if unchecked, saved as draft)
                </label>
              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-2 pt-2.5 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-3.5 py-1.5 bg-slate-955 border border-slate-855 rounded-xl font-bold cursor-pointer text-slate-400 hover:text-white text-[11px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                >
                  <Save className="w-3.5 h-3.5" /> Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- POPUP MODAL 4: TESTIMONIAL EDITOR FORM --- */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 bg-slate-955/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-2xl">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-sm font-black text-white">
                {editingTestimonial ? "Edit Client Review" : "Add Client Testimonial"}
              </h3>
              <button 
                onClick={() => setIsTestimonialModalOpen(false)}
                className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-2.5 text-[11px]">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-0.5">
                  <label className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">Client Name</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.name}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                    className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px]"
                    placeholder="Sarah Jenkins"
                  />
                </div>
                <div className="space-y-0.5">
                  <label className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">Client Role</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.role}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                    className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px]"
                    placeholder="Chief Operating Officer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-0.5">
                  <label className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">Company</label>
                  <input
                    type="text"
                    required
                    value={testimonialForm.company}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, company: e.target.value })}
                    className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px]"
                    placeholder="Vanguard Ltd"
                  />
                </div>
                <div className="space-y-0.5">
                  <label className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">Rating (1 to 5 Stars)</label>
                  <select
                    value={testimonialForm.rating}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: Number(e.target.value) })}
                    className="w-full px-2 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white focus:outline-none cursor-pointer text-[11px]"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">Avatar Image</label>
                <div className="flex gap-1.5 items-center">
                  <input
                    type="text"
                    required
                    value={testimonialForm.avatar}
                    onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                    className="flex-1 px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none"
                    placeholder="Enter avatar URL or upload"
                  />
                  <label className="px-2.5 py-1 bg-indigo-650/20 hover:bg-indigo-650/30 text-indigo-400 border border-indigo-500/20 rounded-lg font-bold text-[10px] flex items-center justify-center cursor-pointer transition-colors whitespace-nowrap">
                    {uploadingTestimonialAvatar ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleTestimonialAvatarUpload}
                      className="hidden"
                    />
                  </label>
                  {testimonialForm.avatar && (
                    <div className="flex gap-1 flex-shrink-0">
                      <a
                        href={testimonialForm.avatar}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1 bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 rounded border border-slate-700/60"
                        title="View avatar"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setTestimonialForm(prev => ({ ...prev, avatar: "" }))}
                        className="p-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-355 rounded border border-rose-500/20 cursor-pointer"
                        title="Clear avatar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[8.5px] font-bold text-slate-400 uppercase tracking-widest">Review Content</label>
                <textarea
                  required
                  rows={3}
                  value={testimonialForm.content}
                  onChange={(e) => setTestimonialForm({ ...testimonialForm, content: e.target.value })}
                  className="w-full px-2.5 py-1 bg-slate-955 border border-slate-800 rounded-lg text-white leading-relaxed text-[11px]"
                  placeholder="Deploying ERP software has saved our operations tons of time..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2.5 border-t border-slate-850">
                <button
                  type="button"
                  onClick={() => setIsTestimonialModalOpen(false)}
                  className="px-3.5 py-1.5 bg-slate-955 border border-slate-855 rounded-xl font-bold cursor-pointer text-slate-400 text-[11px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-650 hover:bg-indigo-550 text-white rounded-xl font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                >
                  <Save className="w-3.5 h-3.5" /> Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
