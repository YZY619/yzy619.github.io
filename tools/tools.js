fetch("tools.json").then(q=>q.json()).then(e=>{
    let inner = "";
    e.forEach(element => {
        inner+=`
            <toolCard onclick="location.href = '${element.file}#noanim'" tool="${element.tool}" description="${element.description}" icon="${element.icon}"></toolCard>
        `;
    });
    document.querySelector(".toolsCont").innerHTML = inner;
    reloadAllComps();
})