"use client";

import { useEffect, useState } from "react";
import { motion, useAnimate, stagger } from "framer-motion";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { LampContainer } from "@/components/ui/lamp";
import { GlassButton } from "@/components/ui/glass-button";

// Parallax floating images: 1, 2, 3, 5, 6, 7, 9, 13
const exampleImages = [
  {
    url: "/images/image1.png",
    title: "Custom Design 1",
  },
  {
    url: "/images/image2.png",
    title: "Custom Design 2",
  },
  {
    url: "/images/image3.png",
    title: "Custom Design 3",
  },
  {
    url: "/images/image5.png",
    title: "Custom Design 5",
  },
  {
    url: "/images/image6.png",
    title: "Custom Design 6",
  },
  {
    url: "/images/image7.png",
    title: "Custom Design 7",
  },
  {
    url: "/images/image9.png",
    title: "Custom Design 9",
  },
  {
    url: "/images/image13.png",
    title: "Custom Design 13",
  },
];

// Instagram icon component
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

export default function DashboardPage() {
  const [scope, animate] = useAnimate();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    if (scope.current) {
      animate("img", { opacity: [0, 1] }, { duration: 0.5, delay: stagger(0.15) });
    }

    const fetchUser = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const name = user.user_metadata?.full_name || user.email?.split('@')[0] || "Guest";
          // Capitalize first letter neatly
          const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
          setUserName(formattedName);
        }
      } catch (error) {
        console.error("Could not fetch user session:", error);
      }
    };
    fetchUser();
  }, [animate, scope]);

  return (
    <main ref={scope} className="min-h-screen w-full overflow-x-hidden">
      {/* Section 1: Parallax Collection - Rose Dust Background */}
      <section className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: "#A67C74" }}>
        {/* Floating Background with Rose Dust */}
        <Floating sensitivity={-1} className="overflow-hidden">
          <FloatingElement depth={0.5} className="top-[8%] left-[11%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[0].url}
              className="w-16 h-16 md:w-24 md:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
              alt={exampleImages[0].title}
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[10%] left-[32%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[1].url}
              className="w-20 h-20 md:w-28 md:h-28 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
              alt={exampleImages[1].title}
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[2%] left-[53%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[2].url}
              className="w-28 h-40 md:w-40 md:h-52 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
              alt={exampleImages[2].title}
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[0%] left-[83%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[3].url}
              className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
              alt={exampleImages[3].title}
            />
          </FloatingElement>

          <FloatingElement depth={1} className="top-[40%] left-[2%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[4].url}
              className="w-28 h-28 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
              alt={exampleImages[4].title}
            />
          </FloatingElement>
          <FloatingElement depth={2} className="top-[70%] left-[77%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[7].url}
              className="w-28 h-28 md:w-36 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
              alt={exampleImages[7].title}
            />
          </FloatingElement>

          <FloatingElement depth={4} className="top-[73%] left-[15%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[5].url}
              className="w-40 md:w-52 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
              alt={exampleImages[5].title}
            />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[80%] left-[50%]">
            <motion.img
              initial={{ opacity: 0 }}
              src={exampleImages[6].url}
              className="w-24 h-24 md:w-32 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform rounded-lg shadow-lg"
              alt={exampleImages[6].title}
            />
          </FloatingElement>
        </Floating>

        {/* Welcome Text — CENTERED */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-50 pointer-events-none">
          <motion.div
            className="text-center space-y-4 items-center flex flex-col px-4 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.88, delay: 1.5 }}
          >
            <p
              className="text-4xl md:text-5xl z-50 font-aesthetic italic text-center"
              style={{ color: "#3D2B1F" }}
            >
              welcome, {userName || "Guest"}
            </p>
          </motion.div>
        </div>

        {/* Coming Soon Message — Positioned at the bottom of Section 1 */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-50 w-full px-4">
          <p className="text-white/80 text-sm max-w-lg mx-auto font-sans tracking-wide leading-relaxed">
            The full digital atelier experience is currently being tailored. We are
            stitching together something extraordinary.
          </p>
        </div>
      </section>

      {/* Section 2: Stay Connected with Lamp + Sketch Board */}
      <LampContainer className="mt-[-1px] relative z-50">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="text-center"
        >
          <h2 className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-5xl md:text-7xl font-medium tracking-tight text-transparent font-aesthetic">
            Stay Connected
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto mt-4 mb-12">
            Follow us for updates and exclusive previews
          </p>

          <a
            href="https://insta.openinapp.co/gv8pb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mb-16"
          >
            <GlassButton
              size="lg"
              contentClassName="flex items-center gap-2 text-white min-w-[200px] justify-center"
            >
              <InstagramIcon />
              <span className="text-white">Follow on Instagram</span>
            </GlassButton>
          </a>

          {/* Sketch Board — Graduation Outfit */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="sketch-board sketch-board-alt relative group">
              <img
                src="/images/sketch-graduation.jpg"
                alt="Graduation Outfit — Custom Design Sketch"
              />
              <p className="sketch-board-label">Graduation Outfit</p>
            </div>
          </motion.div>
        </motion.div>
      </LampContainer>

      {/* Footer */}
      <footer className="w-full bg-coffee py-8">
        <div className="container-custom mx-auto text-center">
          <Link href="/">
            <p className="font-aesthetic text-cream text-2xl mb-2 tracking-wider">
              AGRATA
            </p>
          </Link>
          <p className="text-cream/60 text-sm">
            OUTFITS 2024. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
