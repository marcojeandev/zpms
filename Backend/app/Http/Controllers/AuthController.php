<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;

class AuthController extends Controller
{
     public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        $user = User::create([
            'firstname'    => $validated['firstname'],
            'middlename'   => $validated['middlename'] ?? null,
            'lastname'     => $validated['lastname'],
            'suffix'       => $validated['suffix'] ?? null,
            'nickname'     => $validated['nickname'] ?? null,
            // employeeID not set yet – will be generated
            'citizenship'  => $validated['citizenship'] ?? null,
            'gender'       => $validated['gender'] ?? null,
            'civil_status' => $validated['civil_status'] ?? null,
            'religion'     => $validated['religion'] ?? null,
            'age'          => $validated['age'] ?? null,
            'birthday'     => $validated['birthday'] ?? null,
            'birthPlace'   => $validated['birthPlace'] ?? null,
            'contact'      => $validated['contact'] ?? null,
            'username'     => $validated['username'],
            'email'        => $validated['email'],
            'password'     => Hash::make($validated['password']),
            'employee_type' => $validated['employee_type'] ?? null,
            'user_role'    => 'employee',
            'status'       => 'Pending',
        ]);

        // Generate employeeID based on user's id
        $user->employeeID = 'EMP-' . str_pad($user->id, 4, '0', STR_PAD_LEFT);
        $user->save();

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $validated = $request->validated();

        $loginField = filter_var($validated['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        $user = User::where($loginField, $validated['login'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            throw ValidationException::withMessages([
                'login' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user'  => $user,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}