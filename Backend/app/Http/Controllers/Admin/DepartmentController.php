<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\DepartmentRequest;
use App\Http\Requests\DepartmentUpdateRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Department;

class DepartmentController extends Controller
{
    use AuthorizesRequests;
    public function store(DepartmentRequest $request){
        try {
            $validated = $request->validated();
            $this->authorize('create', Department::class);

            $department = Department::create($validated);

            return response()->json([
                'status' => 1,
                'message' => $department->department_name . ' have been created successfully.',
                'data' => $department
            ], 201);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'server error: ' . $e->getMessage()
            ], 500);
        }
    }
    public function update(DepartmentUpdateRequest $request, $id){
        try {
            $department = Department::findOrFail($id);
            $validated = $request->validated();
            $this->authorize('update', $department);

            $department->update($validated);

            return response()->json([
                'status' => 1,
                'message' => $department->department_name . ' have been updated successfully.'
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'server error: ' . $e->getMessage()
            ], 500);
        }
    }
    public function show($id){
        try {
            $department = Department::findOrFail($id);
            $this->authorize('view', $department);

            return response()->json([
                'status' => 1,
                'message' => 'Department fetch successfully.',
                'data' => $department
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'server error: ' . $e->getMessage()
            ], 500);
        }
    }
    public function index(){
        try {
            $this->authorize('viewAny', Department::class);
            $department = Department::all();
            return response()->json([
                'status' => 1,
                'message' => 'Department fetch successfully.',
                'data' => $department
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 0,
                'message' => 'server error: ' . $e->getMessage()
            ], 500);
        }
    }
}
