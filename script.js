const player_char = document.querySelector('.player_char');

/* Function to handle key presses */
function handleKeyup(event) {
    if(event.keyCode === 32) {
        jump();
    }
} 
/* Function to handle jumping */
function jump() {
    let position = 0;
    // going up
    let upInterval = setInterval(() => {
        // checks if max height is achieved
        if(position >= 150){
            // clears interval
            clearInterval(upInterval);
            // going down
            let downInterval = setInterval(() => {
                // checks if min height is achieved
                if(position <= 0){
                    // clears interval
                    clearInterval(downInterval);
                }else{
                    // goes down
                    position -= 20;
                    player_char.style.bottom = position + 'px';
                }
            }, 20);
        }else {
            // goes up
            position += 20;
            player_char.style.bottom = position + 'px';
        }
    }, 20);
}
document.addEventListener('keyup', handleKeyup);