<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'artistas' => App\Http\Controllers\ArtistaController::class,
    'albun' => App\Http\Controllers\AlbunController::class,
]);

use App\Http\Controllers\ArtistaController;
use App\Http\Controllers\AlbunController;

Route::prefix('api')->group(function () {
    // Ruta para obtener todos los artistas
    Route::get('artistas', [ArtistaController::class, 'index']);

    // Ruta para crear un nuevo artista
    Route::post('crear', [ArtistaController::class, 'store']);

    // Ruta para obtener detalles de un artista por ID
    Route::get('artistas/{id}', [ArtistaController::class, 'show']);

    // Ruta para actualizar un artista por ID
    Route::put('artistas/{id}', [ArtistaController::class, 'update']);

    // Ruta para eliminar un artista por ID
    Route::delete('artistas/{id}', [ArtistaController::class, 'destroy']);


    Route::get('albumes', [AlbunController::class, 'index']);

    // Crear un nuevo álbum
    Route::post('crearalbum', [AlbunController::class, 'store']);

    // Obtener un álbum por ID
    Route::get('albumes/{id}', [AlbunController::class, 'show']);

    // Actualizar un álbum por ID
    Route::put('albumes/{id}', [AlbunController::class, 'update']);

    // Eliminar un álbum por ID
    Route::delete('albumes/{id}', [AlbunController::class, 'destroy']);
});
