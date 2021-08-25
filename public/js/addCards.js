window.addEventListener('DOMContentLoaded', () => {

    let container = document.getElementById("cards");

    let rowCon;

    //Create an array to check if a card has been placed in the grid cell
    let placementArray = new Array();

    let positionArray = new Array();
    let postionId = 0;

    //Create a title row and a normal row
    addTitleRow();
    makeRows();

    document.querySelector("#cards > div.title-placement-row > input[type=text]").autofocus = true;


    if(localStorage.getItem("cards")){

        let con = document.getElementById('cards-container');
        con.innerHTML = "";
        let obj = JSON.parse(localStorage.getItem('cards'));
        appendDom(con,obj);

        function appendDom(container, obj) {
            for (let i = 0; i < obj.children.length; i++) {
                if(obj.children[i].attributes[0].value === "color")
                continue;
                if(obj.children[i].attributes[0].value === "welcome-title")
                continue;
                if(obj.children[i].attributes[0].value === "title-placement-text")
                continue;
                
                let tmp = document.createElement(obj.children[i].name);

                if(obj.children[i].attributes[0].value === "title-placement-row"){
                    let input = document.createElement("input");
                    if(obj.children[i].attributes[1].value !== "null")
                    input.value = obj.children[i].attributes[1].value;
                    else
                    input.value = "";
                    tmp.appendChild(input);
                }
                
                obj.children[i].attributes.forEach(e => {
                    tmp.setAttribute(e.name,e.value);
                });
                
                if (obj.children[i].length != 0) {
                    appendDom(tmp, obj.children[i]);
                }
                container.append(tmp);
            }
        }
        container = document.getElementById("cards");
    }

    function makeRows() {

        let row = document.createElement("div");
        row.setAttribute("class","single-placement-row");
        row.setAttribute("pos",placementArray.length);

        addCard(row);
        placementArray.push(new Array(4).fill(0));

        positionArray.push(new Array(4).fill(-1));

        rowCon.appendChild(row);
        
        return row;
    };


    function addTitleRow(){

        let row = document.createElement("div");
        let textInput = document.createElement("input");
        textInput.setAttribute("type","text");
        
        row.setAttribute("class","title-placement-row");
        row.appendChild(textInput);
        container.appendChild(row);

        row = document.createElement("div");
        row.setAttribute("class","row-container");
        rowCon = row;
        container.appendChild(row);

    };


    function addCard(p){

        //Get the row of the + clicked
       // let p =  e.target.parentNode;
     
        //Create a small grid cell
        let c = document.createElement("div");
        c.className = "dropzone";
        c.className += " grid-item";

        //Set the position as the total number of cells in the row - 1 (to start from 0)
        //c.setAttribute("pos",e.target.parentNode.childElementCount - 1);

        //Insert the cell before the +

        for(let i = 0 ; i < 4 ; i++){
            c.setAttribute("pos",i);
            p.appendChild(c.cloneNode(true));
        }
    };

    function addBigCard(element){

        let c = document.createElement("div");
        c.className = "dropzone";
        c.className += " big-grid-item";
        element.appendChild(c);
        return c;
            
    };

    function goNext(){
       // let obj = {"cards" : document.getElementById("cards-container").innerHTML.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;")};
      
        let titles = document.querySelectorAll(".title-placement-row > input:first-child");

        let d = document.createElement("div");
        d.setAttribute("class","title-placement-text");
        let c;

        titles.forEach(e => {
            c = d.cloneNode(true);
            e.parentNode.setAttribute("text",e.value);
            e.parentElement.appendChild(c);
        });


        let obj = stringify(document.getElementById("cards-container"));
     
        localStorage.setItem("cards",JSON.stringify(obj));
        window.location.href = '/editingtransitions'
    }


    function stringify(element) {
        let obj = {};
        obj.name = element.localName;
        obj.attributes = [];
        obj.children = [];
        Array.from(element.attributes).forEach(a => {
            obj.attributes.push({ name: a.name, value: a.value });
        });
        Array.from(element.children).forEach(c => {
            obj.children.push(stringify(c));
        });
        
        return obj;
    }

    document.getElementById("addRow").addEventListener("click",() => makeRows());

    document.getElementById("addTitleRow").addEventListener("click",() => addTitleRow());

    document.getElementById("next").addEventListener("click",() => goNext());

    document.getElementById("search").addEventListener("input",() => {

        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        if(document.querySelector("#search-info")){
            document.querySelector("#search-info").style.display = "none";
        }

        
        let n = document.querySelector("#search-container");

        while (n.firstElementChild.nextElementSibling) {
            n.removeChild(n.lastElementChild);
        }
        
        

        let searchquery = document.getElementById("search").value;

        fetch("edit", {
            method: 'post',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRF-TOKEN': token
            },
            body: JSON.stringify({
                'search-query': searchquery
            })
        }).then(function(response){

            return response.json();
                
        }).then(function(res){
    

            let type;
            let row;
            let cover;
            let title;
            let duration;
            let artist;

            let typeText;
            
            let coverLink;
            let coverImage;
            let titleLink;

            let durationText;

            let artistText;


            for (let i = 0; i < res.length; i++){

                let obj = res[i];

                switch(i){

                    case 0:

                        type = document.createElement("div");
                        type.setAttribute("id","songs");
                        typeText = document.createElement("p");
                        typeText.textContent = "Songs";
                        typeText.setAttribute("class","type-text");
                        type.appendChild(typeText);            

                        document.getElementById("search-container").appendChild(type);

                        for (let key in obj["tracks"]["items"]){

                            cover = document.createElement("div");
                            coverLink = document.createElement("a");
                            coverImage = document.createElement("img");

                            coverImage.setAttribute("src",obj["tracks"]["items"][key]["album"]["images"][0]["url"]);

                            coverLink.setAttribute("href",obj["tracks"]["items"][key]["external_urls"]["spotify"])
                            coverLink.appendChild(coverImage);
                            coverImage.setAttribute("class","cover-image");
                            cover.setAttribute("class","cover-container");
                            cover.appendChild(coverLink);

                            title = document.createElement("div");
                            titleLink = document.createElement("a");
                            titleLink.setAttribute("href",obj["tracks"]["items"][key]["external_urls"]["spotify"]);
                            titleLink.textContent = obj["tracks"]["items"][key]["name"];
                            titleLink.setAttribute("class","title-text");
                            
                            title.setAttribute("class","title-container");
                            
                            title.appendChild(titleLink);

                            duration = document.createElement("div");
                            durationText = document.createElement("p");
                            durationText.textContent = time(obj["tracks"]["items"][key]["duration_ms"]);
                            durationText.setAttribute("class","duration-text");
                            duration.setAttribute("class","duration-container");
                            duration.appendChild(durationText);


                            artist = document.createElement("div");
                            artistText = document.createElement("a");
                            artistText.textContent = obj["tracks"]["items"][key]["artists"][0]["name"];
                            artistText.setAttribute("href",obj["tracks"]["items"][key]["artists"][0]["external_urls"]["spotify"]);
                            artistText.setAttribute("class","artist-text");
                            artist.appendChild(artistText);
                            artist.setAttribute("class","artist-container");

                            row = document.createElement("div");
                            row.appendChild(cover);
                            row.appendChild(title);
                            row.appendChild(artist);
                            row.appendChild(duration);
                            row.setAttribute("class","single-result-container");
                            row.setAttribute("draggable","true");
                            row.setAttribute("ondragstart","event.dataTransfer.setData('text/plain',null)");

                            addBigSmall(row,row.childNodes);

                            
                        }
                        break;

                    case 1:
                        type = document.createElement("div");
                        type.setAttribute("id","albums");
                        typeText = document.createElement("p");
                        typeText.textContent = "Albums";
                        typeText.setAttribute("class","type-text");
                        type.appendChild(typeText);
                        
                        document.getElementById("search-container").appendChild(type);

                        for (let key in obj["albums"]["items"]){

                            cover = document.createElement("div");
                            coverLink = document.createElement("a");
                            coverImage = document.createElement("img");

                            coverImage.setAttribute("src",obj["albums"]["items"][key]["images"][0]["url"])

                            coverLink.setAttribute("href",obj["albums"]["items"][key]["external_urls"]["spotify"])
                            coverLink.appendChild(coverImage);
                            cover.setAttribute("class","cover-container");
                            cover.appendChild(coverLink);

                            title = document.createElement("div");
                            titleLink = document.createElement("a");
                            titleLink.setAttribute("href",obj["albums"]["items"][key]["external_urls"]["spotify"]);
                            titleLink.textContent = obj["albums"]["items"][key]["name"];
                            title.setAttribute("class","title-container");
                            title.appendChild(titleLink);

                            artist = document.createElement("div");
                            artistText = document.createElement("a");
                            artistText.textContent = obj["albums"]["items"][key]["artists"][0]["name"];
                            artistText.setAttribute("href",obj["albums"]["items"][key]["artists"][0]["external_urls"]["spotify"]);
                            artist.appendChild(artistText);
                            artist.setAttribute("class","artist-container");
                            row = document.createElement("div");
                            row.appendChild(cover);
                            row.appendChild(title);
                            row.appendChild(artist);
                            row.setAttribute("class","single-result-container");
                            row.setAttribute("draggable","true");
                            row.setAttribute("ondragstart","event.dataTransfer.setData('text/plain',null)");
                            document.getElementById("search-container").appendChild(row);
                            addBigSmall(row,row.childNodes);
                        }
                        break;

                    case 2:
                        type = document.createElement("div");
                        type.setAttribute("id","artists");
                        typeText = document.createElement("p");
                        typeText.textContent = "Artists";
                        typeText.setAttribute("class","type-text");
                        type.appendChild(typeText);                        
                    
                        document.getElementById("search-container").appendChild(type);

                        for (let key in obj["artists"]["items"]){

                            cover = document.createElement("div");
                            coverLink = document.createElement("a");
                            coverImage = document.createElement("img");

                            coverImage.setAttribute("src",obj["artists"]["items"][key]["images"][0]["url"])

                            coverLink.setAttribute("href",obj["artists"]["items"][key]["external_urls"]["spotify"])
                            coverLink.appendChild(coverImage);
                            cover.setAttribute("class","cover-container");
                            cover.appendChild(coverLink);

                            title = document.createElement("div");
                            titleLink = document.createElement("a");
                            titleLink.setAttribute("href",obj["artists"]["items"][key]["external_urls"]["spotify"]);
                            titleLink.textContent = obj["artists"]["items"][key]["name"];
                            title.setAttribute("class","title-container");
                            title.appendChild(titleLink);

                            row = document.createElement("div");
                            row.appendChild(cover);
                            row.appendChild(title);
                            row.setAttribute("class","single-result-container");
                            row.setAttribute("draggable","true");
                            row.setAttribute("ondragstart","event.dataTransfer.setData('text/plain',null)");
                            document.getElementById("search-container").appendChild(row);
                            addBigSmall(row,row.childNodes);
                        }
                        break;

                    case 3:

                        type = document.createElement("div");
                        type.setAttribute("id","playlists");
                        typeText = document.createElement("p");
                        typeText.textContent = "Playlists";
                        typeText.setAttribute("class","type-text");
                        type.appendChild(typeText);

                        document.getElementById("search-container").appendChild(type);

                        for (let key in obj["playlists"]["items"]){

                            cover = document.createElement("div");
                            coverLink = document.createElement("a");
                            coverImage = document.createElement("img");

                            coverImage.setAttribute("src",obj["playlists"]["items"][key]["images"][0]["url"])

                            coverLink.setAttribute("href",obj["playlists"]["items"][key]["external_urls"]["spotify"])
                            coverLink.appendChild(coverImage);
                            cover.setAttribute("class","cover-container");
                            cover.appendChild(coverLink);

                            title = document.createElement("div");
                            titleLink = document.createElement("a");
                            titleLink.setAttribute("href",obj["playlists"]["items"][key]["external_urls"]["spotify"]);
                            titleLink.textContent = obj["playlists"]["items"][key]["name"];
                            title.setAttribute("class","title-container");
                            title.appendChild(titleLink);

                            user = document.createElement("div");
                            userText = document.createElement("a");
                            userText.textContent = obj["playlists"]["items"][key]["owner"]["display_name"];
                            userText.setAttribute("href",obj["playlists"]["items"][key]["owner"]["external_urls"]["spotify"]);
                            user.setAttribute("class","artist-container");
                            user.appendChild(userText);               

                            row = document.createElement("div");
                            row.appendChild(cover);
                            row.appendChild(title);
                            row.appendChild(user);
                            row.setAttribute("class","single-result-container");
                            row.setAttribute("draggable","true");
                            row.setAttribute("ondragstart","event.dataTransfer.setData('text/plain',null)");
                            document.getElementById("search-container").appendChild(row);
                            addBigSmall(row,row.childNodes);
                        }
                    break;
                }
            }


            })
            .then(function(){
                Array.from(document.getElementsByClassName("title-text")).forEach(e => {
                    if(e.getBoundingClientRect().width > 150)
                        e.style.animation = "marquee 7s linear infinite";
                })
            })
            .catch(function(error){
    
    
            });
    });

    
    function addBigSmall(row,children){

        children.forEach(function(item){
            item.setAttribute("ondragstart","event.preventDefault();event.stopPropagation();");
        });

        let dragdivsmall = document.createElement("div");
        let h = document.createElement("p");
        let t = document.createTextNode("Small");
        h.appendChild(t); 

        dragdivsmall.setAttribute("class","drag-div-small");

        dragdivsmall.appendChild(h);


        h = document.createElement("p");
        t = document.createTextNode("Big");
        h.appendChild(t);

        let dragdivbig = document.createElement("div");
        dragdivbig.setAttribute("class","drag-div-big");

        dragdivbig.setAttribute("ondrag","selectSize('big')");

        dragdivbig.appendChild(h);
        row.appendChild(dragdivsmall);
        row.appendChild(dragdivbig);
        document.getElementById("search-container").appendChild(row);
    }

    //Convert milliseconds to MM:SS format
    function time(millis) {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return (
            seconds == 60 ?
            (minutes+1) + ":00" :
            minutes + ":" + (seconds < 10 ? "0" : "") + seconds
        );
    }
      


    let dragged;
    let size;

    document.addEventListener("dragstart", function(event) {

        //Get the search result dragged
        dragged = event.target;

        //Check if mouse was on the left side or the right side of the element
        if(event.pageX < dragged.offsetWidth/2){
            size = "small";
        }
        else{
            size = "big";
        }
        
    }, false);


    document.addEventListener("dragover", function(event) {
        event.preventDefault();
    }, false);


    document.addEventListener("drop", function(e) {
        
        e.preventDefault();
        
        //If item was dropped in a grid cell
        if (e.target.classList.contains("dropzone")) {

            //Clone the dragged node to prevent it from getting removed in the search container
            let nodeCopy = dragged.cloneNode(true);
            
            //Change the styling
            nodeCopy.classList.remove("single-result-container");
            nodeCopy.classList.add("single-placed-container");
            nodeCopy.childNodes[0].classList.remove("cover-container");
            nodeCopy.childNodes[0].classList.add("cover-container-placed");
            nodeCopy.childNodes[1].style.display = "none";
            nodeCopy.childNodes[2].style.display = "none";
            nodeCopy.childNodes[3].style.display = "none";
            
            //Remove the small and big divs
            nodeCopy.removeChild(nodeCopy.lastChild);
            nodeCopy.removeChild(nodeCopy.lastChild);

            //Create a delete button
            let remove = document.createElement("button");
            remove.setAttribute("class","remove-button");
            remove.innerHTML = "<i class='fas fa-times-circle'></i>";
            nodeCopy.appendChild(remove);

            let left = document.createElement("button");
            left.setAttribute("class","left-button");
            left.innerHTML = "<i class='fas fa-arrow-right'></i>";
            nodeCopy.appendChild(left);

            let top = document.createElement("button");
            top.setAttribute("class","top-button");
            top.innerHTML = "<i class='fas fa-arrow-right'></i>";
            nodeCopy.appendChild(top);

            let right = document.createElement("button");
            right.setAttribute("class","right-button");
            right.innerHTML = "<i class='fas fa-arrow-left'></i>";
            nodeCopy.appendChild(right);

            if(size == "small"){

                //e.target.parentNode is the row and e.target is the cell
                
                //If the placementArray is 1 at the dropped position it means there already exists an item there
                if(placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][parseInt(e.target.getAttribute("pos"))] === 1)
                return;
                
                positionArray[parseInt(e.target.parentNode.getAttribute("pos"))][parseInt(e.target.getAttribute("pos"))] = postionId;
                postionId++;

                //When the item is placed put a 1 in the same position in the array
                placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][parseInt(e.target.getAttribute("pos"))] = 1;
                
                //Create an event listener for the remove button of a small grid cell (remove 1 from the array)
                remove.addEventListener("click" , () => {
                    placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][parseInt(e.target.getAttribute("pos"))] = 0;
                    e.target.removeChild(nodeCopy);
                })
                

                //Append result to the cell
                e.target.appendChild(nodeCopy);
            }
            else{

                //Can't drop at the last cell,there isn't enough space
                if(parseInt(e.target.getAttribute("pos")) === 3)
                return;

                //If a row doesn't exist below or the row that exists is a title row
                if(!e.target.parentNode.nextSibling || e.target.parentNode.nextSibling.classList.contains("title-placement-row")){
                    
                    //Get the title row below
                    let tmp = e.target.parentNode.nextSibling;

                    //Remove the title row
                    if(e.target.parentNode.nextSibling)
                    if(e.target.parentNode.nextSibling.classList.contains("title-placement-row"))
                    container.removeChild(tmp);

                    //Create a new row and 3 cells in the new row
                    let row = makeRows();
                    let add = row.firstChild;
                    add.click();
                    add.click();
                    add.click();

                    //Append the removed row again
                    if(e.target.parentNode.nextSibling)
                    if(e.target.parentNode.nextSibling.classList.contains("title-placement-row"))
                    container.appendChild(tmp);

                }

                //If only one cell and the + button exist in the row,create a new cell because a big cell is two cells wide
                if(!e.target.nextSibling.nextSibling){
                    
                    e.target.nextSibling.click();

                }

                //If one in the neighbor cells is filled then there is now space for a big item
                if(placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][parseInt(e.target.getAttribute("pos"))] === 1
                 || placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][parseInt(e.target.getAttribute("pos")) + 1] === 1
                 || placementArray[parseInt(e.target.parentNode.getAttribute("pos")) + 1][parseInt(e.target.getAttribute("pos")) + 1] === 1
                 || placementArray[parseInt(e.target.parentNode.getAttribute("pos")) + 1][parseInt(e.target.getAttribute("pos"))] === 1 )
                 return;

                //Add the big item,pass as arguments the cell and it's position
                let c = addBigCard(e.target,parseInt(e.target.getAttribute("pos"))); 
                c.appendChild(nodeCopy);

                //Fill the neighbor cells with 1 in the placementArray
                placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][parseInt(e.target.getAttribute("pos"))] = 1;
                placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][parseInt(e.target.getAttribute("pos")) + 1] = 1;
                placementArray[parseInt(e.target.parentNode.getAttribute("pos")) + 1][parseInt(e.target.getAttribute("pos")) + 1] = 1;
                placementArray[parseInt(e.target.parentNode.getAttribute("pos")) + 1][parseInt(e.target.getAttribute("pos"))] = 1;
            
                //The remove button which also reflects the deletion in the placementArrauy
                remove.addEventListener("click" , () => {
                    c.parentNode.removeChild(c.parentNode.firstChild);
                    placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][parseInt(e.target.getAttribute("pos"))] = 0;
                    placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][parseInt(e.target.getAttribute("pos")) + 1] = 0;
                    placementArray[parseInt(e.target.parentNode.getAttribute("pos")) + 1][parseInt(e.target.getAttribute("pos")) + 1] = 0;
                    placementArray[parseInt(e.target.parentNode.getAttribute("pos")) + 1][parseInt(e.target.getAttribute("pos"))] = 0;
                })
            
            }
            left.addEventListener("click" , (a) => {

                if(a.target.parentNode.parentNode.classList.contains("slide-top")||
                
                a.target.parentNode.parentNode.classList.contains("slide-right"))
                a.target.parentNode.parentNode.classList.remove("slide-top","slide-right");

                a.target.parentNode.parentNode.classList.add("slide-left");


            })
            top.addEventListener("click" , (a) => {
                if(a.target.parentNode.parentNode.classList.contains("slide-left")||
    
                a.target.parentNode.parentNode.classList.contains("slide-right"))
                a.target.parentNode.parentNode.classList.remove("slide-left","slide-right");

                a.target.parentNode.parentNode.classList.add("slide-top");
            })
            right.addEventListener("click" , (a) => {

                if(a.target.parentNode.parentNode.classList.contains("slide-left")||
                
                a.target.parentNode.parentNode.classList.contains("slide-top"))
                a.target.parentNode.parentNode.classList.remove("slide-left","slide-top");

                a.target.parentNode.parentNode.classList.add("slide-right");
            })

        }
    }, false);
     
});