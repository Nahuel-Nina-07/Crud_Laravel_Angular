<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Artista extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre', 
        'apellido', 
        'nacionalidad', 
        'fecha_nacimiento', 
        'genero'
    ];

    public function albumes()
{
    return $this->hasMany(Albun::class);
}

}
