<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'discount_percentage',
        'rating',
        'review_count',
        'colors',
        'sizes',
        'image',
        'images',
        'in_stock',
        'stock_quantity',
        'category_id',
        'brand_id',
        'is_featured',
        'is_new_arrival',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'discount_percentage' => 'decimal:2',
            'rating' => 'decimal:2',
            'review_count' => 'integer',
            'in_stock' => 'boolean',
            'stock_quantity' => 'integer',
            'category_id' => 'integer',
            'brand_id' => 'integer',
            'is_featured' => 'boolean',
            'is_new_arrival' => 'boolean',
        ];
    }
}
