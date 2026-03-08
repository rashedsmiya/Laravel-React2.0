<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Models\Image;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ImageController extends Controller
{
    /**
     * Display a listing of the images.
     */
    public function index(): Response
    {
        $images = Image::orderBy('created_at', 'desc')->get();

        return Inertia::render('backend/Admin/Images/index', [
            'images' => $images,
        ]);
    }

    /**
     * Store a newly uploaded image.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,gif,svg,webp|max:10240',
        ]);

        $imageFile = $validated['image'];

        $image = Image::create([
            'name' => $imageFile->getClientOriginalName(),
            'url' => $imageFile->store('images', 'public'),
            'type' => $imageFile->getMimeType(),
            'size' => $imageFile->getSize(),
            'dimensions' => null,
            'alt_text' => pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME),
            'caption' => null,
        ]);

        return redirect()->route('admin.images')->with('success', 'Image uploaded successfully.');
    }

    /**
     * Update the specified image.
     */
    public function update(Request $request, Image $image): RedirectResponse
    {
        $validated = $request->validate([
            'alt_text' => 'nullable|string|max:255',
            'caption' => 'nullable|string',
        ]);

        $image->update($validated);

        return redirect()->route('admin.images')->with('success', 'Image updated successfully.');
    }

    /**
     * Remove the specified image from storage.
     */
    public function destroy(Image $image): RedirectResponse
    {
        if ($image->url && Storage::disk('public')->exists($image->url)) {
            Storage::disk('public')->delete($image->url);
        }

        $image->delete();

        return redirect()->route('admin.images')->with('success', 'Image deleted successfully.');
    }
}
