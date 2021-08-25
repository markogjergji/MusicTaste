<div id="profile-info">
    
    <div id="profile-image"><img src="{{$image}}" /></div>
    <div id="profile-username">{{$username}}</div>
    <div id="following"> Following <span class="profile-info">{{$following}}</span></div>
    <div id="followers"> Followers <span class="profile-info">{{$followers}}</span></div>
    <div id="joined"> Joined <span class="profile-info">{{$joined}}</span></div>
    <div id="spotify"> Spotify Page <i class="fas fa-external-link-alt"></i>  <a id="spotify-page" href="{{$url}}"></a></div>

    <div id="wall" class="user-profile-button" text="{{$id}}"> Wall </div>

    <div id="profile_visibility">
    <label class="switch">
        @if($visible)
        <div class="visible" id="visibility">Public</div>
        <input type="checkbox" id="check_visibility" checked>
        @else
        <div class="visible" id="visibility">Private</div>
        <input type="checkbox" id="check_visibility">
        @endif
        
        @if($loggedUser == True)
        <span class="slider round"></span>
        @endif
    </label>
    </div>
    @if($loggedUser == True)
        
        <div id="edit-wall"  class="user-profile-button">edit wall</div>
        <div id="logout"  class="user-profile-button">logout</div>
        @endif
 

</div>


@include('layouts.showposts')
