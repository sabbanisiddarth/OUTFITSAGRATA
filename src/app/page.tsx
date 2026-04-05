"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-lines";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { LampContainer } from "@/components/ui/lamp";
import { GlassButton } from "@/components/ui/glass-button";

// Product testimonials data
const testimonials = [
  {
    quote: "Crafted for a statement reception look. This bespoke black suit blends timeless elegance with a bold artistic touch, featuring intricate bird motifs that symbolize freedom and grace. Designed with precision and styled for confidence, every detail speaks of sophistication and individuality. Our client absolutely loved the look and walked away with countless compliments — the perfect reflection of style meeting personality. Custom creations that turn moments into memories.",
    name: "The Bespoke Black Suit",
    designation: "Custom Reception Collection",
    src: "/images/image8.png",
  },
  {
    quote: "A Little Magic for Her Special Day. A client wanted a dreamy unicorn-themed frock for her baby girl's special celebration — something magical, soft, and picture-perfect. At Agrata Outfits, we turned that vision into reality by designing a frock inspired by fantasy colors, delicate layers, and playful elegance. We used pastel shades, soft tulle layers, and floral detailing to create a fairy-like look. Perfect for birthdays & photoshoots.",
    name: "The Unicorn Dream Frock",
    designation: "Baby Celebration Collection",
    src: "/images/image12.png",
  },
  {
    quote: "Coordinated in Style, Celebrating Together. For a baby's first birthday, a client wanted something special — a perfectly coordinated outfit matching the event theme and color palette. At Agrata Outfits, we took that vision further by designing a complete family combo for 4, ensuring everyone looked connected and stylish for the celebration. From the baby's adorable outfit to matching family styling, every detail was thoughtfully designed.",
    name: "The First Birthday Family Combo",
    designation: "Family Celebration Collection",
    src: "/images/image4.png",
  },
];

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      {/* Section 1: Hero with Shader Lines */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Shader canvas — blurred for "silk thread" effect */}
        <div className="absolute inset-0 z-0" style={{ filter: "blur(3px)" }}>
          <ShaderAnimation />
        </div>

        {/* Brand text — crisp, above the blurred shader */}
        <span className="pointer-events-none z-10 text-center text-7xl md:text-9xl leading-none font-semibold tracking-[0.3em] whitespace-pre-wrap text-white font-aesthetic">
          AGRATA
        </span>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-white"
              animate={{ y: [0, 16, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>
      </section>

      {/* Section 2: The Collection with Circular Testimonials */}
      <section className="relative min-h-screen w-full textured-bg py-24">
        <div className="container-custom mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-aesthetic text-5xl md:text-7xl text-coffee mb-4 tracking-wide">
              The Collection
            </h2>
            <p className="text-muted-umber text-lg">
              Curated Elegance for Every Occasion
            </p>
          </motion.div>

          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "#3D2B1F",
              designation: "#705A4C",
              testimony: "#705A4C",
              arrowBackground: "#A67C74",
              arrowForeground: "#E8DFD5",
              arrowHoverBackground: "#2D4F4F",
            }}
            fontSizes={{
              name: "2rem",
              designation: "1rem",
              quote: "1.125rem",
            }}
          />
        </div>
      </section>

      {/* Section 3: The Atelier - Founder Details */}
      <section className="relative min-h-screen w-full textured-bg-rose py-24">
        <div className="container-custom mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Founder Image — natural aspect ratio */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 flex justify-center"
            >
              <div className="relative">
                <div className="w-80 md:w-[400px] rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/founder.jpg"
                    alt="Pranitha - Founder of Agrata Outfits"
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-cream/30 rounded-2xl" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-emerald/30 rounded-2xl" />
              </div>
            </motion.div>

            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/3"
            >
              <div className="bio-card max-w-4xl">
                <h2 className="font-aesthetic text-4xl text-coffee mb-2">
                  Meet the Founder
                </h2>
                <p className="text-coffee/80 text-lg mb-8">
                  Hi, I&apos;m Pranitha, founder of Agrata Outfits. Agrata Outfits started in September 2024 with a vision to create elegant, customized outfits that make every occasion special.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-umber">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-coffee font-semibold text-lg mb-2">Our Journey</h3>
                      <p>
                        What began as a passion has now grown into a brand trusted by multiple happy clients. We have proudly designed outfits for:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>First birthdays</li>
                        <li>Family combos</li>
                        <li>Wedding occasions</li>
                      </ul>
                      <p className="mt-2">
                        Our work has also reached clients beyond India, including happy customers from the USA, making Agrata Outfits a growing global choice.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-coffee font-semibold text-lg mb-2">What We Do</h3>
                      <p>We specialize in:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Customized baby outfits</li>
                        <li>Mom &amp; daughter combos</li>
                        <li>Family styling</li>
                        <li>Wedding &amp; occasion wear</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-coffee font-semibold text-lg mb-2">Our Belief</h3>
                      <p>
                        Every client comes with a vision — we turn it into a design that feels personal, elegant, and memorable.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-coffee font-semibold text-lg mb-2">Our Promise</h3>
                      <ul className="space-y-1">
                        <li>Customized within your budget</li>
                        <li>Attention to every detail</li>
                        <li>Comfort with style</li>
                        <li>Designs made with love</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <p className="text-coffee/80 font-semibold pt-8">
                  From local beginnings to global clients, Agrata Outfits is growing with every story we create.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: The Connection - Contact & Auth with Lamp + Sketch Board */}
      <LampContainer>
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
            The Connection
          </h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto mt-4 mb-12">
            Begin your journey with Agrata Outfits
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/signin">
              <GlassButton
                size="lg"
                contentClassName="flex items-center gap-2 text-white min-w-[180px] justify-center"
              >
                Sign In
              </GlassButton>
            </Link>

            <a
              href="https://insta.openinapp.co/gv8pb"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassButton
                size="lg"
                contentClassName="flex items-center gap-2 text-white min-w-[180px] justify-center"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Instagram</span>
              </GlassButton>
            </a>
          </div>

          {/* Sketch Board — Saffron Engagement Lehenga */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center"
          >
            <div className="sketch-board">
              <img
                src="/images/sketch-lehenga.jpg"
                alt="Saffron Engagement Lehenga — Custom Design Sketch"
              />
              <p className="sketch-board-label">Saffron Engagement Lehenga</p>
            </div>
          </motion.div>
        </motion.div>
      </LampContainer>

      {/* Footer */}
      <footer className="w-full bg-coffee py-8">
        <div className="container-custom mx-auto text-center">
          <p className="font-aesthetic text-cream/80 text-sm">
            AGRATA OUTFITS 2024. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
