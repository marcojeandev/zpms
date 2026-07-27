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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname', 50);
            $table->string('middlename', 50)->nullable();
            $table->string('lastname', 50);
            $table->string('suffix', 5)->nullable();
            $table->string('nickname', 7)->nullable();
            $table->string('employeeID', 10)->unique()->nullable();
            $table->string('citizenship', 50)->nullable();
            $table->enum('gender', ['MALE', 'FEMALE'])->nullable();
            $table->string('civil_status', 50)->nullable();
            $table->string('religion', 50)->nullable();
            $table->string('age', 50)->nullable();
            $table->string('birthday', 50)->nullable();
            $table->string('birthPlace', 50)->nullable();
            $table->string('contact', 50)->nullable();
            $table->enum('status', ['Active', 'Inactive', 'Pending'])->default('Pending');
            $table->string('username', 50)->unique();
            $table->string('email', 100)->unique();
            $table->string('password', 255);
            $table->enum('user_role', ['admin', 'head', 'hr', 'employee'])->default('employee');
            $table->enum('employee_type', ['head', 'regular', 'probationary'])->nullable();
            $table->text('reason')->nullable();
            $table->string('profile_picture', 255)->nullable();
            $table->json('biometric')->nullable(); // fingerprint/face templates
            $table->rememberToken();
            $table->timestamps(); // created_at, updated_at
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
    }
};
