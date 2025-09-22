import Link from "next/link";
import { MobileNav } from "@/components/public/mobile-nav";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/lib/data";
import { Logo } from "../icons";

export async function SiteHeader() {
  const categories = await getCategories();
  const navLinks = [
    { href: "/", label: "Home" },
    ...categories.map(c => ({ href: `/category/${c.slug}`, label: c.name })),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              BlogWave
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <MobileNav navLinks={navLinks} />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Future search bar can go here */}
          </div>
          <nav className="flex items-center">
            <Button asChild>
              <Link href="/login">Dashboard</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
