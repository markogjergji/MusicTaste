<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://kit.fontawesome.com/f53ffe0a63.js" crossorigin="anonymous"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@600&family=Nunito:wght@600;800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@900&display=swap" rel="stylesheet">
    <link href="//db.onlinewebfonts.com/c/4a373e70cd01dec089c1dd1185ceba51?family=Maison+Neue" rel="stylesheet" type="text/css"/>
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/editmypage.css') }}" rel="stylesheet">

    <script src="{{ url('js/addCards.js') }}"></script>


    <title>Document</title>
</head>
<body>
    <div id="main-page-container">
        <div id="search-container">
            <div id="search-input-container">
                <input type="text" id="search" placeholder="Search" />
                <div id="search-info">
                    <div id="arrow-body"></div>
                    <div id="arrow-left"></div>
                    <div id="arrow-right"></div>
                    Search your favourite songs,albums or playlists and place them on the container in the right
                </div>
            </div>
        </div>
        <div id="cards-container">
            <div id="cards">
            
            </div>
        </div>
        <div id="buttons-container">
            <button type="button" id="addTitleRow" > Add Title Row <i class="fas fa-plus-circle"></i></button>
            <button type="button" id="addRow" > Add Cards Row <i class="fas fa-plus-circle"></i></button>
            <button type="button" id="next" > Go to Coloring Section <i class="fas fa-arrow-circle-right"></i></button>
        </div>
    </div>
</body>
</html>