<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Diet extends Model
{
    use HasFactory;

    protected $table = 'diet';

    protected $fillable = [
        'user_id',
        'date',
        'calories_eaten',
        'calories_goal',
        'carbs_eaten',
        'carbs_goal',
        'fats_eaten',
        'fats_goal',
        'proteins_eaten',
        'proteins_goal',
        'products_eaten'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
