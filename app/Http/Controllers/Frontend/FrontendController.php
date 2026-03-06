<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Slider;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Schema;

class FrontendController extends Controller
{
    public function index(): Response
    {
        $sliders = Slider::active()->orderBy('order')->get();
        $categories = Category::active()->orderBy('order')->limit(2)->get();
        
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

    public function details(): Response
    {
        return Inertia::render('frontend/detailspage');
    }
}
