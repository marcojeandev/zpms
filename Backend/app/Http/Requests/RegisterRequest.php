<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'firstname'    => 'required|string|max:50',
            'middlename'   => 'nullable|string|max:50',
            'lastname'     => 'required|string|max:50',
            'suffix'       => 'nullable|string|max:5',
            'nickname'     => 'nullable|string|max:7',
            'employeeID'   => 'nullable|string|max:10|unique:users,employeeID',
            'citizenship'  => 'nullable|string|max:50',
            'gender'       => 'nullable|in:MALE,FEMALE',
            'civil_status' => 'nullable|string|max:50',
            'religion'     => 'nullable|string|max:50',
            'age'          => 'nullable|string|max:50',
            'birthday'     => 'nullable|string|max:50',
            'birthPlace'   => 'nullable|string|max:50',
            'contact'      => 'nullable|string|max:50',
            'username'     => 'required|string|max:50|unique:users',
            'email'        => 'required|string|email|max:100|unique:users',
            'password'     => 'required|string|min:8',
            'employee_type' => 'nullable|in:head,regular,probationary',
        ];
    }
}