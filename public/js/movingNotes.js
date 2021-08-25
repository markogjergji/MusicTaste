window.addEventListener("DOMContentLoaded" , () => {
    
    var style = document.createElement('style');
    style.type = 'text/css';

    let x = document.querySelectorAll(".note-amination");

    let t = document.getElementById("notes");

    let tmp;

    x.forEach(e => {
        
        for(let i = 0; i < 20 ; i++){
            tmp = e.cloneNode(true);
            tmp.style.left = Math.floor(Math.random() * window.innerWidth) + 'px';
            tmp.style.animationDelay = (Math.floor(Math.random() * 3)) + 's';
            tmp.style.animationDuration = (2000 + Math.floor(Math.random() * 20) * 100) + 'ms';
            t.appendChild(tmp);
        }

    })

})
