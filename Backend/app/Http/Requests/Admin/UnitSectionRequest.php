<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UnitSectionRequest extends FormRequest
{
    public function authorize(): bool
    {
        if(auth()->check() && auth()->user()->isAdmin()){
            return true;
        }
    }

    public function rules(): array
    {
        $unitSectionId = $this->route('unit_section')?->id;
        return [
            'unit_section_name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('unit_section')->ignore($unitSectionId),
            ],
            'department_id' => 'required|exists:departments,id',
        ];
    }
}