<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->randomElement([
            'Hoodies',
            'Sweatsuits',
            'Jackets',
            'Pants',
            'Accessories',
        ]);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'image' => 'https://images.unsplash.com/photo-1768489038182-7db6980fd841?q=80&w=687&auto=format&fit=crop',
            'description' => fake()->sentence(),
            'is_active' => true,
            'order' => fake()->unique()->numberBetween(1, 10),
        ];
    }
}
