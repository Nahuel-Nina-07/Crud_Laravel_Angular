<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Albun extends Model
{
    use HasFactory;
    protected $fillable = [
        'nombre',
        'artista_id'
    ];
    public function artista(): belongsTo
    {
        
        return $this->belongsTo(Artista::class, 'artista_id');
    }
}
