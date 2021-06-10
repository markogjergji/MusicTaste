<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/editmypage.css') }}" rel="stylesheet">

    <script src="{{ url('js/addCards.js') }}"></script>


    <title>Document</title>
</head>
<body>
    <div id="main-page-container">
        <div id="search-container">
        <input type="text" id="search" />
        </div>
        <div id="cards-container">
        <div id="cards">
            
            </div>
        </div>
        <button type="button" id="addTitleRow" > Add Title Row </button>
        <button type="button" id="addRow" > + </button>
    </div>
</body>
</html>