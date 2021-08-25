<?php

namespace App\Events;

use App\Models\Activity;
use App\Models\User;
use App\Models\Likes;
use App\Models\Post;
use Auth;
use App\Transformers\ActivityTransformer;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use League\Fractal\Resource\Item;


class ActivityLogged implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $activity;

    public function __construct(Activity $activity)
    {
        $this->activity = $activity;
    }

    public function broadcastOn()
    {
        return new PrivateChannel('activity.' . User::where("id" , Post::where("id",$this->activity->subject_id)->first()->user_id)->first()->id );
    }

    public function broadcastWith()
    {
        if(Likes::where("post_id",$this->activity->subject_id)->exists()){
        $user = User::where("id" , $this->activity->user_id)->first();
        $response = $this->activity->name == "created_likes" ? $user->name . " liked your post" : $user->name . " commented on your post";
        $href = Likes::where("id",$this->activity->subject_id)->first();
        return [
            'res' => $response,
            'href' => $href,
            'id' => $user->id
        ];
    }
    }
}