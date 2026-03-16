<?php

namespace App\Http\Controllers\Backend\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index(): \Inertia\Response
    {
        $categories = Category::orderBy('order')->get();

        return inertia('backend/Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('categories', 'public');
        }

        Category::create($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function update(UpdateCategoryRequest $request, Category $category): RedirectResponse
    {
        $validated = $request->validated();

        // Update image if a new file is uploaded
        if ($request->hasFile('image')) {
            // Delete old image
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $validated['image'] = $request->file('image')->store('categories', 'public');
        }

        $category->update($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        // Delete image if exists
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Category deleted successfully.');
    }

    public function toggleStatus(Category $category): RedirectResponse
    {
        $category->update(['is_active' => ! $category->is_active]);

        return back()->with('success', 'Category status updated successfully.');
    }

    public function reorder(Request $request, Category $category): RedirectResponse
    {
        $request->validate([
            'direction' => 'required|in:up,down',
        ]);

        $direction = $request->input('direction');

        if ($direction === 'up') {
            $swapCategory = Category::where('order', '<', $category->order)
                ->orderBy('order', 'desc')
                ->first();
        } else {
            $swapCategory = Category::where('order', '>', $category->order)
                ->orderBy('order')
                ->first();
        }

        if ($swapCategory) {
            $tempOrder = $category->order;
            $category->order = $swapCategory->order;
            $swapCategory->order = $tempOrder;

            $category->save();
            $swapCategory->save();
        }

        return back();
    }
}
