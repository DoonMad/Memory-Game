let emojis = [

    ["😍", "🥸", "💀", "🐦‍🔥", "🌊", "🤡","👾", "🐼","😍", "🥸","💀", "🐦‍🔥","🌊", "🤡","👾", "🐼"],
    ["😍", "🥸", "💀", "🐦‍🔥", "🌊", "🤡","👾", "🐼","😍", "🥸","💀", "🐦‍🔥","🌊", "🤡","👾", "🐼","🐺", "🍕","🐺", "🍕"],
    ["😍", "🥸", "💀", "🐦‍🔥", "🌊", "🤡","👾", "🐼","😍", "🥸","💀", "🐦‍🔥","🌊", "🤡","👾", "🐼","🐺", "🍕","🐺", "🍕", "🚗", "💵", "🚗", "💵"]
]
var revealedCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var lastClickedDiv = null
const root = document.documentElement;
const reset = document.querySelector(".reset")
const playAgain = document.querySelector(".playAgain")
const grid = document.querySelector(".grid")
const winPopup = document.querySelector(".winPopup")
const movesSpan = document.querySelector("#final-moves")
const timeSpan = document.querySelector("#final-time")
const missesSpan = document.querySelector("#final-misses")
const outerContainer = document.querySelector(".outer-container")
const currentMoves = document.querySelectorAll(".current-moves")
const currentTime = document.querySelectorAll(".current-time")
const currentMisses = document.querySelectorAll(".current-misses")
const bestMovesSpan = document.querySelector("#best-moves")
const missesInBestMoves = document.querySelector("#misses-in-best-moves")
const timeForBestMoves = document.querySelector("#time-for-best-moves")
const bestTimeSpan = document.querySelector("#best-time")
const movesInBestTime = document.querySelector("#moves-in-best-time")
const missesInBestTime = document.querySelector("#misses-in-best-time")
const closePupupButton = document.querySelector(".close-popup")
const popupTimePara = document.querySelector(".popup-time-para")
const popupMovesPara = document.querySelectorAll(".popup-moves-para")
const flipAudio = new Audio("media/flip.wav")
const correctAudio = new Audio("media/correct.wav")
const confettiAudio = new Audio("media/confetti.mp3")
const nextLevelButton = document.querySelector(".next-level")
const prevLevelButton = document.querySelector(".prev-level")
const popupNextLevelButton = document.querySelector(".next-level-popup")
var cardsTurned = 0, moves = 0, time=0, interval=null, misses=0, level=0
var bestTime = [
    { time: null, moves: null, misses: 0 },
    { time: null, moves: null, misses: 0 },
    { time: null, moves: null, misses: 0 },
];
var bestMoves = [
    { time: null, moves: null, misses: 0 },
    { time: null, moves: null, misses: 0 },
    { time: null, moves: null, misses: 0 },
];

const shuffleEmojis = () => {
    for(let i=0; i<emojis[level].length-1; i++){
        const randomIndex = Math.floor(Math.random()*(16+level*4));
        var temp = emojis[level][i]
        emojis[level][i] = emojis[level][randomIndex]
        emojis[level][randomIndex] = temp
    }
}

const playAudio = (audioElement) => {
    const clone = audioElement.cloneNode();
    clone.play();
}

const showPopup = () => {
    movesSpan.innerText = moves
    timeSpan.innerText = time
    missesSpan.innerText = misses
    outerContainer.classList.add("blur")
    winPopup.style.animation = "popupAnimation 0.2s ease-out forwards"
    winPopup.style.display = "flex"
}

const hidePopup = () => {
    outerContainer.classList.remove("blur")
    winPopup.style.display = "none"
}

const reveal = (card, emoji) => {
    revealedCards[card.id] = 1
    card.style.backgroundColor = "#fff"
    card.classList.toggle("flip")
    card.innerText = emoji
}

const cover = (card) => {
    revealedCards[card.id] = 0
    card.style.backgroundColor = "var(--primary-color)";
    card.classList.toggle("flip")
    card.innerText = "";
}

const resetGame = () => {  
    createCards()
    hidePopup()
    popupMovesPara.forEach(para => {
        para.style.animation = "none"
    })
    popupTimePara.style.animation = "none"
    cardsTurned = 0
    moves = 0
    misses = 0
    lastClickedDiv=null
    time = 0
    // currentTime.innerText = time
    currentMoves.forEach(i => {
        i.innerText = moves
    });
    currentMisses.forEach(i => {
        i.innerText = misses
    });
    currentTime.forEach(i => {
        i.innerText = time
    });
    // currentMoves.innerText = moves
    // currentMisses.innerText = misses
    if(interval!==null){
        clearInterval(interval)
        interval=null
    }
}

const celebrate = () => {
    playAudio(confettiAudio)
    revealedCards.forEach(i => {
        i=0
    });
    confetti({
        particleCount: 300,
        spread: 800,
        origin: {x:0, y: 0.9 },
    });

    confetti({
        particleCount: 300,
        spread: 800,
        origin: {x:1, y: 0.9 },
    });
    confetti({
        particleCount: 300,
        spread: 800,
        origin: {x:0, y: 0.1 },
    });

    confetti({
        particleCount: 300,
        spread: 800,
        origin: {x:1, y: 0.1 },
    });
}

