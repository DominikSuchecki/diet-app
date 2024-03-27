<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Diet;

class DietController extends Controller
{
    public function index()
    {
       $user = auth()->user();
       $data = $user->diet;
        return response()->json($data, 200);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'calories_eaten' => 'required|numeric',
            'calories_goal' => 'required|numeric',
            'carbs_eaten' => 'required|numeric',
            'carbs_goal' => 'required|numeric',
            'fats_eaten' => 'required|numeric',
            'fats_goal' => 'required|numeric',
            'proteins_eaten' => 'required|numeric',
            'proteins_goal' => 'required|numeric',
            'products_eaten' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Bad request'], 400);
        }

        $data = $validator->validated();
        $data['user_id'] = $user->id;

        Diet::create($data);

        return response()->json(['message' => 'Created'], 201);
    }

    public function destroy(string $id)
    {
        $diet = Diet::findOrFail($id);
    
        if ($diet->user_id !== auth()->user()->id) {
            return response()->json(['message' => 'Unauthorized: Cannot delete diet of another user'], 403);
        }
    
        $diet->delete();
    
        return response()->json(['message' => 'Diet deleted successfully'], 204);
    }
}