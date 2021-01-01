const gameCanvas = document.getElementById("gameCanvas");
let player = document.getElementById("player");
let ctx = gameCanvas.getContext("2d");
let playerName = "Player 1";
let clickTarget;
let canvasZone;
let xCoord;
let yCoord;
let itemExists;
let quadrant;
let xQuadArray = [];
let oQuadArray = [];
let gameEnded = false;
let winner;
let xCoordStart;
let yCoordStar;
let xCoordEnd;
let yCoordEnd;


function drawCanvas()
{
    player.innerText = playerName;

    ctx.fillStyle = "white";
    ctx.strokeStyle="black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

    for(let i=1; i< 3; i++)
    {
        ctx.beginPath();
        ctx.moveTo(0, i * (gameCanvas.height/3));
        ctx.lineTo(gameCanvas.width, i*(gameCanvas.height/3));
        ctx.stroke();

        ctx.moveTo(i*(gameCanvas.width/3), 0);
        ctx.lineTo(i*(gameCanvas.width/3), gameCanvas.height);
        ctx.stroke();
    }

    document.addEventListener("click", clicked);
}

function getPlayer()
{
    playerName = playerName != "Player 1" ? "Player 1" : "Player 2"
    player.innerText = playerName;
}

function clicked(event){
    clickTarget = event.target;
    if(clickTarget == gameCanvas && !gameEnded)
    {
        canvasZone = gameCanvas.getBoundingClientRect();
        x = event.clientX - canvasZone.left;
        y = event.clientY - canvasZone.top;

        drawXO(x, y);

    }
}

function drawXO(x, y)
{
    itemExists = false;
    ctx.fillStyle = "black";
    ctx.font = "50px Arial";

    if(x > 0 && x < 100)
    {
        xCoord = 35;
        if(y > 0 && y < 100)
        {
            yCoord = 70;
            quadrant = 1;
        }
        else if(y > 100 && y < 200)
        {
            yCoord = 170;
            quadrant = 4;
        }
        else if(y > 200 && y < 300)
        {
            yCoord = 270;
            quadrant = 7;
        }
    }
    else if(x > 100 && x < 200)
    {
        xCoord = 135;
        if(y > 0 && y < 100)
        {
            yCoord = 70;
            quadrant = 2;
        }
        else if(y > 100 && y < 200)
        {
            yCoord = 170;
            quadrant = 5;
        }
        else if(y > 200 && y < 300)
        {
            yCoord = 270;
            quadrant = 8;
        }
    }
    else if(x > 200 && x < 300)
    {
        xCoord = 235;
        if(y > 0 && y < 100)
        {
            yCoord = 70;
            quadrant = 3;
        }
        else if(y > 100 && y < 200)
        {
            yCoord = 170;
            quadrant = 6;
        }
        else if(y > 200 && y < 300)
        {
            yCoord = 270;
            quadrant = 9;
        }
    }

    xQuadArray.forEach(element => {
        if(element === quadrant)
        {
            itemExists = true;
        }
    });

    if(!itemExists)
    {
        oQuadArray.forEach(element => {
            if(element === quadrant)
            {
                itemExists = true;
            }
        });
    }

    if(!itemExists)
    {
        if(playerName === "Player 1")
            {
                xQuadArray.push(quadrant);
                ctx.fillText("X",xCoord,yCoord);
            }
        else if(playerName === "Player 2")
            {
                oQuadArray.push(quadrant);
                ctx.fillText("O",xCoord,yCoord);
            }      
        
        chkGame();
        if(!gameEnded)
        {
            getPlayer();
        }   
        else{            
            ctx.strokeStyle = "darkgreen";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(xCoordStart, yCoordStart);
            ctx.lineTo(xCoordEnd, yCoordEnd);
            ctx.stroke();
            player.innerText = playerName + " wins !!!";
            //ctx.fillText(playerName + " wins !!!", 130, 150);
            //drawCanvas();
        }     
    }
}

function chkGame()
{
    if((xQuadArray.includes(1) && xQuadArray.includes(2) && xQuadArray.includes(3)) || (oQuadArray.includes(1) && oQuadArray.includes(2) && oQuadArray.includes(3)))
    {
        xCoordStart = 30;
        yCoordStart = 50;
        xCoordEnd = 275;
        yCoordEnd = 50;
        gameEnded = true;
    }
    else if((xQuadArray.includes(4) && xQuadArray.includes(5) && xQuadArray.includes(6)) || (oQuadArray.includes(4) && oQuadArray.includes(5) && oQuadArray.includes(6)))
    {
        xCoordStart = 30;
        yCoordStart = 150;
        xCoordEnd = 275;
        yCoordEnd = 150;
        gameEnded = true;
    }
    else if((xQuadArray.includes(7) && xQuadArray.includes(8) && xQuadArray.includes(9)) || (oQuadArray.includes(7) && oQuadArray.includes(8) && oQuadArray.includes(9)))
    {
        xCoordStart = 30;
        yCoordStart = 250;
        xCoordEnd = 275;
        yCoordEnd = 250;
        gameEnded = true;
    }
    else if((xQuadArray.includes(1) && xQuadArray.includes(4) && xQuadArray.includes(7)) || (oQuadArray.includes(1) && oQuadArray.includes(4) && oQuadArray.includes(7)))
    {
        xCoordStart = 51;
        yCoordStart = 25;
        xCoordEnd = 51;
        yCoordEnd = 280;
        gameEnded = true;
    }
    else if((xQuadArray.includes(2) && xQuadArray.includes(5) && xQuadArray.includes(8)) || (oQuadArray.includes(2) && oQuadArray.includes(5) && oQuadArray.includes(8)))
    {
        xCoordStart = 150;
        yCoordStart = 25;
        xCoordEnd = 150;
        yCoordEnd = 280;
        gameEnded = true;
    }
    else if((xQuadArray.includes(3) && xQuadArray.includes(6) && xQuadArray.includes(9)) || (oQuadArray.includes(3) && oQuadArray.includes(6) && oQuadArray.includes(9)))
    {
        xCoordStart = 250;
        yCoordStart = 25;
        xCoordEnd = 250;
        yCoordEnd = 280;
        gameEnded = true;
    }
    else if((xQuadArray.includes(1) && xQuadArray.includes(5) && xQuadArray.includes(9)) || (oQuadArray.includes(1) && oQuadArray.includes(5) && oQuadArray.includes(9)))
    {
        xCoordStart = 50;
        yCoordStart = 50;
        xCoordEnd = 250;
        yCoordEnd = 250;
        gameEnded = true;
    }
    else if((xQuadArray.includes(3) && xQuadArray.includes(5) && xQuadArray.includes(7)) || (oQuadArray.includes(3) && oQuadArray.includes(5) && oQuadArray.includes(7)))
    {
        xCoordStart = 250;
        yCoordStart = 50;
        xCoordEnd = 51;
        yCoordEnd = 250;
        gameEnded = true;
    }
}

drawCanvas();

