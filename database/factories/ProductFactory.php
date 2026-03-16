<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'slug' => fake()->unique()->slug(),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 10, 500),
            'discount_percentage' => fake()->optional(0.3)->randomFloat(2, 5, 50),
            'rating' => fake()->randomFloat(1, 3, 5),
            'review_count' => fake()->numberBetween(0, 1000),
            'colors' => json_encode(fake()->randomElements(['Red', 'Blue', 'Green', 'Black', 'White', 'Gray'], fake()->numberBetween(1, 3))),
            'sizes' => json_encode(fake()->randomElements(['S', 'M', 'L', 'XL', 'XXL'], fake()->numberBetween(1, 4))),
            'image' => 'https://picsum.photos/seed/'.fake()->uuid().'/800/1000',
            'images' => json_encode([
                'https://picsum.photos/seed/'.fake()->uuid().'/800/1000',
                'https://picsum.photos/seed/'.fake()->uuid().'/800/1000',
            ]),
            'in_stock' => fake()->boolean(80),
            'stock_quantity' => fake()->numberBetween(0, 100),
            'category_id' => null,
            'brand_id' => null,
            'is_featured' => false,
            'is_new_arrival' => false,
        ];
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    public function newArrival(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_new_arrival' => true,
        ]);
    }
}
