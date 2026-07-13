import React from "react";
import {
  Users,
  TrendingUp,
  Package,
  DollarSign,
  Activity,
  Layers,
  Search,
  Bell,
  CheckCircle,
} from "lucide-react";

export default function SoftwareMockup() {
  return (
    <div className="w-full bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden text-slate-300 flex flex-col aspect-[16/10] md:aspect-[16/9]">
      {/* Mockup Header Bar */}
      <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-1.5">
          {/* Close, Minimize, Maximize buttons */}
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-[11px] text-slate-500 font-medium ml-4 font-mono select-none">
            yourcompany-erp.app
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              readOnly
              value="Search operations..."
              className="bg-slate-900 border border-slate-800 text-xs rounded-md pl-8 pr-3 py-1.5 w-44 focus:outline-none text-slate-500 cursor-not-allowed select-none"
            />
          </div>
          <Bell className="w-4 h-4 text-slate-400" />
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
            AD
          </div>
        </div>
      </div>

      {/* Main Mockup Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mockup Sidebar */}
        <aside className="w-14 sm:w-44 bg-slate-950 p-2.5 flex flex-col gap-1 border-r border-slate-800/50">
          <div className="hidden sm:block text-[10px] font-bold text-slate-500 uppercase px-2.5 py-1 tracking-wider mb-2 select-none">
            Menu
          </div>
          {[
            { name: "Dashboard", icon: Layers, active: true },
            { name: "Sales & CRM", icon: TrendingUp },
            { name: "HR & Staff", icon: Users },
            { name: "Inventory", icon: Package },
            { name: "Finance & Accounts", icon: DollarSign },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  item.active
                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20"
                    : "hover:bg-slate-900 text-slate-400 hover:text-slate-200 border border-transparent"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:block">{item.name}</span>
              </div>
            );
          })}
        </aside>

        {/* Mockup Content Panel */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 bg-slate-900/50">
          {/* Section title */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                Operations Overview
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">
                Real-time metrics from ERP & CRM unified platform
              </p>
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded">
              Status: Active
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                title: "Active Leads",
                val: "1,248",
                change: "+12.4%",
                icon: Activity,
                color: "text-indigo-400 bg-indigo-500/10",
              },
              {
                title: "Total Revenue",
                val: "$84,250",
                change: "+8.2%",
                icon: DollarSign,
                color: "text-emerald-400 bg-emerald-500/10",
              },
              {
                title: "Items Stocked",
                val: "4,820",
                change: "-2.4%",
                icon: Package,
                color: "text-amber-400 bg-amber-500/10",
              },
              {
                title: "Staff Checked-in",
                val: "98.4%",
                change: "92 / 94",
                icon: Users,
                color: "text-blue-400 bg-blue-500/10",
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-slate-950/80 p-3 sm:p-4 rounded-xl border border-slate-800/80"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-medium text-slate-500">
                      {card.title}
                    </span>
                    <div className={`p-1.5 rounded-lg ${card.color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="mt-2.5 flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-sm sm:text-lg font-bold text-white">
                      {card.val}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-semibold ${
                        card.change.startsWith("+")
                          ? "text-emerald-400"
                          : card.change.startsWith("-")
                          ? "text-red-400"
                          : "text-slate-400"
                      }`}
                    >
                      {card.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Sales Pipeline Chart Graphic */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Monthly Sales Pipeline</span>
                <span className="text-[10px] text-slate-500">Target vs Actual</span>
              </div>
              {/* Simulated Chart Bars */}
              <div className="h-28 flex items-end justify-between px-2 pt-2">
                {[
                  { m: "Jan", target: 40, actual: 35 },
                  { m: "Feb", target: 50, actual: 48 },
                  { m: "Mar", target: 60, actual: 64 },
                  { m: "Apr", target: 70, actual: 68 },
                  { m: "May", target: 80, actual: 88 },
                  { m: "Jun", target: 90, actual: 95 },
                ].map((item) => (
                  <div key={item.m} className="flex flex-col items-center gap-1.5 w-8">
                    <div className="flex gap-1 items-end h-20 w-full justify-center">
                      {/* Target bar */}
                      <div
                        style={{ height: `${item.target}%` }}
                        className="w-1.5 rounded-t bg-slate-800"
                      />
                      {/* Actual bar */}
                      <div
                        style={{ height: `${item.actual}%` }}
                        className="w-1.5 rounded-t bg-indigo-600"
                      />
                    </div>
                    <span className="text-[9px] text-slate-500 font-medium">{item.m}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Workflow logs */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-3">
              <span className="text-xs font-bold text-white block">Recent Workflows</span>
              <div className="space-y-3">
                {[
                  { text: "Lead routed to Senior Rep", time: "2 min ago" },
                  { text: "Payroll calculations compiled", time: "15 min ago" },
                  { text: "Geofenced Check-in: Driver #14", time: "32 min ago" },
                  { text: "Stock auto-reorder trigger: SKU-4", time: "1 hr ago" },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-[10px] sm:text-xs">
                    <CheckCircle className="w-3.5 h-3.5 text-indigo-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-slate-300">{log.text}</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">{log.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
