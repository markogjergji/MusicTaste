<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Post;
//use App\Database\Factories\UserFactory;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //User::factory()->times(30)->create();

        User::factory()
            ->count(100)
            ->has(Post::factory()->count(5))
            ->create();
    }
}
