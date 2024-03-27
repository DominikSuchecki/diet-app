<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class ProductsController extends Controller
{
    public function index()
    {
        $cacheKey = 'products_index';
        $products = Cache::get($cacheKey);

        if (!$products) {
            $products = Product::all();
            Cache::put($cacheKey, $products, 3600 * 24);
        }

        return response()->json($products, 200);
    }    
}