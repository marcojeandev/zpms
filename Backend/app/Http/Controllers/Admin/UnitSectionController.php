<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\UnitSection;
use App\Http\Requests\Admin\UnitSectionRequest;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class UnitSectionController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', UnitSection::class);
        $unitSections = UnitSection::with('department')->get();
        return response()->json(['data' => $unitSections]);
    }

    public function store(UnitSectionRequest $request)
    {
        $this->authorize('create', UnitSection::class);
        $validated = $request->validated();
        $unitSection = UnitSection::create($validated);
        return response()->json(['data' => $unitSection], 201);
    }

    public function show(UnitSection $unitSection)
    {
        $this->authorize('view', $unitSection);
        return response()->json(['data' => $unitSection]);
    }

    public function update(UnitSectionRequest $request, UnitSection $unitSection)
    {
        $this->authorize('update', $unitSection);
        $unitSection->update($request->validated());
        return response()->json(['data' => $unitSection]);
    }

    public function destroy(UnitSection $unitSection)
    {
        $this->authorize('delete', $unitSection);
        $unitSection->delete();
        return response()->json(null, 204);
    }
}