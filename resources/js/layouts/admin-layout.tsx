import * as React from 'react';

import { AdminSidebar } from '@/layouts/partials/admin/sidebar';
import { AdminHeader } from '@/layouts/partials/admin/header';

import { AdminFooter } from './partials/admin/footer';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            {/* <AdminHeader /> */}
            <div className="flex flex-1 flex-col lg:flex-row">
                <AdminSidebar />
                <main className="flex-1 flex flex-col">{children}</main>
            </div>
            {/* <AdminFooter /> */}
        </div>
    );
}
