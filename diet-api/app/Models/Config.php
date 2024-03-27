<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Config extends Model
{
    use HasFactory;

    protected $table = 'config';

    protected $fillable = [
        'user_id',
        'date',
        'calories',
        'carbs',
        'fats',
        'proteins'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
