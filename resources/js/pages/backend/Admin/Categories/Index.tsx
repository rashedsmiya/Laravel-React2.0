import { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';

import AdminLayout from '@/layouts/admin-layout';
import { CategoryTable } from '../components/CategoryTable';
import { CategoryModal } from '../components/CategoryModal';
import DeleteConfirmation from '../components/DeleteConfirmation';

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string | null;
    is_active: boolean;
    order: number;
    created_at: string;
}

interface PageProps {
    categories: Category[];
    [key: string]: unknown;
}

export default function CategoriesIndex() {
    const { props } = usePage<PageProps>();
    const categories: Category[] = (props.categories || []).map((cat) => ({
        ...cat,
        image: cat.image || '',
    }));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDelete = (category: Category) => {
        setCategoryToDelete(category);
        setIsDeleteOpen(true);
    };

    const handleCreate = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    const handleCloseDelete = () => {
        setIsDeleteOpen(false);
        setCategoryToDelete(null);
    };

    const handleConfirmDelete = () => {
        if (categoryToDelete) {
            router.delete(route('admin.categories.destroy', categoryToDelete.id), {
                onSuccess: () => {
                    handleCloseDelete();
                },
            });
        }
    };

    const handleToggleStatus = (category: Category) => {
        router.put(route('admin.categories.toggle-status', category.id));
    };

    return (
        <AdminLayout>
            <Head title="Category Management" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-900">
                        Categories
                    </h1>
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-blue-600 text-red-900 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span>Create New Category</span>
                    </button>
                </div>

                <CategoryTable
                    categories={categories}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                />
            </div>

            {isModalOpen && (
                <CategoryModal
                    category={selectedCategory}
                    onClose={handleCloseModal}
                />
            )}

            {isDeleteOpen && categoryToDelete && (
                <DeleteConfirmation
                    isOpen={isDeleteOpen}
                    category={categoryToDelete}
                    onClose={handleCloseDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </AdminLayout>
    );
}
