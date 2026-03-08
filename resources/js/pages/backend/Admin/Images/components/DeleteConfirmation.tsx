interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    imageName: string;
}

export default function DeleteConfirmation({
    isOpen,
    onClose,
    onConfirm,
    imageName,
}: DeleteConfirmationProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md">
                    {/* Icon */}
                    <div className="flex justify-center pt-8">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 text-red-600"
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
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 text-center">
                        <h3 className="text-xl font-semibold text-stone-900 mb-2">
                            Delete Image
                        </h3>
                        <p className="text-stone-600 mb-4">
                            Are you sure you want to delete{' '}
                            <span className="font-medium text-stone-900">{imageName}</span>? This
                            action cannot be undone.
                        </p>
                        <p className="text-sm text-stone-500">
                            The image will be permanently removed from your media library.
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-3 p-6 border-t border-stone-200 bg-stone-50 rounded-b-lg">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-5 py-2.5 text-stone-700 bg-white border border-stone-300 rounded hover:bg-stone-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="flex-1 px-5 py-2.5 text-white bg-red-600 rounded hover:bg-red-700 transition-colors font-medium"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
