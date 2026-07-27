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
        Schema::create('employee_data', function (Blueprint $table) {
            $table->id();

            // doctor-specific
            $table->enum('profession_title', ['Dr.', 'Prof.', 'Assoc. Prof.', 'Asst. Prof.', 'RN', 'Mr.', 'Ms.', 'Mrs.'])->nullable();
            $table->string('degrees', 100)->nullable();
            $table->string('fellowship', 100)->nullable();

            $table->decimal('annual_salary', 12, 2);
            $table->decimal('net_pay', 12, 2);
            $table->decimal('gross_pay', 12, 2);
            $table->decimal('deduction_pay', 12, 2);
            $table->string('joined_at', 20)->nullable();
            $table->decimal('salary', 12, 2);
            $table->time('scheduleFrom')->nullable();
            $table->time('scheduleTo')->nullable();

            // address
            $table->string('houseBlock', 50)->nullable();
            $table->string('street', 50);
            $table->string('subdivision', 50)->nullable();
            $table->string('barangay', 50);
            $table->string('city_muntinlupa', 50);
            $table->string('province', 50);
            $table->string('zip_code', 10);

            

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade')->onUpdate('cascade');
            $table->foreignId('position_id')->constrained('positions')->onDelete('cascade');
            $table->foreignId('department_id')->constrained('departments')->onDelete('cascade');
            $table->foreignId('unit_section_id')->constrained('unit_section')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_data');
    }
};
