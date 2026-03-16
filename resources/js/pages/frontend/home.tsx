import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import FrontendLayout from '@/layouts/frontend-layout';

interface Slider {
    id: number;
    tagline: string;
    title: string;
    image: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
}

interface Product {
    id: number;
    name: string;
    slug: string;
    image: string;
    price: string;
}

interface HomeProps {
    sliders: Slider[];
    categories: Category[];
    featuredProducts: Product[];
    newArrivals: Product[];
}

const HeroSlider: React.FC<{ sliders: Slider[] }> = ({ sliders }) => {
    const [current, setCurrent] = useState(0);

    // Use database sliders, fallback to empty array
    const slides = sliders.length > 0 ? sliders : [];

    const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
    const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

    if (slides.length === 0) {
        return null;
    }

    return (
        <section className="relative min-h-[90vh] lg:h-[80vh] flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-24 overflow-hidden container mx-auto lg:pt-20 pt-8">

          {/* Content Side */}
          <div className="relative max-w-xl z-20 text-center lg:text-left transition-all duration-500 ease-in-out">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <img src="https://vos.line-scdn.net/strapi-cluster-instance-bucket-84/appicon_01_f9ed1cf01f.jpeg" className="w-18 h-10 " />
              <p className="text-[12px] font-semibold font-['Libre_Franklin'] tracking-widest text-gray-800 uppercase">
                {slides[current].tagline}
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-['Alumni_Sans'] leading-[1.1] mb-10 transition-opacity duration-500">
              {slides[current].title}
            </h1>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="bg-red-800 text-white px-10 py-3.5 text-sm font-medium font-['Libre_Franklin'] rounded-md hover:bg-black transition w-full sm:w-auto">
                Buy Now
              </button>
              <button className="border border-[#B32B2B] text-[#B32B2B] px-10 py-3.5 text-sm font-medium font-['Libre_Franklin'] rounded-md hover:bg-[#B32B2B] hover:text-white transition w-full sm:w-auto">
                Learn More
              </button>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative lg:absolute right-0 lg:right-[-10%] top-0 h-[50vh] lg:h-full w-full lg:w-2/3 flex items-center justify-center lg:mt-12 mt-0">
            <img
              key={slides[current].id}
              src={slides[current].image}
              alt="Hero"
              className="relative z-10 h-[80%] lg:h-[90%] object-contain drop-shadow-2xl animate-fade-in"
            />
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-[#B32B2B] opacity-10 blur-[120px] rounded-full scale-75 transform translate-x-20" />
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#B32B2B] text-white w-12 h-12 flex items-center justify-center rounded-md z-30 hover:bg-black transition"
          >
            <i className="fa-solid fa-arrow-left" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#B32B2B] text-white w-12 h-12 flex items-center justify-center rounded-md z-30 hover:bg-black transition"
          >
            <i className="fa-solid fa-arrow-right" />
          </button>

          {/* Slide Indicators (Dots) */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-40">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 transition-all duration-300 rounded-full ${current === index ? 'w-8 bg-[#B32B2B]' : 'w-2 bg-gray-300'}`}
              />
            ))}
          </div>
        </section>
    );
};

