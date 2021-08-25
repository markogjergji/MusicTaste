<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Models\Post;
use App\Models\Likes;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{

    public function createPost(Request $request)
    {

        $text = $request->get("text");
        $newPost = Post::create([
            'user_id' => Auth::user()->id,
            'likes' => 0,
            'content' => strip_tags($text),
        ]);
        return view('post');
    }

    public function showPosts()
    {

        $posts = DB::select('SELECT posts.content,posts.likes,posts.id ,posts.user_id,users.name,users.image  FROM posts
                            
                             JOIN `following` ON posts.user_id  = `following`.following_id

                             JOIN users ON `following`.following_id = users.id
                             
                             WHERE `following`.user_id = ? LIMIT 100 

                            ' , [Auth::user()->id] );

        $likedPosts = Likes::where("user_id",Auth::user()->id)->get();

        $result = array_map(function ($value) {
            return (array)$value;
        }, $posts);
       /*  return $posts; */

        return view('home')
                    ->with(["posts" => $result])
                    ->with(["id" => Auth::user()->id])
                    ->with(["likedPosts" => $likedPosts->toArray()]);
       //return view('home',["posts" => $result],["id" => Auth::user()->id],["likedPosts" => $likedPosts]);
    }

    public function likePost(Request $request)
    {

        $like = $request->get("liked");
        $id = $request->get("id");

        if($like){
            Post::where('id', $id)->increment('likes');
            Likes::create([
                'user_id' => Auth::user()->id,
                'post_id' => $id,
            ]);
        }
        else{
            Post::where('id', $id)->decrement('likes');

            Likes::where('user_id',Auth::user()->id)
                    ->where('post_id',$id)->delete();
                
            
        }
        
        
        $post = Post::where('id', $id)->first();
        return response($post["likes"]);
    }

    public function explore(Request $request,$time)
    {
        $o = new PostController();

        $res = $o->showMore($time);
        $posts = $o->convert($res[0]);
        $likedPosts = $res[1];

        return view('home')
                    ->with(["posts" => $posts]) 
                    ->with(["likedPosts" => $likedPosts]) ;
    }

    public function showMore($time)
    {

        $posts = Post::where(DB::raw('posts.created_at'), '>', DB::raw('DATE_SUB(CURDATE(), INTERVAL 1 ' . $time . ')'))
        ->orderBy('likes', 'DESC')->with('user')->cursorPaginate(15);

        $likedPosts = Likes::where("user_id",Auth::user()->id)->get();

        return [$posts, $likedPosts];
                    
    }


    public function search(Request $request)
    {

        $users = User::where('name', 'like', '%' . $request->get('search-query') . '%')->get();

        $posts= Post::where('content', 'like', '%' . $request->get('search-query') . '%')->with('user')->cursorPaginate(1);
        
        $likedPosts = Likes::where("user_id",Auth::user()->id)->get();

        $o = new PostController();

        $posts = $o->convert($posts);
        
        return view('home')
                    ->with(["users" => $users])
                    ->with(["posts" => $posts]) 
                    ->with(["likedPosts" => $likedPosts]) ;
    }


    public function convert($posts)
    {
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
        return $posts;
    }

    public function fetchWall(Request $request)
    {
        $wall = User::where('id', $request->get("user"))->first();

        return (["wall" => $wall["wall"]]);
    }

    public function saveWall(Request $request)
    {
        $wall = User::where('id', $request->get("user"))->update(array('wall' => $request->get("wall")));

        return $wall;
    }
}
