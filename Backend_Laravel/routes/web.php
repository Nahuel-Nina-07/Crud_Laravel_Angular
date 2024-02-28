<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


use App\Http\Controllers\ArtistaController;

// Rutas de Artistas
Route::get('/artistas', [ArtistaController::class, 'index'])->name('artistas.index');
Route::get('/artistas/{id}', [ArtistaController::class, 'show'])->name('artistas.show');
Route::get('/artistas/create', [ArtistaController::class, 'create'])->name('artistas.create');
Route::post('/artistas', [ArtistaController::class, 'store'])->name('artistas.store');
Route::get('/artistas/{id}/edit', [ArtistaController::class, 'edit'])->name('artistas.edit');
Route::put('/artistas/{id}', [ArtistaController::class, 'update'])->name('artistas.update');
Route::delete('/artistas/{id}', [ArtistaController::class, 'destroy'])->name('artistas.destroy');
