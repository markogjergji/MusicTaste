let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

window.addEventListener('DOMContentLoaded', () => {


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

        let con = document.getElementById('main-page-container');

        appendDom(con,obj);

        function appendDom(container, obj) {
            for (var i = 0; i < obj.children.length; i++) {
                if(obj.children[i].name === "button")
                continue;
                if(obj.children[i].name === "input")
                continue;
                let tmp = document.createElement(obj.children[i].name);
                
                obj.children[i].attributes.forEach(e => {   
                    tmp.setAttribute(e.name,e.value);
                });
                
                if (obj.children[i].length != 0) {
                    appendDom(tmp, obj.children[i]);
                }
                container.append(tmp);
            }
        }

        let title = document.querySelector("#welcome-text");
        title.innerText = title.attributes.text.value;
        let titles = document.querySelectorAll("span");

        titles.forEach(e => {

            e.textContent = e.attributes.text.value;

        });
            
        localStorage.setItem("cards",JSON.stringify(obj));
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            
            return (
                elementTop + 50 <= window.innerHeight / dividend
            );
        };
        
        const scrollElements = document.querySelectorAll(".single-placed-container");
          
          
        scrollElements.forEach( el => {
    
            el.style.transitionDuration = (100 * (Math.floor(Math.random() * 8) + 4)) + "ms";
    
            let old = window.innerHeight;
            let startPosition;
    
            if(el.classList.contains("slide-left")){
                startPosition = 0;
                el.style.left = ( startPosition - 500 ) + "px";
            }
            else if(el.classList.contains("slide-right")){
                startPosition = 0;
                el.style.left = ( startPosition + 500 ) + "px";
            }
            else if(el.classList.contains("slide-top")){
                startPosition = 0;
                el.style.top = ( startPosition - 500 ) + "px";
            }
          
            window.addEventListener("wheel", (e) => {
    
                let currentScroll = window.pageYOffset;
    
                let speed = 150;
    
                if (elementInView(el)) {
    
                    if(e.deltaY === 100){
    
                        if(el.classList.contains("slide-left")){
                            if((parseFloat(el.style.left) < startPosition)){
    
                                let newPos = e.deltaY + speed + parseFloat(el.style.left) ;
        
                                el.style.left = newPos  + "px";
                            }
                        }
                        else if(el.classList.contains("slide-right")){
                            if((parseFloat(el.style.left) > startPosition)){
    
                                let newPos = parseFloat(el.style.left) - e.deltaY - speed  ;
                                
                                el.style.left = newPos  + "px";
                            }
                        }
                        else if(el.classList.contains("slide-top")){
                            if((parseFloat(el.style.top) < startPosition)){
    
                                let newPos = e.deltaY + speed + parseFloat(el.style.top) ;
        
                                el.style.top = newPos  + "px";
                            }
                        }
        
                    }              
                    old = currentScroll;
                }
            });
        })

        let d = document.createElement("div");
        d.setAttribute( "id","save");
        
        let a = document.createElement("a");
        a.innerText = "home";
        
        d.appendChild(a);
        document.querySelector("body").appendChild(d);

        d.addEventListener("click" , () => {
            window.location.href = "/home"; 
        })

    })
 })