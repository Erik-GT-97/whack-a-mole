const holes = document.querySelectorAll('.hole')
const scoreBoard = document.querySelector('.score')
const moles = document.querySelectorAll('.mole')
let lastHole
let timeUp = false
let score = 0

function randomTime(min,max){
    return Math.round(Math.random() * (max-min) + min)
}

function randomHole(Holes){
    const idx = Math.floor(Math.random()*Holes.length)
    const hole = Holes[idx]
    if (hole === lastHole){
        randomHole(Holes)
    }

    lastHole = hole
    return hole
}

function peep(){
    const time = randomTime(200,1000)
    const hole = randomHole(holes)
    hole.classList.add('up')
    setTimeout(()=> {
        hole.classList.remove('up')
        if (!timeUp) peep()
    }, time)
}

function startGame() {
    score = 0
    scoreBoard.textContent = score
    timeUp = false
    peep()
    setTimeout(() => timeUp = true, 30000)
}

function bonk(e){
    if(!e.isTrusted) return
    score++
    this.classList.remove('up')
    scoreBoard.textContent = score
}

moles.forEach(mole => mole.addEventListener('click', bonk))