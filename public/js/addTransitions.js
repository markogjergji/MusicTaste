let token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

window.addEventListener('DOMContentLoaded', () => {

    let obj = JSON.parse(localStorage.getItem('cards'));

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

    let d = document.createElement("div");
    d.setAttribute( "id","save");
    
    let a = document.createElement("a");
    a.innerText = "Save your wall";

    let i = document.createElement("i");
    i.setAttribute( "class","fas fa-share");
    
    a.appendChild(i);
    d.appendChild(a);
    document.querySelector("body").appendChild(d);

    d.addEventListener("click" , () => {

        let o = goNext();
        
        fetch("/savewall", {
            method: 'post',
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-Requested-With": "XMLHttpRequest",
                'X-CSRF-TOKEN': token
            },
            body: JSON.stringify({
                'wall': o,
                'user' : localStorage.getItem('id')
            })
        }).then(function(response){

            return response.json();
                
        }).then(function(res){

            window.location.href = "/wall";
        })
    })

    function goNext(){
        
        let title = document.querySelector("#welcome-text");

        let t = document.createElement("div");
        t.setAttribute("id","welcome-text");
        t.setAttribute("text",title.value);
        document.querySelector("#welcome-text-con").removeChild(title);
        document.querySelector("#welcome-text-con").appendChild(t);
        let titles = document.querySelectorAll("span");

        titles.forEach(e => {

            e.setAttribute("text",e.textContent);

        });

        let obj = stringify(document.getElementById("main-page-container"));
    
        return obj;
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


    let cardItems = document.getElementById("cards").childNodes;

    let inputColor = document.createElement("input");
    inputColor.setAttribute("type","color");

    let cloned;

    let texts = document.querySelectorAll(".title-placement-text");


    cardItems.forEach(e => {
        
        cloned = inputColor.cloneNode(true);
        cloned.setAttribute("value" ,"#5FD7DE");
        e.appendChild(cloned);

    }); 

    cloned = inputColor.cloneNode(true);
    cloned.setAttribute("value" ,"#14BE50");
    document.querySelector("#welcome-title").appendChild(cloned);


    texts.forEach(e => {
        
        cloned = inputColor.cloneNode(true);
        e.appendChild(cloned);
        
    }); 

    let colors = document.querySelectorAll("input[type=color]");

    let color = "black";

    colors.forEach(e => {
        e.addEventListener("input", () => {
            
            if(!e.parentNode.classList.contains("title-placement-text"))
                e.parentNode.style.backgroundColor = e.value;
            else{
                color = e.value;
                e.parentNode.style.webkitTextStroke = "1px " + color;
                
            }
          
          });
    });

    
    let textTmp;

    texts.forEach(elem => {

        textTmp = elem.parentNode.attributes.text.value;
        
        let d = document.createElement("div");
        d.setAttribute( "class","marquee marquee-delay");
        

        let c = d.cloneNode(true);

        for(let i = 0; i < textTmp.length ; i++){

            let span = document.createElement('span');
            span.innerText = textTmp[i];
            span.style.color = "transparent";

            c.appendChild(span);
            elem.appendChild(c);
        }

        let f = c.cloneNode(true);
        f.setAttribute( "class","marquee marquee2");
        
        let h =  c.cloneNode(true);
        h.setAttribute( "class","marquee marquee3");

        elem.appendChild(f);
        elem.appendChild(h);

        let spans0 =  Array.from(elem.getElementsByTagName("div")[0].children);
        let spans1 =  Array.from(elem.getElementsByTagName("div")[1].children);
        let spans2 =  Array.from(elem.getElementsByTagName("div")[2].children);

        for(let i = 0; i < spans0.length ; i++){
            spans0[i].addEventListener("click" , e => changeLetter(e,i,elem));
            spans1[i].addEventListener("click" , e => changeLetter(e,i,elem));
            spans2[i].addEventListener("click" , e => changeLetter(e,i,elem));
        }
        //setTimeout(function(){ Array.from(document.getElementsByClassName("marquee-delay")).forEach(e => e.style.animationDelay = 0)}, 10000);
    });

    function changeLetter(e,i,elem){
        e.preventDefault();
        e.stopImmediatePropagation();

        if(e.target.style.color == "transparent"){
            elem.getElementsByTagName("div")[0].children[i].style.color = color;
            elem.getElementsByTagName("div")[1].children[i].style.color = color;
            elem.getElementsByTagName("div")[2].children[i].style.color = color;
        }
        else{
            elem.getElementsByTagName("div")[1].children[i].style.color = "transparent";
            elem.getElementsByTagName("div")[2].children[i].style.color = "transparent";
            elem.getElementsByTagName("div")[0].children[i].style.color = "transparent";
        }
    }

});