import { Head, router, usePage } from '@inertiajs/react';
import { useState, useRef } from 'react';

import AdminLayout from '@/layouts/admin-layout';

import DeleteConfirmation from '../components/DeleteConfirmation';
import ImageTable from '../components/ImageTable';
import UpdateModal from '../components/UpdateModal';

interface ImageItem {
    id: number;
    name: string;
    url: string;
    type: string;
    size: string;
    dimensions?: string;
    uploaded_at: string;
    alt_text?: string;
    caption?: string;
}

interface PageProps {
    images: ImageItem[];
    [key: string]: unknown;
}

export default function Images() {
    const { props } = usePage<PageProps>();
    const [images, setImages] = useState<ImageItem[]>(props.images || []);
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleEdit = (image: ImageItem) => {
        setSelectedImage(image);
        setIsUpdateModalOpen(true);
    };

    const handleDelete = (image: ImageItem) => {
        setSelectedImage(image);
        setIsDeleteModalOpen(true);
    };

    const handleUpdate = (updatedImage: ImageItem) => {
        router.put(`/admin/images/${updatedImage.id}`, {
            alt_text: updatedImage.alt_text,
            caption: updatedImage.caption,
        }, {
            onSuccess: () => {
                setImages((prev) =>
                    prev.map((img) => (img.id === updatedImage.id ? { ...img, ...updatedImage } : img))
                );
                setIsUpdateModalOpen(false);
                setSelectedImage(null);
            },
        });
    };

    const handleConfirmDelete = () => {
        if (selectedImage) {
            router.delete(`/admin/images/${selectedImage.id}`, {
                onSuccess: () => {
                    setImages((prev) => prev.filter((img) => img.id !== selectedImage.id));
                    setIsDeleteModalOpen(false);
                    setSelectedImage(null);
                },
            });
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        const formData = new FormData();
        formData.append('image', file);

        router.post('/admin/images', formData, {
            onSuccess: () => {
                setIsUploading(false);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
            onError: () => {
                setIsUploading(false);
            },
        });
    };

    const filteredImages = images.filter((image) => {
        const matchesSearch =
            image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.alt_text?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || image.type.includes(filterType);
        return matchesSearch && matchesType;
    });

    const totalSize = images.reduce((acc, img) => {
        const sizeStr = img.size.replace(/[^0-9]/g, '');
        return acc + (parseInt(sizeStr) || 0);
    }, 0);

    const formatSize = (bytes: number): string => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <AdminLayout>
            <Head title="Image Management" />

            <div className="bg-[#f4eded] text-gray-800">
                <div className="flex min-h-screen relative">
                    <div className="min-h-screen bg-[#f4eded] p-8 font-sans text-stone-800 w-full">
                        {/* Hidden file input for uploads */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />

                        {/* Header Section */}
                        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-stone-900">
                                    Image Management
                                </h1>
                                <p className="text-stone-600 mt-1">
                                    Upload, organize, and manage your media library.
                                </p>
                            </div>
                            <button
                                onClick={handleUploadClick}
                                disabled={isUploading}
                                className="bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white px-6 py-2.5 rounded shadow-sm transition-colors font-medium flex items-center gap-2"
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
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                    />
                                </svg>
                                {isUploading ? 'Uploading...' : 'Upload Image'}
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
                                        <p className="text-sm text-stone-500">Total Images</p>
                                        <p className="text-2xl font-bold text-stone-800">{images.length}</p>
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
                                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">JPEG Images</p>
                                        <p className="text-2xl font-bold text-stone-800">
                                            {images.filter((i) => i.type.includes('jpeg') || i.type.includes('jpg')).length}
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
                                                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">PNG Images</p>
                                        <p className="text-2xl font-bold text-stone-800">
                                            {images.filter((i) => i.type.includes('png')).length}
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
                                                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-stone-500">Total Size</p>
                                        <p className="text-2xl font-bold text-stone-800">{formatSize(totalSize)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="bg-white p-4 rounded-sm shadow-sm border border-stone-200 mb-6">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Search images by name or alt text..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <select
                                        value={filterType}
                                        onChange={(e) => setFilterType(e.target.value)}
                                        className="px-4 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                                    >
                                        <option value="all">All Types</option>
                                        <option value="jpeg">JPEG</option>
                                        <option value="png">PNG</option>
                                        <option value="svg">SVG</option>
                                        <option value="gif">GIF</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Image Table */}
                        <ImageTable
                            images={filteredImages}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                        {/* Update Modal */}
                        <UpdateModal
                            isOpen={isUpdateModalOpen}
                            onClose={() => {
                                setIsUpdateModalOpen(false);
                                setSelectedImage(null);
                            }}
                            image={selectedImage}
                            onUpdate={handleUpdate}
                        />

                        {/* Delete Confirmation */}
                        <DeleteConfirmation
                            isOpen={isDeleteModalOpen}
                            onClose={() => {
                                setIsDeleteModalOpen(false);
                                setSelectedImage(null);
                            }}
                            onConfirm={handleConfirmDelete}
                            imageName={selectedImage?.name || ''}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
