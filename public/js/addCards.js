window.addEventListener('DOMContentLoaded', () => {

    const container = document.getElementById("cards");

    //Create an array to check if a card has been placed in the grid cell
    let placementArray = new Array();

    let positionArray = new Array();
    let postionId = 0;

    //Create a title row and a normal row
    addTitleRow();
    makeRows();


    function makeRows() {

        let row = document.createElement("div");
        row.setAttribute("class","single-placement-row");
        row.setAttribute("pos",placementArray.length);

        placementArray.push(new Array(4).fill(0));

        positionArray.push(new Array(4).fill(-1));

        let addSign = document.createElement("div");
        addSign.id="add-sign";
        addSign.textContent = "+";
        addSign.setAttribute("class","add-card-sign");
        addSign.addEventListener("click",(e) => addCard(e));

        /* let rowColor = document.createElement("input");

        rowColor.setAttribute("class","row-color");

        rowColor.setAttribute("type","color");
        rowColor.setAttribute("colorpick-eyedropper-active","false"); */
        
        row.appendChild(addSign);
        /* row.appendChild(rowColor);

        rowColor.addEventListener("input",() => {
            row.style.backgroundColor = rowColor.value;
        })
 */
        container.appendChild(row);
        
        return row;
    };


    function addTitleRow(){

        let row = document.createElement("div");
        let textInput = document.createElement("input");
        textInput.setAttribute("type","text");
        row.setAttribute("class","title-placement-row");
        row.appendChild(textInput);
        container.appendChild(row);

    };


    function addCard(e){

        //Get the row of the + clicked
        let p =  e.target.parentNode;
     
        //Create a small grid cell
        let c = document.createElement("div");
        c.className = "dropzone";
        c.className += " grid-item";

        //Set the position as the total number of cells in the row - 1 (to start from 0)
        c.setAttribute("pos",e.target.parentNode.childElementCount - 1);

        //Insert the cell before the +
        p.insertBefore(c,e.target);

        //Remove the + when 4 cells are created
        if(e.target.parentNode.childElementCount === 5)
            p.removeChild(e.target);
            

            //count = placementArray[e.target.parentNode.childElementCount].filter(x => x == 1).length;
            /* for(let i = 0 ; i < placementArray[parseInt(e.target.parentNode.getAttribute("pos"))].length ; i++){
                if(placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][i] === 0){
                placementArray[parseInt(e.target.parentNode.getAttribute("pos"))][i] = 1;
                break;
            }
            } */

    };

    function addBigCard(element){

        let c = document.createElement("div");
        c.className = "dropzone";
        c.className += " big-grid-item";
        element.appendChild(c);
        return c;
            
    };

    document.getElementById("addRow").addEventListener("click",() => makeRows());

    document.getElementById("addTitleRow").addEventListener("click",() => addTitleRow());



    document.getElementById("search").addEventListener("change",() => {

        let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

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
    
            console.log(res);

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
                        typeText = document.createElement("p");
                        typeText.textContent = "Songs";
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

                            let children = row.childNodes;

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
                        break;

                    case 1:
                        type = document.createElement("div");
                        typeText = document.createElement("p");
                        typeText.textContent = "Albums";
                        type.appendChild(typeText);
                        
                        document.getElementById("search-container").appendChild(type);

                        for (let key in obj["albums"]["items"]){

                            cover = document.createElement("div");
                            coverLink = document.createElement("a");
                            coverImage = document.createElement("img");

                            coverImage.setAttribute("src",obj["albums"]["items"][key]["images"][0]["url"])

                            coverLink.setAttribute("href",obj["albums"]["items"][key]["external_urls"]["spotify"])
                            coverLink.appendChild(coverImage);
                            cover.appendChild(coverLink);

                            title = document.createElement("div");
                            titleLink = document.createElement("a");
                            titleLink.setAttribute("href",obj["albums"]["items"][key]["external_urls"]["spotify"]);
                            titleLink.textContent = obj["albums"]["items"][key]["name"];
                            title.appendChild(titleLink);

                            artist = document.createElement("div");
                            artistText = document.createElement("a");
                            artistText.textContent = obj["albums"]["items"][key]["artists"][0]["name"];
                            artistText.setAttribute("href",obj["albums"]["items"][key]["artists"][0]["external_urls"]["spotify"]);
                            artist.appendChild(artistText);

                            row = document.createElement("div");
                            row.appendChild(cover);
                            row.appendChild(title);
                            row.appendChild(artist);

                            document.getElementById("search-container").appendChild(row);
                        
                        }
                        break;

                    case 2:
                        type = document.createElement("div");
                        typeText = document.createElement("p");
                        typeText.textContent = "Artists";
                        type.appendChild(typeText);                        
                    
                        document.getElementById("search-container").appendChild(type);

                        for (let key in obj["artists"]["items"]){

                            cover = document.createElement("div");
                            coverLink = document.createElement("a");
                            coverImage = document.createElement("img");

                            coverImage.setAttribute("src",obj["artists"]["items"][key]["images"][0]["url"])

                            coverLink.setAttribute("href",obj["artists"]["items"][key]["external_urls"]["spotify"])
                            coverLink.appendChild(coverImage);
                            cover.appendChild(coverLink);

                            title = document.createElement("div");
                            titleLink = document.createElement("a");
                            titleLink.setAttribute("href",obj["artists"]["items"][key]["external_urls"]["spotify"]);
                            titleLink.textContent = obj["artists"]["items"][key]["name"];
                            title.appendChild(titleLink);

                            row = document.createElement("div");
                            row.appendChild(cover);
                            row.appendChild(title);

                            document.getElementById("search-container").appendChild(row);
                        
                        }
                        break;

                    case 3:

                        type = document.createElement("div");
                        typeText = document.createElement("p");
                        typeText.textContent = "Playlists";
                        type.appendChild(typeText);

                        document.getElementById("search-container").appendChild(type);

                        for (let key in obj["playlists"]["items"]){

                            cover = document.createElement("div");
                            coverLink = document.createElement("a");
                            coverImage = document.createElement("img");

                            coverImage.setAttribute("src",obj["playlists"]["items"][key]["images"][0]["url"])

                            coverLink.setAttribute("href",obj["playlists"]["items"][key]["external_urls"]["spotify"])
                            coverLink.appendChild(coverImage);
                            cover.appendChild(coverLink);

                            title = document.createElement("div");
                            titleLink = document.createElement("a");
                            titleLink.setAttribute("href",obj["playlists"]["items"][key]["external_urls"]["spotify"]);
                            titleLink.textContent = obj["playlists"]["items"][key]["name"];
                            title.appendChild(titleLink);

                            user = document.createElement("div");
                            userText = document.createElement("a");
                            userText.textContent = obj["playlists"]["items"][key]["owner"]["display_name"];
                            userText.setAttribute("href",obj["playlists"]["items"][key]["owner"]["external_urls"]["spotify"]);
                            user.appendChild(userText);               

                            row = document.createElement("div");
                            row.appendChild(cover);
                            row.appendChild(title);
                            row.appendChild(user);

                            document.getElementById("search-container").appendChild(row);
                        
                        }
                    break;
                }
            }
            })
            .catch(function(error){
    
    
            });
    });

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
            remove.textContent = "X";
            nodeCopy.appendChild(remove);

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

            console.log("placement Array");
            console.log(placementArray);

        }
    }, false);
     
});