<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\GalleryItem;
use App\Models\Product;
use App\Models\Slider;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Response;

class FrontendController extends Controller
{
    public function index(): Response
    {
        $sliders = Slider::active()->orderBy('order')->get();
        $categories = Category::active()->orderBy('order')->limit(12)->get();

        // Only query products if the table exists
        $featuredProducts = [];
        $newArrivals = [];
        if (Schema::hasTable('products')) {
            $featuredProducts = Product::where('is_featured', true)->limit(4)->get();
            $newArrivals = Product::where('is_new_arrival', true)->limit(2)->get();
        }

        return Inertia::render('frontend/home', [
            'sliders' => $sliders,
            'categories' => $categories,
            'featuredProducts' => $featuredProducts,
            'newArrivals' => $newArrivals,
        ]);
    }

    public function details(string $slug): Response
    {
        try {
            $product = Product::where('slug', $slug)->firstOrFail();
        } catch (ModelNotFoundException $e) {
            // Product not found - redirect to home with error message
            return Inertia::render('frontend/home', [
                'sliders' => Slider::active()->orderBy('order')->get(),
                'categories' => Category::active()->orderBy('order')->limit(12)->get(),
                'featuredProducts' => [],
                'newArrivals' => [],
                'error' => 'Product not found.',
            ]);
        }

        // Decode JSON fields
        $colors = $product->colors ? json_decode($product->colors, true) : [];
        $sizes = $product->sizes ? json_decode($product->sizes, true) : [];
        $galleryImages = $product->images ? json_decode($product->images, true) : [];

        // Calculate discounted price
        $discountedPrice = null;
        if ($product->discount_percentage) {
            $discountedPrice = $product->price - ($product->price * $product->discount_percentage / 100);
        }

        return Inertia::render('frontend/detailspage', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'description' => $product->description,
                'price' => $product->price,
                'discounted_price' => $discountedPrice,
                'discount_percentage' => $product->discount_percentage,
                'rating' => $product->rating,
                'review_count' => $product->review_count,
                'colors' => $colors,
                'sizes' => $sizes,
                'image' => $product->image,
                'images' => $galleryImages,
                'in_stock' => $product->in_stock,
                'stock_quantity' => $product->stock_quantity,
            ],
        ]);
    }

    public function men(): Response
    {
        $galleryItems = GalleryItem::where('is_active', true)
            ->orderBy('section')
            ->orderBy('order')
            ->get()
            ->groupBy('section')
            ->map(fn ($items) => $items->toArray());

        return Inertia::render('frontend/men', [
            'galleryItems' => $galleryItems,
        ]);
    }

    public function accessories(): Response
    {
        $galleryItems = GalleryItem::where('is_active', true)
            ->orderBy('section')
            ->orderBy('order')
            ->get()
            ->groupBy('section')
            ->map(fn ($items) => $items->toArray());

        return Inertia::render('frontend/accessories', [
            'galleryItems' => $galleryItems,
        ]);
    }
}
