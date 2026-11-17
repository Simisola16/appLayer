"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Layers } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled || mobileMenuOpen
          ? "bg-[#08090d]/95 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
          : "bg-[#08090d]/80 backdrop-blur-sm border-b border-white/[0.06]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="w-9 h-9 rounded-lg bg-[#111520] border border-blue-500/40 flex items-center justify-center group-hover:border-blue-400 transition-colors">
              <Layers className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-jakarta)] text-lg font-bold tracking-tight text-white leading-none">
                {SITE_CONFIG.brandName}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-slate-400 mt-1">
                Web-to-App Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-1 lg:gap-2"
          >
            {SITE_CONFIG.navLinks.map((item) => {
              const isActive =
                (item.href === "/" && pathname === "/") ||
                (item.href === "/#pricing" && pathname === "/pricing") ||
                (item.href === "/#contact" && pathname === "/contact");

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? "text-white bg-white/[0.06]"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/pricing"
              className="text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider text-slate-400 hover:text-white px-3 py-2 transition-colors"
            >
              USD Packages
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-150 shadow-sm hover:shadow-blue-600/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090d]"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={
                mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden bg-[#0b0d14] border-b border-white/10 px-4 pt-3 pb-6 space-y-3"
        >
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col space-y-1"
          >
            {SITE_CONFIG.navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="text-xs font-[family-name:var(--font-mono)] text-slate-500">
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-5 py-3.5 rounded-lg transition-colors"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center justify-between px-2 pt-1 text-xs text-slate-400 font-[family-name:var(--font-mono)]">
              <span>Android & iPhone PWA</span>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="text-blue-400 hover:underline"
              >
                View Full Pricing →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
