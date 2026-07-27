<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leave_date', function (Blueprint $table) {
            $table->id('leave_date_id');
            $table->date('inclusive_date');
            $table->foreignId('leave_id')
                  ->constrained('leave_request')
                  ->onDelete('cascade');
            $table->timestamps(); // correct way
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leave_date');
    }
};