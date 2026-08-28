async function UpdateArticles(){
    let articleList = document.querySelector(".article");
    json = await fetch("./postsList.json").then(response=>response.json());
    json.reverse();
    json.forEach(article => {
        articleList.innerHTML+=`<div class="articleEntrance" essential onclick = "viewArticle(${article["id"]})"><span class="articleTitle">${article["title"]}</span><span class="articlePreview">${article["abstract"]}...<br><span class = "black">click to view details</span></span><span class="articleInfo">${article["author"]}<br>${article["time"]}</span></div>`;
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
    document.body.style.setProperty("overflow-y","hidden");
    document.querySelector("#forCover").innerHTML = `<div class="cover" onclick="closepopup()"></div>`;
    document.querySelector("#forArticle").innerHTML = `<div class="articleDetail"><div class="center">[tap on the background to exit view mode.]</div></div>`;
    document.querySelector(".articleDetail").innerHTML+="<h2>"+title+"</h2><div class='infos'><strong class='auth'>"+author+"</strong><strong class='time'>"+time+"</strong></div><hr>";
    detailsList = details.split("\n");
    detailsList.forEach(para=>{
        document.querySelector(".articleDetail").innerHTML+="<p>"+para+"</p>"
    })
}
function closepopup(){
    document.body.style.removeProperty("overflow-y");
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