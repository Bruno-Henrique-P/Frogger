const tabu = document.getElementsByClassName('container');
let direction = 76;
let moves = direction;
const width = 9;
const start = document.getElementById('start');
let gameISon = false
let timeLeft = 20;
const timeleftTabu = document.getElementById('timeleft');
const result = document.getElementById('Result');

tabu[0].children[moves].classList.add('green')
tabu[0].children[4].classList.add('red')

document.addEventListener('keydown' , moveFrog)

function moveFrog(e){

    tabu[0].children[moves].classList.remove('green')
    if((gameISon)){
        switch(e.key){
            case 'ArrowLeft':
                if((moves % width != 0)){
                    moves = moves -1
                }
                break
            case 'ArrowRight':
                if((moves % width != width-1)){
                    moves = moves +1
                }
                break
            case 'ArrowUp':
                if(moves - width >= 0){
                    moves = moves - width
                }
                break
            case 'ArrowDown':
                if(moves + width <= 80){
                    moves = moves + width
                }
                break
            }
        }
        tabu[0].children[moves].classList.add('green')
}


let wichTime = 0
let space = 0
function moveSecondCar(){
    if(wichTime > 2 ){
        wichTime = 0
    }
    
    for(let x = 45 ; x <53 ; x = x+3){
        tabu[0].children[x+space].classList.remove('black'); 
    }
    
    if(wichTime == 0){
        space = 0
    } else if(wichTime == 1){
        space = 1
    }else {
        space = 2
    }
    
    for(let x = 45 ; x <53 ; x = x+3){
        tabu[0].children[x+space].classList.add('black'); 
    }

    wichTime++
}

let spaceCar1 = 0

function moveFirtCar(){

    if(wichTime > 2 ){
        wichTime = 0
    }
    
    for(let x = 54 ; x <62 ; x = x+3){
        tabu[0].children[x+spaceCar1].classList.remove('black');
    }

    if(wichTime == 0){
        spaceCar1 = 0
    } 
    else if(wichTime == 1){
        spaceCar1 = 2
    }
    else {
        spaceCar1 = 1
    }

    for(let x = 54 ; x <62 ; x = x+3){
        tabu[0].children[x+spaceCar1].classList.remove('gray'); 
        tabu[0].children[x+spaceCar1].classList.add('black'); 
    }
 
}

let xLog1=[26,27,30,31,32,35]
let xlogAdd = xLog1

function moveFirtLog(){           
    for(let loop = 27 ; loop <= 35 ; loop++ ){
        tabu[0].children[loop].classList.remove('brown'); 
    }
    xlogAdd.forEach(x =>{
        if(!(x < 27)){
            tabu[0].children[x].classList.add('brown'); 
        }
    })
        
    xlogAdd = xlogAdd.map(x =>x + 1)
    xlogAdd.forEach((x,index) =>{
        if(x > 35){
            xlogAdd.splice(index,1);
            xlogAdd.push(26)
        }
    })
}

let x2=[18,21,22,23,26,27]
let x1 = x2;

function moveSecondLog(){
    indexCor = 19
    for(let loop = 18 ; loop <= 26 ; loop++ ){
        tabu[0].children[loop].classList.remove('brown'); 
    }
    x1.forEach(x =>{
        if(!(x > 26)){
            tabu[0].children[x].classList.add('brown'); 
        }
    })
        
    x1 = x1.map(x =>x - 1)
    x1.forEach((x,index) =>{
        if(x < 18){
            x1.splice(index,1);
            x1.push(27)
        }
    })
     
}

let startTheMoviment;

function lose(){
    if(tabu[0].children[moves].classList.contains('black')||tabu[0].children[moves].classList.contains('brown') || timeLeft < 0){
        result.innerHTML = 'Voce Perdeu';
        resetGame();
    }
}

function clearTable(){
    const arr = Array.from(tabu[0].children);
    arr.forEach(x =>{
        if(x.classList.contains('black') || x.classList.contains('brown')){
            x.classList.remove('black')
            x.classList.remove('brown');
        }
    })

}

function win(){
    if(tabu[0].children[moves].classList.contains('red')){
        result.innerHTML = 'Vaoce Ganhou';
        resetGame();
    }
}

function resetGame(){
    timeLeft = 20;
    startGame();
    tabu[0].children[moves].classList.remove('green');
    tabu[0].children[direction].classList.add('green');
    moves = direction;
    clearTable();
    gameISon = false;
    wichTime = 0
    space = 0
    spaceCar1 = 0  
    x2=[18,21,22,23,26,27]
    x1 = x2;
    xLog1=[26,27,30,31,32,35]
    xlogAdd = xLog1
}


function checkWin(){
    lose();
    win();
}

function MovimentObj(){
    timeLeft--
    checkWin() 
    moveFirtCar()
    moveSecondCar()
    moveFirtLog()
    moveSecondLog()
    timeleftTabu.textContent = timeLeft
}



function startGame(){
    
    if(!(gameISon)){
        startTheMoviment = setInterval(MovimentObj,500)
        gameISon = true
        result.innerHTML = '';
    } else {
        clearInterval(startTheMoviment)
        gameISon = false
    }
}

start.addEventListener('click' , startGame);




