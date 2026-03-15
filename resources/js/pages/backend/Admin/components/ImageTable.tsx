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

interface ImageTableProps {
    images: ImageItem[];
    onEdit: (image: ImageItem) => void;
    onDelete: (image: ImageItem) => void;
}

export default function ImageTable({ images, onEdit, onDelete }: ImageTableProps) {
    const getFileTypeBadge = (type: string) => {
        if (type.includes('jpeg') || type.includes('jpg')) {
            return (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                    JPEG
                </span>
            );
        }
        if (type.includes('png')) {
            return (
                <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded">
                    PNG
                </span>
            );
        }
        if (type.includes('svg')) {
            return (
                <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded">
                    SVG
                </span>
            );
        }
        if (type.includes('gif')) {
            return (
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                    GIF
                </span>
            );
        }
        return (
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                {type.split('/')[1]?.toUpperCase()}
            </span>
        );
    };

    if (images.length === 0) {
        return (
            <div className="bg-white rounded-sm shadow-sm border border-stone-200 p-12 text-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-16 h-16 mx-auto text-stone-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <h3 className="text-lg font-medium text-stone-700 mb-2">No images found</h3>
                <p className="text-stone-500">
                    Upload your first image to get started with your media library.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-sm shadow-sm border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-stone-50 border-b border-stone-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">
                                Preview
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">
                                Size
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">
                                Dimensions
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">
                                Alt Text
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-stone-600 uppercase tracking-wider">
                                Uploaded
                            </th>
                            <th className="px-6 py-4 text-right text-xs font-semibold text-stone-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200">
                        {images.map((image) => (
                            <tr
                                key={image.id}
                                className="hover:bg-stone-50 transition-colors"
                            >
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="w-16 h-16 rounded overflow-hidden bg-stone-100">
                                        <img
                                            src={image.url}
                                            alt={image.alt_text || image.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-stone-900">
                                            {image.name}
                                        </span>
                                        {image.caption && (
                                            <span className="text-sm text-stone-500">
                                                {image.caption}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getFileTypeBadge(image.type)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-stone-600">
                                    {image.size}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-stone-600">
                                    {image.dimensions || '-'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-stone-600 max-w-xs truncate block">
                                        {image.alt_text || '-'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-stone-600">
                                    {image.uploaded_at}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(image)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                            title="Edit"
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
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => onDelete(image)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                                            title="Delete"
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
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-4 border-t border-stone-200 bg-stone-50">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-stone-600">
                        Showing <span className="font-medium">{images.length}</span> of{' '}
                        <span className="font-medium">{images.length}</span> images
                    </p>
                </div>
            </div>
        </div>
    );
}
