<?php

namespace App\Http\Controllers\Backend\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('backend/User/UserDashboard');
    }
    
    public function edit(Request $request): Response
    {
        return Inertia::render('backend/User/ProfileEdit');
    }

    public function settingsDetails(Request $request): Response
    {
        return Inertia::render('backend/User/SettingsDetails');
    }
}
