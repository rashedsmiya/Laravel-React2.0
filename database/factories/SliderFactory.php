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

            ]),
            'order' => fake()->unique()->numberBetween(1, 10),
            'is_active' => true,
        ];
    }
}
