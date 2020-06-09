console.log('[Tarcisio Silva Dev] - Inicio do Flappy Bird')

const sprites = new Image()
sprites.src = './sprites.png'


const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')

// [CHAO]
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 122,
    x: 0,
    y: canvas.height - 112,
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

// [OBJETO FLAPPY BOARD]
const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    gravidade: 0.25,
    velocidade: 0,
    atualiza(){
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
        flappyBird.y = flappyBird.y + flappyBird.velocidade
    },
    desenha(){
        // desenha na tela
        contexto.drawImage(
            sprites, // Imagem base
            flappyBird.spriteX, flappyBird.spriteY,  //Pegado da img que vamos pegar X | Y
            flappyBird.largura, flappyBird.altura, // Tamanho do sprite que sera desenhado Altura | Largura
            flappyBird.x, flappyBird.y, // Onde será desenhado no canvas
            flappyBird.largura, flappyBird.altura, // Tamanho que será desenhado no canvas
        )
    }
}


function loop(){
    flappyBird.atualiza()
    planoDeFundo.desenha()
    chao.desenha()
    flappyBird.desenha()
    requestAnimationFrame(loop)
}

loop()