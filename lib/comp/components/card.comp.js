class card extends Components{
    static{Components.register(card);}
    make(props){
        return `
            <i class="fa ${props["icon"]} toolIcon"></i>
            <div>
                <strong>${props["tool"]||props["innerHTML"]}</strong>
                ${Object.keys(props).includes("description")?`<div style="max-width:100%;word-wrap:normal;overflow-x:hidden;">${props["description"]}</div>`:""}
            </div>
        `
    }
}