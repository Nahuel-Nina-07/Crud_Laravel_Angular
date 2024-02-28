<?php

namespace App\Http\Controllers;

use App\Models\Albun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AlbunController extends Controller
{
    public function index()
    {
        $mostrar = Albun::all();
        return response()->json($mostrar, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'nombre'=> 'required',
            'artista_id'=> 'required'
        ],$messages =[
            'required' => 'El :attribute es requerida.',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        Albun::create($request->all());
        return response()->json(['mensaje' => 'Categoria creada'], 201);
    }

    public function show(string $id)
    {
        $buscar = Albun::find($id);
        if(!$buscar){
            return response()->json(['mensaje' => 'No se encontro el albun'], 404);
        }
        return response()->json($buscar);
    }

    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(),[
            'nombre'=> 'required',
            'artista_id'=> 'required'
        ],$messages =[
            'required' => 'La :attribute es requerida.',
        ]);
        $post = Albun::find($id);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $post->update($request->all());
        return response()->json(['mensaje' => 'Se actualizo'], 200);
    }

    public function destroy(string $id)
    {
        $post = Albun::find($id);
        if(!$post){
            return response()->json(['mensaje' => 'No se encontro el albun'], 404);}
        $post->delete();
        return response()->json(Albun::all());
    }
}
