<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Post;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

  /*
     * mass assignment fields
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email','image','external_url','profile_visibility','wall'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
         'remember_token',
    ];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
}
