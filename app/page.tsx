"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SplashScreen from "@/components/home/splash-screen";
import Hero from "@/components/home/hero";
import StatsBar from "@/components/home/stats-bar";
import AboutSection from "@/components/home/about-section";
import AudienceSection from "@/components/home/audience-section";
import FinalCta from "@/components/home/final-cta";

const SPLASH_KEY = "pratka_splash_shown";

export default function Home() {
  const [showSplash, setShowSplash] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SPLASH_KEY)) {
      setReady(true);
    } else {
      setShowSplash(true);
    }
  }, []);

  const handleSplashDone = () => {
    sessionStorage.setItem(SPLASH_KEY, "1");
    setShowSplash(false);
    setReady(true);
  };

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}
      {ready && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
          <StatsBar />
          <AboutSection />
          <AudienceSection />
          <FinalCta />
        </motion.div>
      )}
    </>
  );
}
