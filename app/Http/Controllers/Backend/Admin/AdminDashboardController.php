<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $galleryItems = GalleryItem::select(['id', 'title', 'image_url', 'is_active', 'section', 'order'])
            ->orderBy('section')
            ->orderBy('order')
            ->limit(10)
            ->get();

        $totalGalleryItems = GalleryItem::count();
        $activeGalleryItems = GalleryItem::where('is_active', true)->count();

        return Inertia::render('backend/Admin/AdminDashboard', [
            'galleryItems' => $galleryItems,
            'totalGalleryItems' => $totalGalleryItems,
            'activeGalleryItems' => $activeGalleryItems,
        ]);
    }
}
