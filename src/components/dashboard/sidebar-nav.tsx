// @ts-nocheck
'use client';
import { usePathname } from "next/navigation";
import Link from 'next/link';

import {
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarTrigger,
  } from '@/components/ui/sidebar';
  import {
    LayoutDashboard,
    Newspaper,
    PlusCircle,
    User,
    LogOut,
    Shapes,
  } from 'lucide-react';
  import { Logo } from '../icons';
  import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from "../ui/button";

const menuItems = [
    {
        href: '/dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
    },
    {
        href: '/dashboard/blogs',
        label: 'Blogs',
        icon: Newspaper,
    },
    {
        href: '/dashboard/blogs/create',
        label: 'Create Blog',
        icon: PlusCircle,
    },
    {
        href: '/dashboard/categories/create',
        label: 'Create Category',
        icon: Shapes,
    },
    {
        href: '/dashboard/profile',
        label: 'Profile',
        icon: User,
    },
];

export function SidebarNav() {
    const pathname = usePathname();
    return (
        <>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <h1 className="font-bold text-lg font-headline">BlogWave</h1>
            <div className="flex-1" />
            <SidebarTrigger className="md:hidden" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map(item => (
                <SidebarMenuItem key={item.href}>
                    <Link href={item.href}>
                        <SidebarMenuButton isActive={pathname.startsWith(item.href) && item.href !== '/dashboard' ? pathname === item.href : pathname === '/dashboard'}>
                            <item.icon className="size-4" />
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="https://i.pravatar.cc/150?u=user-1" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">Jane Doe</span>
                    <span className="text-xs text-muted-foreground">janedoe@email.com</span>
                </div>
            </div>
            <Link href="/" className="w-full">
                <Button variant="outline" className="w-full justify-start gap-2">
                    <LogOut className="size-4" />
                    <span>Logout</span>
                </Button>
            </Link>
        </SidebarFooter>
      </>
    )
}
