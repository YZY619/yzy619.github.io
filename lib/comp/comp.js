window.afterUpdComp = [];
window.allComps = [];
class Components{
    static register = (comp, eventHandlers=[])=>{
        window.allComps.push(comp);
        const compData = new comp();
        document.querySelectorAll(compData.tag).forEach(e=>{
            let tmp = {};
            Object.keys(e.attributes).forEach(attribute=>{
                tmp[e.attributes[attribute].name]=e.attributes[attribute].value;
            });
            tmp["innerHTML"] = e.innerHTML;
            tmp["reload"] = false;
            e.innerHTML=compData.make(tmp);
            eventHandlers.forEach(hand=>{
                e.addEventListener(hand["event"], hand["func"]);
            });
        });
        window.afterUpdComp.forEach(f=>{
            f();
        });
    }
    static reload = (comp)=>{
        const compData = new comp();
        document.querySelectorAll(compData.tag).forEach(e=>{
            let tmp = {};
            Object.keys(e.attributes).forEach(attribute=>{
                tmp[e.attributes[attribute].name]=e.attributes[attribute].value;
            });
            tmp["innerHTML"] = e.innerHTML;
            tmp["reload"] = true;
            e.innerHTML=compData.make(tmp);
        });
    }
    constructor(){
        return {
            tag: this.constructor.name,
            make: this.make,
            eventHandlers: []
        };
    }
    
}

async function initialize(){
    let extractedComponentList = await (await fetch('/lib/comp/components/index.json')).json();
    extractedComponentList["files"].forEach(file => {
        let node = document.createElement('script');
        node.src = '/lib/comp/components/'+file;
        document.head.appendChild(node);
    });
}
function reloadAllComps(){
    window.allComps.forEach(e=>{e.reload();});
}
initialize();