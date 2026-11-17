import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Compatibility from "@/components/Compatibility";
import Pricing from "@/components/Pricing";
import Benefits from "@/components/Benefits";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08090d]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Compatibility />
        <Pricing />
        <Benefits />
        <Process />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
