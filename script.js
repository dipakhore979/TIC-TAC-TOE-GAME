let boxes=document.querySelectorAll(".box")
let resetbtn=document.querySelector(".reset-btn")
let msgcontainer=document.querySelector(".msg-container")
let msg=document.querySelector("#msg")
let newbtn=document.querySelector("#new-btn")
let ifx=document.querySelector("#ifx")
let ifo=document.querySelector("#ifo")
let choose=document.querySelector(".choose")
let h12=document.querySelector(".h12")

let turnX=null;
for(let box of boxes){
    box.disabled=true;
}
ifx.addEventListener("click",()=>{
    turnX=true
    choose.classList.add("hide2")
    h12.classList.add("hide2")
    enabledbox()
})

ifo.addEventListener("click",()=>{
    turnX=false
    choose.classList.add("hide2")
    h12.classList.add("hide2")
    enabledbox()
})


const winpattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was called")
        if(turnX){
            box.innerText=ifx.innerText;
            turnX=false;
            box.style.color="blue"
        }
        else{
            box.innerText=ifo.innerText;
            turnX=true;
            box.style.color="red"
        }
        box.disabled=true
        checkwinner()
    })
})

const showwinner=(winner,pattern)=>{
    msg.innerText=`congratulations winner is ${winner}`;
    msg.classList.remove("hide")

    pattern.forEach((index)=>{
        boxes[index].style.backgroundColor="lightgreen"
    })
}

const checkwinner=()=>{
    let winnerfound=false;
    for(let pattern of winpattern){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;
        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val===pos2val && pos2val===pos3val){
                console.log("winner",pos1val)
                winnerfound=true;
                disabledbox2();
                msgcontainer.classList.remove("hide2")
                showwinner(pos1val,pattern);
                winnerfound=true
                break;

            }

        }

    }
    if(!winnerfound){
        let allfiled=true;
        boxes.forEach((box)=>{
            if(box.innerText===""){
                allfiled=false;
            }
        })
        if(allfiled){
            disabledbox2();
            msgcontainer.classList.remove("hide2");
                showwinner2();
        }
    }
}

const showwinner2=()=>{
    msg.innerText=`Oh No! Game is tie`;
    msg.classList.remove("hide")
}
const disabledbox2=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const disabledbox=()=>{
    for(let box of boxes){
        box.innerText=""
        box.disabled=true;
        box.style.backgroundColor="#ffffc7"
    }
}

const enabledbox=()=>{
    for(let box of boxes){
        box.innerText=""
        box.disabled=false;
        box.style.backgroundColor="#ffffc7"
    }
}

const resetbox=()=>{
    turnX=true
    disabledbox()
    msg.classList.add("hide")
    msgcontainer.classList.add("hide2")
    h12.classList.remove("hide2")
    choose.classList.remove("hide2")
}

resetbtn.addEventListener("click",resetbox)
newbtn.addEventListener("click",resetbox)
