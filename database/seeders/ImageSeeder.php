<?php

namespace Database\Seeders;

use App\Models\Image;
use Illuminate\Database\Seeder;

class ImageSeeder extends Seeder
{
    public function run(): void
    {
        $images = [
            [
                'name' => 'hero-banner-1',
                'url' => 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
                'type' => 'image/jpeg',
                'size' => '245000',
                'dimensions' => '1920x1080',
                'alt_text' => 'Fashion banner showing new collection',
                'caption' => 'New Collection 2025',
            ],
            [
                'name' => 'hero-banner-2',
                'url' => 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop',
                'type' => 'image/jpeg',
                'size' => '312000',
                'dimensions' => '1920x1080',
                'alt_text' => 'Premium quality fashion items',
                'caption' => 'Premium Quality',
            ],
            [
                'name' => 'product-sample-1',
                'url' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
                'type' => 'image/jpeg',
                'size' => '156000',
                'dimensions' => '800x800',
                'alt_text' => 'Sample product image',
                'caption' => 'Featured Product',
            ],
            [
                'name' => 'product-sample-2',
                'url' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
                'type' => 'image/jpeg',
                'size' => '189000',
                'dimensions' => '800x800',
                'alt_text' => 'Premium headphone product',
                'caption' => 'Premium Audio',
            ],
        ];

        foreach ($images as $image) {
            Image::create($image);
        }
    }
}
