let onGoingGame = null
const detallePuntos = document.querySelector("#detalle-puntos")
const detalleX = document.querySelector("#detalle-x")
const detalleY = document.querySelector("#detalle-y")

let naves = Array.from(document.querySelectorAll(".nave"))
const game = document.querySelector("#game-area")

const fps = 18
let puntos = 0

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function posicionarNaves() {
  naves.forEach(nave =>{
    if(nave.classList.contains("enemy")){
      nave.style.left = `${random(0,(game.clientWidth - nave.clientWidth))}px`
      nave.style.top = `${random(0,(game.clientHeight - nave.clientHeight))}px`
    }
  })
}

function moverNaves() {
  naves.forEach(nave => {
    if(!nave.sentidoX){ nave.sentidoX = 1}
    if(!nave.sentidoY){ nave.sentidoY = 1}
    if(!nave.pixelesPaso){ nave.pixelesPaso = random(5,15)}
    let datosNave = {
      izq: nave.offsetLeft,
      der: nave.offsetLeft + nave.clientWidth,
      top: nave.offsetTop,
      bot: nave.offsetTop + nave.clientHeight,
    }
    if ( datosNave.der + nave.pixelesPaso * nave.sentidoX >= game.clientWidth) {
      nave.sentidoX = -1
      nave.style.transform = "rotateZ(270deg)"
    }
    if ( datosNave.izq + nave.pixelesPaso * nave.sentidoX <= 0) {
      nave.sentidoX = 1
      nave.style.transform = "rotateZ(90deg)"
    }
    if ( datosNave.bot + nave.pixelesPaso * nave.sentidoY >= game.clientHeight) {
      nave.sentidoY = -1
      nave.style.transform = "rotateX(0deg)"
    }
    if ( datosNave.top + nave.pixelesPaso * nave.sentidoY <= 0) {
      nave.sentidoY = 1
      nave.style.transform = "rotateX(180deg)"
    }
    nave.style.left = `${datosNave.izq + nave.pixelesPaso * nave.sentidoX}px`
    nave.style.top = `${datosNave.top + nave.pixelesPaso * nave.sentidoY}px`
  })
}

game.addEventListener("click", e => handleClick(e))
function handleClick(e) {
  const target = e.target
  if(target.id === "boss"){
    puntos += 3
  }
  if (target.classList.contains("nave") && onGoingGame) {
    game.removeChild(target)
    naves = naves.filter(nave => nave !== target)
    puntos++
    detallePuntos.innerText=puntos
  }
  if(puntos > 3){
    clearInterval(onGoingGame)
    onGoingGame = null
  }
}

game.addEventListener("mousemove", e=>{
  detalleX.innerText=e.offsetX
  detalleY.innerText=e.offsetY
})

function startGame(){
  posicionarNaves()
  clearInterval(onGoingGame)
  onGoingGame = setInterval(moverNaves, 1000 / fps )
}