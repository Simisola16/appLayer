"use client";

import React, { useState } from "react";
import {
  Globe,
  Smartphone,
  CheckCircle2,
  Wifi,
  Battery,
  Bell,
  ArrowRight,
  Download,
  Lock,
  Sparkles,
  Calendar,
  CreditCard,
  Search,
  Home,
  User,
  Briefcase,
} from "lucide-react";

type TransformationStage = "website" | "homescreen" | "standalone";

export default function DeviceMockup() {
  const [activeStage, setActiveStage] =
    useState<TransformationStage>("standalone");

  return (
    <div className="relative w-full max-w-[580px] mx-auto">
      {/* Top Interactive Transformation Stage Selector */}
      <div className="mb-5 bg-[#10131c] border border-white/10 rounded-xl p-1.5 flex items-center justify-between gap-1">
        <button
          type="button"
          onClick={() => setActiveStage("website")}
          className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeStage === "website"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <Globe className="w-3.5 h-3.5 shrink-0" />
          <span>1. Browser Website</span>
        </button>
        <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0 hidden sm:block" />
        <button
          type="button"
          onClick={() => setActiveStage("homescreen")}
          className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeStage === "homescreen"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <Download className="w-3.5 h-3.5 shrink-0" />
          <span>2. Home Screen Icon</span>
        </button>
        <ArrowRight className="w-3.5 h-3.5 text-slate-600 shrink-0 hidden sm:block" />
        <button
          type="button"
          onClick={() => setActiveStage("standalone")}
          className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
            activeStage === "standalone"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 shrink-0" />
          <span>3. Installed Web App</span>
        </button>
      </div>

      {/* Main Architectural Stage Container */}
      <div className="relative grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Left Column: Transformation Pipeline & Home Screen Preview Card */}
        <div className="sm:col-span-5 flex flex-col gap-3.5 order-2 sm:order-1">
          {/* Card 1: Source Website vs Installed App Transition */}
          <div className="bg-[#0e111a] border border-white/10 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-widest text-blue-400">
                Transformation Pipeline
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-[family-name:var(--font-mono)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Active PWA
              </span>
            </div>

            {/* Source Browser URL Bar mini representation */}
            <div
              onClick={() => setActiveStage("website")}
              className={`cursor-pointer rounded-lg p-2.5 border transition-colors ${
                activeStage === "website"
                  ? "bg-[#161b29] border-blue-500/50"
                  : "bg-[#090b10] border-white/[0.07] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="font-medium text-slate-200">
                  Existing Business Website
                </span>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-slate-500">
                  HTTPS
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#0d1017] px-2 py-1 rounded border border-white/[0.06] text-[10px] font-[family-name:var(--font-mono)] text-slate-400">
                <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span className="truncate">meridianhealth.com</span>
              </div>
            </div>

            {/* Transition Connector */}
            <div className="my-2.5 flex items-center gap-2 px-2">
              <div className="h-5 w-px bg-blue-500/40 mx-auto" />
              <span className="text-[10px] font-[family-name:var(--font-mono)] text-slate-400 bg-[#141926] border border-white/10 px-2 py-0.5 rounded">
                Manifest + Service Worker
              </span>
              <div className="h-5 w-px bg-blue-500/40 mx-auto" />
            </div>

            {/* Installed Home Screen Icon Representation (Always Visible + Interactive) */}
            <div
              onClick={() => setActiveStage("homescreen")}
              className={`cursor-pointer rounded-lg p-3 border transition-colors ${
                activeStage === "homescreen"
                  ? "bg-[#161b29] border-blue-500/50"
                  : "bg-[#090b10] border-white/[0.07] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-slate-200">
                  Device Home Screen Icon
                </span>
                <span className="text-[10px] font-[family-name:var(--font-mono)] text-blue-400">
                  Installable
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-1">
                {/* Other neutral system apps */}
                <div className="flex flex-col items-center gap-1 opacity-40">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-[9px] text-slate-500">Calendar</span>
                </div>
                {/* Highlighted Installed Client Business App Icon */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 border border-blue-400 shadow-sm flex items-center justify-center relative">
                    <span className="font-[family-name:var(--font-jakarta)] font-bold text-xs text-white">
                      M
                    </span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#090b10]" />
                  </div>
                  <span className="text-[9px] font-semibold text-white">
                    Meridian
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-40">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-[9px] text-slate-500">Wallet</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-40">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-[9px] text-slate-500">Notes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Platform Compatibility Indicators */}
          <div className="bg-[#0e111a] border border-white/10 rounded-xl p-4 space-y-2.5">
            <div className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-slate-400">
              Platform Support Indicators
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#090b10] border border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-[family-name:var(--font-mono)] text-xs font-bold">
                  A
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    Android Devices
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Browser install prompt & APK-like launch
                  </div>
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#090b10] border border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-[family-name:var(--font-mono)] text-xs font-bold">
                  iOS
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">
                    Apple iPhone
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Safari Home Screen standalone web app
                  </div>
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
            </div>
          </div>
        </div>

        {/* Right Column: Realistic Hardware Smartphone Chassis */}
        <div className="sm:col-span-7 order-1 sm:order-2 flex justify-center">
          <div className="w-[300px] sm:w-[315px] rounded-[42px] bg-[#161a24] p-3 border-2 border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.65)] relative">
            {/* Hardware side button accents */}
            <div className="absolute -left-[3px] top-24 w-[3px] h-8 bg-slate-600 rounded-l" />
            <div className="absolute -left-[3px] top-36 w-[3px] h-12 bg-slate-600 rounded-l" />
            <div className="absolute -right-[3px] top-28 w-[3px] h-14 bg-slate-600 rounded-r" />

            {/* Inner Screen Bezel */}
            <div className="w-full h-[540px] rounded-[32px] bg-[#090b10] border border-white/10 overflow-hidden flex flex-col justify-between relative">
              {/* Device Status Bar */}
              <div className="px-5 pt-3 pb-2 flex items-center justify-between bg-[#090b10] text-white z-10">
                <span className="text-[11px] font-semibold tracking-tight">
                  09:41
                </span>
                <div className="w-16 h-4 rounded-full bg-black border border-white/10" />
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Wifi className="w-3 h-3" />
                  <Battery className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* STAGE 1: BROWSER WEBSITE VIEW */}
              {activeStage === "website" && (
                <div className="flex-1 flex flex-col bg-white text-slate-900 overflow-hidden">
                  {/* Mobile Browser Address Chrome */}
                  <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex items-center justify-between gap-2">
                    <div className="flex-1 bg-white border border-slate-300 rounded-md px-2.5 py-1 flex items-center gap-1.5 text-[11px] text-slate-600">
                      <Lock className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate font-[family-name:var(--font-mono)]">
                        https://meridianhealth.com
                      </span>
                    </div>
                  </div>

                  {/* Install Banner Prompt inside Browser */}
                  <div className="bg-slate-900 text-white px-3.5 py-2.5 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs">
                        M
                      </div>
                      <div>
                        <div className="text-[11px] font-semibold">
                          Install Meridian App
                        </div>
                        <div className="text-[9px] text-slate-300">
                          Add to Home Screen for instant access
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveStage("homescreen")}
                      className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-semibold px-2.5 py-1 rounded transition-colors"
                    >
                      Install
                    </button>
                  </div>

                  {/* Business Website Content Inside Phone */}
                  <div className="p-4 space-y-3 flex-1 overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="font-bold text-xs tracking-tight text-slate-900">
                        MERIDIAN CLINIC
                      </span>
                      <span className="text-[10px] text-blue-600 font-semibold">
                        Client Portal
                      </span>
                    </div>
                    <div className="rounded-xl bg-slate-900 text-white p-3.5 space-y-1.5">
                      <span className="text-[9px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-blue-400">
                        Executive Healthcare
                      </span>
                      <div className="text-sm font-bold leading-snug">
                        Book Appointments & Access Diagnostic Reports
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed">
                        Standard browser view with URL bar and browser controls.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-[10px] font-semibold text-slate-800">
                          Consultations
                        </div>
                        <div className="text-[9px] text-slate-500 mt-0.5">
                          Same-day scheduling
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                        <div className="text-[10px] font-semibold text-slate-800">
                          Lab Results
                        </div>
                        <div className="text-[9px] text-slate-500 mt-0.5">
                          Encrypted records
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Browser Navigation Chrome */}
                  <div className="bg-slate-100 border-t border-slate-200 px-6 py-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>‹ Back</span>
                    <span>Share</span>
                    <span>Tabs (3)</span>
                  </div>
                </div>
              )}

              {/* STAGE 2: MOBILE HOME SCREEN WITH INSTALLED ICON */}
              {activeStage === "homescreen" && (
                <div className="flex-1 flex flex-col justify-between p-5 bg-gradient-to-b from-[#0d121f] to-[#090b10] text-white">
                  <div>
                    <div className="text-center mb-4">
                      <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-full">
                        Installed on Home Screen
                      </span>
                    </div>

                    {/* Home Screen App Grid */}
                    <div className="grid grid-cols-4 gap-y-5 gap-x-3 mt-4">
                      <div className="flex flex-col items-center gap-1.5 opacity-50">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-slate-300" />
                        </div>
                        <span className="text-[10px] text-slate-300">
                          Calendar
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-1.5 opacity-50">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-slate-300" />
                        </div>
                        <span className="text-[10px] text-slate-300">
                          Finance
                        </span>
                      </div>

                      {/* Featured Installed Business PWA Icon */}
                      <button
                        type="button"
                        onClick={() => setActiveStage("standalone")}
                        className="flex flex-col items-center gap-1.5 group focus:outline-none"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-blue-600 border-2 border-white shadow-[0_0_25px_rgba(37,99,235,0.7)] flex items-center justify-center relative group-hover:scale-105 transition-transform">
                          <span className="font-[family-name:var(--font-jakarta)] font-extrabold text-base text-white">
                            M
                          </span>
                          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-[9px] font-bold text-white flex items-center justify-center border border-[#090b10]">
                            1
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-white">
                          Meridian
                        </span>
                      </button>

                      <div className="flex flex-col items-center gap-1.5 opacity-50">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-slate-300" />
                        </div>
                        <span className="text-[10px] text-slate-300">
                          Workspace
                        </span>
                      </div>
                    </div>

                    {/* Interactive instruction card */}
                    <div className="mt-8 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-left space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">
                          Dedicated Home Screen Icon
                        </span>
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        Customers launch your business directly from their phone
                        with one tap—no browser URL bar required.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveStage("standalone")}
                        className="w-full mt-1 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                      >
                        Tap to Launch Standalone App →
                      </button>
                    </div>
                  </div>

                  {/* Home Screen Dock */}
                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-2.5 flex items-center justify-around">
                    <div className="w-9 h-9 rounded-xl bg-slate-800/80" />
                    <div className="w-9 h-9 rounded-xl bg-slate-800/80" />
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                      M
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-slate-800/80" />
                  </div>
                </div>
              )}

              {/* STAGE 3: STANDALONE INSTALLED WEB APP VIEW */}
              {activeStage === "standalone" && (
                <div className="flex-1 flex flex-col justify-between bg-[#0b0e17] text-white overflow-hidden">
                  {/* Standalone App Header (No Browser URL Bar!) */}
                  <div className="px-4 pt-2 pb-3 border-b border-white/[0.08] flex items-center justify-between bg-[#0f1320]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                        M
                      </div>
                      <div>
                        <div className="text-xs font-bold tracking-tight text-white">
                          Meridian Health
                        </div>
                        <div className="text-[9px] text-emerald-400 font-[family-name:var(--font-mono)]">
                          Standalone App Mode • Offline Ready
                        </div>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center relative">
                      <Bell className="w-3.5 h-3.5 text-slate-300" />
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </div>
                  </div>

                  {/* App Body Content */}
                  <div className="p-4 space-y-3 flex-1">
                    {/* Push Notification Toast Preview */}
                    <div className="p-2.5 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-start gap-2.5">
                      <Bell className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-semibold text-white">
                          Appointment Confirmed
                        </div>
                        <div className="text-[10px] text-slate-300">
                          Web push notification enabled for supported devices.
                        </div>
                      </div>
                    </div>

                    {/* Primary Business App Card */}
                    <div className="p-3.5 rounded-xl bg-[#131826] border border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-slate-400">
                          Next Visit
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                          Cached Offline
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        Executive Wellness Assessment
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Thursday, 10:30 AM • Suite 400
                      </div>
                      <div className="pt-1 flex items-center gap-2">
                        <span className="flex-1 text-center py-1.5 rounded-lg bg-blue-600 text-[11px] font-semibold text-white">
                          Check In Now
                        </span>
                        <span className="px-3 py-1.5 rounded-lg bg-white/[0.06] text-[11px] text-slate-300">
                          Details
                        </span>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-2.5 rounded-xl bg-[#131826] border border-white/[0.07]">
                        <div className="text-[11px] font-semibold text-white">
                          Instant Launch
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Full-screen standalone viewport
                        </div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#131826] border border-white/[0.07]">
                        <div className="text-[11px] font-semibold text-white">
                          Offline Access
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Key pages cached via Service Worker
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* App-Like Bottom Tab Bar */}
                  <div className="px-5 py-2.5 bg-[#0f1320] border-t border-white/[0.08] flex items-center justify-between text-[10px]">
                    <div className="flex flex-col items-center gap-1 text-blue-400 font-semibold">
                      <Home className="w-3.5 h-3.5" />
                      <span>Home</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-500">
                      <Search className="w-3.5 h-3.5" />
                      <span>Services</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-500">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Bookings</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-500">
                      <User className="w-3.5 h-3.5" />
                      <span>Account</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom OS Home Indicator Bar */}
              <div className="py-2 bg-[#090b10] flex justify-center">
                <div className="w-28 h-1 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
