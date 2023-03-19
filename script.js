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




    var left = parseFloat(screenWidth - data.boarddim) / 2.0;
    var top = parseFloat(screenHeight - data.boarddim) / 6.0;

    canvas.style.position = "absolute";
    canvas.style.left = left + "px";
    canvas.style.top = top + "px";
    canvas.style.zIndex = "1";
    canvas.width = data.boarddim;
    canvas.height = data.boarddim;

    canvasPlayers.style.position = "absolute";
    canvasPlayers.style.left = left + "px";
    canvasPlayers.style.top = top + "px";
    canvasPlayers.style.zIndex = "2";
    canvasPlayers.width = data.boarddim;
    canvasPlayers.height = data.boarddim;

    canvasMouse.style.position = "absolute";
    canvasMouse.style.left = left + "px";
    canvasMouse.style.top = top + "px";
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
    start = parseFloat(boarddim) * .06;
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

    ctx.clearRect(0, 0, data.canvasPlayers.width, data.canvasPlayers.height);
    ctx.beginPath();

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


    // Bakri
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
    var pos = findClickPos(x, y);
    if (pos < 0) return;

    drawMouseTracker(pos);


    if (bagh.active) {
        moveBagh(pos);
    } else {
        moveBakri(pos);
    }
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
    var pos = findClickPos(x, y);
    if (pos < 0) return;

    drawMouseTracker(pos);


    if (bagh.active) {
        moveBagh(pos);
    } else {
        moveBakri(pos);
    }



}

function findClickPos(x, y) {
    for (let i = 0; i < data.map.length; i++) {
        if (x > data.map[i].x - data.discSize && y > data.map[i].y - data.discSize) {
            let dis = Math.sqrt(Math.pow(data.map[i].y - y, 2) + Math.pow(data.map[i].x - x, 2));
            if (dis < data.discSize) {
                console.log(i);
                return i;
            }
        }
    }
    return -1;
}

function drawMouseTracker(pos) {
    var ctx = data.canvasMouse.getContext("2d");

    var flag = true;

    if (bagh.active) {
        if (bagh.bg1 == pos) flag = false;
        if (bagh.bg2 == pos) flag = false;
        ctx.strokeStyle = "coral";
    }
    else {
        if (bakri.includes(pos)) flag = false;
        ctx.strokeStyle = "yellow";
    }
    if (flag) return;
    ctx.lineWidth = 3;

    // Draw the circle outline
    ctx.clearRect(0, 0, data.canvasMouse.width, data.canvasMouse.height);
    ctx.beginPath();
    ctx.arc(data.map[pos].x, data.map[pos].y, data.discSize + 5, 0, 2 * Math.PI);
    ctx.stroke();
}

function clearMouseTracker(){
    var ctx = data.canvasMouse.getContext("2d");
    ctx.clearRect(0, 0, data.canvasMouse.width, data.canvasMouse.height);
}

function moveBakri(pos) {

    if (bakri.includes(pos)) {
        action.pos1 = pos;
    } else if (action.pos1 != null && bakri.includes(action.pos1)) {
        if (validateMovement(action.pos1, pos)) {
            const index = bakri.indexOf(action.pos1);
            if (index !== -1) {
                bakri.splice(index, 1);
                bakri.push(pos);
                var ctxPlayers = data.canvasPlayers.getContext("2d");
                drawPlayers(ctxPlayers, data.map);
                action.pos1 = null;
                clearMouseTracker();
                bagh.active = true;
            }
        }
    }else{}

}

function moveBagh(pos){
    if (bagh.bg1 == pos || bagh.bg2 == pos) {
        action.pos1 = pos;
    } else if (action.pos1 != null && (bagh.bg1 == action.pos1 || bagh.bg2 == action.pos1)) {
        if (validateMovement(action.pos1, pos)) {
            if(bagh.bg1 == action.pos1) bagh.bg1 = pos;
            if(bagh.bg2 == action.pos1) bagh.bg2 = pos;
            var ctxPlayers = data.canvasPlayers.getContext("2d");
            drawPlayers(ctxPlayers, data.map);
            action.pos1 = null;
            clearMouseTracker();
            bagh.active = false;
            
        }
        if(action.pos1!=null && pos !=null && action.pos1!=pos){
            var posBk = eatBakri(pos);
            if(posBk<0) return;
            if(bakri.includes(posBk)){
                if(bagh.bg1 == action.pos1) bagh.bg1 = pos;
                if(bagh.bg2 == action.pos1) bagh.bg2 = pos;
                const index = bakri.indexOf(posBk);
                if (index !== -1) {
                    bakri.splice(index, 1);
                }
                var ctxPlayers = data.canvasPlayers.getContext("2d");
                drawPlayers(ctxPlayers, data.map);
                action.pos1 = null;
                clearMouseTracker();
                bagh.active = false;
            }
        }
    }
}

