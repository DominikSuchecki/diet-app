<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('diet', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->date('date');
            $table->unsignedInteger('calories_eaten');
            $table->unsignedInteger('calories_goal');
            $table->unsignedInteger('carbs_eaten');
            $table->unsignedInteger('carbs_goal');
            $table->unsignedInteger('fats_eaten');
            $table->unsignedInteger('fats_goal');
            $table->unsignedInteger('proteins_eaten');
            $table->unsignedInteger('proteins_goal');
            $table->json('products_eaten');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
         });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('diet');
    }
};
