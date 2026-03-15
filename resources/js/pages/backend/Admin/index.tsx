import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { CategoryTable } from './components/CategoryTable';

export default function CategoriesIndex({ categories }: { categories: any[] }) {
    return (
        <AdminLayout>
            <Head title="Category Management" />
            <div className="bg-red-900 text-white">
                <div className="flex min-h-screen relative">
                    <main className="flex-1 p-8">
                        <header className="mb-8 flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">Category Management</h2>
                                <p className="text-white">
                                    Manage your product categories, images, and ordering.
                                </p>
                            </div>
                            <button
                                onClick={() => window.location.href = route('admin.categories.index')}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Manage Categories
                            </button>
                        </header>
                        <CategoryTable categories={categories} />
                    </main>
                </div>
            </div>
        </AdminLayout>
    );
}