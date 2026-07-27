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
        Schema::create('leave_details', function (Blueprint $table) {
            $table->id();
            $table->integer('balance');
            $table->bigInteger('earned');
            $table->bigInteger('credits');
            $table->bigInteger('lessLeave');
            $table->bigInteger('balanceToDate');
            $table->text('disapprovalDetails')->nullable();
            $table->date('approved_at')->nullable();
            $table->date('disapproved_at')->nullable();

            $table->foreignId('leave_id')
                ->constrained('leave_request')
                ->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_details');
    }
};
