//html elements

const turnDiv = document.querySelector(".turn");

const resetDiv = document.querySelector(".reset");

const squareDivs = document.querySelectorAll(".square");


// game variables

let gameIsLive = true;
let xIsNext = true;
let winner = null;

// functions


const checkGameTurn = () => {

    const top1 = squareDivs[0].classList[2];
    const top2 = squareDivs[1].classList[2];
    const top3 = squareDivs[2].classList[2];
    const middle1 = squareDivs[3].classList[2];
    const middle2 = squareDivs[4].classList[2];
    const middle3 = squareDivs[5].classList[2];
    const bottom1 = squareDivs[6].classList[2];
    const bottom2 = squareDivs[7].classList[2];
    const bottom3 = squareDivs[8].classList[2];
        
    // is there a winner?
    
    if (top1 && top1 === top2 && top1 === top3){   gameIsLive = false;   
    winner = top1;
    turnDiv.innerHTML = `${top1} wins!`;
    
    } else if (middle1 && middle1 === middle2 && middle1 === middle3)
    {   gameIsLive = false;   
    winner = middle1;
    turnDiv.innerHTML = `${middle1} wins!`;
    
    } else if (bottom1 && bottom1 === bottom2 && bottom1 === bottom3)
    {   gameIsLive = false;   
    winner = bottom1;
    turnDiv.innerHTML = `${bottom1} wins!`;
    
    } else if (top1 && top1 === middle1 && top1 === bottom1)    
    {   gameIsLive = false;   
    winner = top1;
    turnDiv.innerHTML = `${top1} wins!`;
    
    } else if (top2 && top2 == middle2 && top2 === bottom2)    {   gameIsLive = false;   
    winner = top2;
    turnDiv.innerHTML = `${top2} wins!`;
    
    }  else if (top3 && top3 == middle3 && top3 === bottom3)    {   gameIsLive = false;   
    winner = top3;
    turnDiv.innerHTML = `${top3} wins!`;
    
    }  else if (top1 && top1 == middle2 && top1 === bottom3)    {   gameIsLive = false;   
    winner = top1;
    turnDiv.innerHTML = `${top1} wins!`;
    
    }  else if (top3 && top3 == middle2 && top3 === bottom1)    {   gameIsLive = false;   
    winner = top3;
    turnDiv.innerHTML = `${top3} wins!`;
    
    }  else if (top1 && top2 && top3 && middle1 && middle2 && middle3 && bottom1 && bottom2 && bottom3)    {   gameIsLive = false;   
    winner = top2;
    turnDiv.innerHTML = 'Game is tied!';
    
    } else {
    
        xIsNext = !xIsNext;
        
        if (xIsNext) {
        
        turnDiv.innerHTML = 'x is next!';
    
        } else { turnDiv.innerHTML = 'o is next!'; 
        }
    
    } 

};



// event handlers

const handleReset = (e) => {

    xIsNext = true;
    turnDiv.innerHTML = 'x is next!';
    
    for (const squareDiv of squareDivs){
    
    squareDiv.classList.remove('x');
    squareDiv.classList.remove('o');
    winner = null;
    
    
    }
};

const handleSquareClick = (e) => {

    const classList = e.target.classList;
    
    const location = classList[1];
    
    if (classList[2] === 'x' || classList[2] === 'o'){
     
        return;
     
    }
    
    
    if (xIsNext){
        classList.add('x');
        
        checkGameTurn();

        
    } 
    
    else {
    classList.add('o');
    
    checkGameTurn();
    
    }

};

// event listeners

resetDiv.addEventListener('click',handleReset);

for (const squareDiv of squareDivs) {
    squareDiv.addEventListener('click', handleSquareClick);
};

