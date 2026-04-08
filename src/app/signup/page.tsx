"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { GlassButton } from "@/components/ui/glass-button";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [supabase, router]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // If confirmation is required, data.user will exist but session might be null
    if (data.user && !data.session) {
      setSuccessMessage("Account created! Please check your email to verify your account.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Editorial Photo */}
      <div className="hidden lg:flex lg:w-[60%] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cream/20 z-10" />
        <img
          src="/images/image6.png"
          alt="Elegant fashion"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-cream overflow-y-auto">
        <div className="w-full max-w-md py-12">
          {/* Logo */}
          <Link href="/" className="block mb-12">
            <h1 className="font-aesthetic text-4xl text-coffee tracking-wider">
              AGRATA
            </h1>
          </Link>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="font-aesthetic text-4xl text-coffee mb-2">
              Create Account
            </h2>
            <p className="text-muted-umber font-aesthetic">
              Join Agrata Outfits today
            </p>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
              <p className="text-red-600 text-sm font-aesthetic">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-green-600 text-sm font-aesthetic">{successMessage}</p>
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-coffee">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="font-aesthetic"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-coffee">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-aesthetic"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-coffee">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="font-aesthetic"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-coffee">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="font-aesthetic"
              />
            </div>

            <p className="text-xs text-muted-umber font-aesthetic">
              By signing up you agree to our Terms of Service and Privacy Policy.
            </p>

            <div className="pt-4">
              <GlassButton
                type="submit"
                size="lg"
                className="w-full"
                contentClassName="flex items-center justify-center text-coffee w-full"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Create Account"}
              </GlassButton>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-8">
            <div className="flex-1 h-px bg-muted-umber/30" />
            <span className="text-muted-umber text-sm font-aesthetic">Or</span>
            <div className="flex-1 h-px bg-muted-umber/30" />
          </div>

          {/* Social Sign Up */}
          <div className="flex justify-center">
            <a
              href="https://insta.openinapp.co/gv8pb"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <GlassButton
                size="lg"
                contentClassName="flex items-center gap-2 text-coffee"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>Continue with Instagram</span>
              </GlassButton>
            </a>
          </div>

          {/* Sign In Link */}
          <p className="mt-8 text-center text-muted-umber font-aesthetic">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-rose-dust hover:underline font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
