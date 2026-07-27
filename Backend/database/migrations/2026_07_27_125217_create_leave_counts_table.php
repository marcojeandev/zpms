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
        Schema::create('leave_counts', function (Blueprint $table) {
            $table->id();
            $table->decimal('VacationBalance', 6, 2)->default(0.00);
            $table->decimal('SickBalance', 6, 2)->default(0.00);
            $table->decimal('SpecialBalance', 6, 2)->default(0.00);
            $table->decimal('MaternityBalance', 6, 2)->default(0.00);
            $table->decimal('OthersBalance', 6, 2)->default(0.00);
            $table->string('last_earned_month', 7)->nullable();
            $table->date('last_updated')->nullable();
            

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
        Schema::dropIfExists('leave_counts');
    }
};
