<?php

namespace App\Http\Controllers;

use App\Models\Artista;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ArtistaController extends Controller
{
    public function index()
    {
        $mostrar = Artista::all();
        return response()->json($mostrar, 200);
    }

    public function store(Request $request)
    {
        // Validación de datos
        $validator = Validator::make($request->all(), [
            'nombre' => 'required',
            'apellido' => 'required',
            'nacionalidad' => 'required',
            'fecha_nacimiento' => 'required|date', // Asegúrate de que la fecha sea válida
            'genero' => 'required'
        ]);

        // Manejo de errores de validación
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Crear nuevo artista
        $nuevoArtista = Artista::create($request->all());

        return response()->json(['mensaje' => 'Artista creado', 'artista' => $nuevoArtista], 201);
    }

    public function show(string $id)
    {
        $buscar = Artista::find($id);
        if(!$buscar){
            return response()->json(['mensaje' => 'No se encontro el artista'], 404);
        }
        return response()->json($buscar);
    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(),[
            'nombre'=> 'required',
            'apellido'=> 'required',
            'nacionalidad'=> 'required',
            'fecha_nacimiento'=> 'required',
            'genero'=> 'required'
        ],$messages =[
            'required' => 'La :attribute es requerida.',
        ]);
        $post = Artista::find($id);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $post->update($request->all());
        return response()->json(['mensaje' => 'Se actualizo'], 200);
    }

    public function destroy(string $id)
    {
        $post = Artista::find($id);
        if(!$post){
            return response()->json(['mensaje' => 'No se encontro el artista'], 404);}
        $post->delete();
        return response()->json(Artista::all());
    }
}
