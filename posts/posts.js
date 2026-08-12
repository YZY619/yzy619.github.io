async function UpdateArticles(){
    let articleList = document.querySelector(".article");
    json = await fetch("./postsList.json").then(response=>response.json());
    articleList.style.setProperty("--lines",0);
    json.forEach(article => {
        articleList.style.setProperty("--lines",(parseFloat(articleList.style.getPropertyValue("--lines"))+3.5).toString());
        articleList.innerHTML+=`<div class="articleEntrance" essential><span class="articleTitle">`+article["title"]+`</span><span class="articlePreview">`+atob(article["context"]).substring(0,60)+`...</span><span class="articleInfo">`+article["author"]+"<br>"+article["time"]+`</span></div>`;
    });
    document.querySelectorAll(".articleEntrance").forEach(e=>{
        e.addEventListener("mouseover", (f)=>{
            e.querySelector(".articlePreview").classList.add("clearText")
        })
        e.addEventListener("mouseleave", (f)=>{
            e.querySelector(".articlePreview").classList.remove("clearText")
        })
    })
}
UpdateArticles();

