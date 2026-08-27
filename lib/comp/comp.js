window.afterUpdComp = [];

class Components{
    static register = (comp)=>{
        const compData = new comp();
        document.querySelectorAll(compData.tag).forEach(e=>{
            let tmp = {};
            Object.keys(e.attributes).forEach(attribute=>{
                tmp[e.attributes[attribute].name]=e.attributes[attribute].value;
            });
            e.innerHTML=compData.make(tmp);
        });
        window.afterUpdComp.forEach(f=>{
            f();
        })
    }
    constructor(){
        return {
            tag: this.constructor.name,
            make: this.make
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

initialize();