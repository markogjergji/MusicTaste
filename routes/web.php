<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
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
});
Route::get('/login', function () {
    $spotify = new SpotifyWebAPI\Session(
        'a31d45cf636740ef94b8482206cce609',
        'cf79631d587d45e996b461c6091ee0e3',
        'http://127.0.0.1:8000/login'
    );
    
    $api = new SpotifyWebAPI\SpotifyWebAPI();
    
    if (isset($_GET['code'])) {
        $spotify->requestAccessToken($_GET['code']);
        $api->setAccessToken($spotify->getAccessToken());
        session(['spotify' => $spotify]);
        session(['api' => $api]);
        return redirect('/mypage');
    } else {
        $options = [
            'scope' => [
                'user-read-email',
            ]
        ];
    
        header('Location: ' . $spotify->getAuthorizeUrl($options));
        die();
    }
});
Route::get('/me', function () {
    print_r(session('api')->me());
});

Route::get('/mypage', function () {

    return view('mypage');
/*     $results = session('api')->search('blur', 'artist');

foreach ($results->artists->items as $artist) {
    echo $artist->name;
    echo '<img src="'.$artist->images[0]->url.'">', '<br>';
} */
});

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

    
/*     $results = session('api')->search('blur', 'artist');

foreach ($results->artists->items as $artist) {
    echo $artist->name;
    echo '<img src="'.$artist->images[0]->url.'">', '<br>';
} */
});

Route::post('search', function (Request $request) {
    //$query = $request->getContent();
    //$songs = session('api')->search('e', 'track');
    //echo $query;
/*     $albums = session('api')->search($request->get($query), 'album');
    $artists = session('api')->search($request->get($query), 'artist');
    $playlists = session('api')->search($request->get($query), 'playlist');
    $response = array($songs,$albums,$artists,$playlists); */
    //return json(["ee" => "ee"]);
    return "ee";
});