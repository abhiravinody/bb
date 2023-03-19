var data = {
    boarddim: 0.0,
    canvas: null,
    canvasPlayers: null,
    canvasMouse: null,
    discSize: null,
    lineWidth: null,
    map: [],
    ctx: null
}

var bagh = {
    active: false,
    bg1: 0,
    bg2: 0
};

var bakri = [];

var action = {
    pos1: null,
    pos2: null
}

function init() {
    var screenHeight = window.screen.height;
    var screenWidth = window.screen.width;

    if (screenWidth < screenHeight) data.boarddim = parseFloat(screenWidth) - parseFloat(screenWidth * .20);
    else data.boarddim = parseFloat(screenHeight) - parseFloat(screenHeight * .20);
    data.discSize = parseFloat(data.boarddim) * .06;
    data.lineWidth = parseFloat(data.boarddim) * .02;

    data.map = prepareMap(data.boarddim);

    preparePlayers();

    var canvas = document.createElement("canvas");
    var canvasPlayers = document.createElement("canvas");
    var canvasMouse = document.createElement("canvas");
    canvas.addEventListener("touchstart", handleStart, false);
    canvas.addEventListener("touchmove", handleMove, false);
    canvas.addEventListener("touchend", handleEnd, false);
    canvas.addEventListener("click", handleClick, false);
    canvasPlayers.addEventListener("touchstart", handleStart, false);
    canvasPlayers.addEventListener("touchmove", handleMove, false);
    canvasPlayers.addEventListener("touchend", handleEnd, false);
    canvasPlayers.addEventListener("click", handleClick, false);
    canvasMouse.addEventListener("touchstart", handleStart, false);
    canvasMouse.addEventListener("touchmove", handleMove, false);
    canvasMouse.addEventListener("touchend", handleEnd, false);
    canvasMouse.addEventListener("click", handleClick, false);


    

    var left = parseFloat(screenWidth - data.boarddim)/2.0;
    var top = parseFloat(screenHeight - data.boarddim)/6.0;
    
    canvas.style.position = "absolute";
    canvas.style.left = left+"px";
    canvas.style.top = top+"px";
    canvas.style.zIndex = "1";
    canvas.width = data.boarddim;
    canvas.height = data.boarddim;
    
    canvasPlayers.style.position = "absolute";
    canvasPlayers.style.left = left+"px";
    canvasPlayers.style.top = top+"px";
    canvasPlayers.style.zIndex = "2";
    canvasPlayers.width = data.boarddim;
    canvasPlayers.height = data.boarddim;

    canvasMouse.style.position = "absolute";
    canvasMouse.style.left = left+"px";
    canvasMouse.style.top = top+"px";
    canvasMouse.style.zIndex = "3";
    canvasMouse.width = data.boarddim;
    canvasMouse.height = data.boarddim;
    
    
    data.canvas = canvas;
    data.canvasPlayers = canvasPlayers;
    data.canvasMouse = canvasMouse;
    var ctx = data.canvas.getContext("2d");
    var ctxPlayers = data.canvasPlayers.getContext("2d");

    // set the canvas background color to red
    ctx.fillStyle = "#96CB95";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawMap(ctx, data.map);
    drawPlayers(ctxPlayers, data.map);
    // get a reference to the element where you want to add the canvas
    var container = document.getElementById("myContainer");

    // add the canvas element to the container
    container.appendChild(canvas);
    container.appendChild(canvasPlayers);
    container.appendChild(canvasMouse);

}


function prepareMap(boarddim) {
    var map = [];
    start = parseFloat(boarddim) * .03;
    end = parseFloat(boarddim) - start;

    console.log({ start: start, end: end });
    width = parseFloat(end) - parseFloat(start);
    width = parseFloat(width) / 4.0;

    console.log({ start: start, end: end, width: width, discSize: data.discSize });

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            var x = start + parseFloat(width * parseFloat(j));
            var y = start + parseFloat(width * parseFloat(i));
            map.push({ x: x, y: y })
        }
    }

    console.log(map);
    return map;
}

function drawMap(ctx, map) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = data.lineWidth;


    ctx.moveTo(map[0].x, map[0].y);
    ctx.lineTo(map[4].x, map[4].y);
    ctx.moveTo(map[5].x, map[5].y);
    ctx.lineTo(map[9].x, map[9].y);
    ctx.moveTo(map[10].x, map[10].y);
    ctx.lineTo(map[14].x, map[14].y);
    ctx.moveTo(map[15].x, map[15].y);
    ctx.lineTo(map[19].x, map[19].y);
    ctx.moveTo(map[20].x, map[20].y);
    ctx.lineTo(map[24].x, map[24].y);

    ctx.moveTo(map[0].x, map[0].y);
    ctx.lineTo(map[20].x, map[20].y);
    ctx.moveTo(map[1].x, map[1].y);
    ctx.lineTo(map[21].x, map[21].y);
    ctx.moveTo(map[2].x, map[2].y);
    ctx.lineTo(map[22].x, map[22].y);
    ctx.moveTo(map[3].x, map[3].y);
    ctx.lineTo(map[23].x, map[23].y);
    ctx.moveTo(map[4].x, map[4].y);
    ctx.lineTo(map[24].x, map[24].y);

    ctx.moveTo(map[2].x, map[2].y);
    ctx.lineTo(map[14].x, map[14].y);
    ctx.lineTo(map[22].x, map[22].y);
    ctx.lineTo(map[10].x, map[10].y);
    ctx.lineTo(map[2].x, map[2].y);

    ctx.stroke();
}

