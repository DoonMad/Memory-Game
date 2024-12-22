let emojis = ["😍", "🥸","💀", "🐦‍🔥","🌊", "🤡","👾", "🐼","😍", "🥸","💀", "🐦‍🔥","🌊", "🤡","👾", "🐼"]
const revealedCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var lastClickedDiv = null
const reset = document.querySelector(".reset")
const playAgain = document.querySelector(".playAgain")
const grid = document.querySelector(".grid")
const winPopup = document.querySelector(".winPopup")
const movesSpan = document.querySelector("#final-moves")
const timeSpan = document.querySelector("#final-time")
const missesSpan = document.querySelector("#final-misses")
const outerContainer = document.querySelector(".outer-container")
const currentMoves = document.querySelector("#current-moves")
const currentTime = document.querySelector("#current-time")
const currentMisses = document.querySelector("#current-misses")
const bestMovesSpan = document.querySelector("#best-moves")
const timeForBestMoves = document.querySelector("#time-for-best-moves")
const bestTimeSpan = document.querySelector("#best-time")
const movesInBestTime = document.querySelector("#moves-in-best-time")
const closePupupButton = document.querySelector(".close-popup")
const popupTimePara = document.querySelector(".popup-time-para")
const popupMovesPara = document.querySelectorAll(".popup-moves-para")
const flipAudio = new Audio("/media/flip.wav")
const correctAudio = new Audio("/media/correct.wav")
var cardsTurned = 0, moves = 0, time=0, interval=null, bestTime=null, bestMoves=null, misses=0

const shuffleEmojis = () => {
    for(let i=0; i<15; i++){
        const randomIndex = Math.floor(Math.random()*emojis.length);
        var temp = emojis[i]
        emojis[i] = emojis[randomIndex]
        emojis[randomIndex] = temp
    }
}

const showPopup = () => {
    movesSpan.innerText = moves
    timeSpan.innerText = time
    missesSpan.innerText = misses
    outerContainer.classList.add("blur")
    winPopup.style.display = "flex"
    winPopup.style.animation = "popupAnimation 0.2s ease-out forwards"
}

const hidePopup = () => {
    outerContainer.classList.remove("blur")
    winPopup.style.display = "none"
}

const reveal = (card, emoji) => {
    revealedCards[card.id] = 1
    card.style.backgroundColor = "#fff"
    card.style.transform = "rotateY(180deg)"
    card.innerText = emoji
}

const cover = (card) => {
    revealedCards[card.id] = 0
    card.style.backgroundColor = "#229b7f"
    card.style.transform = "rotateY(0deg)"
    card.innerText = "";
}

const resetGame = () => {
    shuffleEmojis()
    const cards = grid.querySelectorAll(".card")
    cards.forEach((card) => {
        cover(card)
    })
    hidePopup()
    cardsTurned = 0
    moves = 0
    misses = 0
    lastClickedDiv=null
    time = 0
    currentTime.innerText = time
    currentMoves.innerText = moves
    currentMisses.innerText = misses
    if(interval!==null){
        clearInterval(interval)
        interval=null
    }
}

const celebrate = () => {
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
    if(bestTime===null || time<bestTime){
        celebrate()
        popupTimePara.style.animation = "zoom 1s 3"
        bestTime = time
        bestTimeSpan.innerText = time
        movesInBestTime.innerText = moves
    }
    if(bestMoves===null || moves<bestMoves){
        celebrate()
        popupMovesPara.forEach(para => {
            para.style.animation = "zoom 1s 3"
        })
        // popupMovesPara.style.animation = "zoom 1s 3"
        bestMoves = moves
        bestMovesSpan.innerText = moves
        timeForBestMoves.innerText = time
    }
    currentTime.innerText = time
    if(interval!==null){
        clearInterval(interval)
        interval=null
    }
    showPopup()
    // resetGame()
}

const createCards = () => {
    shuffleEmojis()
    for(let i=0; i<16; i++){
        const div=document.createElement("div")
        div.classList.add("card")
        div.id = i
        grid.appendChild(div)
        div.addEventListener("click", () => {
            if(revealedCards[div.id]!==1){
                flipAudio.play()
                if(moves===0 && lastClickedDiv===null){
                    interval = setInterval(()=>{
                        time++;
                        currentTime.innerText = time
                    }, 1000)
                }
                reveal(div, emojis[i])
                if(lastClickedDiv!==null){
                    // console.log(lastClickedDiv.innerText)
                    moves+=1
                    currentMoves.innerText = moves
                    if(lastClickedDiv.innerText!==div.innerText){
                        misses++
                        currentMisses.innerText = misses
                        const clickedDiv = lastClickedDiv
                        const currentDiv = div
                        setTimeout(()=>{
                            cover(clickedDiv)
                            cover(currentDiv)
                        }, 500)
                    }
                    else{
                        correctAudio.play()
                        cardsTurned+=2
                        if(cardsTurned===16){
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

createCards()