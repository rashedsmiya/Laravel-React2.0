<?php

use App\Http\Controllers\Frontend\FrontendController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('/', [FrontendController::class, 'index'])->name('home');
    Route::get('/detailspage/{slug}', [FrontendController::class, 'details'])->name('product.details');
    Route::get('/men', [FrontendController::class, 'men'])->name('men');
    Route::get('/accessories', [FrontendController::class, 'accessories'])->name('accessories');
});
