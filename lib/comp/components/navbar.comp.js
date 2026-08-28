class navbar extends Components{
    static{
        Components.register(navbar,[{"event": "resize","func" : ()=>{navbar.onresize()}}]);
        onresize = (_)=>{
            Components.reload(navbar);
        }
    }
    make(props){
        const anim = !(Object.keys(props).includes("noanim")||props["reload"]);
        const selected = props["selected"] || -1;
        return `<nav class="${(props["reload"])?"noanim":""}">
            <span ${(selected==0&&anim)?"essential":""} class="item ${(selected==0)?"selected":""} ${(props["reload"])?"noanim":""} main"><a class="btn" href="/#noanim"><div style="text-align:center">${(innerWidth>=768)?"JerryYuan19's Blog":`<i class="fa fa-home"></i><br>Home`}</div></a></span>
            <span ${(selected==1&&anim)?"essential":""} class="item ${(selected==1)?"selected":""} ${(props["reload"])?"noanim":""}"><a class="btn" href="/description.html#noanim">                     <div style="text-align:center"><i class="fa fa-code"></i><br>Description</div></a></span>
            <span ${(selected==2&&anim)?"essential":""} class="item ${(selected==2)?"selected":""} ${(props["reload"])?"noanim":""}"><a class="btn" href="/posts/#noanim">                               <div style="text-align:center"><i class="fa fa-commenting"></i><br>Posts</div></a></span>
            <span ${(selected==3&&anim)?"essential":""} class="item ${(selected==3)?"selected":""} ${(props["reload"])?"noanim":""}"><a class="btn" href="/tools/#noanim">                               <div style="text-align:center"><i class="fa fa-cubes"></i><br>Tools</div></a></span>
            <span ${(selected==4&&anim)?"essential":""} class="item ${(selected==4)?"selected":""} ${(props["reload"])?"noanim":""}"><a class="btn" href="https://github.com/YZY619/yzy619.github.io">   <div style="text-align:center"><i class="fa fa-external-link"></i><br>Github Repo</div></a></span>
        </nav>`;
    }
}