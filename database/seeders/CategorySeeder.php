<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Hoodies',
                'slug' => 'hoodies',
                'image' => '/assets/images/pngegg.png',
                'description' => 'Premium quality hoodies for everyday comfort',
                'is_active' => true,
                'order' => 1,
            ],
            [
                'name' => 'Sweatsuits',
                'slug' => 'sweatsuits',
                'image' => '/assets/images/pngegg.png',
                'description' => 'Stylish sweatsuits for any occasion',
                'is_active' => true,
                'order' => 2,
            ],
            [
                'name' => 'Jackets',
                'slug' => 'jackets',
                'image' => '/assets/images/pngegg.png',
                'description' => 'Trendy jackets for all seasons',
                'is_active' => true,
                'order' => 3,
            ],
            [
                'name' => 'Pants',
                'slug' => 'pants',
                'image' => '/assets/images/pngegg.png',
                'description' => 'Comfortable pants for daily wear',
                'is_active' => true,
                'order' => 4,
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
