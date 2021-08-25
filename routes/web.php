<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
//use Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', function () {
    return view('main');
})->name('main');


Route::get('/auth/redirect',[AuthController::class, 'provider']);

Route::get('/login', [AuthController::class, 'callback']);


Route::middleware(['auth'])->group(function () {

    Route::get('/wall', function () {
        return view('mywall');
    });

    Route::post('/fetchwall',[PostController::class, 'fetchWall']);

    Route::post('/savewall',[PostController::class, 'saveWall']);

    Route::get('/logout',[AuthController::class, 'logout']);


    Route::match(array('get', 'post'),'/edit', function (Request $request) {

        if ($request->isMethod('post')) {
            $query = $request->get("search-query");
            $songs = session('api')->search($query, 'track');
            $albums = session('api')->search($query, 'album');
            $artists = session('api')->search($query, 'artist');
            $playlists = session('api')->search($query, 'playlist');
            $response = array($songs,$albums,$artists,$playlists);
            return $response;
        }else{
            return view('editmypage');
        }
    });
    Route::post('/post',[PostController::class, 'createPost']); 

    Route::get('/post', function () {
        return view('home');
    });

    Route::get('/home', [PostController::class, 'showPosts']);

    Route::post('/like', [PostController::class, 'likePost']);

    Route::get('/editingtransitions', function () {
        return view('editmypagetransitions');
    });

    Route::get('/profile', [ProfileController::class, 'userProfile']);

    Route::get('/userprofile/{id}', [ProfileController::class, 'searchProfile']);

    Route::post('/visibility', [ProfileController::class, 'changeVisibility']);

    Route::get('/explore/{time}', [PostController::class, 'explore']);

    Route::get('/showmore/{time}', [PostController::class, 'showMore']);

    Route::get('/search', [PostController::class, 'search']);

    Route::get('/explore', function () {
        return redirect('/explore/day');
    });

    Route::get('/user', function () {
        return \Auth::user();
    });
});

