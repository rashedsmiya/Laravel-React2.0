import { Head, router, usePage } from '@inertiajs/react';
import React from 'react';

import FrontendLayout from '@/layouts/frontend-layout';

interface GalleryItemData {
    id: number;
    image_url: string;
    title: string;
    alt_text?: string;
    col_span: string;
    height: string;
    section: number;
    order: number;
    link: string;
}

interface PageProps {
    galleryItems?: Record<string, GalleryItemData[]>;
    [key: string]: unknown;
}

interface GalleryItemProps {
    src: string;
    alt: string;
    title: string;
    colSpan?: string;
    height?: string;
    link?: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, alt, title, colSpan = "md:col-span-1", height = "h-[850px]", link = "/productdetails" }) => {
  return (
    <div className={`${colSpan} ${height} relative overflow-hidden rounded-md group cursor-pointer bg-gray-200`}>
      {/* Background Image with Zoom Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1"
        style={{ backgroundImage: `url('${src}')` }}
        role="img"
        aria-label={alt}
      >
        {/* Dynamic Overlay */}
        <div className="absolute inset-0 transition-all duration-700 ease-out from-black/10 via-black/15 to-transparent opacity-0 group-hover:opacity-100"></div>
        <div className="absolute inset-0 transition-colors duration-500 backdrop-brightness-100 group-hover:backdrop-brightness-90"></div>
      </div>

      {/* Content Container (Slide up and Fade in) */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white px-4 transition-all duration-700 ease-out translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">

        <h3 className="mb-4 text-xl md:text-2xl font-[Alumni_Sans] tracking-widest text-center uppercase">
          {title}
        </h3>

        {/* Decorative Line */}
        <div className="mb-4 h-12 w-px bg-white/50 transition-all duration-700 delay-100 scale-y-0 group-hover:scale-y-100 origin-top"></div>

        {/* The Button */}
        <button onClick={() => router.get(link)} className="bg-[var(--bg-red)] px-10 py-4 text-sm md:text-base font-medium transition-all duration-700 delay-200 ease-out opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 rounded hover:bg-red-800 shadow-xl relative overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
          <span className="relative z-10 text-white">View Details</span>
        </button>
      </div>

      {/* Border Glow */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-md transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

// Default static gallery items for fallback
const defaultGalleryItems = {


};

const ProductGallery: React.FC = () => {
    const { props } = usePage<PageProps>();
    const galleryItems = props.galleryItems || null;

    // Check if we have database items
    const hasDbItems = galleryItems && Object.keys(galleryItems).length > 0;

    // Helper function to get items for a section
    const getSectionItems = (section: number) => {
        if (!hasDbItems) {
            return defaultGalleryItems[section as keyof typeof defaultGalleryItems] || [];
        }
        return galleryItems[section.toString()] || [];
    };

    // Helper to render items with proper layout
    const renderGallerySection = (section: number) => {
        const items = getSectionItems(section);

        if (items.length === 0) {
            return null;
        }

        return (
            <section key={section} className="p-4 md:p-8 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {items.map((item, index) => {
                        // For database items, we need to handle the layout differently
                        // Group items by their col_span for proper layout
                        const isDbItem = item.id !== 0;

                        if (isDbItem) {
                            // Determine the correct image URL based on the path type
                            let imageSrc = item.image_url;
                            if (item.image_url.startsWith('http')) {
                                // Full URL (e.g., from Unsplash) - use as is
                                imageSrc = item.image_url;
                            } else if (item.image_url.startsWith('assets/') || item.image_url.startsWith('/assets/')) {
                                // Public assets folder - use as is with leading slash
                                imageSrc = item.image_url.startsWith('/') ? item.image_url : `/${item.image_url}`;
                            } else {
                                // Storage path - add /storage/ prefix
                                imageSrc = `/storage/${item.image_url}`;
                            }

                            return (
                                <GalleryItem
                                    key={item.id}
                                    src={imageSrc}
                                    alt={item.alt_text || item.title}
                                    title={item.title}
                                    colSpan={item.col_span}
                                    height={item.height}
                                    link={item.link}
                                />
                            );
                        }

                        // Default static items - use original layout
                        return (
                            <GalleryItem
                                key={index}
                                src={item.image_url}
                                alt={item.alt_text || item.title}
                                title={item.title}
                                colSpan={item.col_span}
                                height={item.height}
                                link={item.link}
                            />
                        );
                    })}
                </div>
            </section>
        );
    };

  return (
    <div className="relative bg-transparent font-sans text-gray-900 overflow-x-hidden">
      <div className="absolute inset-0 bg-black/20 -z-10" />

      {/* Render sections dynamically */}
      {[1, 2, 3].map(section => renderGallerySection(section))}

      {/* Footer Buttons */}
      <div className="flex justify-center items-center gap-4 my-12">
        <button className="border border-red-700 px-8 py-3 text-red-700 font-medium transition-all hover:bg-red-50 rounded-md">
          Back
        </button>
        <button className="text-center text-white text-lg font-medium cursor-pointer transition-all bg-red-700 hover:bg-red-800 px-8 py-3 rounded-md shadow-lg active:scale-95">
          Load More
        </button>
      </div>
    </div>
  );
};

export default function HoodiesWomen() {
    return (
        <FrontendLayout>
            <Head title="Hoodies Women" />
            <ProductGallery />
        </FrontendLayout>
    );
}
