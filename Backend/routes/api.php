<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Auth Controllers
use App\Http\Controllers\AuthController;

// Admin Controllers
use App\Http\Controllers\Admin\DepartmentController as AdminDepartmentController;
use App\Http\Controllers\Admin\UnitSectionController as AdminUnitSectionController;
use App\Http\Controllers\Admin\PositionController as AdminPositionController;

// Hr Controllers

// Head Controllers

// Employees Controllers


// Auth Routes
Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:5,1');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

Route::middleware(['auth:sanctum', 'admin', 'throttle:60,1'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function (){
        route::apiResource('departments', AdminDepartmentController::class);
        route::apiResource('unit_sections', AdminUnitSectionController::class);
        Route::apiResource('positions', AdminPositionController::class);
    });
