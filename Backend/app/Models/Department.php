<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\UnitSection;
use App\Models\Position;

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

    public function positions()
    {
        return $this->hasMany(Position::class);
    }
}
