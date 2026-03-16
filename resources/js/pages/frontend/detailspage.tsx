import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';

interface ProductColor {
    name: string;
    hex: string;
}

interface ProductSize {
    size: string;
}

interface ProductProps {
    product: {
        id: number;
        name: string;
        slug: string;
        description: string;
        price: number;
        discounted_price: number | null;
        discount_percentage: number | null;
        rating: number | null;
        review_count: number;
        colors: ProductColor[];
        sizes: ProductSize[];
        image: string;
        images: string[];
        in_stock: boolean;
        stock_quantity: number;
    };
}

const detailspage: React.FC<ProductProps> = ({ product }) => {
    const [selectedColor, setSelectedColor] = useState<string>(
        product.colors.length > 0 ? product.colors[0].hex : ''
    );
    const [selectedSize, setSelectedSize] = useState<string>(
        product.sizes.length > 0 ? product.sizes[0].size : ''
    );
    const [quantity, setQuantity] = useState(1);

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    // Generate rating stars
    const renderStars = (rating: number | null) => {
        const stars = [];
        const fullStars = rating ? Math.floor(rating) : 0;
        const hasHalfStar = rating ? rating % 1 >= 0.5 : false;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <span key={i} className="text-orange-500">
                        ★
                    </span>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <span key={i} className="text-orange-500">
                        ★
                    </span>
                );
            } else {
                stars.push(
                    <span key={i} className="text-gray-300">
                        ★
                    </span>
                );
            }
        }
        return stars;
    };

    return (
        <FrontendLayout>
            <Head title={`${product.name} - Product Details`} />
            <div className="bg-[#FDF7F7] font-sans text-gray-900 overflow-x-hidden">
                <section className="text-neutral-800">
                    <div className="container mx-auto px-6 py-10">
                        {/* PRODUCT SECTION */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* LEFT: IMAGES */}
                            <div>
                                <div className="rounded-xl overflow-hidden bg-white">
                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full object-cover"
                                        />
                                    )}
                                </div>
                                {/* Thumbnails */}
                                {product.images && product.images.length > 0 && (
                                    <div className="flex gap-4 mt-4">
                                        {product.images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={img}
                                                alt={`${product.name} thumbnail ${index + 1}`}
                                                className="w-20 h-20 object-cover rounded-lg cursor-pointer border border-neutral-300 hover:border-red-500 transition"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* RIGHT: DETAILS */}
                            <div>
                                {/* Rating */}
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                    <div className="flex">
                                        {renderStars(product.rating)}
                                    </div>
                                    <span>
                                        {product.rating ? product.rating.toFixed(1) : '0'} Star Rating (
                                        {product.review_count.toLocaleString()} User feedback)
                                    </span>
                                </div>
                                {/* Title */}
                                <h1 className="text-2xl font-semibold mt-4 font-[Alumni_Sans]">
                                    {product.name}
                                </h1>
                                {/* Description */}
                                <p className="text-neutral-600 mt-3 leading-relaxed font-[Alumni_Sans]">
                                    {product.description || 'No description available.'}
                                </p>
                                {/* Colors */}
                                {product.colors && product.colors.length > 0 && (
                                    <div className="mt-6">
                                        <p className="font-semibold mb-2 font-[Alumni_Sans]">Colors</p>
                                        <div className="flex gap-3">
                                            {product.colors.map((color, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedColor(color.hex)}
                                                    className={`w-6 h-6 rounded-full border-2 cursor-pointer transition-transform hover:scale-110 ${
                                                        selectedColor === color.hex
                                                            ? 'border-black scale-110'
                                                            : 'border-transparent'
                                                    }`}
                                                    style={{ backgroundColor: color.hex }}
                                                    title={color.name}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Sizes */}
                                {product.sizes && product.sizes.length > 0 && (
                                    <div className="mt-6">
                                        <p className="font-semibold mb-2 font-[Alumni_Sans]">Size</p>
                                        <div className="flex gap-3">
                                            {product.sizes.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setSelectedSize(item.size)}
                                                    className={`px-5 py-2 rounded-md transition ${
                                                        selectedSize === item.size
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-neutral-200 hover:bg-neutral-300'
                                                    }`}
                                                >
                                                    {item.size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {/* Availability */}
                                <p className="text-sm mt-4">
                                    Availability:{' '}
                                    <span
                                        className={`font-medium ${
                                            product.in_stock ? 'text-green-600' : 'text-red-600'
                                        }`}
                                    >
                                        {product.in_stock
                                            ? `In Stock (${product.stock_quantity} available)`
                                            : 'Out of Stock'}
                                    </span>
                                </p>
                                {/* Price */}
                                <div className="flex items-center gap-4 mt-4">
                                    {product.discounted_price ? (
                                        <>
                                            <span className="text-2xl font-semibold font-[Alumni_Sans]">
                                                {formatPrice(product.discounted_price)}
                                            </span>
                                            <span className="text-neutral-500 line-through text-lg">
                                                {formatPrice(product.price)}
                                            </span>
                                            {product.discount_percentage && (
                                                <span className="text-red-600 text-sm font-medium">
                                                    {product.discount_percentage}% OFF
                                                </span>
                                            )}
                                        </>
                                    ) : (
                                        <span className="text-2xl font-semibold font-[Alumni_Sans]">
                                            {formatPrice(product.price)}
                                        </span>
                                    )}
                                </div>
                                {/* Quantity + Buttons */}
                                <div className="flex items-center gap-4 mt-6">
                                    <div className="flex items-center border rounded-md">
                                        <button
                                            onClick={decrementQuantity}
                                            className="px-3 py-2 hover:bg-neutral-100 transition"
                                        >
                                            -
                                        </button>
                                        <span className="px-4">{quantity.toString().padStart(2, '0')}</span>
                                        <button
                                            onClick={incrementQuantity}
                                            className="px-3 py-2 hover:bg-neutral-100 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        className="bg-red-600 text-white lg:px-6 lg:py-3 px-1.5 py-1.5 rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!product.in_stock}
                                    >
                                        Add To Cart
                                        <i className="fa-solid fa-cart-shopping ml-2" />
                                    </button>
                                    <button className="border border-red-600 text-red-600 lg:px-6 lg:py-3 px-1.5 py-1.5 rounded-md hover:bg-red-50 transition">
                                        Buy Now
                                    </button>
                                </div>
                                <button className="mt-4 bg-black text-white px-4 py-2 rounded-md text-sm">
                                    <i className="fa-solid fa-robot mr-2" />
                                    AI Suggest
                                </button>
                            </div>
                        </div>
                        {/* CUSTOMER FEEDBACK */}
                        <div className="mt-20 max-w-5xl">
                            <h2 className="text-2xl font-semibold mb-8 font-[Alumni_Sans]">
                                Customer Feedback
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Overall Rating */}
                                <div className="bg-yellow-100 p-8 rounded-xl text-center">
                                    <p className="text-5xl font-semibold font-[Alumni_Sans]">
                                        {product.rating ? product.rating.toFixed(1) : '0'}
                                    </p>
                                    <div className="text-orange-500 text-xl mt-2">
                                        {renderStars(product.rating)}
                                    </div>
                                    <p className="text-sm text-neutral-600 mt-2">
                                        Customer rating ({product.review_count.toLocaleString()})
                                    </p>
                                </div>
                                {/* Rating Bars */}
                                <div className="lg:col-span-2 space-y-4">
                                    {[5, 4, 3, 2, 1].map((star) => {
                                        // Simulated distribution percentages
                                        const percentages: Record<number, number> = {
                                            5: 63,
                                            4: 24,
                                            3: 9,
                                            2: 1,
                                            1: 3,
                                        };
                                        const percentage = percentages[star] || 0;

                                        return (
                                            <div key={star} className="flex items-center gap-4">
                                                <span className="text-orange-500 text-sm">
                                                    {star === 5
                                                        ? '★★★★★'
                                                        : star === 4
                                                        ? '★★★★'
                                                        : star === 3
                                                        ? '★★★'
                                                        : star === 2
                                                        ? '★★'
                                                        : '★'}
                                                </span>
                                                <div className="flex-1 bg-neutral-200 h-2 rounded">
                                                    <div
                                                        className="bg-orange-500 h-2 rounded"
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-neutral-500">{percentage}%</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            {/* Reviews List */}
                            <div className="mt-12 space-y-8">
                                <h1 className="text-2xl font-medium mb-8 font-[Alumni_Sans]">
                                    Customer Feedback
                                </h1>
                                {/* Review Item */}
                                <div className="border-b pb-6">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src="https://assets.bucketlistly.blog/sites/5adf778b6eabcc00190b75b1/assets/6075182186d092000b192cee/best-free-travel-images-image-2.jpg"
                                            alt="User avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="font-medium">Daniel Marshall</p>
                                            <div className="text-orange-500 text-sm">★★★★★</div>
                                        </div>
                                    </div>
                                    <p className="text-neutral-600 mt-3">
                                        This hoodie completely changed my everyday style. The fit is
                                        premium, the comfort is next-level, and the look is perfectly
                                        balanced.
                                    </p>
                                </div>
                                <div className="border-b pb-6">
                                    <div className="flex items-center gap-3">
                                        <div>
                                            <p className="font-medium">Brooklyn Simmons</p>
                                            <div className="text-orange-500 text-sm">★★★★★</div>
                                        </div>
                                    </div>
                                    <p className="text-neutral-600 mt-3">
                                        I wore it once and everyone asked where I got it from. The fit is
                                        perfect and the vibe is unmatched.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 font-sans mt-12">
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center border border-gray-100 text-gray-700 hover:bg-gray-50"
                                >
                                    «
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center border border-gray-100 text-gray-700 hover:bg-gray-50"
                                >
                                    ‹
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#b91c1c] text-white"
                                >
                                    1
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center border border-gray-100 text-gray-700 hover:bg-gray-50"
                                >
                                    2
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center border border-gray-100 text-gray-700 hover:bg-gray-50"
                                >
                                    3
                                </a>
                                <span className="flex h-9 w-9 items-center justify-center text-gray-700">
                                    ...
                                </span>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center border border-gray-100 text-gray-700 hover:bg-gray-50"
                                >
                                    10
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center border border-gray-100 text-gray-700 hover:bg-gray-50"
                                >
                                    ›
                                </a>
                                <a
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center border border-gray-100 text-gray-700 hover:bg-gray-50"
                                >
                                    »
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </FrontendLayout>
    );
};

export default detailspage;
