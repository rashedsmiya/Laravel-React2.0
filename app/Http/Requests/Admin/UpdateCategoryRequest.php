<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $categoryId = $this->route('category');

        $rules = [
            'name' => 'required|string|max:255|unique:categories,name,'.$categoryId,
            'slug' => 'required|string|max:255|unique:categories,slug,'.$categoryId,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
            'order' => 'integer|min:0',
        ];

        // Only validate image if it's present in the request
        if ($this->hasFile('image')) {
            $rules['image'] = 'image|mimes:jpeg,png,jpg,gif|max:2048';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'name.required' => 'The category name is required.',
            'name.unique' => 'A category with this name already exists.',
            'slug.required' => 'The category slug is required.',
            'slug.unique' => 'A category with this slug already exists.',
        ];
    }
}
