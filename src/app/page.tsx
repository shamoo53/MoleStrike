"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { Navbar } from "@/components/landing/Navbar";
import { HowToPlaySection } from "@/components/landing/HowToPlaySection";
import { LeaderboardSection } from "@/components/landing/LeaderboardSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ReadyToJoinSection } from "@/components/landing/ReadyToJoinSection";
import { Footer } from "@/components/landing/Footer";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleLoginClick = () => {
    router.push("/signup");
  };

  const handleSignupSubmit = () => {
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar onLoginClick={handleLoginClick} />
      <HeroSection onSignUp={() => router.push("/signup")} />
      <FeaturesSection />
      <HowToPlaySection />
      <LeaderboardSection />
      <TestimonialsSection />
      <AboutSection />
      <ReadyToJoinSection onPlayNow={() => router.push("/signup")} />
      <Footer />
    </main>
  );
}
