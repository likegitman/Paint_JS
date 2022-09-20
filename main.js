const canvas=document.getElementById("jsCanvas");
const ctx=canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range=document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn=document.getElementById("jsSave");

const INITIAL_COLOR="#2c2c2c";
const CANVAS_SIZE=550
// canvas의 실제 픽셀 사이즈
canvas.width = CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;

let painting = false;
let filling=false;

// painting에 false를 넣는 함수
function stopPainting(){
    painting=false;
}

// painting에 true를 넣는 함수
function startPainting(){
    painting=true;
}

// 마우스가 움직였을 때 x와 y에 값을 넣고
function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        // path를 만들면 마우스의 x, y좌표로 path를 옮김
        ctx.beginPath();
        ctx.moveTo(x,y);
    } else{
        // path의 전 위치에서 지금 위치까지 line을 만듦
        // 획을 그음
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle=color;
    ctx.fillStyle=color;
}

function handleRangeChange(event){
    const size=event.target.value;
    ctx.lineWidth=size;
}

function handleModeClick(){
    if(filling==true){
        filling=false;
        mode.innerText="Fill";
    } else{
        filling=true;
        mode.innerText="Paint";
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    
    link.href=image;
    link.download="Paint_js"
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}