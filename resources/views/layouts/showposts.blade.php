@foreach($posts as $post)
    <div id="post">
        <div id="post-creator">
            <div id="creator-image">
                <img src="{{$post['image']}}">
            </div>  
            {{$post['name']}}
        </div>
        <div id="post-content">
            {{$post['content']}}
        </div>
        <div id="post-interact">
        <div id="like">
        
        
        <button class="post-interact-button" id="like-button" value="not-liked" onClick="like(this,{{$post['id']}},{{$post['user_id']}})"><i class="far fa-heart"></i></button>

        @foreach($likedPosts as $likedPost)
            @if($likedPost["post_id"]==$post["id"])
                <script>document.getElementById("like-button").value = "liked";
            document.querySelector("#like-button > i").classList.remove("far");
        document.querySelector("#like-button > i").classList.add("fas");
            
            </script>
                @break                                
            @endif
        @endforeach

            
            
        
        </div>
        <div id="post-likes">
            {{$post['likes']}}
        </div>

        <div id="comment">
            <button class="post-interact-button" id="comment-button" value="not-comment" ><i class="far fa-comment"></i></button>
        </div>

        <div id="post-comments">0</div>
    </div>

    <hr>
    </div>
@endforeach
