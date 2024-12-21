let emojis = ["😍", "🥸","💀", "🐦‍🔥","🌊", "🤡","👾", "🐼","😍", "🥸","💀", "🐦‍🔥","🌊", "🤡","👾", "🐼"]
const revealedCards = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

var lastClickedDiv = null
const reset = document.querySelector(".reset")
const playAgain = document.querySelector(".playAgain")
const grid = document.querySelector(".grid")
const winPopup = document.querySelector(".winPopup")
const movesSpan = document.querySelector("#final-moves")
const timeSpan = document.querySelector("#final-time")
const outerContainer = document.querySelector(".outer-container")
const currentMoves = document.querySelector("#current-moves")
const currentTime = document.querySelector("#current-time")
var cardsTurned = 0, moves = 0, time=0, interval=null

const shuffleEmojis = () => {
    for(let i=0; i<15; i++){
        const randomIndex = Math.floor(Math.random()*emojis.length);
        var temp = emojis[i]
        emojis[i] = emojis[randomIndex]
        emojis[randomIndex] = temp
    }
}

const showPopup = () => {
    outerContainer.style.filter = "blur(8px)"
    winPopup.style.display = "flex"
    winPopup.style.animation = "popupAnimation 0.2s ease-out forwards"
}

const hidePopup = () => {
    outerContainer.style.filter = "blur(0px)"
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
    card.style.transform = "rotateY(180deg)"
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
    lastClickedDiv=null
    time = 0
    currentTime.innerText = time
    currentMoves.innerText = moves
    if(interval!==null){
        clearInterval(interval)
        interval=null
    }
}

const gameWon = () => {
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
    movesSpan.innerText = moves
    timeSpan.innerText = time
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
            if(moves===0 && lastClickedDiv===null){
                interval = setInterval(()=>{
                    time++;
                    currentTime.innerText = time
                }, 1000)
            }
            if(revealedCards[div.id]===1){
                return
            }
            reveal(div, emojis[i])
            if(lastClickedDiv!==null){
                // console.log(lastClickedDiv.innerText)
                moves+=1
                currentMoves.innerText = moves
                if(lastClickedDiv.innerText!==div.innerText){
                    const clickedDiv = lastClickedDiv
                    const currentDiv = div
                    setTimeout(()=>{
                        cover(clickedDiv)
                        cover(currentDiv)
                    }, 500)
                }
                else{
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
        })
    }
}

reset.addEventListener("click", () => {
    resetGame()
})

playAgain.addEventListener("click", () => {
    resetGame()
})

createCards()