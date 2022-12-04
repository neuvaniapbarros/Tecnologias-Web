function novoElemento(tagName, className) {
    const elemento = document.createElement(tagName)
    elemento.className = className
    return elemento
}

function Barreira() {
    this.elemento = novoElemento('div', 'barreira')
    const corpo = novoElemento('div', 'corpo')
    this.elemento.appendChild(corpo)

    this.setAltura = altura => corpo.style.width = `${altura}px`

}

function ParDeBarreiras(altura, abertura, popsicaoNaTela) {
    this.elemento = novoElemento('div', 'par-de-barreiras')
    this.superior = new Barreira()
    this.inferior = new Barreira()

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

function BarreiasCentrais(){
    this.elemento = novoElemento('div', 'barreiraCentral')
    
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = y => this.elemento.style.left = `${y}px`

       
    this.setY(400)
    this.setX(500)

    const deslocamento = 3;
    this.animar = () => {
      
            this.setY(this.getY() - deslocamento)
        }
}
function Combustivel(){
    this.elemento = novoElemento('img', 'combustivel')
    this.elemento.src = 'img/comb.png'
    
    this.getY = () => parseInt(this.elemento.style.bottom.split('px')[0])
    this.setY = y => this.elemento.style.bottom = `${y}px`
    this.getX = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setX = y => this.elemento.style.left = `${y}px`

       
    this.setY(400)
    this.setX(500)

    const deslocamento = 3;
    this.animar = () => {
      
            this.setY(this.getY() - deslocamento)
        }
}

function Barreiras(altura, largura, abertura, espaco, notificarPonto, notificarEnergia) {
    this.pares = [
        new ParDeBarreiras(altura, abertura , largura),
        new ParDeBarreiras(altura, abertura , largura + espaco),
        new ParDeBarreiras(altura, abertura , largura + espaco * 2),
        new ParDeBarreiras(altura, abertura -10, largura + espaco * 3),
        new ParDeBarreiras(altura, abertura -15, largura + espaco * 4),
        new ParDeBarreiras(altura, abertura -20, largura + espaco * 5)
    ]

    const deslocamento = 3;
    let contador = 0;
    this.animar = () => {
         
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento)
            if (par.getX() < - par.getLargura()) {
                 par.setX(par.getX() + espaco * this.pares.length)
                 contador++;
                //par.sortearAbertura()               
            }
            if(contador ==  6) {
                notificarPonto();
                notificarEnergia()
                contador = 0;
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
function Foguete(alturaJogo) {
    let voando = 0

    this.elemento = novoElemento('img', 'foguete')
    this.elemento.src = 'img/foguete.png'
   
    this.getY = () => parseInt(this.elemento.style.left.split('px')[0])
    this.setY = y => this.elemento.style.left = `${y}px`

    window.onkeypress = function (e) {
        if(e.keyCode == 108)  voando = 1
        else if(e.keyCode == 106)  voando = 2
        else voando = 0
    }     
    
    this.animar = () => {  
        let novoY = this.getY();
        if(voando == 1){
            novoY = this.getY() + 4;
        }
        else if(voando == 2){
            novoY = this.getY() - 4;
        }
    
        const alturaMaxima = alturaJogo - this.elemento.clientWidth

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
  function Progresso() {

    this.elemento = novoElemento('span', 'progresso')
    this.atualizarPontos = pontos => {
        this.elemento.innerHTML =  `Pontuação:  ` + pontos
    }
    this.atualizarPontos(0)
 }
 function Energia() {
    this.elemento = novoElemento('span', 'energia')
    this.atualizarEnergia = energia => {
        this.elemento.innerHTML = `Energia:  ` + energia
    }
    this.atualizarEnergia(5)
 }

 function estaoSobrepostos(elementoA, elementoB) {

    const a = elementoA.getBoundingClientRect()
    const b = elementoB.getBoundingClientRect()
    const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left
    const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top

    return horizontal && vertical
}

function colidiu(foguete, barreiras) {
    let colidiu = false

    barreiras.pares.forEach(parDeBarreiras => {
        if (!colidiu) {
            const superior = parDeBarreiras.superior.elemento
            const inferior = parDeBarreiras.inferior.elemento
            colidiu = estaoSobrepostos(foguete.elemento, superior)
                || estaoSobrepostos(foguete.elemento, inferior)
        }
    })
    return colidiu
}
function colidiuBarreiraCentral(foguete, barreira) {
    let colidiu = false  
        if (!colidiu) {
            const bar = barreira.elemento
            colidiu = estaoSobrepostos(foguete.elemento, bar)
        }
    return colidiu
}
function pegouCombustivel(foguete, combustivel){
    let colidiu = false
   
    if (!colidiu) {
        const comb = combustivel.elemento
        colidiu = estaoSobrepostos(foguete.elemento, comb)
            
    }
return colidiu
}

function telaReiniciar(){
    this.elemento = novoElemento('div', 'tela')
        this.elemento.innerHTML =  `<h1> Fim de Jogo  </h1>` + 
                                                        `<button id = "novo_jogo">Novo Jogo</button> ` +
                                                      `<button id = "sair">Sair</button>`
}

 function FlappyBird() {
    let pontos = 0
    let vida = 5
    
    const areaDoJogo = document.querySelector('[wm-flappy]')
    const areaDeInfo = document.querySelector('[info]')
    const altura = areaDoJogo.clientHeight
    const largura = areaDoJogo.clientWidth

    const progresso = new Progresso()
    const  energia = new Energia()

    areaDeInfo.appendChild(progresso.elemento)
    areaDeInfo.appendChild(energia.elemento)
    
    const barreiras = new Barreiras(400, 200, 50, 110, () => progresso.atualizarPontos(++pontos),  () => energia.atualizarEnergia(--vida))
    const foguete = new Foguete(1200)
    const bar = new BarreiasCentrais()
    const comb = new Combustivel()
   
    areaDoJogo.appendChild(comb.elemento)
   
    barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))   
   
    areaDoJogo.appendChild(foguete.elemento)
    if(pontos > 20){
        areaDoJogo.appendChild(bar.elemento)
    }
    
    this.start = () => {
        const temporizador = setInterval(() => {
            barreiras.animar()
            foguete.animar()
            comb.animar()
            bar.animar()
               if(colidiu(foguete,barreiras) || colidiuBarreiraCentral(foguete,bar) || vida == 0){
                  clearInterval(temporizador)           
                const tela = new telaReiniciar()
                areaDoJogo.appendChild(tela.elemento)
                let botao1 = document.getElementById("novo_jogo");
                let botao2 = document.getElementById("sair");
                    botao1.onclick = function (){
                        location.reload()
                    }
                    botao2.onclick = function (){
                        window.close()
                    }   
               }
               
              if(pegouCombustivel(foguete,comb)){
                comb.elemento.style.display = `none`
                vida++;
                energia.atualizarEnergia(vida)
              }
        }, 20)
    }
}
 new FlappyBird().start() 