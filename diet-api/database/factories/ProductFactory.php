<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'calories' => $this->faker->numberBetween(50, 500),
            'carbs' => $this->faker->numberBetween(0, 50),
            'fats' => $this->faker->numberBetween(0, 50),
            'proteins' => $this->faker->numberBetween(0, 50),
        ];
    }
}
