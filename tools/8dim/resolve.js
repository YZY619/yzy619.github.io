document.querySelectorAll('*').forEach(element=>{
    element.setAttribute("draggable","false");
    if(!element.hasAttribute("essential")){
        element.style.setProperty("animation-duration","0ms","important");
        element.style.setProperty("animation-delay","0ms","important");
    }
});
const dgts = "0123456789abcdef";
const colors={
    "Ti":"#a8d8ff",
    "Te":"#68a8ff",
    "Fi":"#caffc8",
    "Fe":"#62ff48",
    "Ni":"#ffffac",
    "Ne":"#f7c740",
    "Si":"#ffc9c8",
    "Se":"#ff5b98"
};
clear();
try{
    window.userSelections = JSON.parse(sessionStorage.getItem("8DIMPERSONALITY.RESULT"));
    window.ver = sessionStorage.getItem("8DIMPERSONALITY.VERSION");
    window.tme = sessionStorage.getItem("8DIMPERSONALITY.FINISH");
    render();
}catch(err){
    document.querySelector(".article").innerHTML+=`<span style="color: #ff0000">[Error] No recent data found! Please upload your <strong>.8dim</strong> data file.</span>`
}
function render(){
    const normalize = (x)=>{
        const table = [-1,-0.6,0,0.6,1];
        return table[x];
    };
    let Qcnt = Object.keys(userSelections).length/8;
    functionsBase = ["T","F","S","N"]
    functionsAttr = ["i","e"]
    result = {}
    let unit = 1/Qcnt;
    functionsBase.forEach(fb => {
        functionsAttr.forEach( fa=>{
            let functionN = fb+fa;
            let restmp = 0;
            for(let i = 0;i<10;i++){//positives
                choice = normalize(userSelections[`${functionN}+${i}`]);
                restmp += choice*unit;
            }
            for(let i = 0;i<2;i++){//negatives
                choice = -normalize(userSelections[`${functionN}-${i}`]);
                restmp += choice*unit;
            }
            let s2 = 0;
            for(let i = 0;i<10;i++){//positives
                choice = normalize(userSelections[`${functionN}+${i}`]);
                s2+=(choice-restmp )**2;
            }
            for(let i = 0;i<2;i++){//negatives
                choice = -normalize(userSelections[`${functionN}-${i}`]);
                s2+=(choice-restmp )**2;
            }
            s2/=Qcnt;
            result[functionN] = {
                avg: restmp,
                s2 : s2
            };
        });
    });
    document.querySelector("#ver").innerHTML = ver;
    document.querySelector("#tme").innerHTML = tme;

    Object.keys(result).forEach(res=>{
        document.querySelector("#result").innerHTML+=`
            <div class="func">
                <span style="display:   inline-block; color:rgb(${Math.floor(result[res].s2*250)},0,0);">
                    ${res}: ${round(result[res]. avg)}(-1~1), Variance(s²): ${round(result[res].s2)}
                </span>
                <div style="--colFg:${colors[res]};   --colBd:#ff8888;" class="bar" >
                    <div class="cursor" style="--val:${result[res].avg}"></div>
                </div>
            </div>`;
    })

    let order = Object.keys(result).sort((a,b)=>{
        return (result[a].avg<result[b].avg)*2-1;
    });
    let odr = "";
    odr += addColor(order[0].toString(),order[0]);
    for(let i = 1;i<8;i++){
        if(round(result[order[i]].avg)===round(result[order[i-1]].avg)){
            odr += "=";
        }else{
            odr += ">";
        }odr += addColor(order[i].toString(),order[i]);
    }
    window.myFuncOrder = odr;
    document.querySelector("#cfs").innerHTML+=`<span style="font-size:1em; font-weight:800;">Your Cognitive Function Stack:${odr} </span>`;;
    function round(x, len=2){
        let str = x.toString();
        if(!str.includes(".")){
            str+="."
        }
        str += "".padEnd(len,'0');
        if(str.charAt(0)!=="-"){
            str = "+"+str;
        }
        return str.slice(0,str.indexOf(".")+len+1);
    }
}
function revertDgt(dgt){
    return dgts.charAt(15-parseInt("0x"+dgt,16));
}
function addColor(str, col_){
    return  `<span style="color:${colors[col_]}; text-shadow: 0px 0px 2px #${revertCol(colors   [col_])};">${str}</span>`;
}
function revertCol(color){
    color = color.slice(1);
    let ret = ""
    for(let i = 0;i<6;i++){
        ret += revertDgt(color[i]);
    }
    return ret;
}
function save(){
    const asciiData = btoa(JSON.stringify(({
        result: JSON.parse(sessionStorage.getItem("8DIMPERSONALITY.RESULT")),
        finish: sessionStorage.getItem("8DIMPERSONALITY.FINISH"),
        version: sessionStorage.getItem("8DIMPERSONALITY.VERSION")
    })));
    const blob = new Blob([asciiData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `testresult__${sessionStorage.getItem("8DIMPERSONALITY.FINISH")}.8dim`;
    a.click();
    URL.revokeObjectURL(url);
}
function genLine(e){
    let tmp = "";
    cfs[e].forEach((fu,id)=>{
        if(id!=0)tmp+=">";
        tmp+=addColor(fu,fu);
    });
    const rev={
        "e":"i",
        "i":"e"
    };
    cfs[e].forEach((fu,id)=>{
        let fu_ = fu[0]+rev[fu.charAt(1)]
        tmp+=">";
        tmp+=addColor(fu_,fu_);
    });
    return tmp;
}

function genTable(){ 
    let ret = "";
    q = Object.keys(cfs);
    q.forEach(e=>{
        ret+=`<div style="width:max-content;font-size:1em;line-height:1.5;" onclick="diff('${e}');">${e}: ${genLine(e)}</div>`;
    });
    return ret;
}
function diff(e){
    if(Object.keys(window).includes("myFuncOrder")){
        document.querySelector("#op").innerHTML = e;
        document.querySelector("#yfunc").innerHTML = myFuncOrder;
        document.querySelector("#ofunc").innerHTML = genLine(e);
    }
}
function clear(){
    document.querySelector(".article").innerHTML=`
    <strong>8-DIMENSIONAL PERSONALITY TEST</strong>
    <div class="functionalCont"><button class="functionalBtn" onclick="selectFile();">Load data from file</button><button class="functionalBtn" onclick="save();">Save data to file</button></div>
    <div>Assession Version:&nbsp;<span id="ver"></span></div>
    <div>Submit Time:&nbsp;<span id="tme"></span></div>
    <div id="result">
    </div>
    <div id="cfs">
    </div>
    <div><p>We do not recommend directly mapping your eight-dimension assessment results onto conventional four-letter personality typologies, as doing so would sacrifice substantial information and may not correspond accurately. Nevertheless, we provide the following reference table to help you understand how your profile relates to—and differs from—the cognitive function frameworks associated with traditional personality types.</p>
    <div id="tableCont">
    <div>
    ${genTable()}
    </div>
    <div id="differ">
        <div>
        <div class="comparison">Comparison</div>
        (Click on a personality type)
        <div style="text-align:center;font-size:1em;">You&nbsp;vs.&nbsp;<span id="op">????</span></div>
        <br>
        <div style="text-align:center;font-size:1em;" id="yfunc"></div>
        <br>
        <div style="text-align:center;font-size:1em;" id="ofunc"></div>
        </div>
    </div>
    </div>
    <p>This reference table is provided for educational and self-reflective purposes only. Our assessment is an independent instrument and is not affiliated with or endorsed by any official providers of traditional four-letter personality assessments.</p></div>
    `;
}
async function selectFile(){
    const fileSelector = document.querySelector("#load");
    fileSelector.click();
    fileSelector.addEventListener('change',async (e)=>{
        let content = (Array.from(e.target.files)[0]);
        let text = JSON.parse(atob(await content.text()));
        load(text);
    });
}
function load(data){
    window.userSelections = data.result;
    window.ver = data.version;
    window.tme = data.finish;
    clear();render();
}