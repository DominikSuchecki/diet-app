<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Activity;
use Illuminate\Support\Facades\Validator;

class ActivityController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $activity = $user->activity;
        
        return response()->json($activity, 200);
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'type' => 'required|string',
            'duration' => 'required|numeric',
            'calories_burnt' => 'required|numeric',
            'description' => 'sometimes'
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'Bad request'], 400);
        }

        $activity = $validator->validated();
        $activity['user_id'] = $user->id;

        Activity::create($activity);

        return response()->json(['message' => 'Created'], 201);
    }

    public function destroy(string $id)
    {
      $activity = Activity::findOrFail($id);
    
      if ($activity->user_id !== auth()->user()->id) {
        return response()->json(['message' => 'Unauthorized: Cannot delete activity of another user'], 403);
      }
    
      $activity->delete();
    
      return response()->json(['message' => 'Activity deleted successfully'], 204);
    }
    
}
