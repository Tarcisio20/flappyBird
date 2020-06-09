console.log('[Tarcisio Silva Dev] - Inicio do Flappy Bird')


let frames = 0
const som_Hit = new Audio()
som_Hit.src = './efeitos/hit.wav'

const sprites = new Image()
sprites.src = './sprites.png'


const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')



// [PLANO DE FUNDO]
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha(){
        contexto.fillStyle = '#70c5ce'
        contexto.fillRect(0,0, canvas.width, canvas.height)
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        )
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura,
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        )
    }
}

// [MESSAGEM DE GET READY]
const mensagemGetReady = {
    spriteX: 134,
    spriteY: 0,
    largura: 174,
    altura: 152,
    x: (canvas.width / 2) - 174 /2,
    y: 50,
    desenha(){
        contexto.drawImage(
            sprites,
            mensagemGetReady.spriteX, mensagemGetReady.spriteY,
            mensagemGetReady.largura, mensagemGetReady.altura,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.largura, mensagemGetReady.altura
        )
    }
}
//
// [    TELAS   ]
//
const globais = {}
let telaAtiva = {}
function mudaParaTela(novaTela){
    telaAtiva = novaTela

    if(telaAtiva.inicializa){
        telaAtiva.inicializa()
    }
}

const Telas = {
    INICIO: {
        inicializa(){
           globais.flappyBird =  criaFlappyBird()
           globais.chao = criaChao()
        },
        desenha(){   
            planoDeFundo.desenha()
            globais.chao.desenha()
            globais.flappyBird.desenha()
            mensagemGetReady.desenha()
        },
        atualiza(){
            globais.chao.atualiza()
        },
        click(){
            mudaParaTela(Telas.JOGO)
        }
    },
    JOGO: {
        desenha(){
            planoDeFundo.desenha()
            globais.chao.desenha()
            globais.flappyBird.desenha()
        },
        click(){
            globais.flappyBird.pula()
        },
        atualiza(){
            globais.flappyBird.atualiza()
        }
    }
}


function loop(){
    
    telaAtiva.desenha()
    telaAtiva.atualiza()
    frames = frames + 1
    requestAnimationFrame(loop)
}

function fazColisao(flappyBird, chao){
    const flappyBirdY = flappyBird.y + flappyBird.altura
    const chaoY = chao.y

    if(flappyBirdY >= chaoY){
        return true
    }
    return false
}

function criaFlappyBird(){
    // [OBJETO FLAPPY BOARD]
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        largura: 33,
        altura: 24,
        x: 10,
        y: 50,
        pulo: 4.6,
        gravidade: 0.25,
        velocidade: 0,
        frameAtual: 0,
        movimentos : [
            { spriteX : 0, spriteY: 0, }, // asa pra cima
            { spriteX : 0, spriteY: 26, }, // asa no meio
            { spriteX : 0, spriteY: 52, }, // asa pra baixo
            { spriteX : 0, spriteY: 52, }, // asa no meio
        ],
        atualizaFrameAtual(){
            const intervaloDeFrames = 10
            const passouOIntervalo = frames % intervaloDeFrames === 0
            if(passouOIntervalo){
                const baseDoIncremento = 1
                const incremento = baseDoIncremento + flappyBird.frameAtual
                const baseRepeticao = flappyBird.movimentos.length
                flappyBird.frameAtual = incremento % baseRepeticao
            }
        },
        atualiza(){
            if(fazColisao(flappyBird, globais.chao)){
                som_Hit.play()
                setTimeout(function(){
                    mudaParaTela(Telas.INICIO)
                }, 200)
                return
            }
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
            flappyBird.y = flappyBird.y + flappyBird.velocidade
        },
        desenha(){
            // desenha na tela
            flappyBird.atualizaFrameAtual()
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual]
            contexto.drawImage(
                sprites, // Imagem base
                spriteX, spriteY,  //Pegado da img que vamos pegar X | Y
                flappyBird.largura, flappyBird.altura, // Tamanho do sprite que sera desenhado Altura | Largura
                flappyBird.x, flappyBird.y, // Onde será desenhado no canvas
                flappyBird.largura, flappyBird.altura, // Tamanho que será desenhado no canvas
            )
        },
        pula(){
            flappyBird.velocidade = - flappyBird.pulo
        }
    }
    return flappyBird
}

function criaChao(){
    // [CHAO]
    const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 122,
        x: 0,
        y: canvas.height - 112,
        atualiza(){
            const movimentoDoChao = 1
            const repeteEm = chao.largura / 2
            const movimentacao = chao.x = chao.x - movimentoDoChao
            chao.x = movimentacao % repeteEm
        },
        desenha(){
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                chao.x, chao.y,
                chao.largura, chao.altura
            )
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY,
                chao.largura, chao.altura,
                (chao.x + chao.largura), chao.y,
                chao.largura, chao.altura
            )
        }
    }
    return chao
}

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click()
    }
})

mudaParaTela(Telas.INICIO)
loop()