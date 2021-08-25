<div id="go-to-con" class="grid-item">
            @if (request()->is('home') || request()->is('profile') || request()->is('search')  || request()->is('explore/day')|| request()->is('explore/week')|| request()->is('explore/month') || request()->is('explore/year')||request()->is('userprofile/*'))
                <div id="mywall-con" class="go-to-options flex-pos">
                    <a  id="show" class="flex-pos">My Wall</a>
                    
                </div>
                <div id="post-con" class="go-to-options flex-pos">
                    <a href="/post" class="flex-pos">Post</a>
                </div>
            @elseif (request()->is('post'))
                <div id="mywall-con" class="go-to-options flex-pos">
                    <a  class="flex-pos">My Wall</a>
                </div>
                <div id="post-con" class="go-to-options flex-pos">
                    <a href="/home" class="flex-pos">Home</a>
                </div>
            @elseif (request()->is('mypage'))
                <div id="mywall-con" class="go-to-options flex-pos">
                    <a href="/home"  class="flex-pos">Home</a>
                </div>
                <div id="post-con" class="go-to-options flex-pos">
                    <a href="/post" class="flex-pos">Post</a>
                </div>
            @endif
</div>