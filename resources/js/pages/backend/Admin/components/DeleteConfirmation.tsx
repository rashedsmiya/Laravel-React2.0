import { useState } from 'react';

interface DeleteConfirmationProps {
    isOpen?: boolean;
    category?: {
        id: number;
        name: string;
    } | null;
    imageName?: string;
    onClose: () => void;
    onConfirm?: () => void;
}

export default function DeleteConfirmation({
    isOpen,
    category,
    imageName,
    onClose,
    onConfirm,
}: DeleteConfirmationProps) {
    if (!isOpen && !category) {
        return null;
    }

    const itemName = category?.name || imageName || '';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-bold mb-2">Confirm Delete</h3>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete "{itemName}"? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    {onConfirm && (
                        <button
                            type="button"
                            onClick={onConfirm}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export function DeleteConfirmationComponent(props: DeleteConfirmationProps) {
    return DeleteConfirmation(props);
}

export type { DeleteConfirmationProps };
