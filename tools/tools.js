fetch("tools.json").then(q=>q.json()).then(e=>{
    let inner = "";
    e.forEach(element => {
        inner+=`
            <card onclick="location.href = '${element.file}#noanim'" tool="${element.tool}" description="${element.description}" icon="${element.icon}"></card>
        `;
    });
    document.querySelector(".toolsCont").innerHTML = inner;
    reloadAllComps();
})