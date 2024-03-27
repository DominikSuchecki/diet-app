<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Config;
use Illuminate\Support\Facades\Validator;

class ConfigController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $config = $user->config;

        return response()->json($config, 200);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'calories' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(400);
        }

        $config = $validator->validated();
        $config['user_id'] = $user->id;
        $config['carbs'] = $config['calories']/4*0.55;
        $config['fats'] = $config['calories']/9*0.25;
        $config['proteins'] = $config['calories']/4*0.15;
        
        Config::create($config);

        return response()->json(201);
    }

    public function adjust(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'calories' => 'required|numeric',
            'carbs' => 'required|numeric',
            'fats' => 'required|numeric',
            'proteins' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(400);
        }

        $config = $validator->validated();
        $config['user_id'] = $user->id;

        Config::create($config);

        return response()->json(200);
    }
}
