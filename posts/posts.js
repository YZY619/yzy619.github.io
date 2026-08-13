async function UpdateArticles(){
    let articleList = document.querySelector(".article");
    json = await fetch("./postsList.json").then(response=>response.json());
    articleList.style.setProperty("--lines",0);
    json.reverse();
    json.forEach(article => {
        articleList.style.setProperty("--lines",(parseFloat(articleList.style.getPropertyValue("--lines"))+3.5).toString());
        articleList.innerHTML+=`<div class="articleEntrance" essential onclick = "viewArticle(`+article["id"]+`)"><span class="articleTitle">`+article["title"]+`</span><span class="articlePreview">`+(article["details"]).substring(0,60)+`...<br><span class = "black">click to view details</span></span><span class="articleInfo">`+article["author"]+"<br>"+article["time"]+`</span></div>`;
    });
    window.articles = json;
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


function popup(title,author, time,  details){
    document.querySelector("#forCover").innerHTML = `<div class="cover" onclick="closepopup()"></div>`;
    document.querySelector("#forArticle").innerHTML = `<div class="articleDetail"><div class="center">[tap on the background to exit view mode.]</div></div>`;
    document.querySelector(".articleDetail").innerHTML+="<h2>"+title+"</h2><div class='infos'><strong class='auth'>"+author+"</strong><strong class='time'>"+time+"</strong></div><hr>";
    detailsList = details.split("\n");
    detailsList.forEach(para=>{
        document.querySelector(".articleDetail").innerHTML+="<p>"+para+"</p>"
    })
}
function closepopup(){
    document.querySelector("#forCover").innerHTML = ``;
    document.querySelector("#forArticle").innerHTML = ``;
}

function viewArticle(id){
    let json = window.articles;
    json.forEach(e=>{
        if(e["id"].toString()==id.toString()){
            popup(e["title"],e["author"],e["time"],(e["details"]))
        }
    })
}