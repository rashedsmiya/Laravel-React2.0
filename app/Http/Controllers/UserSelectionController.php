<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserSelectionController extends Controller
{
    /**
     * Get a list of all users for admin selection panel
     */
    public function getUsers(Request $request): Response
    {
        $users = User::select(['id', 'name', 'email'])->get();

        return Inertia::render('backend/Admin/Users/UserSelection', [
            'users' => $users,
        ]);
    }
}
