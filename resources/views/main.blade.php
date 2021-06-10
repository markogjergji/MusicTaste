<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <title>Document</title>
</head>
<body>
    <div id="main-page-container">
        <div id="welcome">
            <h1>Welcome to Music Taste</h1>
            <p>Create a personalized page to show off your music taste!</p>
        </div>
        <div id="login">
            <p>Login using your Spotify Account</p>
            <a href="/login">Login</a>
        </div>
    </div>
</body>
</html>