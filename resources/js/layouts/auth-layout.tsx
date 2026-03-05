import { Head, Link } from '@inertiajs/react';
import * as React from 'react';

import { login, register } from '@/routes';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    context?: 'login' | 'register';
}

export default function AuthLayout({
    children,
    title,
    description,
    context = 'login',
}: AuthLayoutProps) {
    const isRegisterView = context === 'register';
    const ctaHref = isRegisterView ? login() : register();
    const ctaLabel = isRegisterView ? 'Return to login' : 'Create account';
    const ctaPrompt = isRegisterView ? 'Already have an account?' : "Don't have an account?";

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <Head title={title} />
                    {children}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {ctaPrompt}{' '}
                        <Link
                            href={ctaHref}
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            {ctaLabel}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}