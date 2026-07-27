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
        Schema::create('attendance', function (Blueprint $table) {
            $table->id();
            $table->date('attendance_date');
            $table->time('time_in')->nullable();
            $table->time('time_out')->nullable();
            $table->decimal('total_hours', 5, 2)->nullable(); // computed
            $table->decimal('overtime_hours', 5, 2)->nullable();
            $table->time('break_start')->nullable();
            $table->time('break_end')->nullable();
            $table->enum('status', ['present', 'absent', 'late', 'half-day', 'overtime', 'holiday'])->default('present');
            $table->enum('source', ['biometric', 'manual', 'face_recognition', 'fingerprint'])->default('manual');
            $table->text('remarks')->nullable();
            

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance');
    }
};
