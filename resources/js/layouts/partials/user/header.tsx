import { Link, router, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { type SharedData } from '@/types';

interface UserHeaderProps {
    showProfileMenu?: boolean;
}

export function UserHeader({ showProfileMenu = true }: UserHeaderProps) {
    const { auth } = usePage<SharedData>().props;

    const handleLogout = (): void => {
        router.post(route('logout'));
    };

    return (
        <header className="border-b bg-white">
             <div className="bg-[#FDF7F7] font-sans text-gray-900 overflow-x-hidden">
                <div className="container mx-auto mt-10 relative z-50 flex items-center justify-between bg-[#f4eded] px-6 py-5 md:px-12">
            
                    <div className="flex items-center gap-2">
                        <img src="/assets/images/pngegg.png" alt="Logo" className="h-16 w-auto"/>
                    </div>

                    <ul className="hidden md:flex space-x-10 text-sm font-semibold tracking-wider font-['Libre_Franklin']">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); router.get(route('dashboard')); }} className="text-red-600">Order</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); router.get(route('profile-edit')); }} className="hover:text-red-600 transition">Profile</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); router.get(route('settings-details')); }} className="hover:text-red-600 transition">Settings</a></li>
                    </ul>

                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="relative hidden sm:flex items-center gap-2 rounded bg-black px-4 py-2.5">
                        <i className="fa-solid fa-magnifying-glass text-xs text-gray-400"></i>
                        <input type="text" placeholder="Search" className="w-20 md:w-32 bg-transparent text-xs text-white outline-none placeholder:text-gray-500"></input>
                        </div>
                        
                        <button className="text-lg"><i className="fa-solid fa-cart-shopping"></i></button>
                        <button className="text-lg"><i className="fa-regular fa-circle-user"></i></button>
                        
                        <button className="md:hidden text-2xl" onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}>
                        <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>

                    <div id="mobile-menu" className="absolute left-0 top-full hidden w-full bg-[#f4eded] border-t border-gray-200 p-6 md:hidden">
                        <ul className="flex flex-col space-y-4 text-sm font-semibold uppercase tracking-wider font-['Libre_Franklin']">
                        <li><a href="#" onClick={(e) => { e.preventDefault(); router.get(route('dashboard')); }} className="block text-red-600">Order</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); router.get(route('profile-edit')); }} className="block">Profile</a></li>
                        <li><a href="#" onClick={(e) => { e.preventDefault(); router.get(route('settings-details')); }} className="block">Settings</a></li>
                        <li className="pt-4 border-t border-gray-300">
                            <div className="flex items-center gap-2 rounded bg-black px-4 py-2">
                            <i className="fa-solid fa-magnifying-glass text-xs text-gray-400"></i>
                            <input type="text" placeholder="Search" className="w-full bg-transparent text-xs text-white outline-none"></input>
                            </div>
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}
