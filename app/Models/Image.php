<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'url',
        'type',
        'size',
        'dimensions',
        'alt_text',
        'caption',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Get the uploaded_at attribute (alias for created_at).
     */
    public function getUploadedAtAttribute(): string
    {
        return $this->created_at->format('Y-m-d H:i:s');
    }
}
