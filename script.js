let tagMain = document.querySelector(".gamePage");
    tagMain.style.display = "none";

let howToPlay = document.querySelector(".howToPlay");
    howToPlay.style.display = "none";

let player = document.createElement("div");

let playerPosition = 0;

let boxContainer = document.createElement("div");
    boxContainer.classList.add("boxContainer");
    tagMain.appendChild(boxContainer);

const labirinth = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

function drawLabirinth () {
    for (let i = 0; i < labirinth.length; i++) {
        let mapOfGame = document.createElement("div");
            mapOfGame.classList.add("mapOfGame");
        boxContainer.appendChild(mapOfGame);

        for (let j = 0; j < labirinth[i].length; j++) {
            let structureOfGame = document.createElement("div");
                structureOfGame.classList.add("structureOfGame");
                
            if (labirinth[i][j] === "W") {
                structureOfGame.classList.add("wall");
            }

            if (labirinth[i][j] === " ") {
                structureOfGame.classList.add("freeWay");
            }

            if (labirinth[i][j] === "S") {
                structureOfGame.classList.add("start");
                player.classList.add("player");
                structureOfGame.appendChild(player);
            }

            if(labirinth[i][j] === "F") {
                structureOfGame.classList.add("finish");
            }
            mapOfGame.appendChild(structureOfGame);
        }
    }
}
    drawLabirinth();

document.addEventListener("keydown", (event) => {
    let keyCode = event.key;

    let moveUp = player.parentElement.parentElement.previousSibling;
    let moveDown = player.parentElement.parentElement.nextSibling;
    let moveLeft = player.parentElement.previousSibling;
    let moveRight = player.parentElement.nextSibling;

    if (keyCode === "ArrowRight") {

        if (moveRight.classList.contains("freeWay")) {
            moveRight.appendChild(player);
            playerPosition++
        }

        if (moveRight.classList.contains("finish")) {
            moveRight.appendChild(player);
            winnerMessage();
        }
    }
    else if (keyCode === "ArrowLeft" && moveLeft.classList.contains("freeWay")) {
        moveLeft.appendChild(player);
        playerPosition--;
    }
    else if (keyCode === "ArrowDown" && moveDown.childNodes[playerPosition].classList.contains("freeWay")) {
        moveDown.childNodes[playerPosition].appendChild(player);        
    }
    else if (keyCode === "ArrowUp" && moveUp.childNodes[playerPosition].classList.contains("freeWay")) {
        moveUp.childNodes[playerPosition].appendChild(player);
    }
});


const winnerMessage = () => {
    let message = document.createElement("div");
        message.classList.add("message")
    let textMessage = document.createElement("h2");
        textMessage.classList.add("textMessage");
        textMessage.innerHTML = "You did it!! Thank you for playing :)";
    message.appendChild(textMessage);
    tagMain.appendChild(message);
    setTimeout( () => {
        window.location.reload()
    }, 3000);
}

let pageStart = document.querySelector(".pageStart");
let startGame = document.querySelector(".startGame");
let playGame = document.querySelector(".playGame");

startGame.addEventListener("click", function () {
    pageStart.style.display = "none";
    howToPlay.style.display = "flex";
});

playGame.addEventListener("click", function () {
    howToPlay.style.display = "none";
    tagMain.style.display = "flex";
    secondsCount();
    setTimeout( () => {
        boxContainer.style.animation = "rotacao 15.0s linear infinite"; 
    }, 6000);
});

function secondsCount () {
    let counterDiv = document.createElement("div");
        counterDiv.classList.add("counter");
    let seconds = document.createElement("h2");
    seconds.innerText = "Be Ready!";
    counterDiv.appendChild(seconds);
    let count = 5;
    setInterval(() => {
        seconds.innerText = `${count}`;
            count -= 1;
            counterDiv.appendChild(seconds);
            if (count === 0) {
                setTimeout ( () => {
                    counterDiv.style.display = "none";
                }, 1000);
            }
    }, 1000);
    tagMain.appendChild(counterDiv);
}