function validateMovement(posFrom, posTo) {
    var flag = false;
    if (bagh.active) {
        switch (posFrom) {
            case 0:
                flag = (posTo == 1 || posTo == 5);
                break;
            case 1:
                flag = (posTo == 0 || posTo == 6 || posTo == 2);
                break;
            case 2:
                flag = (posTo == 1 || posTo == 6 || posTo == 7 || posTo == 8 || posTo == 3);
                break;
            case 3:
                flag = (posTo == 2 || posTo == 8 || posTo == 4);
                break;
            case 4:
                flag = (posTo == 3 || posTo == 9);
                break;
            case 5:
                flag = (posTo == 0 || posTo == 6 || posTo == 10);
                break;
            case 6:
                flag = (posTo == 1 || posTo == 2 || posTo == 7 || posTo == 11 || posTo == 10 || posTo == 5);
                break;
            case 7:
                flag = (posTo == 2 || posTo == 8 || posTo == 12 || posTo == 6);
                break;
            case 8:
                flag = (posTo == 2 || posTo == 3 || posTo == 9 || posTo == 14 || posTo == 13 || posTo == 7);
                break;
            case 9:
                flag = (posTo == 4 || posTo == 14 || posTo == 8);
                break;
            case 10:
                flag = (posTo == 5 || posTo == 6 || posTo == 11 || posTo == 16 || posTo == 15);
                break;
            case 11:
                flag = (posTo == 6 || posTo == 12 || posTo == 16 || posTo == 10);
                break;
            case 12:
                flag = (posTo == 7 || posTo == 13 || posTo == 17 || posTo == 11);
                break;
            case 13:
                flag = (posTo == 8 || posTo == 14 || posTo == 18 || posTo == 12);
                break;
            case 14:
                flag = (posTo == 8 || posTo == 9 || posTo == 19 || posTo == 18 || posTo == 13);
                break;
            case 15:
                flag = (posTo == 10 || posTo == 16 || posTo == 20);
                break;
            case 16:
                flag = (posTo == 10 || posTo == 11 || posTo == 17 || posTo == 22 || posTo == 21 || posTo == 15);
                break;
            case 17:
                flag = (posTo == 12 || posTo == 18 || posTo == 22 || posTo == 16);
                break;
            case 18:
                flag = (posTo == 13 || posTo == 14 || posTo == 19 || posTo == 23 || posTo == 22 || posTo == 17);
                break;
            case 19:
                flag = (posTo == 14 || posTo == 24 || posTo == 18);
                break;
            case 20:
                flag = (posTo == 15 || posTo == 21);
                break;
            case 21:
                flag = (posTo == 16 || posTo == 22 || posTo == 20);
                break;
            case 22:
                flag = (posTo == 16 || posTo == 17 || posTo == 18 || posTo == 23 || posTo == 21);
                break;
            case 23:
                flag = (posTo == 18 || posTo == 24 || posTo == 22);
                break;
            case 24:
                flag = (posTo == 19 || posTo == 23);
                break;
        }
    
        if (flag) {
            if (bakri.includes(posTo)) flag = false;
            if (bagh.bg1 == posTo) flag = false;
            if (bagh.bg2 == posTo) flag = false;
        }
    } else {
        switch (posFrom) {
            case 0:
                flag = (posTo == 1 || posTo == 5);
                break;
            case 1:
                flag = (posTo == 0 || posTo == 6 || posTo == 2);
                break;
            case 2:
                flag = (posTo == 1 || posTo == 6 || posTo == 7 || posTo == 8 || posTo == 3);
                break;
            case 3:
                flag = (posTo == 2 || posTo == 8 || posTo == 4);
                break;
            case 4:
                flag = (posTo == 3 || posTo == 9);
                break;
            case 5:
                flag = (posTo == 0 || posTo == 6 || posTo == 10);
                break;
            case 6:
                flag = (posTo == 1 || posTo == 2 || posTo == 7 || posTo == 11 || posTo == 10 || posTo == 5);
                break;
            case 7:
                flag = (posTo == 2 || posTo == 8 || posTo == 12 || posTo == 6);
                break;
            case 8:
                flag = (posTo == 2 || posTo == 3 || posTo == 9 || posTo == 14 || posTo == 13 || posTo == 7);
                break;
            case 9:
                flag = (posTo == 4 || posTo == 14 || posTo == 8);
                break;
            case 10:
                flag = (posTo == 5 || posTo == 6 || posTo == 11 || posTo == 16 || posTo == 15);
                break;
            case 11:
                flag = (posTo == 6 || posTo == 12 || posTo == 16 || posTo == 10);
                break;
            case 12:
                flag = (posTo == 7 || posTo == 13 || posTo == 17 || posTo == 11);
                break;
            case 13:
                flag = (posTo == 8 || posTo == 14 || posTo == 18 || posTo == 12);
                break;
            case 14:
                flag = (posTo == 8 || posTo == 9 || posTo == 19 || posTo == 18 || posTo == 13);
                break;
            case 15:
                flag = (posTo == 10 || posTo == 16 || posTo == 20);
                break;
            case 16:
                flag = (posTo == 10 || posTo == 11 || posTo == 17 || posTo == 22 || posTo == 21 || posTo == 15);
                break;
            case 17:
                flag = (posTo == 12 || posTo == 18 || posTo == 22 || posTo == 16);
                break;
            case 18:
                flag = (posTo == 13 || posTo == 14 || posTo == 19 || posTo == 23 || posTo == 22 || posTo == 17);
                break;
            case 19:
                flag = (posTo == 14 || posTo == 24 || posTo == 18);
                break;
            case 20:
                flag = (posTo == 15 || posTo == 21);
                break;
            case 21:
                flag = (posTo == 16 || posTo == 22 || posTo == 20);
                break;
            case 22:
                flag = (posTo == 16 || posTo == 17 || posTo == 18 || posTo == 23 || posTo == 21);
                break;
            case 23:
                flag = (posTo == 18 || posTo == 24 || posTo == 22);
                break;
            case 24:
                flag = (posTo == 19 || posTo == 23);
                break;
        }

        if (flag) {
            if (bakri.includes(posTo)) flag = false;
            if (bagh.bg1 == posTo) flag = false;
            if (bagh.bg2 == posTo) flag = false;
        }
    }

    return flag;
}

