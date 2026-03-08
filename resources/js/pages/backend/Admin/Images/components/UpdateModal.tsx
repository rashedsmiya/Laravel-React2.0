import { useState, useEffect } from 'react';

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

interface UpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    image: ImageItem | null;
    onUpdate: (updatedImage: ImageItem) => void;
}

export default function UpdateModal({ isOpen, onClose, image, onUpdate }: UpdateModalProps) {
    const [altText, setAltText] = useState('');
    const [caption, setCaption] = useState('');

    useEffect(() => {
        if (image) {
            setAltText(image.alt_text || '');
            setCaption(image.caption || '');
        }
    }, [image]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (image) {
            onUpdate({
                ...image,
                alt_text: altText,
                caption: caption,
            });
        }
    };

    if (!isOpen || !image) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-stone-200">
                        <h3 className="text-xl font-semibold text-stone-900">
                            Edit Image Details
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <form onSubmit={handleSubmit}>
                        <div className="p-6">
                            {/* Image Preview */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-stone-700 mb-2">
                                    Preview
                                </label>
                                <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg">
                                    <div className="w-24 h-24 rounded overflow-hidden bg-white shadow-sm">
                                        <img
                                            src={image.url}
                                            alt={altText || image.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-stone-900">{image.name}</p>
                                        <p className="text-sm text-stone-500">
                                            {image.size} • {image.dimensions || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Alt Text */}
                            <div className="mb-4">
                                <label
                                    htmlFor="altText"
                                    className="block text-sm font-medium text-stone-700 mb-2"
                                >
                                    Alt Text
                                </label>
                                <input
                                    type="text"
                                    id="altText"
                                    value={altText}
                                    onChange={(e) => setAltText(e.target.value)}
                                    placeholder="Describe the image for accessibility"
                                    className="w-full px-4 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent"
                                />
                                <p className="mt-1 text-sm text-stone-500">
                                    Used for screen readers and SEO
                                </p>
                            </div>

                            {/* Caption */}
                            <div className="mb-4">
                                <label
                                    htmlFor="caption"
                                    className="block text-sm font-medium text-stone-700 mb-2"
                                >
                                    Caption
                                </label>
                                <textarea
                                    id="caption"
                                    value={caption}
                                    onChange={(e) => setCaption(e.target.value)}
                                    placeholder="Add a caption for this image"
                                    rows={3}
                                    className="w-full px-4 py-2 border border-stone-300 rounded focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent resize-none"
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-stone-200 bg-stone-50 rounded-b-lg">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-stone-700 bg-white border border-stone-300 rounded hover:bg-stone-50 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 text-white bg-red-700 rounded hover:bg-red-800 transition-colors font-medium"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
