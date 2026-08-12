<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leave_request', function (Blueprint $table) {
            $table->id();
            $table->enum('leave_status', ['Pending', 'Recommended', 'Approved', 'Disapproved'])->default('Pending');
            $table->enum('leave_type', ['vacation', 'sick', 'special', 'others']);
            $table->date('leave_date');
            $table->string('others_specify', 255)->nullable();
            $table->string('purpose', 255);
            $table->integer('number_of_days');
            $table->string('contact', 13);
            $table->string('section_head', 120)->nullable();
            $table->string('department_head', 120)->nullable();
            $table->string('medical_proof', 255)->nullable();
            $table->date('request_date')->default(DB::raw('CURRENT_DATE'));
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_request');
    }
};
