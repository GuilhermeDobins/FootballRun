const dino= document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position=0;

function handleKeyUp(event){
    if(event.keyCode === 32 || event.keyCode === 38){
        if (!isJumping){
            jump();
        }
    }
}

function jump(){
    isJumping=true;
    let upInterval=setInterval(()=> {
        if (position>=220){
            clearInterval(upInterval);
            //Desce
            let downInterval = setInterval(()=>{
            if (position<=0){
                clearInterval(downInterval);
                isJumping=false;
                
               

            } else{
                position-=20;
                dino.style.bottom= position +'px'
            }
            },20)
        }
        else{
            //Sobe
        position+= 20;
        dino.style.bottom = position+'px';
        
        }
    },20)
}

function createCactus(){
    let cactusPosition= 2500;
    let pteroPosition= 2500;
    let randomTime = Math.random() * 6000;
    let randomSpawn = Math.random();


    if(randomSpawn < 0.5){ //Se por acaso o numero gerado aleatoriamente for menor que 0,5, cria um "cactus" (um corredor)
        const cactus = document.createElement('div');
        cactus.classList.add('cactus');
        cactus.style.left=2500 + 'px';
        background.appendChild(cactus);

        let leftInterval = setInterval(()=> {
            cactusPosition -=10;
            cactus.style.left = cactusPosition + 'px';

            if (cactusPosition< -60){
                clearInterval(leftInterval);
                background.removeChild(cactus);
            }
            else if (cactusPosition>0 && cactusPosition<60 && position<140){ //Mudar para cactusPosition < width do dino
                clearInterval(leftInterval);
                document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
            }
            else{
                cactusPosition -= 10;
                cactus.style.left = cactusPosition + 'px';
            }
        },20)
    }else{ //Se o numero gerado for maior que 0,5, entao cria um "pterodactilus" (um jogador voador)
        const ptero = document.createElement('div');
        ptero.classList.add('ptero');
        ptero.style.left = 2500 + 'px';
        background.appendChild(ptero);

        let leftInterval = setInterval(() => {
            pteroPosition -= 10;
            ptero.style.left = pteroPosition + 'px';

            if (pteroPosition < -60) {
                clearInterval(leftInterval);
                background.removeChild(ptero);
            }
            else if (pteroPosition > 0 && pteroPosition < 60 && position > 5) { //Mudar para cactusPosition < width do dino
                clearInterval(leftInterval);
                document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
            }
            else {
                pteroPosition -= 10;
                ptero.style.left = pteroPosition + 'px';
            }
        }, 20)

    }


    setTimeout(createCactus,randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
