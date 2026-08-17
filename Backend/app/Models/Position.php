<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Department;

class Position extends Model
{
    protected $table = 'positions';
    protected $fillable = [
        'position_name',
        'position_code',
        'salary',
        'department_id',
    ];
    
    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
