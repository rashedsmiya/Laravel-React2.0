import { Link, usePage } from '@inertiajs/react';
import * as React from 'react';
const logo = "/assets/images/Layer_1 (2).png";

export const AdminSidebar = React.memo(() => {
    const { url } = usePage();
    const navLinkClasses = (isActive: boolean) =>
        'flex items-center px-4 py-3 text-gray-900 hover:bg-gray-50 transition' +
        (isActive ? ' bg-red-50 border-l-4 border-red-600 rounded-l-md font-medium' : '');

    return (
        <>
        <div
            id="sidebarOverlay"
            className="fixed inset-0 z-40 bg-black/50 lg:hidden hidden"
            onClick={() => {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('sidebarOverlay');
                if (sidebar) sidebar.classList.add('-translate-x-full');
                if (overlay) overlay.classList.add('hidden');
            }}
        />
        <aside
        id="sidebar"
        className="fixed inset-y-0 left-0 z-50 h-screen w-64 bg-[var(--bg-animation)] border-r border-gray-200 flex flex-col justify-between py-4 overflow-y-auto transform -translate-x-full lg:translate-x-0 lg:static lg:inset-0 lg:h-screen transition-transform duration-300 ease-in-out"
      >
        <div>
          <button
            id="closeBtn"
            className="lg:hidden absolute top-4 right-4 text-gray-500"
            onClick={() => {
                const sidebar = document.getElementById('sidebar');
                const overlay = document.getElementById('sidebarOverlay');
                if (sidebar) sidebar.classList.add('-translate-x-full');
                if (overlay) overlay.classList.add('hidden');
            }}
          >
            <i className="fas fa-times text-xl" />
          </button>
          <div className="px-6 mt-4 flex flex-col items-center p-6">
            <div className="mb-2">
              <img src='https://images.unsplash.com/photo-1769937060137-22671294c3cc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt="Logo" />
            </div>
          </div>
          <nav className="space-y-2 pt-4 border-t border-gray-400 px-6">
            <Link
              href={route('admin.dashboard')}
              className={navLinkClasses(url === '/admin/dashboard')}
            >
              <i className="fas fa-th-large w-5 text-red-600" />
              <span className="ml-3 font-medium">Overview</span>
            </Link>
            <Link
              href={route('admin.user-dashboard')}
              className={navLinkClasses(url.startsWith('/admin/user-dashboard'))}
            >
              <i className="fas fa-users w-5" />
              <span className="ml-3 font-medium">Users</span>
            </Link>
            <Link
              href={route('admin.orders')}
              className={navLinkClasses(url.startsWith('/admin/orders'))}
            >
              <i className="fas fa-shopping-cart w-5" />
              <span className="ml-3 font-medium">Orders</span>
            </Link>
            <Link
              href={route('admin.products')}
              className={navLinkClasses(url.startsWith('/admin/products'))}
            >
              <i className="fas fa-box w-5" />
              <span className="ml-3 font-medium">Products</span>
            </Link>

            <Link
              href={route('admin.images')}
              className={navLinkClasses(url.startsWith('/admin/images'))}
            >
              <i className="fas fa-images w-5" />
              <span className="ml-3 font-medium">Images</span>
            </Link>

            <Link
            href={route('admin.categories.index')}
            className={navLinkClasses(url.startsWith('/admin/categories'))}
          >
            <i className="fas fa-tags w-5" />
            <span className="ml-3 font-medium">Categories</span>
          </Link>
          </nav>
        </div>
        <div className="px-6 border-t border-gray-400 pt-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
              <img
                src="https://images.unsplash.com/photo-1769937060137-22671294c3cc?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">Super Admin</p>
              <p className="text-xs text-gray-400 truncate">admin@platform.com</p>
            </div>
          </div>
          <Link
            href={route('admin.logout')}
            method="post"
            as="button"
            className="flex items-center text-red-500 text-sm font-medium hover:opacity-80 transition w-full"
          >
            <i className="fas fa-sign-out-alt mr-2" />
            Log Out
          </Link>
        </div>
      </aside>
      </>
    );
});

AdminSidebar.displayName = 'AdminSidebar';