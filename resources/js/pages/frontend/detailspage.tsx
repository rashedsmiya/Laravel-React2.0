import React from 'react';
import { Head } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';

const detailspage = () => {
    return (
        <FrontendLayout>
            <Head title="Product Details" />
            <div className="bg-[#FDF7F7] font-sans text-gray-900 overflow-x-hidden">
                <section className="text-neutral-800">
                    <div className="container mx-auto px-6 py-10">
                        {/* PRODUCT SECTION */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* LEFT: IMAGES */}
                            <div>
                                <div className="rounded-xl overflow-hidden bg-white">
                                    {/* <img
                                        src="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
                                        className="w-full object-cover"
                                    /> */}
                                </div>
                                {/* Thumbnails */}
                                <div className="flex gap-4 mt-4">
                                    {/* <img
                                        src="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
                                        className="w-20 h-20 object-cover rounded-lg cursor-pointer border border-neutral-300"
                                    />
                                    <img
                                        src="https://www.bucketlistly.blog/posts/best-free-travel-images"
                                        className="w-20 h-20 object-cover rounded-lg cursor-pointer border border-neutral-300"
                                    />
                                    <img
                                        src="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
                                        className="w-20 h-20 object-cover rounded-lg cursor-pointer border border-neutral-300"
                                    />
                                    <img
                                        src="https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg"
                                        className="w-20 h-20 object-cover rounded-lg cursor-pointer border border-neutral-300"
                                    /> */}
                                </div>
                            </div>
                            {/* RIGHT: DETAILS */}
                            <div>
                                {/* Rating */}
                                <div className="flex items-center gap-2 text-sm text-neutral-600">
                                    <div className="flex text-orange-500">★★★★★</div>
                                    <span>4.7 Star Rating (21,671 User feedback)</span>
                                </div>
                                {/* Title */}
                                <h1 className="text-2xl font-semibold mt-4 font-[Alumni_Sans]">
                                    Maroon hoodie
                                </h1>
                                {/* Description */}
                                <p className="text-neutral-600 mt-3 leading-relaxed font-[Alumni_Sans]">
                                    A premium, smooth hoodie crafted with the perfect balance of comfort
                                    and street style. Ideal for everyday wear — making every look
                                    effortlessly fresh.
                                </p>
                                {/* Colors */}
                                <div className="mt-6">
                                    <p className="font-semibold mb-2 font-[Alumni_Sans]">Colors</p>
                                    <div className="flex gap-3">
                                        <span className="w-6 h-6 bg-red-800 rounded-full border-2 border-black cursor-pointer" />
                                        <span className="w-6 h-6 bg-black rounded-full cursor-pointer" />
                                        <span className="w-6 h-6 bg-gray-600 rounded-full cursor-pointer" />
                                    </div>
                                </div>
                                {/* Sizes */}
                                <div className="mt-6">
                                    <p className="font-semibold mb-2 font-[Alumni_Sans]">Size</p>
                                    <div className="flex gap-3">
                                        <button className="px-5 py-2 bg-red-600 text-white rounded-md">
                                            38
                                        </button>
                                        <button className="px-5 py-2 bg-neutral-200 rounded-md">
                                            40
                                        </button>
                                        <button className="px-5 py-2 bg-neutral-200 rounded-md">
                                            42
                                        </button>
                                        <button className="px-5 py-2 bg-neutral-200 rounded-md">
                                            44
                                        </button>
                                    </div>
                                </div>
                                {/* Availability */}
                                <p className="text-sm mt-4">
                                    Availability:{" "}
                                    <span className="text-green-600 font-medium">In Stock</span>
                                </p>
                                {/* Price */}
                                <div className="flex items-center gap-4 mt-4">
                                    <span className="text-2xl font-semibold font-[Alumni_Sans]">
                                        $1699
                                    </span>
                                    <span className="text-red-600 text-sm font-medium">21% OFF</span>
                                </div>
                                {/* Quantity + Buttons */}
                                <div className="flex items-center gap-4 mt-6">
                                    <div className="flex items-center border rounded-md">
                                        <button className="px-3 py-2">-</button>
                                        <span className="px-4">01</span>
                                        <button className="px-3 py-2">+</button>
                                    </div>
                                    <button className="bg-red-600 text-white lg:px-6 lg:py-3 px-1.5 py-1.5 rounded-md hover:bg-red-700 transition">
                                        Add To Cart
                                        <i className="fa-solid fa-cart-shopping" />
                                    </button>
                                    <button className="border border-red-600 text-red-600 lg:px-6 lg:py-3 px-1.5 py-1.5 rounded-md hover:bg-red-50 transition">
                                        Buy Now
                                    </button>
                                </div>
                                <button className="mt-4 bg-black text-white px-4 py-2 rounded-md text-sm">
                                    <i className="fa-solid fa-robot" />
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
                                    <p className="text-5xl font-semibold font-[Alumni_Sans]">4.7</p>
                                    <div className="text-orange-500 text-xl mt-2">★★★★★</div>
                                    <p className="text-sm text-neutral-600 mt-2">
                                        Customer rating (834,516)
                                    </p>
                                </div>
                                {/* Rating Bars */}
                                <div className="lg:col-span-2 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-orange-500 text-sm">★★★★★</span>
                                        <div className="flex-1 bg-neutral-200 h-2 rounded">
                                            <div className="bg-orange-500 h-2 rounded w-[63%]" />
                                        </div>
                                        <span className="text-sm text-neutral-500">63%</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-orange-500 text-sm">★★★★</span>
                                        <div className="flex-1 bg-neutral-200 h-2 rounded">
                                            <div className="bg-orange-500 h-2 rounded w-[24%]" />
                                        </div>
                                        <span className="text-sm text-neutral-500">24%</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-orange-500 text-sm">★★★</span>
                                        <div className="flex-1 bg-neutral-200 h-2 rounded">
                                            <div className="bg-orange-500 h-2 rounded w-[9%]" />
                                        </div>
                                        <span className="text-sm text-neutral-500">9%</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-orange-500 text-sm">★★</span>
                                        <div className="flex-1 bg-neutral-200 h-2 rounded">
                                            <div className="bg-orange-500 h-2 rounded w-[1%]" />
                                        </div>
                                        <span className="text-sm text-neutral-500">1%</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-orange-500 text-sm">★</span>
                                        <div className="flex-1 bg-neutral-200 h-2 rounded">
                                            <div className="bg-orange-500 h-2 rounded w-[7%]" />
                                        </div>
                                        <span className="text-sm text-neutral-500">7%</span>
                                    </div>
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
                                        {/* <img
                                            src="https://assets.bucketlistly.blog/sites/5adf778b6eabcc00190b75b1/assets/6075182186d092000b192cee/best-free-travel-images-image-2.jpg"
                                            className="w-10 h-10 rounded-full"
                                        /> */}
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
