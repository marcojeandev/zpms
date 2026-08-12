<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\UnitSection;

class Department extends Model
{
    protected $table = 'departments';
    protected $fillable = [
        'Department_name',
        'Department_code',
    ];
    
    public function unitSections()
    {
        return $this->hasMany(UnitSection::class);
    }
}
