import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function Products() {
    return (
        <AdminLayout>
            <Head title="Products" />
            
            <div className="bg-[#f4eded] text-gray-800">
            <div className="flex min-h-screen relative">
                <div className="min-h-screen bg-[#f4eded] p-8 font-sans text-stone-800">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                    <h1 className="text-3xl font-bold text-stone-900">
                        Manage your products
                    </h1>
                    <p className="text-stone-600 mt-1">
                        View, edit, and manage your inventory in one place.
                    </p>
                    </div>
                    <button className="bg-red-700 hover:bg-red-800 text-white px-6 py-2.5 rounded shadow-sm transition-colors font-medium">
                    Add New Product
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-[#FDF7F7] p-4 rounded-sm shadow-sm flex flex-col">
                    <div className="relative group overflow-hidden bg-gray-200">
                        <img
                        src="images/Frame 2147226402.png"
                        alt="Broon hoodie"
                        className="w-full h-50 object-cover"
                        />
                        <span className="absolute bottom-3 left-0 bg-green-500 text-white text-xs px-2 py-1">
                        Available 20
                        </span>
                    </div>
                    <div className="mt-4 flex-grow">
                        <h3 className="text-lg font-bold text-stone-900">Broon hoodie</h3>
                        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                        A premium, smooth hoodie crafted with the perfect balance of
                        comfort and street style. Ideal for everyday wear—making every
                        look effortlessly fresh.
                        </p>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 border border-green-600 text-green-600 py-2 rounded hover:bg-green-50 transition-colors text-sm font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        Edit
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2 rounded hover:bg-red-50 transition-colors text-sm font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        Delete
                        </button>
                    </div>
                    </div>
                    <div className="bg-[#FDF7F7] p-4 rounded-sm shadow-sm flex flex-col">
                    <div className="relative group overflow-hidden bg-gray-200">
                        <img
                        src="images/Frame 2147226402 (1).png"
                        alt="Broon hoodie"
                        className="w-full h-50 object-cover"
                        />
                        <span className="absolute bottom-3 left-0 bg-green-500 text-white text-xs px-2 py-1">
                        Available 20
                        </span>
                    </div>
                    <div className="mt-4 flex-grow">
                        <h3 className="text-lg font-bold text-stone-900">
                        Broon sweatsuits
                        </h3>
                        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                        A premium, smooth hoodie crafted with the perfect balance of
                        comfort and street style. Ideal for everyday wear—making every
                        look effortlessly fresh.
                        </p>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 border border-green-600 text-green-600 py-2 rounded hover:bg-green-50 transition-colors text-sm font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        Edit
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2 rounded hover:bg-red-50 transition-colors text-sm font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        Delete
                        </button>
                    </div>
                    </div>
                    <div className="bg-[#FDF7F7] p-4 rounded-sm shadow-sm flex flex-col">
                    <div className="relative group overflow-hidden bg-gray-200">
                        <img
                        src="images/Frame 2147226402 (2).png"
                        alt="Broon hoodie"
                        className="w-full h-50 object-cover"
                        />
                        <span className="absolute bottom-3 left-0 bg-green-500 text-white text-xs px-2 py-1">
                        Available 20
                        </span>
                    </div>
                    <div className="mt-4 flex-grow">
                        <h3 className="text-lg font-bold text-stone-900">Gray hoodie</h3>
                        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                        A premium, smooth hoodie crafted with the perfect balance of
                        comfort and street style. Ideal for everyday wear—making every
                        look effortlessly fresh.
                        </p>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 border border-green-600 text-green-600 py-2 rounded hover:bg-green-50 transition-colors text-sm font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        Edit
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2 rounded hover:bg-red-50 transition-colors text-sm font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        Delete
                        </button>
                    </div>
                    </div>
                    <div className="bg-[#FDF7F7] p-4 rounded-sm shadow-sm flex flex-col">
                    <div className="relative group overflow-hidden bg-gray-200">
                        <img
                        src="images/Frame 2147226402 (3).png"
                        alt="Broon hoodie"
                        className="w-full h-50 object-cover"
                        />
                        <span className="absolute bottom-3 left-0 bg-green-500 text-white text-xs px-2 py-1">
                        Available 20
                        </span>
                    </div>
                    <div className="mt-4 flex-grow">
                        <h3 className="text-lg font-bold text-stone-900">
                        Broon sweatsuits
                        </h3>
                        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                        A premium, smooth hoodie crafted with the perfect balance of
                        comfort and street style. Ideal for everyday wear—making every
                        look effortlessly fresh.
                        </p>
                    </div>
                    <div className="mt-6 flex gap-3">
                        <button className="flex-1 flex items-center justify-center gap-2 border border-green-600 text-green-600 py-2 rounded hover:bg-green-50 transition-colors text-sm font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                        Edit
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 py-2 rounded hover:bg-red-50 transition-colors text-sm font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </AdminLayout>
    );
}
