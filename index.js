if(location.href.includes("#noanim")){
    document.querySelectorAll('*').forEach(element=>{
        element.setAttribute("draggable","false");
        if(!element.hasAttribute("essential")){
            element.style.setProperty("animation-duration","0ms","important");
            element.style.setProperty("animation-delay","0ms","important");
        }
    })
}
currentScrollTarget = 0;
document.body.addEventListener("wheel",event=>{
    if(document.body.style.top==""){
        document.body.style.top="0px";
    }
    currentScrollTarget = Math.max(-parseFloat(getComputedStyle(document.body).height.slice(0,-2))+innerHeight,Math.min(0,parseFloat(document.body.style.top.slice(0,-2))-event.deltaY));
});
function tick(){
    let current = parseFloat(document.body.style.top.slice(0,-2));
    if(Math.abs(current-currentScrollTarget)<1e-1){
        currentScrollTarget=current;
    }
    let tickTo = (0.93*current+0.07*currentScrollTarget);
    document.body.style.top=tickTo.toString()+'px';
    requestAnimationFrame(tick);
}
setTimeout(tick,1000);