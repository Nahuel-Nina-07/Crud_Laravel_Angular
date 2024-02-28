@extends('layouts.app')

@section('content')
<div class="container">
    <h1>Listado de Artistas</h1>
    <a href="{{ route('artistas.create') }}" class="btn btn-primary">Crear Artista</a>
    
    <table class="table mt-3">
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Nacionalidad</th>
                <th>Fecha de Nacimiento</th>
                <th>Género</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            @foreach($artistas as $artista)
            <tr>
                <td>{{ $artista->id }}</td>
                <td>{{ $artista->nombre }}</td>
                <td>{{ $artista->apellido }}</td>
                <td>{{ $artista->nacionalidad }}</td>
                <td>{{ $artista->fecha_nacimiento }}</td>
                <td>{{ $artista->genero }}</td>
                <td>
                    <a href="{{ route('artistas.show', $artista->id) }}" class="btn btn-info">Ver</a>
                    <a href="{{ route('artistas.edit', $artista->id) }}" class="btn btn-warning">Editar</a>
                    <form action="{{ route('artistas.destroy', $artista->id) }}" method="POST" style="display: inline-block;">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-danger" onclick="return confirm('¿Estás seguro?')">Eliminar</button>
                    </form>
                </td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
