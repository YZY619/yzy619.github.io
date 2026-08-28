class toolCard extends Components{
    static{Components.register(toolCard);}
    make(props){
        return `
            <i class="fa ${props["icon"]} toolIcon"></i>
            <div>
                <strong>${props["tool"]}</strong>
                <div style="max-width:100%;word-wrap:normal;overflow-x:hidden;">${props["description"]}</div>
            </div>
        `
    }
}