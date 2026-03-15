<?php

namespace Database\Seeders;

use App\Models\Slider;
use Illuminate\Database\Seeder;

class SliderSeeder extends Seeder
{
    public function run(): void
    {
        $sliders = [
            [
                'tagline' => 'New Collection 2025',
                'title' => 'Elevate Your Style',
                'image' => 'sliders/slider1.jpg',
                'order' => 1,
                'is_active' => true,
            ],
            [
                'tagline' => 'Premium Quality',
                'title' => 'Comfort Meets Fashion',
                'image' => 'sliders/slider2.jpg',
                'order' => 2,
                'is_active' => true,
            ],
            [
                'tagline' => 'Exclusive Designs',
                'title' => 'Stand Out From The Crowd',
                'image' => 'sliders/slider3.jpg',
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($sliders as $slider) {
            Slider::create($slider);
        }
    }
}
