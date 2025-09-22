import Link from "next/link";
import { MainNav } from "@/components/public/main-nav";
import { MobileNav } from "@/components/public/mobile-nav";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data";
import { Logo } from "../icons";

export function SiteHeader() {
  const navItems = [
    { title: "Home", href: "/" },
    ...categories.map(c => ({ title: c.name, href: `/category/${c.slug}` })),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center">
        <MainNav items={navItems} />
        <MobileNav items={navItems} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-accent hover:bg-accent/90">
                <Link href="/register">Register</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
