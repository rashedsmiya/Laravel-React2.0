<?php

namespace Database\Seeders;

use App\Models\GalleryItem;
use Illuminate\Database\Seeder;

class GalleryItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $galleryItems = [
            // Section 1
            [
                'image_url' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
                'title' => 'Tracksuit Back',
                'alt_text' => 'Tracksuit Back',
                'col_span' => 'md:col-span-1',
                'height' => 'h-[850px]',
                'section' => 1,
                'order' => 0,
                'link' => '/productdetails',
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80',
                'title' => 'Tracksuit Front',
                'alt_text' => 'Tracksuit Front',
                'col_span' => 'md:col-span-2',
                'height' => 'h-[850px]',
                'section' => 1,
                'order' => 1,
                'link' => '/productdetails',
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
                'title' => 'Aces Box',
                'alt_text' => 'Aces Box',
                'col_span' => 'md:col-span-1',
                'height' => 'flex-1 min-h-[192px]',
                'section' => 1,
                'order' => 2,
                'link' => '/productdetails',
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
                'title' => 'Hoodie Flat',
                'alt_text' => 'Hoodie Flat',
                'col_span' => 'md:col-span-1',
                'height' => 'flex-1 min-h-[192px]',
                'section' => 1,
                'order' => 3,
                'link' => '/productdetails',
                'is_active' => true,
            ],

            // Section 2
            [
                'image_url' => 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
                'title' => 'Aces Box',
                'alt_text' => 'Aces Box',
                'col_span' => 'md:col-span-1',
                'height' => 'flex-1 min-h-[192px]',
                'section' => 2,
                'order' => 0,
                'link' => '/productdetails',
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
                'title' => 'Hoodie Flat',
                'alt_text' => 'Hoodie Flat',
                'col_span' => 'md:col-span-1',
                'height' => 'flex-1 min-h-[192px]',
                'section' => 2,
                'order' => 1,
                'link' => '/productdetails',
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
                'title' => 'Tracksuit Front',
                'alt_text' => 'Tracksuit Front',
                'col_span' => 'md:col-span-2',
                'height' => 'h-[850px]',
                'section' => 2,
                'order' => 2,
                'link' => '/productdetails',
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
                'title' => 'Tracksuit Back',
                'alt_text' => 'Tracksuit Back',
                'col_span' => 'md:col-span-1',
                'height' => 'h-[850px]',
                'section' => 2,
                'order' => 3,
                'link' => '/productdetails',
                'is_active' => true,
            ],

            // Section 3
            [
                'image_url' => 'https://images.unsplash.com/photo-1509941943102-10c232fc06e0?w=800&q=80',
                'title' => 'Tracksuit Back',
                'alt_text' => 'Tracksuit Back',
                'col_span' => 'md:col-span-1',
                'height' => 'h-[850px]',
                'section' => 3,
                'order' => 0,
                'link' => '/productdetails',
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
                'title' => 'Tracksuit Front',
                'alt_text' => 'Tracksuit Front',
                'col_span' => 'md:col-span-2',
                'height' => 'h-[850px]',
                'section' => 3,
                'order' => 1,
                'link' => '/productdetails',
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
                'title' => 'Aces Box',
                'alt_text' => 'Aces Box',
                'col_span' => 'md:col-span-1',
                'height' => 'flex-1 min-h-[192px]',
                'section' => 3,
                'order' => 2,
                'link' => '/productdetails',
                'is_active' => true,
            ],
            [
                'image_url' => 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
                'title' => 'Hoodie Flat',
                'alt_text' => 'Hoodie Flat',
                'col_span' => 'md:col-span-1',
                'height' => 'flex-1 min-h-[192px]',
                'section' => 3,
                'order' => 3,
                'link' => '/productdetails',
                'is_active' => true,
            ],
        ];

        foreach ($galleryItems as $item) {
            GalleryItem::create($item);
        }
    }
}
