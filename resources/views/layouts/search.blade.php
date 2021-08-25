
<h3 class="title" id="users-title">Users</h3>
<div class="users">
@foreach($users as $user)
    <div class="search-user-con">

        <div class="search-user-image">
            <img src="{{ asset('images/avatar.png') }}">
        </div>
        <div class="search-user-name">
            <a href="/userprofile/{{$user['id']}}">{{$user['name']}}</a>
        </div>  
            
    </div>
        
@endforeach
</div>

<h3 class="title" id="posts-title">Posts</h3>
@include('layouts.showposts')
