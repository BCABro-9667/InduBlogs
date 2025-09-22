import Link from "next/link";
import { Logo } from "@/components/icons";
import { cn } from "@/lib/utils";

interface MainNavProps {
  items: { title: string; href: string }[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="hidden md:flex gap-6 items-center">
      <Link href="/" className="flex items-center space-x-2">
        <Logo className="h-6 w-6" />
        <span className="font-bold font-headline">BlogWave</span>
      </Link>
      <nav className="flex gap-6 text-sm">
        {items.slice(0, 4).map((item) => (
           <Link
             key={item.href}
             href={item.href}
             className="text-foreground/60 transition-colors hover:text-foreground/80"
           >
             {item.title}
           </Link>
        ))}
      </nav>
    </div>
  );
}
