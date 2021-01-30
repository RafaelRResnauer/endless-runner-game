// var que representa o personagem do jogador
const player_char = document.querySelector('.player_char');
// var que representa o mostrador de pontos
const show_score = document.querySelector('.show_score');
// var que representa pontos
let score = 0;
// var que representa o background
const static_background = document.querySelector('.static_background');
// verifica o estado de pulo
let isJumping = false;
// posicao do personagem
let charPosition = 0;

// aumenta a pontuacao
let scoreInterval = setInterval(() => {
    score++;
    show_score.innerHTML = 'Score: ' + score;
}, 1);

/* Funcao para tratar pressionamento de tecla */
function handleKeyup(event) {
    if(event.keyCode === 32) {
        if(!isJumping){

            jump();
        }
    }
} 

/* Funcao para lidar com pulos */
function jump() {
    // personagem esta pulando
    isJumping = true;

    // indo para cima
    let upInterval = setInterval(() => {
        // verifica se chegou na altura maxima
        if(charPosition >= 150){
            // limpa intervalo
            clearInterval(upInterval);
            // indo para baixo
            let downInterval = setInterval(() => {
                // verifica se posicao minima foi atingida
                if(charPosition <= 0){
                    // limpa intervalo
                    clearInterval(downInterval);

                    // personagem chegou ao chao
                    isJumping = false;
                }else{
                    // vai para baixo
                    charPosition -= 20;
                    player_char.style.bottom = charPosition + 'px';
                }
            }, 20);
        }else {
            // vai para cima
            charPosition += 20;
            player_char.style.bottom = charPosition + 'px';
        }
    }, 20);
}

/* Funcao para criar cacto*/
function createCactus() {
    //cria cacto no index
    const cactus = document.createElement('div');
    // define posicao
    let cactusPosition= 1000;
    // randomiza tempo
    let randomTime = Math.random() * 6000;
    
    // passa caracteristicas para cacto e o coloca na tela
    cactus.classList.add('cactus_obstacle');
    cactus.style.left = 1000 + 'px';
    static_background.appendChild(cactus);
    
    // define movimentacao do cacto
    let cactusInterval = setInterval(() => {
        // verifica se saiu da tela ou se teve colisao
        if(cactusPosition < -60) {
            clearInterval(cactusInterval);
            static_background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && charPosition < 60){
            clearInterval(cactusInterval);
            clearInterval(scoreInterval);
            document.body.innerHTML = '<h1 class="game_over">Fim de Jogo<br> Sua pontuação final é: ' + score + '</h1>';

        }else {
            cactusPosition -= 20;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createPterodactyl, randomTime);
}

/* Funcao para criar pterodactilo */
function createPterodactyl(){
    //cria pterodactilo no index
    const pterodactyl = document.createElement('div');
    //define posicao
    let pterodactylPosition= 1000;
    // randomiza tempo
    let randomTime = Math.random() * 6000;

    // passa caracteristicas para pterodactilo e o coloca na tela
    pterodactyl.classList.add('pterodactyl_obstacle');
    pterodactyl.style.left = 1000 + 'px';
    static_background.appendChild(pterodactyl);

    // define movimentacao do cacto
    let pterodactylInterval = setInterval(() => {
        // verifica se saiu da tela ou ouve colisao
        if(pterodactylPosition < -60) {
            clearInterval(pterodactylInterval);
            static_background.removeChild(pterodactyl);
        }else if(pterodactylPosition > 0 && pterodactylPosition < 60 && charPosition > 70 && charPosition < 130){
            clearInterval(pterodactylInterval);
            clearInterval(scoreInterval);
            document.body.innerHTML = '<h1 class="game_over">Fim de Jogo<br> Sua pontuação final é: ' + score + '</h1>';
        }else {
            pterodactylPosition -= 20;
            pterodactyl.style.left = pterodactylPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}

// comeca processo alternando entre cactus e pterodactilo
createCactus();

// verifica se tecla foi pressionada
document.addEventListener('keyup', handleKeyup);