<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use App\RecordsActivity;
use Post;


class Likes extends Model
{
    use HasFactory, Notifiable,RecordsActivity;

    protected $fillable = [
        'user_id', 'post_id'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

}
