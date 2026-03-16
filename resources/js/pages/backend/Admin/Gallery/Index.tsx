import { Head, router, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';

import AdminLayout from '@/layouts/admin-layout';

interface GalleryItem {
    id: number;
    image_url: string;
    title: string;
    alt_text?: string;
    col_span: string;
    height: string;
    section: number;
    order: number;
    link: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    galleryItems: GalleryItem[];
    [key: string]: unknown;
}

const COL_SPAN_OPTIONS = [
    { value: 'md:col-span-1', label: '1 Column' },
    { value: 'md:col-span-2', label: '2 Columns' },
    { value: 'md:col-span-3', label: '3 Columns' },
    { value: 'md:col-span-4', label: '4 Columns' },
];

const HEIGHT_OPTIONS = [
    { value: 'h-[850px]', label: 'Tall (850px)' },
    { value: 'h-[400px]', label: 'Medium (400px)' },
    { value: 'h-[300px]', label: 'Short (300px)' },
    { value: 'flex-1 min-h-[192px]', label: 'Flexible' },
];

export default function GalleryIndex() {
    const { props } = usePage<PageProps>();
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(props.galleryItems || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
    const [filterSection, setFilterSection] = useState<number | 'all'>('all');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        image: null as File | null,
        alt_text: '',
        col_span: 'md:col-span-1',
        height: 'h-[850px]',
        section: 1,
        order: 0,
        link: '/productdetails',
        is_active: true,
    });

    const resetForm = () => {
        setFormData({
            title: '',
            image: null,
            alt_text: '',
            col_span: 'md:col-span-1',
            height: 'h-[850px]',
            section: 1,
            order: 0,
            link: '/productdetails',
            is_active: true,
        });
        setEditingItem(null);
    };

    const handleOpenModal = (item?: GalleryItem) => {
        if (item) {
            setEditingItem(item);
            setFormData({
                title: item.title,
                image: null,
                alt_text: item.alt_text || '',
                col_span: item.col_span,
                height: item.height,
                section: item.section,
                order: item.order,
                link: item.link || '/productdetails',
                is_active: item.is_active,
            });
        } else {
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const submitData = new FormData();
        submitData.append('title', formData.title);
        submitData.append('alt_text', formData.alt_text);
        submitData.append('col_span', formData.col_span);
        submitData.append('height', formData.height);
        submitData.append('section', formData.section.toString());
        submitData.append('order', formData.order.toString());
        submitData.append('link', formData.link);
        submitData.append('is_active', formData.is_active.toString());

        if (formData.image) {
            submitData.append('image', formData.image);
        }

        if (editingItem) {
            router.put(`/admin/gallery/${editingItem.id}`, submitData, {
                onSuccess: () => {
                    setIsSubmitting(false);
                    handleCloseModal();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            });
        } else {
            router.post('/admin/gallery', submitData, {
                onSuccess: () => {
                    setIsSubmitting(false);
                    handleCloseModal();
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            });
        }
    };

    const handleDelete = (item: GalleryItem) => {
        setSelectedItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedItem) {
            router.delete(`/admin/gallery/${selectedItem.id}`, {
                onSuccess: () => {
                    setGalleryItems((prev) => prev.filter((item) => item.id !== selectedItem.id));
                    setIsDeleteModalOpen(false);
                    setSelectedItem(null);
                },
            });
        }
    };

    const handleToggleStatus = (item: GalleryItem) => {
        router.put(`/admin/gallery/${item.id}/toggle-status`, {}, {
            onSuccess: () => {
                setGalleryItems((prev) =>
                    prev.map((i) => (i.id === item.id ? { ...i, is_active: !i.is_active } : i))
                );
            },
        });
    };

    const filteredItems = galleryItems.filter((item) => {
        if (filterSection === 'all') return true;
        return item.section === filterSection;
    });

    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.section]) {
            acc[item.section] = [];
        }
        acc[item.section].push(item);
        return acc;
    }, {} as Record<number, GalleryItem[]>);

    return (
        <AdminLayout>
            <Head title="Gallery Management" />

            <div className="bg-[#f4eded] text-gray-800">
                <div className="flex min-h-screen relative">
                    <div className="min-h-screen bg-[#f4eded] p-8 font-sans text-stone-800 w-full">
                        {/* Header Section */}
                        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-stone-900">
                                    Gallery Management
                                </h1>
                                <p className="text-stone-600 mt-1">
                                    Manage product gallery images for the frontend page.
                                </p>
                            </div>
                            <button
                                onClick={() => handleOpenModal()}
                                className="bg-red-700 hover:bg-red-800 text-white px-6 py-2.5 rounded shadow-sm transition-colors font-medium flex items-center gap-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                Add Gallery Item
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            <div className="bg-white p-5 rounded-sm shadow-sm border border-stone-200">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-blue-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">Total Items</p>
                                        <p className="text-2xl font-bold text-stone-800">{galleryItems.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-sm shadow-sm border border-stone-200">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-green-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">Active Items</p>
                                        <p className="text-2xl font-bold text-stone-800">
                                            {galleryItems.filter((i) => i.is_active).length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-sm shadow-sm border border-stone-200">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-purple-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">Section 1</p>
                                        <p className="text-2xl font-bold text-stone-800">
                                            {galleryItems.filter((i) => i.section === 1).length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-sm shadow-sm border border-stone-200">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-orange-100 rounded-full">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-orange-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">Sections 2 & 3</p>
                                        <p className="text-2xl font-bold text-stone-800">
                                            {galleryItems.filter((i) => i.section > 1).length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter */}
                        <div className="bg-white p-4 rounded-sm shadow-sm border border-stone-200 mb-6">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setFilterSection('all')}
                                    className={`px-4 py-2 rounded transition-colors ${
                                        filterSection === 'all'
                                            ? 'bg-red-700 text-white'
                                            : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                    }`}
                                >
                                    All
                                </button>
                                {[1, 2, 3].map((section) => (
                                    <button
                                        key={section}
                                        onClick={() => setFilterSection(section)}
                                        className={`px-4 py-2 rounded transition-colors ${
                                            filterSection === section
                                                ? 'bg-red-700 text-white'
                                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                        }`}
                                    >
                                        Section {section}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Gallery Items by Section */}
                        {[1, 2, 3].map((section) => {
                            const items = groupedItems[section] || [];
                            if (filterSection !== 'all' && filterSection !== section) return null;

                            return (
                                <div key={section} className="mb-8">
                                    <h2 className="text-xl font-bold text-stone-800 mb-4">
                                        Section {section}
                                    </h2>
                                    {items.length === 0 ? (
                                        <div className="bg-white p-8 rounded-sm shadow-sm border border-stone-200 text-center text-stone-500">
                                            No items in this section yet. Click "Add Gallery Item" to add one.
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {items
                                                .sort((a, b) => a.order - b.order)
                                                .map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className={`bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden ${
                                                            !item.is_active ? 'opacity-60' : ''
                                                        }`}
                                                    >
                                                        <div className="aspect-video bg-stone-100 relative">
                                                            <img
                                                                src={`/storage/${item.image_url}`}
                                                                alt={item.alt_text || item.title}
                                                                className="w-full h-full object-cover"
                                                            />
                                                            <div className="absolute top-2 right-2">
                                                                <span
                                                                    className={`px-2 py-1 text-xs rounded ${
                                                                        item.is_active
                                                                            ? 'bg-green-100 text-green-800'
                                                                            : 'bg-stone-100 text-stone-800'
                                                                    }`}
                                                                >
                                                                    {item.is_active ? 'Active' : 'Inactive'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="p-4">
                                                            <h3 className="font-semibold text-stone-800 truncate">
                                                                {item.title}
                                                            </h3>
                                                            <p className="text-sm text-stone-500 mt-1">
                                                                Order: {item.order} | {item.col_span}
                                                            </p>
                                                            <div className="flex gap-2 mt-3">
                                                                <button
                                                                    onClick={() => handleOpenModal(item)}
                                                                    className="flex-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleToggleStatus(item)}
                                                                    className={`flex-1 px-3 py-1.5 text-sm rounded transition-colors ${
                                                                        item.is_active
                                                                            ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                                                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                                                                    }`}
                                                                >
                                                                    {item.is_active ? 'Disable' : 'Enable'}
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDelete(item)}
                                                                    className="px-3 py-1.5 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Add/Edit Modal */}
                        {isModalOpen && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                                <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-stone-800 mb-4">
                                            {editingItem ? 'Edit Gallery Item' : 'Add Gallery Item'}
                                        </h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="space-y-4">
                                                {/* Title */}
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">
                                                        Title *
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.title}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, title: e.target.value })
                                                        }
                                                        required
                                                        className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                                                    />
                                                </div>

                                                {/* Image */}
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">
                                                        Image {editingItem ? '(leave empty to keep current)' : '*'}
                                                    </label>
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        required={!editingItem}
                                                        className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                                                    />
                                                    {editingItem && (
                                                        <div className="mt-2">
                                                            <img
                                                                src={`/storage/${editingItem.image_url}`}
                                                                alt="Current"
                                                                className="w-32 h-32 object-cover rounded"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Alt Text */}
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">
                                                        Alt Text
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.alt_text}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, alt_text: e.target.value })
                                                        }
                                                        className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                                                    />
                                                </div>

                                                {/* Section */}
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">
                                                        Section *
                                                    </label>
                                                    <select
                                                        value={formData.section}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                section: parseInt(e.target.value),
                                                            })
                                                        }
                                                        required
                                                        className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                                                    >
                                                        <option value={1}>Section 1</option>
                                                        <option value={2}>Section 2</option>
                                                        <option value={3}>Section 3</option>
                                                    </select>
                                                </div>

                                                {/* Column Span */}
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">
                                                        Column Span
                                                    </label>
                                                    <select
                                                        value={formData.col_span}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, col_span: e.target.value })
                                                        }
                                                        className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                                                    >
                                                        {COL_SPAN_OPTIONS.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Height */}
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">
                                                        Height
                                                    </label>
                                                    <select
                                                        value={formData.height}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, height: e.target.value })
                                                        }
                                                        className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                                                    >
                                                        {HEIGHT_OPTIONS.map((option) => (
                                                            <option key={option.value} value={option.value}>
                                                                {option.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                {/* Order */}
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">
                                                        Order
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={formData.order}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                order: parseInt(e.target.value) || 0,
                                                            })
                                                        }
                                                        min="0"
                                                        className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                                                    />
                                                </div>

                                                {/* Link */}
                                                <div>
                                                    <label className="block text-sm font-medium text-stone-700 mb-1">
                                                        Link
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={formData.link}
                                                        onChange={(e) =>
                                                            setFormData({ ...formData, link: e.target.value })
                                                        }
                                                        className="w-full px-3 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700"
                                                    />
                                                </div>

                                                {/* Active */}
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id="is_active"
                                                        checked={formData.is_active}
                                                        onChange={(e) =>
                                                            setFormData({
                                                                ...formData,
                                                                is_active: e.target.checked,
                                                            })
                                                        }
                                                        className="w-4 h-4 text-red-700 border-stone-300 rounded focus:ring-red-700"
                                                    />
                                                    <label htmlFor="is_active" className="text-sm text-stone-700">
                                                        Active
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 mt-6">
                                                <button
                                                    type="button"
                                                    onClick={handleCloseModal}
                                                    className="flex-1 px-4 py-2 border border-stone-300 text-stone-700 rounded hover:bg-stone-50 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="flex-1 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors disabled:opacity-50"
                                                >
                                                    {isSubmitting
                                                        ? 'Saving...'
                                                        : editingItem
                                                          ? 'Update'
                                                          : 'Create'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Delete Confirmation Modal */}
                        {isDeleteModalOpen && (
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                                <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-stone-800 mb-2">
                                            Confirm Delete
                                        </h2>
                                        <p className="text-stone-600">
                                            Are you sure you want to delete "{selectedItem?.title}"? This action
                                            cannot be undone.
                                        </p>
                                        <div className="flex gap-3 mt-6">
                                            <button
                                                onClick={() => {
                                                    setIsDeleteModalOpen(false);
                                                    setSelectedItem(null);
                                                }}
                                                className="flex-1 px-4 py-2 border border-stone-300 text-stone-700 rounded hover:bg-stone-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleConfirmDelete}
                                                className="flex-1 px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
