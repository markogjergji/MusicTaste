<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <script src="https://kit.fontawesome.com/f53ffe0a63.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap" rel="stylesheet">
    <link href="{{ asset('css/homestyle.css') }}" rel="stylesheet">
    <script src="{!! mix('js/app.js') !!}"></script>
    <script src="{{ asset('js/homeScript.js') }}"></script>

    
    <title>Document</title>
</head>
<body>
    <div id="main-page-container">
    @include('layouts.navbar')
    <div id="items-con" class="flex-pos">
    @include('layouts.goto')
    
    <main>
        <div id="main-feed">

            @if (request()->is('home'))
                <h3 class="title" id="home-title">Home</h3>
                @include('layouts.showposts')
            @elseif (request()->is('post'))
                @include('post')
            @elseif (request()->is('mypage'))
                @include('mypage')
            @elseif (request()->is('profile')||request()->is('userprofile/*'))
                @include('layouts.userprofile')
            @elseif (request()->is('explore/day')|| request()->is('explore/week')|| request()->is('explore/month') || request()->is('explore/year'))
                @include('layouts.explore')
            @elseif (request()->is('search'))
                @include('layouts.search')
            @endif
        </div>
    
    </main>
   
   @include('layouts.activity')
</div>
    </div>
</body>
</html>