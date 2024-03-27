<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Weight;


class WeightController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        $weight = $user->weight()->orderBy('date', 'asc')->get();

        return response()->json($weight, 200);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'weight' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Bad request'], 400);
        }

        $weight = $validator->validated();
        $weight['user_id'] = $user->id;

        Weight::create($weight);

        return response()->json(201);
    }

    public function destroy(string $id)
    {
      $weight = Weight::find($id);
    
      if (!$weight) {
        return response()->json(['message' => 'Weight not found'], 404);
      }
    
      if ($weight->user_id !== auth()->user()->id) {
        return response()->json(['message' => 'Unauthorized: Cannot delete weight of another user'], 403);
      }
    
      $weight->delete();
    
      return response()->json(['message' => 'Weight deleted successfully'], 204);
    }
    
}
