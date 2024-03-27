<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\WeightController;
use App\Http\Controllers\DietController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ProductsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/verify/{token}', [AuthController::class, 'verify']);

Route::post('/resetPassword', [AuthController::class, 'resetPassword']);
Route::post('/setPassword',  [AuthController::class, 'setPassword']);

// Private
Route::group(['middleware' => 'auth:sanctum'], function () {
    // User
    Route::resources([
        'config' => ConfigController::class,
        'weight' => WeightController::class,
        'diet' => DietController::class,
        'activity' => ActivityController::class,
    ]);
    Route::put('/config', [ConfigController::class, 'adjust']);
    Route::get('/products', [ProductsController::class, 'index']);

    Route::put('/updatePassword', [AuthController::class, 'updatePassword']);
    Route::put('/updateEmail', [AuthController::class, 'updateEmail']);
    Route::get('/logout', [AuthController::class, 'logout']);
});