function eatBakri(pos){
    var posBk=-1;
    switch(action.pos1){
        case 0:
            switch(pos){
                case 2: posBk = 1; break;
                case 10: posBk = 5; break;
            }
        break;
        case 1:
            switch(pos){
                case 3: posBk = 2; break;
                case 11: posBk = 6; break;
            }
        break;
        case 2:
            switch(pos){
                case 0: posBk = 1; break;
                case 4: posBk = 3; break;
                case 14: posBk = 8; break;
                case 12: posBk = 7; break;
                case 10: posBk = 6; break;
            }
        break;
        case 3:
            switch(pos){
                case 1: posBk = 2; break;
                case 13: posBk = 8; break;
            }
        break;
        case 4:
            switch(pos){
                case 2: posBk = 3; break;
                case 14: posBk = 9; break;
            }
        break;
        case 5:
            switch(pos){
                case 7: posBk = 6; break;
                case 15: posBk = 10; break;
            }
        break;
        case 6:
            switch(pos){
                case 8: posBk = 7; break;
                case 16: posBk = 11; break;
            }
        break;
        case 7:
            switch(pos){
                case 5: posBk = 6; break;
                case 9: posBk = 8; break;
                case 17: posBk = 12; break;
            }
        break;
        case 8:
            switch(pos){
                case 6: posBk = 7; break;
                case 18: posBk = 13; break;
            }
        break;
        case 9:
            switch(pos){
                case 7: posBk = 8; break;
                case 19: posBk = 14; break;
            }
        break;
        case 10:
            switch(pos){
                case 0: posBk = 5; break;
                case 2: posBk = 6; break;
                case 12: posBk = 11; break;
                case 22: posBk = 16; break;
                case 20: posBk = 15; break;
            }
        break;
        case 11:
            switch(pos){
                case 1: posBk = 6; break;
                case 13: posBk = 12; break;
                case 21: posBk = 16; break;
            }
        break;
        case 12:
            switch(pos){
                case 2: posBk = 7; break;
                case 14: posBk = 13; break;
                case 22: posBk = 17; break;
                case 10: posBk = 11; break;
            }
        break;
        case 13:
            switch(pos){
                case 3: posBk = 8; break;
                case 23: posBk = 18; break;
                case 11: posBk = 12; break;
            }
        break;
        case 14:
            switch(pos){
                case 2: posBk = 8; break;
                case 4: posBk = 9; break;
                case 12: posBk = 13; break;
                case 22: posBk = 18; break;
                case 24: posBk = 19; break;
            }
        break;
        case 15:
            switch(pos){
                case 5: posBk = 10; break;
                case 17: posBk = 16; break;
            }
        break;
        case 16:
            switch(pos){
                case 6: posBk = 11; break;
                case 18: posBk = 17; break;
            }
        break;
        case 17:
            switch(pos){
                case 15: posBk = 16; break;
                case 7: posBk = 12; break;
                case 19: posBk = 18; break;
            }
        break;
        case 18:
            switch(pos){
                case 16: posBk = 17; break;
                case 8: posBk = 13; break;
            }
        break;
        case 19:
            switch(pos){
                case 17: posBk = 18; break;
                case 9: posBk = 14; break;
            }
        break;
        case 20:
            switch(pos){
                case 10: posBk = 15; break;
                case 22: posBk = 21; break;
            }
        break;
        case 21:
            switch(pos){
                case 11: posBk = 16; break;
                case 23: posBk = 22; break;
            }
        break;
        case 22:
            switch(pos){
                case 20: posBk = 21; break;
                case 10: posBk = 16; break;
                case 12: posBk = 17; break;
                case 14: posBk = 18; break;
                case 24: posBk = 23; break;
            }
        break;
        case 23:
            switch(pos){
                case 21: posBk = 22; break;
                case 13: posBk = 18; break;
            }
        break;
        case 24:
            switch(pos){
                case 22: posBk = 23; break;
                case 14: posBk = 19; break;
            }
        break;
    }

    return posBk;
}

init();

