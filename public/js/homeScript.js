
let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

window.addEventListener("DOMContentLoaded" , () => {

    let userId;

    if(document.getElementById("check_visibility"))
        document.getElementById("check_visibility").addEventListener("click",changeVisibility);

    fetch("/user", {
        method: 'get',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            'X-CSRF-TOKEN': token
        }
    }).then(function(response){

        return response.json();
        
    }).then(function(res){

        userId = res.id;

        localStorage.setItem("id" , userId);

    });

    
    if(document.getElementById("wall"))
        document.getElementById("wall").addEventListener("click" , () => {
            localStorage.setItem("id",document.getElementById("wall").attributes.text.value);
            window.location.href = "/wall";
        })

    if(document.getElementById("mywall-con"))
        document.getElementById("mywall-con").addEventListener("click" , () => {
            localStorage.setItem("id",userId);
            window.location.href = "/wall";
        })
    
    if(localStorage.getItem("scroll-amount"))
        document.getElementById("main-feed").scrollTop = localStorage.getItem("scroll-amount");
    

    document.getElementById("search-button").addEventListener("click", () => {
        if(document.getElementById("search-con").style.display === "none"){
            document.getElementById("search-con").style.display = "block";
            document.querySelector("#search-button > i").classList.remove("fa-search");
            document.querySelector("#search-button > i").classList.add("fa-times");
        }else{
            document.getElementById("search-con").style.display = "none";
            document.querySelector("#search-button > i").classList.remove("fa-times");
            document.querySelector("#search-button > i").classList.add("fa-search");
        }

    });

    if(document.getElementById("show-more"))
        document.getElementById("show-more").addEventListener("click",showOnScroll);

    if(document.getElementById("edit-wall"))
        document.getElementById("edit-wall").addEventListener("click" , () => {

            fetch("/fetchwall", {
                method: 'post',
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                    'X-CSRF-TOKEN': token
                },
                body: JSON.stringify({
                    'user' : localStorage.getItem('id')
                })
            }).then(function(response){
        
                return response.json();
                    
            }).then(function(res){
        
                let obj = JSON.parse(res["wall"]);
                localStorage.setItem("cards",JSON.stringify(obj));
                window.location.href = "/edit";

            })
    
        })
});

function showOnScroll(){

    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    localStorage.setItem("scroll-amount",document.getElementById("main-feed").scrollTop);

    if(document.getElementById("main-feed").scrollTop < document.getElementById("main-feed").scrollHeight){
        
        let url = localStorage.getItem("url") ? "/" + localStorage.getItem("url") : "/showmore/month";

        fetch(url, {
            method: 'get',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRF-TOKEN': token
            },
        }).then(function(response){
    
            return response.json();
                
        }).then(function(res){
    
            localStorage.setItem("url",res[0].next_page_url);

            for (let i = 0; i < res[0].data.length; i++){

                let obj = res[0].data[i];
                post = document.createElement("div");
                post.setAttribute("id","post");

                postCreator = document.createElement("div");
                postCreator.setAttribute("id","post-creator");

                creatorImage = document.createElement("div");
                creatorImage.setAttribute("id","creator-image");

                image = document.createElement("img");
                image.setAttribute("src","/" + obj.user.image);

                creatorImage.appendChild(image);

                postCreator.appendChild(creatorImage);
                postCreator.textContent = obj['user']['name'];

                post.appendChild(postCreator);

                postContent = document.createElement("div");
                postContent.setAttribute("id","post-content");
                postContent.textContent = obj['content'];

                post.appendChild(postContent);

                postInteract = document.createElement("div");
                postInteract.setAttribute("id","post-interact");

                like = document.createElement("div");
                like.setAttribute("id","like");

                let button = document.createElement("button");
                button.setAttribute("class","post-interact-button");
                button.setAttribute("id","like-button");
                button.setAttribute("value","not-liked");
                icon.addEventListener("click" ,(e) => like(e,obj.id,obj.user.id ));
                //button.setAttribute("onClick","like(this," + obj.id + obj.user.id + ")");

                icon = document.createElement("i");
                icon.setAttribute("class","far fa-heart");
                
                button.appendChild(icon);

                for (let j = 0; j < res[1].length; j++){
                    if(res[1]['post_id'] === obj['id']){
                        button.value = "liked";
                        icon.classList.remove("far");
                        icon.classList.add("fas");
                        break;
                    }
                }

                like.appendChild(button);


                postInteract.appendChild(like);

                postLikes = document.createElement("div");
                postLikes.setAttribute("id","post-likes");
                postLikes.textContent = obj['likes'];

                postInteract.appendChild(postLikes );

                comment = document.createElement("div");
                comment.setAttribute("id","comment");
                
                button = document.createElement("button");
                button.setAttribute("class","post-interact-button");
                button.setAttribute("id","comment-button");
                button.setAttribute("value","not-comment");

                icon = document.createElement("i");
                icon.setAttribute("class","far fa-comment");

                button.appendChild(icon);

                comment.appendChild(button);

                postInteract.appendChild(comment);

                postComments = document.createElement("div");
                postComments.setAttribute("id","post-comments");
                postComments.textContent = "0";

                postInteract.appendChild(postComments);

                post.appendChild(postInteract);

                hr = document.createElement("hr");

                post.appendChild(hr);

                let nodeCopy = post.cloneNode(true);
                document.getElementById("main-feed").insertBefore(nodeCopy,document.getElementById("show-more"));
            };
        });
    }
}
function like(e,postId,userId){

    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    let node = e.parentNode.nextElementSibling;
    let liked = false;

    if(e.value === "not-liked"){

        liked = true;
        e.children[0].classList.remove("far");
        e.children[0].classList.add("fas");
        node.textContent = parseInt(node.textContent) + 1;

        Echo.private('activity.' + userId)
            .listen('ActivityLogged', (e) => {

                if(e.id != userId){
                    let d  = document.createElement("div");
                    d.innerText = e.res;

                if(document.getElementById("activity-feed").firstChild)
                    document.getElementById("activity-feed").insertBefore(d,document.getElementById("activity-feed").firstChild);
                else
                    document.getElementById("activity-feed").appendChild(d);

                }
             });
    }
    else{
        liked = false;
        node.textContent = parseInt(node.textContent) - 1;
        e.children[0].classList.remove("fas");
        e.children[0].classList.add("far");
    }

    fetch("/like", {
        method: 'post',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify({
            'liked': liked,
            'id':postId
        })
    }).then(function(response){

        return response.json();
            
    }).then(function(res){
        if(liked) e.value = "liked";
        else e.value = "not-liked";
    });

}

function changeVisibility(e){

    let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch("/visibility", {
        method: 'post',
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify({
            'checked': e.target.checked,
        })
    }).then(function(response){

        return response.json();
            
    }).then(function(res){
        
        if(res.true)
            document.getElementById("visibility").textContent = "Public";
        else
            document.getElementById("visibility").textContent = "Private";

    });
    
 }