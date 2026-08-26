document.querySelectorAll('*').forEach(element=>{
    element.setAttribute("draggable","false");
    if(!element.hasAttribute("essential")){
        element.style.setProperty("animation-duration","0ms","important");
        element.style.setProperty("animation-delay","0ms","important");
    }
})
function getQuestionElem( questions, options){
    let ret = "";
    let questionCounter = 0;
    questions.forEach((question,id)=>{
        ret+=`
            <div class="question">
                <strong>[${id+1}/${questions.length}]</strong><br> ${question}
                <div class="options">
                    <div onclick="select(${questionCounter},0)" class="cont"><div class="C C1">√</div><br>${options[0]}</div>
                    <div onclick="select(${questionCounter},1)" class="cont"><div class="C C2">√</div><br>${options[1]}</div>
                    <div onclick="select(${questionCounter},2)" class="cont"><div class="C C3">√</div><br>${options[2]}</div>
                    <div onclick="select(${questionCounter},3)" class="cont"><div class="C C4">√</div><br>${options[3]}</div>
                    <div onclick="select(${questionCounter},4)" class="cont"><div class="C C5">√</div><br>${options[4]}</div>
                </div>
            </div>
        `;
        questionCounter++;
    });
    return ret;
}
function shuffle(arr){
    let ret = [];
    while(arr.length){
        let pos = Math.floor(arr.length*Math.random());
        ret.push(arr[pos]);
        arr=arr.filter((_,id)=>{return id!==pos});
    }
    return ret;
}
async function addQuestions(lang){
    let dataFilePath = `data/8dim-${lang}.json`;
    window.json = await fetch(dataFilePath).then(e=>e.json());
    if(json.language !== lang){
        throw new Error("Authorization Failed: Invalid 'language' Field.");
    }
    document.querySelector("#ver").innerHTML = json.version.toString();
    let allQuestions = [];
    let mapQuestions = {};
    json.questions.forEach(section => {
        let sectionId = section.section;
        allQuestions.push(...section.positives);
        allQuestions.push(...section.negatives);
        section.positives.forEach((question,id)=>{
            mapQuestions[question] = `${sectionId}+${id}`
        });
        section.negatives.forEach((question,id)=>{
            mapQuestions[question] = `${sectionId}-${id}`
        });
    });
    window.questions = shuffle(allQuestions);
    document.querySelector(".article").innerHTML += getQuestionElem(questions, json.options);
    window.mapping = mapQuestions;
    document.querySelector(".article").innerHTML +=`<br><button onclick="submit();" id="submit" class="functionalBtn">${json.submit}</button>`
}
var userSelections = {}
function select(question, option){
    let qu = document.querySelectorAll(".question")[question];
    qu.style.filter = "saturate(30%) opacity(0.2)";
    try{
        if(!Object.keys(userSelections).includes(mapping[window.questions[question]])){
            if(question>=2){
                let quPre = document.querySelectorAll(".question")[question-2];
                quPre.id = btoa(mapping[window.questions[question-2]]);
                location.href = `#${quPre.id}`;
            }else if(question==1){
                location.href = `#ver`;
            }
        }
    }catch(error){}
    let op = qu.querySelectorAll(".C")[option];
    qu.querySelectorAll(".C").forEach(e=>{
        e.classList.remove("CC");
    })
    op.classList.add("CC");
    userSelections[mapping[window.questions[question]]] = option;
}
addQuestions(window.lang);
function handleBeforeUnload(e) {
    e.preventDefault();
    e.returnValue = '';
}
window.addEventListener("beforeunload", handleBeforeUnload);
function recoverBtn(){
    document.querySelector("#submit").innerHTML = json.submit;
    document.querySelector("#submit").style.removeProperty("background-color");
}
function submit(){
    if(Object.keys(userSelections).length<questions.length){
        document.querySelector("#submit").innerHTML = json.unfinished;
        document.querySelector("#submit").style.setProperty("background-color","#ff0000");
        setTimeout(recoverBtn, 2000);
        return;
    }
    sessionStorage.setItem("8DIMPERSONALITY.VERSION", json.version);
    sessionStorage.setItem("8DIMPERSONALITY.FINISH", new Date().toLocaleString());
    sessionStorage.setItem("8DIMPERSONALITY.RESULT", JSON.stringify(userSelections));
    window.removeEventListener("beforeunload", handleBeforeUnload);
    location.href = 'result.html#noanim';
}