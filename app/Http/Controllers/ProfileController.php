<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Models\Post;
use App\Models\Likes;
use App\Models\Following;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{

    public function userProfile()
    {

        $following = Following::where("user_id" , Auth::user()->id)
                                ->count();

        $followers = Following::where("following_id" , Auth::user()->id)
                                ->count();          

        $user = User::where("id" , Auth::user()->id)->first();

        $joined = $user->created_at;

        $username = $user->name;

        $image = $user->image;

        $url = $user->external_url;

        if($user->profile_visibility == "public")
            $visible = true;
        else
            $visible = false;

        $userposts = $this->userPosts(Auth::user()->id);
        return  view('home')
                ->with(["following" => $following])
                ->with(["followers" =>  $followers])
                ->with(["joined" =>  $joined->diffForHumans()])
                ->with(["username" =>  $username])
                ->with(["image" =>  $image])
                ->with(["url" =>  $url])
                ->with(["visible" =>  $visible])
                ->with(["posts" => $userposts[0]["posts"]])
                ->with(["likedPosts" => $userposts[1]]["likedPosts"])
                ->with(["loggedUser" => true])
                ->with(["id" =>  $user->id]) ;
        
    }

    public function searchProfile($id)
    {

        $following = Following::where("user_id" , $id)
                                ->count();

        $followers = Following::where("following_id" , $id)
                                ->count();          

        $user = User::where("id" , $id)->first();

        $joined = $user->created_at;

        $username = $user->name;

        $image = $user->image;

        $url = $user->external_url;

        if($user->profile_visibility == "public")
            $visible = true;
        else
            $visible = false;

            if($id == Auth::user()->id)
            $loggedUser = true;
            else
            $loggedUser = false;

        
            $userposts = $this->userPosts($id);
        return  view('home')
                ->with(["following" => $following])
                ->with(["followers" =>  $followers])
                ->with(["joined" =>  $joined->diffForHumans()])
                ->with(["username" =>  $username])
                ->with(["image" =>  $image])
                ->with(["url" =>  $url])
                ->with(["visible" =>  $visible])
                ->with(["posts" => $userposts[0]["posts"]])
                ->with(["likedPosts" => $userposts[1]]["likedPosts"])
                ->with(["loggedUser" => $loggedUser ])
                ->with(["id" =>  $user->id]) ;
        
    }

    public function userPosts($id)
    {

        $posts = Post::where(["user_id" => $id ])
        ->with('user')
        
        
        ->orderByDesc('created_at')->get();

        foreach ($posts as $post) {
            $im = $post->user->image;
            $us = $post->user->name;
            $ex = $post->user->external_url;
            $vs = $post->user->profile_visibility;
            
            unset($post["user"]);
            $post->image = $im;
            $post->name = $us;
            $post->external_url = $ex;
            $post->profile_visibility = $vs;
        }
        

        $likedPosts = Likes::where("user_id",$id)->get();


        return [["posts" => $posts],["likedPosts" => $likedPosts]];
    }

    public function changeVisibility(Request $request)
    {
        if($request->get("checked")){
            $user = User::where("id" , Auth::user()->id)->update(array('profile_visibility' => 'public'));
        }
        else {
            $user = User::where("id" , Auth::user()->id)->update(array('profile_visibility' => 'private'));
        }
        

        return ["true" => $request->get("checked")];
    }

    

}
