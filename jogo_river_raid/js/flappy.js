function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function Barreira() {
    this.elemento = novoElemento('div', 'barreira')
    const corpo = novoElemento('div', 'corpo')
    // this.elemento.appendChild(corpo)
    this.elemento.appendChild(corpo)

    this.setAltura = altura => corpo.style.width = `${altura}px`

}

/* const b= new Barreira(false)
b.setAltura(500)
document.querySelector('[wm-flappy]').appendChild(b.elemento) */  



function ParDeBarreiras(altura, abertura, popsicaoNaTela) {
    this.elemento = novoElemento('div', 'par-de-barreiras')
    this.superior = new Barreira(true)
    this.inferior = new Barreira(false)

    this.elemento.appendChild(this.superior.elemento)
    this.elemento.appendChild(this.inferior.elemento)


    this.sortearAbertura = () => {
        const alturaSuperior = /*Math.random() **/ (altura - abertura)
        const alturaInferior = altura - abertura /*- alturaSuperior*/
        this.superior.setAltura(alturaSuperior)
        this.inferior.setAltura(alturaInferior)
    }
    this.getX = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setX =  popsicaoNaTela => this.elemento.style.bottom = `${popsicaoNaTela}px`
    this.getLargura = () => this.elemento.clientHeight

    this.sortearAbertura()
    this.setX(popsicaoNaTela)
} 

/* const b= new ParDeBarreiras(500,300,1000)
document.querySelector('[wm-flappy]').appendChild(b.elemento)  */

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new ParDeBarreiras(altura, abertura , largura),
        new ParDeBarreiras(altura, abertura , largura + espaco),
        new ParDeBarreiras(altura, abertura , largura + espaco * 2),
        new ParDeBarreiras(altura, abertura -10, largura + espaco * 3),
        new ParDeBarreiras(altura, abertura -15, largura + espaco * 4),
        new ParDeBarreiras(altura, abertura -20, largura + espaco * 5),
        new ParDeBarreiras(altura, abertura -25, largura + espaco * 6),
        new ParDeBarreiras(altura, abertura -30, largura + espaco * 7),
        new ParDeBarreiras(altura, abertura -35, largura + espaco * 8),
        new ParDeBarreiras(altura, abertura -40, largura + espaco * 9)
    ]

    const deslocamento = 5
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)
                console.log("Posi x: ",par.getX())
                console.log("largura: ", par.getLargura())
            if (par.getX() < - par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                //par.sortearAbertura()
            }
            // const meio = largura / 2
            // const cruzouMeio = par.getX() + deslocamento >= meio
            //     && par.getX() < meio
            // if (cruzouMeio) {
            //     notificarPonto()
            // }
        })
    }
}

// const barreiras = new Barreiras(400, 200, 100, 100)
// const areaDoJogo = document.querySelector('[wm-flappy]')

// barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento)) 

// setInterval(() => {
//     barreiras.animar()
    
// },20)  


function Passaro(alturaJogo) {
    let voando = false
    this.elemento = novoElemento('img', 'passaro')
    this.elemento.src = 'img/passaro.png'

    this.getY = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setY = y => this.elemento.style.left = `${y}px`

    window.onkeydown = e => voando = true
    window.onkeyup = e => voando = false

    this.animar = () => {
        const novoY = this.getY() + (voando ? 10 : -5)
        const alturaMaxima =  this.elemento.clientWidth
        if (novoY <= 0) {
            this.setY(0)
        } else if (novoY >= alturaMaxima) {
            this.setY(alturaMaxima)
        } else {
            this.setY(novoY)
        }
    }
    this.setY(alturaJogo / 2)
}

 const barreiras = new Barreiras(400, 200, 100, 100)
const passaro = new Passaro(1200)

const areaDoJogo = document.querySelector('[wm-flappy]')

areaDoJogo.appendChild(passaro.elemento)
barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento)) 

setInterval(() => {
      barreiras.animar()
      passaro.animar() 
},20) 


//  function Progresso() {

//     this.elemento = novoElemento('span', 'progresso')
//     this.atualizarPontos = pontos => {
//         this.elemento.innerHTML = pontos
//     }
//     this.atualizarPontos(0)
// }

// /*  const barreiras = new Barreiras(700, 400, 200, 400)
// const passaro = new Passaro(700)

// const areaDoJogo = document.querySelector('[wm-flappy]')

// areaDoJogo.appendChild(passaro.elemento)
// barreiras.pares.forEach( par => areaDoJogo.appendChild(par.elemento))  */


 function estaoSobrepostos(elementoA, elementoB) {

    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()
    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function colidiu(passaro, barreiras) {
    let colidiu = false

    barreiras.pares.forEach(parDeBarreiras => {
        if (!colidiu) {
            const superior = parDeBarreiras.superior.elemento
            const inferior = parDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(passaro.elemento, superior)
                || estaoSobrepostos(passaro.elemento, inferior)
        }
    })
    return colidiu

}

//  function FlappyBird() {
//     let pontos = 0
//     const areaDoJogo = document.querySelector('[wm-flappy]')
//     const altura = areaDoJogo.clientHeight
//     const largura = areaDoJogo.clientWidth

//     const progresso = new Progresso()
//     const barreiras = new Barreiras(altura, largura, 200, 400,
//         () => progresso.atualizarPontos(++pontos))

//     const passaro = new Passaro(altura)

//     areaDoJogo.appendChild(progresso.elemento)
//     areaDoJogo.appendChild(passaro.elemento)
//     barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))

//     this.start = () => {
//         const temporizador = setInterval(() => {
//             barreiras.animar()
//             passaro.animar()

//               if(colidiu(passaro,barreiras)){
//                  clearInterval(temporizador) 
//              } 
//         }, 20)
//     }
// }
//  new FlappyBird().start() 