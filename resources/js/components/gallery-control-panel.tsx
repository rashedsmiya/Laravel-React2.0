import { useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface GalleryItem {
    id: number;
    title: string;
    image_url: string;
    is_active: boolean;
    section: number;
    order: number;
}

interface GalleryControlPanelProps {
    galleryItems: GalleryItem[];
    totalGalleryItems: number;
    activeGalleryItems: number;
}

export default function GalleryControlPanel({
    galleryItems,
    totalGalleryItems,
    activeGalleryItems,
}: GalleryControlPanelProps) {
    const toggleStatus = (id: number, currentStatus: boolean) => {
        router.put(route('admin.gallery.toggle-status', id));
    };

    return (
        <div className="col-span-12 lg:col-span-4 bg-[#FDF7F7] p-4 md:p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Gallery Control Panel</h3>
                <Link
                    href={route('admin.gallery.index')}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                    Manage Gallery →
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                    <span className="text-xs text-gray-600 block">Total Items</span>
                    <span className="text-xl font-bold text-gray-900">{totalGalleryItems}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100">
                    <span className="text-xs text-gray-600 block">Active</span>
                    <span className="text-xl font-bold text-teal-600">{activeGalleryItems}</span>
                </div>
            </div>

            {/* Gallery Items Preview */}
            <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-900">Recent Gallery Items</h4>
                {galleryItems.length === 0 ? (
                    <p className="text-sm text-gray-500">No gallery items yet.</p>
                ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {galleryItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100"
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="w-10 h-10 rounded object-cover"
                                    />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Section {item.section}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleStatus(item.id, item.is_active)}
                                    className={`px-2 py-1 text-xs rounded ${
                                        item.is_active
                                            ? 'bg-teal-100 text-teal-700'
                                            : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                    {item.is_active ? 'Active' : 'Inactive'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}