class navbar extends Components{
    static{Components.register(navbar);}
    make(props){
        const anim = !Object.keys(props).includes("noanim");
        const selected = props["selected"] || -1;
        return `<nav>
            <span ${(selected==0&&anim)?"essential":""} class="item ${(selected==0)?"selected":""} main"><a class="btn" href="/#noanim">JerryYuan19's Blog</a></span>
            <span ${(selected==1&&anim)?"essential":""} class="item ${(selected==1)?"selected":""}"><a class="btn" href="/description.html#noanim">Description</a></span>
            <span ${(selected==2&&anim)?"essential":""} class="item ${(selected==2)?"selected":""}"><a class="btn" href="/posts/#noanim">Posts</a></span>
            <span ${(selected==3&&anim)?"essential":""} class="item ${(selected==3)?"selected":""}"><a class="btn" href="/tools/#noanim">Tools</a></span>
            <span ${(selected==4&&anim)?"essential":""} class="item ${(selected==4)?"selected":""}"><a class="btn" href="https://github.com/YZY619/yzy619.github.io">Github Repo</a></span>
        </nav>`;
    }
}