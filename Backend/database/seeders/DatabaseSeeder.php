<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // Admin
        User::create([
            'firstname'    => 'Admin',
            'middlename'   => '',
            'lastname'     => 'User',
            'suffix'       => null,
            'nickname'     => null,
            'employeeID'   => 'EMP-0001',
            'citizenship'  => 'Filipino',
            'gender'       => 'MALE',
            'civil_status' => 'Single',
            'religion'     => 'Catholic',
            'age'          => '30',
            'birthday'     => '1990-01-01',
            'birthPlace'   => 'Manila',
            'contact'      => '09123456789',
            'status'       => 'Active',
            'username'     => 'admin',
            'email'        => 'admin@example.com',
            'password'     => Hash::make('password'),
            'user_role'    => 'admin',
            'employee_type' => 'regular',
            'reason'       => null,
            'profile_picture' => null,
            'biometric'    => null,
        ]);

        // HR
        User::create([
            'firstname'    => 'HR',
            'middlename'   => '',
            'lastname'     => 'Manager',
            'suffix'       => null,
            'nickname'     => null,
            'employeeID'   => 'EMP-0002',
            'citizenship'  => 'Filipino',
            'gender'       => 'FEMALE',
            'civil_status' => 'Married',
            'religion'     => 'Catholic',
            'age'          => '28',
            'birthday'     => '1992-05-15',
            'birthPlace'   => 'Cebu',
            'contact'      => '09123456788',
            'status'       => 'Active',
            'username'     => 'hr',
            'email'        => 'hr@example.com',
            'password'     => Hash::make('password'),
            'user_role'    => 'hr',
            'employee_type' => 'regular',
            'reason'       => null,
            'profile_picture' => null,
            'biometric'    => null,
        ]);

        // Head (Department Head)
        User::create([
            'firstname'    => 'Head',
            'middlename'   => '',
            'lastname'     => 'OfDepartment',
            'suffix'       => null,
            'nickname'     => null,
            'employeeID'   => 'EMP-0003',
            'citizenship'  => 'Filipino',
            'gender'       => 'MALE',
            'civil_status' => 'Single',
            'religion'     => 'Catholic',
            'age'          => '35',
            'birthday'     => '1985-10-20',
            'birthPlace'   => 'Davao',
            'contact'      => '09123456787',
            'status'       => 'Active',
            'username'     => 'head',
            'email'        => 'head@example.com',
            'password'     => Hash::make('password'),
            'user_role'    => 'head',
            'employee_type' => 'head',
            'reason'       => null,
            'profile_picture' => null,
            'biometric'    => null,
        ]);

        // Employee
        User::create([
            'firstname'    => 'John',
            'middlename'   => 'Doe',
            'lastname'     => 'Smith',
            'suffix'       => null,
            'nickname'     => 'Johnny',
            'employeeID'   => 'EMP-0004',
            'citizenship'  => 'Filipino',
            'gender'       => 'MALE',
            'civil_status' => 'Single',
            'religion'     => 'Catholic',
            'age'          => '25',
            'birthday'     => '1995-03-10',
            'birthPlace'   => 'Quezon City',
            'contact'      => '09123456786',
            'status'       => 'Active',
            'username'     => 'employee',
            'email'        => 'employee@example.com',
            'password'     => Hash::make('password'),
            'user_role'    => 'employee',
            'employee_type' => 'regular',
            'reason'       => null,
            'profile_picture' => null,
            'biometric'    => null,
        ]);
    }
}