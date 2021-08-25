<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use SpotifyWebAPI;
use App\Models\User;

class AuthController extends Controller
{

    public function provider()
    {

        $spotify = new SpotifyWebAPI\Session(
            env('SPOTIFY_CLIENT_ID'),
            env('SPOTIFY_CLIENT_SECRET'),
            env('SPOTIFY_REDIRECT_URI')
        );

        $options = [
            'scope' => [
                'user-read-email',
            ],
            'auto_refresh' => true,
        ];
        
        header('Location: ' . $spotify->getAuthorizeUrl($options));
        die();

    }

    public function callback()
    {

        $spotify = new SpotifyWebAPI\Session(
            env('SPOTIFY_CLIENT_ID'),
            env('SPOTIFY_CLIENT_SECRET'),
            env('SPOTIFY_REDIRECT_URI')
        );

        if (isset($_GET['code'])) {
            $spotify->requestAccessToken($_GET['code']);
            $api = new SpotifyWebAPI\SpotifyWebAPI();
            $api->setSession($spotify);

            session(['accessToken' => $spotify->getAccessToken()]);
            session(['refreshToken' => $spotify->getRefreshToken()]);
            session(['api' => $api]);

            $user = (array) $api->me();

            $user = $this->findUser($user);

            Auth::login($user);
            return redirect('/home');
        }
    }

    private function findUser($user)
    {

        $authUser = User::where('email', $user['email'])->first();
        if ($authUser) {
            return $authUser;
        }

        
        if( sizeof($user['images']) == 0)
            $image = "null";
        else 
            $image = $user['images'][0]['url'];
        
        $external_url = (array) $user['external_urls'];

        $newUser = User::create([
            'name' => $user['display_name'],
            'email' => $user['email'],
            'image' => $image,
            'profile_visibility' => 'public',
            'external_url' => $external_url['spotify'],
            
        ]);

        return $newUser;
    }

    public function logout()
    {
        session()->forget('accessToken');
        session()->forget('refreshToken');
        session()->forget('api');
        Auth::logout();
        return redirect('/');
    }

}
