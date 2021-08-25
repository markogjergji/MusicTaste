<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;


class Following extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'following';
    
    
    protected $fillable = [
        'user_id', 'following_id'
    ];

}