const CategorySection: React.FC<{ categories: Category[] }> = ({ categories }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(categories.length / itemsPerPage);

    const nextPage = () => setCurrentPage(currentPage === totalPages - 1 ? 0 : currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage === 0 ? totalPages - 1 : currentPage - 1);

    if (categories.length === 0) {
        return null;
    }

    const startIndex = currentPage * itemsPerPage;
    const currentCategories = categories.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="text-[#1A1A1A] container mx-auto">
            <section className="px-10 lg:px-24 lg:py-20 py-6">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="lg:text-5xl text-3xl font-semibold tracking-tight font-['Alumni_Sans']">
                    Category
                    </h2>
                    <div className="flex gap-3">
                    <button
                        onClick={prevPage}
                        className="bg-[#B22222] text-white p-3.5 hover:bg-black transition rounded-md shadow-md"
                    >
                        <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={4}
                            d="M15 19l-7-7 7-7"
                        />
                        </svg>
                    </button>
                    <button
                        onClick={nextPage}
                        className="bg-[#B22222] text-white p-3.5 hover:bg-black transition rounded-md shadow-md"
                    >
                        <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={4}
                            d="M9 5l7 7-7 7"
                        />
                        </svg>
                    </button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentCategories.map((category) => (
                        <div key={category.id} className="group cursor-pointer">
                            <div className="overflow-hidden rounded-md aspect-[4/5] bg-gray-200">
                                <img
                                src={category.image}
                                className="w-full lg:h-[980px] h-full object-cover group-hover:scale-105 transition duration-700"
                                alt={category.name}
                                />
                            </div>
                            <h3 className="mt-6 lg:text-4xl text-3xl font-semibold font-['Alumni_Sans'] tracking-tight">
                                {category.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const FeaturedProductsSection: React.FC<{ products: Product[] }> = ({ products }) => {
    if (products.length === 0) {
        return null;
    }

    return (
        <div className="text-[#1A1A1A] container mx-auto">
            <section className="px-10 lg:px-24 lg:py-20 py-6">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="lg:text-5xl text-3xl font-semibold tracking-tight font-['Alumni_Sans']">
                    Featured Products
                    </h2>
                </div>
                <div className="grid grid-cols-2 gap-8">
                    {products.slice(0, 4).map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <div className="overflow-hidden rounded-md aspect-[4/5] bg-gray-200">
                                <img
                                src={product.image}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                alt={product.name}
                                />
                            </div>
                        </div>
                    ))}
                    {products.length > 4 && (
                        <div className="relative overflow-hidden rounded-md group cursor-pointer h-[174px] lg:h-[820px] w-full">
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full group-hover:scale-105 transition duration-700"
                                style={{ backgroundImage: `url("${products[4]?.image}")` }}
                            >
                                <div className="absolute inset-0 bg-black/60 backdrop-brightness-75" />
                            </div>
                            <div className="relative z-10 flex h-full flex-col items-center justify-center text-white px-4">
                                <h1 className="mb-4 md:mb-8 text-xl md:text-2xl lg:text-3xl font-[Alumni_Sans] tracking-wide text-center">
                                {products[4]?.name}
                                </h1>
                                <div className="mb-4 lg:mb-8 h-10 lg:h-24 w-px bg-gray-400" />
                                <button onClick={() => router.visit('/detailspage')} className="bg-[#bc2a2e] lg:w-full max-w-[200px] sm:w-auto px-10 py-3 md:py-4 text-base md:text-lg font-medium transition-colors hover:bg-[#a02428] active:scale-95">
                                View Details
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

const NewArrivalsSection: React.FC<{ products: Product[] }> = ({ products }) => {
    if (products.length === 0) {
        return null;
    }

    return (
        <div className="text-[#1A1A1A] container mx-auto">
            <section className="px-10 lg:px-24 lg:py-20 py-6">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="lg:text-5xl text-3xl font-semibold tracking-tight font-['Alumni_Sans']">
                    New Arrivals
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {products.slice(0, 2).map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <div className="overflow-hidden rounded-md aspect-[4/5] bg-gray-200">
                                <img
                                src={product.image}
                                className="w-full lg:h-[980px] h-full object-cover group-hover:scale-105 transition duration-700"
                                alt={product.name}
                                />
                            </div>
                        </div>
                    ))}
                    <button className="bg-[#bc2a2e] px-10 py-4 text-lg font-medium transition-colors hover:bg-[#a02428] active:scale-95 mt-4 text-gray-100 rounded-md">
                        See All
                    </button>
                </div>
            </section>
        </div>
    );
};

export default function Home({ sliders, categories, featuredProducts, newArrivals }: HomeProps) {
    return (
        <FrontendLayout>
            <Head title="Home Page" />
            <div className="bg-[#FDF7F7] font-sans text-gray-900 overflow-x-hidden">
                <HeroSlider sliders={sliders} />
                <div className="bg-[#B32B2B] text-white py-3 overflow-hidden whitespace-nowrap">
                <div className="inline-block animate-[scroll_30s_linear_infinite] text-[10px] font-bold uppercase tracking-widest">
                Free Standard Delivery & 30-Day Free Returns | Free Standard Delivery
                & 30-Day Free Returns | Free Standard Delivery & 30-Day Free
                Returns | Free Standard Delivery & 30-Day Free Returns | Free Standard
                Delivery & 30-Day Free Returns | Free Standard Delivery & 30-Day
                Free Returns |
                </div>
                </div>
                <CategorySection categories={categories} />
                <FeaturedProductsSection products={featuredProducts} />
                <NewArrivalsSection products={newArrivals} />
            </div>

        </FrontendLayout>
    );
}
