<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitSection extends Model
{
    protected $table = 'unit_section';
    protected $fillable = [
        'unit_section_name',
        'department_id',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
