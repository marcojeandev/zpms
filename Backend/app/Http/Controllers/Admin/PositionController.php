<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Position;
use App\Http\Requests\Admin\PositionRequest;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PositionController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        // Employees see only their own position; admins/hr/heads see all.
        if (auth()->user()->can('viewAny', Position::class)) {
            $positions = Position::with('department')->get();
        } else {
            $positions = Position::with('department')
                ->where('id', auth()->user()->position_id)
                ->get();
        }

        return response()->json(['data' => $positions]);
    }

    public function store(PositionRequest $request)
    {
        $this->authorize('create', Position::class);

        $validated = $request->validated();
        $position = Position::create($validated);

        return response()->json(['data' => $position], 201);
    }

    public function show(Position $position)
    {
        $this->authorize('view', $position);

        return response()->json(['data' => $position->load('department')]);
    }

    public function update(PositionRequest $request, Position $position)
    {
        $this->authorize('update', $position);

        $position->update($request->validated());

        return response()->json(['data' => $position]);
    }

    public function destroy(Position $position)
    {
        $this->authorize('delete', $position);

        $position->delete();

        return response()->json(null, 204);
    }
}