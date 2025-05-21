"use client";

import Link from "next/link";
import { useState } from "react";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { NavbarSidebar } from "./navbar-sidebar";
import { MenuIcon } from "lucide-react";

// poppins폰트는 굵기700만 제공합니다.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className={cn("text-5xl font-semibold", poppins.className)}>
          funroad
        </span>
      </Link>

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {/* 모바일 용 사이드 바 */}
      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="hidden lg:flex">
        <Button
          variant="secondary"
          className="border-0 border-l px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
          asChild
        >
          <Link href="/sign-in">Log in</Link>
        </Button>

        <Button
          className="border-0 border-l px-12 h-full rounded-none bg-black hover:bg-pink-400 text-white hover:text-black transition-colors text-lg"
          asChild
        >
          <Link href="/sign-up">Start selling</Link>
        </Button>
      </div>

      {/* 모바일 사이드 바 열기 버튼 */}
      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          onClick={() => setIsSidebarOpen(true)}
          className="size-12 border-transparent bg-white"
        >
          <MenuIcon className="size-6" />
        </Button>
      </div>
    </nav>
  );
};
