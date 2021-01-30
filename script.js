// var que representa o personagem do jogador
const player_char = document.querySelector('.player_char');
const static_background = document.querySelector('.static_background');
let isJumping = false;
// posicao do personagem
let charPosition = 0;

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

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition= 1000;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus_obstacle');
    cactus.style.left = 1000 + 'px';
    static_background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if(cactusPosition < -60) {
            clearInterval(leftInterval);
            static_background.removeChild(cactus);
        }else if(cactusPosition > 0 && cactusPosition < 60 && charPosition < 60){
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game_over">Fim de Jogo</h1>';
        }else {
            cactusPosition -= 20;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout(createPterodactyl, randomTime);
}
function createPterodactyl(){
    const pterodactyl = document.createElement('div');
    let pterodactylPosition= 1000;
    let randomTime = Math.random() * 6000;

    pterodactyl.classList.add('pterodactyl_obstacle');
    pterodactyl.style.left = 1000 + 'px';
    static_background.appendChild(pterodactyl);

    let leftInterval = setInterval(() => {
        if(pterodactylPosition < -60) {
            clearInterval(leftInterval);
            static_background.removeChild(pterodactyl);
        }else if(pterodactylPosition > 0 && pterodactylPosition < 60 && charPosition > 70 && charPosition < 130){
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game_over">Fim de Jogo</h1>';
        }else {
            pterodactylPosition -= 20;
            pterodactyl.style.left = pterodactylPosition + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime);
}
createCactus();

// verifica se tecla foi pressionada
document.addEventListener('keyup', handleKeyup);