function preparePlayers() {
    bagh.bg1 = 11;
    bagh.bg2 = 13;

    bakri.push(6);
    bakri.push(6);
    bakri.push(6);
    bakri.push(6);
    bakri.push(6);

    bakri.push(8);
    bakri.push(8);
    bakri.push(8);
    bakri.push(8);
    bakri.push(8);

    bakri.push(16);
    bakri.push(16);
    bakri.push(16);
    bakri.push(16);
    bakri.push(16);

    bakri.push(18);
    bakri.push(18);
    bakri.push(18);
    bakri.push(18);
    bakri.push(18);
}

function drawPlayers(ctx, map) {
    // bagh

    ctx.fillStyle = "red";
    ctx.lineWidth = 3;

    // draw a circle at center (100, 100) with a radius of 50 pixels
    ctx.beginPath();
    ctx.arc(map[bagh.bg1].x, map[bagh.bg1].y, data.discSize, 0, 2 * Math.PI);
    ctx.closePath();

    // fill the circle with the current fill color
    ctx.fill();

    // draw a circle at center (100, 100) with a radius of 50 pixels
    ctx.beginPath();
    ctx.arc(map[bagh.bg2].x, map[bagh.bg2].y, data.discSize, 0, 2 * Math.PI);
    ctx.closePath();

    // fill the circle with the current fill color
    ctx.fill();

    ctx.fillStyle = "#581ED2";
    ctx.lineWidth = 3;
    var cout6 = 0;
    var cout8 = 0;
    var cout16 = 0;
    var cout18 = 0;
    for (var bk of bakri) {
        // draw a circle at center (100, 100) with a radius of 50 pixels
        switch (bk) {
            case 6: cout6++; break;
            case 8: cout8++; break;
            case 16: cout16++; break;
            case 18: cout18++; break;
        }
        ctx.beginPath();
        ctx.arc(map[bk].x, map[bk].y, data.discSize, 0, 2 * Math.PI);
        ctx.closePath();

        // fill the circle with the current fill color
        ctx.fill();
    }
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.textAlign = "center";

    // print the number "42" at position (100, 100)
    if (cout6 > 1) ctx.fillText(cout6, map[6].x, map[6].y + data.discSize * 0.25);
    if (cout8 > 1) ctx.fillText(cout8, map[8].x, map[8].y + data.discSize * 0.25);
    if (cout16 > 1) ctx.fillText(cout16, map[16].x, map[16].y + data.discSize * 0.25);
    if (cout18 > 1) ctx.fillText(cout18, map[18].x, map[18].y + data.discSize * 0.25);
}

function handleStart(event) {
    event.preventDefault();
    var x = event.touches[0].pageX - canvas.offsetLeft;
    var y = event.touches[0].pageY - canvas.offsetTop;
    console.log("Touch started at (" + x + "," + y + ")");
}

function handleMove(event) {
    event.preventDefault();
    var x = event.touches[0].pageX - canvas.offsetLeft;
    var y = event.touches[0].pageY - canvas.offsetTop;
    console.log("Touch moved to (" + x + "," + y + ")");
}

function handleEnd(event) {
    event.preventDefault();
    console.log("Touch ended");
}

function handleClick(event) {
    var x = event.clientX - data.canvas.offsetLeft;
    var y = event.clientY - data.canvas.offsetTop;
    console.log("Click at (" + x + "," + y + ")");
    var pos = findClickPos(x,y);

    drawMouseTracker(pos);

    if(bagh.active){
        moveBagh(pos);
    }else{
        moveBakri(pos);
    }

    if(pos<0) return;
    
}

function findClickPos(x,y){
    for(let i=0;i<data.map.length;i++){
        if(x>data.map[i].x-data.discSize && y>data.map[i].y-data.discSize){
            let dis = Math.sqrt( Math.pow(data.map[i].y - y,2) + Math.pow(data.map[i].x - x,2) );
            if(dis<data.discSize){
                console.log(i);
                return i;
            } 
        }
    }
    return -1;
}

function drawMouseTracker(pos){
    var ctx = data.canvasMouse.getContext("2d");

    var flag = true;
    
    if(bagh.active){
        if(bagh.bg1==pos) flag=false;
        if(bagh.bg2==pos) flag=false;
        ctx.strokeStyle = "coral";
    } 
    else{
        if (bakri.includes(pos)) flag=false;
        ctx.strokeStyle = "yellow";
    }
    if(flag) return;
    ctx.lineWidth = 3;

    // Draw the circle outline
    ctx.clearRect(0, 0, data.canvasMouse.width, data.canvasMouse.height);
    ctx.beginPath();
    ctx.arc(data.map[pos].x, data.map[pos].y, data.discSize+5, 0, 2 * Math.PI);
    ctx.stroke();
}

function moveBakri(){

}

init();

