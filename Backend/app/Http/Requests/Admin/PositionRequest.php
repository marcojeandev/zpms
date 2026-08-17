<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PositionRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Use policy instead of hardcoded admin check – but if you want to keep this:
        return auth()->check() && auth()->user()->isAdmin();
    }

    public function rules(): array
    {
        $positionId = $this->route('position')?->id ?? null;

        return [
            'position_name' => ['required', 'string', 'max:255'],
            'position_code' => ['required', 'string', 'max:10', 'unique:positions,position_code,' . $positionId],
            'department_id' => ['required', 'exists:departments,id'],
            'salary' => ['required', 'numeric', 'min:0'], // add this line
        ];
    }
}