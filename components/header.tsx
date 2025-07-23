"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bus, Train, HelpCircle, Globe, User, Menu, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-md bg-white">
              <Image alt="logo" src={"/MM logo.png"} width={100} height={100} />
              {/* <Bus className="absolute inset-0 h-10 w-10 p-1.5 text-primary-foreground" /> */}
            </div>
            <span className="hidden font-bold text-xl sm:inline-block">
              Metro<span style={{ color: "#8aa987" }}>Merge</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                "text-primary border-b-2 border-primary pb-3.5 pt-4"
              )}
            >
              <Bus className="h-4 w-4" />
              Bus Tickets
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <Globe className="h-4 w-4" />
                English
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Urdu</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <User className="h-4 w-4" />
                Account
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={"/login"}>
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
              <Link href={"/register"}>
                <DropdownMenuItem>Register</DropdownMenuItem>
              </Link>
              <Link href={"/my-bookings"}>
                <DropdownMenuItem>My Bookings</DropdownMenuItem>
              </Link>
              <Link href={"/wallets"}>
                <DropdownMenuItem>Wallet</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>
      {isMenuOpen && (
        <div className="container md:hidden">
          <nav className="flex flex-col gap-4 pb-6">
            <Link
              href="/bus-tickets"
              className="flex items-center gap-2 text-sm font-medium text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              <Bus className="h-4 w-4" />
              Bus Tickets
            </Link>

            <Link
              href="/account"
              className="flex items-center gap-2 text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              Account
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-2 px-0"
                >
                  <Globe className="h-4 w-4" />
                  English
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Hindi</DropdownMenuItem>
                <DropdownMenuItem>Spanish</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      )}
    </header>
  );
}
