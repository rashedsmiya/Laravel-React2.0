<?php

use App\Http\Controllers\Backend\Admin\AdminDashboardController;
use App\Http\Controllers\Backend\Admin\AdminLoginController;
use App\Http\Controllers\Backend\Admin\ImageController;
use App\Http\Controllers\Backend\Admin\Orders\OrderController;
use App\Http\Controllers\Backend\Admin\Products\ProductController;
use App\Http\Controllers\UserSelectionController;
use Illuminate\Support\Facades\Route;

// Admin Authentication Routes
Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest:admin')->group(function () {
        Route::get('/login', [AdminLoginController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [AdminLoginController::class, 'login'])->name('login.store');
    });

    Route::middleware(['admin'])->group(function () {
        Route::post('/logout', [AdminLoginController::class, 'logout'])->name('logout');
        Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');
        Route::get('/orders', OrderController::class)->name('orders');
        Route::get('/products', ProductController::class)->name('products');
        Route::get('/images', [ImageController::class, 'index'])->name('images');
        Route::post('/images', [ImageController::class, 'store'])->name('images.store');
        Route::put('/images/{image}', [ImageController::class, 'update'])->name('images.update');
        Route::delete('/images/{image}', [ImageController::class, 'destroy'])->name('images.destroy');
        Route::get('/user-dashboard', [UserSelectionController::class, 'getUsers'])->name('user-dashboard');
    });
});
