
window.afterUpdComp = [];
window.allComps = [];
export class Components{
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

import('./components/card.comp.js');
import('./components/navbar.comp.js');
import('./components/profile.comp.js');

export function reloadAllComps(){
    window.allComps.forEach(e=>{e.reload();});
}