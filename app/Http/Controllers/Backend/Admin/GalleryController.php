<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display a listing of the gallery items.
     */
    public function index(): Response
    {
        $galleryItems = GalleryItem::orderBy('section')->orderBy('order')->get();

        return Inertia::render('backend/Admin/Gallery/Index', [
            'galleryItems' => $galleryItems,
        ]);
    }

    /**
     * Store a newly created gallery item.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,gif,svg,webp|max:10240',
            'alt_text' => 'nullable|string|max:255',
            'col_span' => 'nullable|string|max:50',
            'height' => 'nullable|string|max:50',
            'section' => 'required|integer|min:1|max:3',
            'order' => 'nullable|integer|min:0',
            'link' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $validated['image_url'] = $imageFile->store('gallery', 'public');
        }

        // Set default values
        $validated['col_span'] = $validated['col_span'] ?? 'md:col-span-1';
        $validated['height'] = $validated['height'] ?? 'h-[850px]';
        $validated['link'] = $validated['link'] ?? '/productdetails';
        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['order'] = $validated['order'] ?? GalleryItem::where('section', $validated['section'])->max('order') + 1;

        GalleryItem::create($validated);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery item created successfully.');
    }

    /**
     * Update the specified gallery item.
     */
    public function update(Request $request, GalleryItem $galleryItem): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,gif,svg,webp|max:10240',
            'alt_text' => 'nullable|string|max:255',
            'col_span' => 'nullable|string|max:50',
            'height' => 'nullable|string|max:50',
            'section' => 'sometimes|required|integer|min:1|max:3',
            'order' => 'nullable|integer|min:0',
            'link' => 'nullable|string|max:255',
            'is_active' => 'nullable|boolean',
        ]);

        // Handle image upload if new image is provided
        if ($request->hasFile('image')) {
            // Delete old image
            if ($galleryItem->image_url && Storage::disk('public')->exists($galleryItem->image_url)) {
                Storage::disk('public')->delete($galleryItem->image_url);
            }

            $imageFile = $request->file('image');
            $validated['image_url'] = $imageFile->store('gallery', 'public');
        }

        $galleryItem->update($validated);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery item updated successfully.');
    }

    /**
     * Remove the specified gallery item from storage.
     */
    public function destroy(GalleryItem $galleryItem): RedirectResponse
    {
        // Delete image file
        if ($galleryItem->image_url && Storage::disk('public')->exists($galleryItem->image_url)) {
            Storage::disk('public')->delete($galleryItem->image_url);
        }

        $galleryItem->delete();

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery item deleted successfully.');
    }

    /**
     * Toggle the active status of the gallery item.
     */
    public function toggleStatus(GalleryItem $galleryItem): RedirectResponse
    {
        $galleryItem->update(['is_active' => ! $galleryItem->is_active]);

        return back()->with('success', 'Gallery item status updated successfully.');
    }

    /**
     * Reorder gallery items within a section.
     */
    public function reorder(Request $request, GalleryItem $galleryItem): RedirectResponse
    {
        $request->validate([
            'direction' => 'required|in:up,down',
        ]);

        $direction = $request->input('direction');

        if ($direction === 'up') {
            $swapItem = GalleryItem::where('section', $galleryItem->section)
                ->where('order', '<', $galleryItem->order)
                ->orderBy('order', 'desc')
                ->first();
        } else {
            $swapItem = GalleryItem::where('section', $galleryItem->section)
                ->where('order', '>', $galleryItem->order)
                ->orderBy('order')
                ->first();
        }

        if ($swapItem) {
            $tempOrder = $galleryItem->order;
            $galleryItem->order = $swapItem->order;
            $swapItem->order = $tempOrder;

            $galleryItem->save();
            $swapItem->save();
        }

        return back();
    }
}
