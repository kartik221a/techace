"use client";
import React from "react";
import { ModeToggle } from "./ModeToggle";
import DashboardBtn from "./DashboardBtn";
import Link from "next/link";
import { CodeIcon } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-2xl mr-6 font-mono hover:opacity-80 transition-opacity"
        >
          <CodeIcon className="size-8 text-violet-500" />
          <span className="bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">
            TechAce
          </span>
        </Link>

        {/* Right side buttons */}
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />

          {/* Show when signed in */}
          <SignedIn>
            <DashboardBtn />
            <UserButton />
          </SignedIn>

          {/* Show when signed out */}
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-1 rounded bg-emerald-500 text-white hover:bg-emerald-600 transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
