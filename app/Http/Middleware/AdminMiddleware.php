<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @return mixed
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (! Auth::guard('admin')->check()) {
            if ($request->expectsJson()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            // Handle Inertia requests properly by rendering the login page
            if ($request->header('X-Inertia')) {
                return Inertia::location(route('admin.login'));
            }

            return redirect()->route('admin.login')->with('error', 'Please log in as an administrator.');
        }

        return $next($request);
    }
}
