<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'users';
    protected $fillable = [
        'firstname', 'middlename', 'lastname', 'suffix', 'nickname',
        'employeeID', 'citizenship', 'gender', 'civil_status', 'religion',
        'age', 'birthday', 'birthPlace', 'contact', 'status',
        'username', 'email', 'password', 'user_role', 'employee_type',
        'reason', 'profile_picture', 'biometric',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'biometric' => 'json',
        ];
    }

    public function isAdmin()
    {
        return $this->user_role === 'admin';
    }

    public function isHead()
    {
        return $this->user_role === 'head';
    }

    public function isHr()
    {
        return $this->user_role === 'hr';
    }

    public function isEmployee()
    {
        return $this->user_role === 'employee';
    }
}