const gameWon = () => {
    if(bestTime[level].time===null || time<bestTime[level].time){
        celebrate()
        popupTimePara.style.animation = "zoom 1s 3"
        bestTimeSpan.innerText = bestTime[level].time = time
        movesInBestTime.innerText = bestTime[level].moves = moves
        missesInBestTime.innerText = bestTime[level].misses = misses
    }
    if(bestMoves[level].moves===null || moves<bestMoves[level].moves){
        celebrate()
        popupMovesPara.forEach(para => {
            para.style.animation = "zoom 1s 3"
        })
        bestMovesSpan.innerText = bestMoves[level].moves = moves
        timeForBestMoves.innerText = bestMoves[level].time = time
        missesInBestMoves.innerText = bestMoves[level].misses = misses
    }
    currentTime.forEach(i => {
        i.innerText = time
    });
    if(interval!==null){
        clearInterval(interval)
        interval=null
    }
    showPopup()
}

const createCards = () => {
    if(bestMoves[level].moves!==null){
        bestMovesSpan.innerText = bestMoves[level].moves
        timeForBestMoves.innerText = bestMoves[level].time
        missesInBestMoves.innerText = bestMoves[level].misses
    }
    else{
        bestMovesSpan.innerText = "_"
        timeForBestMoves.innerText = "_"
        missesInBestMoves.innerText = "_"
    }
    if(bestTime[level].time!==null){
        bestTimeSpan.innerText = bestTime[level].time
        movesInBestTime.innerText = bestTime[level].moves
        missesInBestTime.innerText = bestTime[level].misses
    }
    else{
        bestTimeSpan.innerText = "_"
        movesInBestTime.innerText = "_"
        missesInBestTime.innerText = "_"
    }
    grid.innerHTML = ""
    shuffleEmojis()
    if(level==1){
        root.style.setProperty('--columns', 5);
        root.style.setProperty('--rows', 4);
        root.style.setProperty('--primary-color', '#ffa726');
        root.style.setProperty('--secondary-color', '#c14c27');
        root.style.setProperty('--bg-color', '#4e342e');
        root.style.setProperty('--button-color', '#bf360c');
        nextLevelButton.style.display="inline-block"
        prevLevelButton.style.display="inline-block"
    }
    else if(level==2){
        root.style.setProperty('--columns', 6);
        root.style.setProperty('--rows', 4);
        root.style.setProperty('--primary-color', '#e53935');
        root.style.setProperty('--secondary-color', '#7c0e0e');
        root.style.setProperty('--bg-color', '#311b1b');
        root.style.setProperty('--button-color', '#8e0000');
        nextLevelButton.style.display="none"
        prevLevelButton.style.display="inline-block"
    }
    else{
        root.style.setProperty('--columns', 4);
        root.style.setProperty('--rows', 4);
        root.style.setProperty('--primary-color', '#229b7f');
        root.style.setProperty('--secondary-color', '#0d614e');
        root.style.setProperty('--bg-color', '#093a2f');
        root.style.setProperty('--button-color', '#264c3d');
        prevLevelButton.style.display="none"
        nextLevelButton.style.display="inline-block"
    }
    for(let i=0; i<16+4*level; i++){
        const div=document.createElement("div")
        div.classList.add("card")
        div.id = i
        grid.appendChild(div)
        div.addEventListener("click", () => {
            if(revealedCards[div.id]!==1){
                playAudio(flipAudio)
                if(moves===0 && lastClickedDiv===null){
                    interval = setInterval(()=>{
                        time++
                        // currentTime.innerText = time
                        currentTime.forEach(i => {
                            i.innerText = time
                        });
                    }, 1000)
                }
                reveal(div, emojis[level][i])
                if(lastClickedDiv!==null){
                    moves+=1
                    // currentMoves.innerText = moves
                    currentMoves.forEach(i => {
                        i.innerText = moves
                    });
                    if(lastClickedDiv.innerText!==div.innerText){
                        misses++
                        // currentMisses.innerText = misses
                        currentMisses.forEach(i => {
                            i.innerText = misses
                        });
                        const clickedDiv = lastClickedDiv
                        const currentDiv = div
                        setTimeout(()=>{
                            cover(clickedDiv)
                            cover(currentDiv)
                        }, 500)
                    }
                    else{
                        playAudio(correctAudio)
                        cardsTurned+=2
                        if(cardsTurned===16+4*level){
                            setTimeout(()=>{
                                gameWon()
                            }, 500)
                        }
                    }
                    lastClickedDiv=null
                }
                else{
                    lastClickedDiv=div
                }
            }
        })
    }
    const cards = grid.querySelectorAll(".card")
    setTimeout(() => {
        cards.forEach((card) => {
            cover(card);
        });
    }, 1);
}

reset.addEventListener("click", () => {
    resetGame()
})

playAgain.addEventListener("click", () => {
    resetGame()
})

closePupupButton.addEventListener("click", () => {
    hidePopup()
})

nextLevelButton.addEventListener("click", () => {
    level++
    if(level==3){
        level=0
        alert("You have completed all levels. Congratulations!")
    }
    resetGame()
})
prevLevelButton.addEventListener("click", () => {
    level--
    resetGame()
})

popupNextLevelButton.addEventListener("click", () => {
    level++
    if(level==3){
        level=0
        alert("There are no more levels 🥲")
    }
    resetGame()
})

createCards()