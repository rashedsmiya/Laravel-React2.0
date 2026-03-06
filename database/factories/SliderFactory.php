<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Slider>
 */
class SliderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'tagline' => fake()->randomElement([
                'New Collection 2025',
                'Premium Quality',
                'Exclusive Designs',
            ]),
            'title' => fake()->randomElement([
                'Elevate Your Style',
                'Comfort Meets Fashion',
                'Stand Out From The Crowd',
            ]),
            'image' => fake()->randomElement([
                'https://images.unsplash.com/photo-1768489038182-7db6980fd841?q=80&w=687&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1767172352170-19b1140dc51f?q=80&w=1170&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1767431199061-3237ddd5de9f?q=80&w=1210&auto=format&fit=crop',
            ]),
            'order' => fake()->unique()->numberBetween(1, 10),
            'is_active' => true,
        ];
    }
}
