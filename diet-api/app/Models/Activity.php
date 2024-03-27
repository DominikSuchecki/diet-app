<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Activity extends Model
{
    use HasFactory;

    protected $table = 'activity';

    protected $fillable = [
        'user_id',
        'date',
        'type',
        'duration',
        'calories_burnt',
        'description'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
