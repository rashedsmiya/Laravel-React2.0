import { Link } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    Settings,
    ShoppingCart,
    Package,
    BarChart3,
} from 'lucide-react';

import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';

import AppLogo from './app-logo';

export interface AdminSidebarProps {
    activeSlug?: string;
}

export function AdminSidebar({
    activeSlug = 'dashboard',
}: AdminSidebarProps) {
    const dashboardUrl = route('admin.dashboard');
    const usersUrl = route('admin.users.list');

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboardUrl,
            icon: LayoutDashboard,
            slug: 'dashboard',
        },
        {
            title: 'Users',
            href: usersUrl,
            icon: Users,
            slug: 'users',
        },
        {
            title: 'Orders',
            href: '#',
            icon: ShoppingCart,
            slug: 'orders',
        },
        {
            title: 'Products',
            href: '#',
            icon: Package,
            slug: 'products',
        },
        {
            title: 'Analytics',
            href: '#',
            icon: BarChart3,
            slug: 'analytics',
        },
        {
            title: 'Settings',
            href: '#',
            icon: Settings,
            slug: 'settings',
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: Package,
        },
    ];

    // Update nav items to include active state
    const navItemsWithActive = mainNavItems.map((item) => ({
        ...item,
        isActive: item.slug === activeSlug,
    }));

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItemsWithActive} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
            </SidebarFooter>
        </Sidebar>
    );
}
