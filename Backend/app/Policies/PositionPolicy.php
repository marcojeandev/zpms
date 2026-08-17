<?php

namespace App\Policies;

use App\Models\Position;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PositionPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return in_array($user->user_role, ['admin', 'hr', 'head']);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Position $position): bool
    {
        // Admins, HR, heads can see any position
        if (in_array($user->user_role, ['admin', 'hr', 'head'])) {
            return true;
        }
        // Regular employee can only see their own position
        return $user->position_id === $position->id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return in_array($user->user_role, ['admin', 'hr']);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Position $position): bool
    {
        return in_array($user->user_role, ['admin', 'hr']);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Position $position): bool
    {
        return in_array($user->user_role, ['admin', 'hr']);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Position $position): bool
    {
        return in_array($user->user_role, ['admin', 'hr']);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Position $position): bool
    {
        return in_array($user->user_role, ['admin', 'hr']);
    }
}