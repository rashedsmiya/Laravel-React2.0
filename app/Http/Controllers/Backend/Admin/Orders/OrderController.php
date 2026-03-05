<?php

namespace App\Http\Controllers\Backend\Admin\Orders;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function __invoke(Request $request): Response
    {
        return Inertia::render('backend/Admin/Orders/orders');
    }
}
