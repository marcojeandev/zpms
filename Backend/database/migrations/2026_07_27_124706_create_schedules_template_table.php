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
        Schema::create('schedules_template', function (Blueprint $table) {
            $table->id();
            $table->string('scheduleName', 50);
            $table->time('schedule_from');
            $table->time('schedule_to');
            $table->enum('shift', ['day', 'night', 'graveyard']);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();       
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('schedules_template');
    }
};
