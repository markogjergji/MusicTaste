<nav>
    <div id="nav-con" class="flex-pos grid-item">

        <div id="left-con" class="flex-pos">    
            <img src="{{ asset('images/logo.png') }}" />
                <!-- <i class="fas fa-compact-disc"></i> -->
                <span>Music Taste</span>
        </div>

        <div id="middle-con" class="flex-pos">

            <div id="home">
                <a href="/home" class="icons"><i class="fas fa-home"></i></a>
            </div>

            <div id="explore">
                <a href="explore/month" class="icons"><i class="fab fa-wpexplorer"></i></a>
                
            </div>

            <div id="search">
                <button class="icons" id="search-button"><i class="fas fa-search"></i></button>
                <div id="search-con">
                    <form action="/search" method="GET">
                        <input id="search-input" type="text" name="search-query"/>
                    </form>
                </div>
            </div>

            
        </div>

        <div id="right-con" class="flex-pos">
            <div id="user-image">
            <img src="{{Auth::user()->image}}">
            </div>
            <div id="username">
                 <a href="/profile"> {{Auth::user()->name}}</a>
               
            </div>

        </div>

    </div>

</nav>