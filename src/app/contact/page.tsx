import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Project Enquiry & Contact | Website to Mobile App Transformation",
  description:
    "Submit your existing website URL for a technical compatibility assessment and receive a tailored Progressive Web App transformation recommendation.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#08090d]">
      <Navbar />
      <main className="flex-1 pt-20">
        <ContactForm />
        <Process />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
