"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "../icons";

interface NavLink {
    href: string;
    label: string;
}
interface MobileNavProps {
    navLinks: NavLink[];
}

export function MobileNav({ navLinks }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-black/50" />
          <div
            className="relative z-10 grid h-full w-full max-w-sm grid-rows-[auto_1fr_auto] gap-6 bg-background p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <Logo className="h-6 w-6" />
                <span className="font-bold">BlogWave</span>
              </Link>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close Menu</span>
              </Button>
            </div>
            <div className="grid gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`-mx-3 rounded-lg px-3 py-2 text-lg font-medium transition-colors ${
                    pathname === link.href ? "bg-muted" : "hover:bg-muted"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
