

document.addEventListener('DOMContentLoaded', () => {

// Code goes here

    const grid = document.querySelector('.tetris-grid')
    
    let squares = Array.from(document.querySelectorAll('.tetris-grid div'))
    
    const ScoreDisplay = document.querySelector('#tetris-score')
    
    const StartButton = document.querySelector('#tetris-start')
    
    const width = 10
    
    let nextRandom = 0
    
    
// Tetrokitten

    const LTetrokitty = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2+2]
    
    ]
    
    const ZTetrokitty = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
    
    ]

    const TTetrokitty = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
 
    ]

    const OTetrokitty = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  
    ]

    const ITetrokitty = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  
    ]
  
  
  
  const Tetrokitten = [LTetrokitty, ZTetrokitty, TTetrokitty, OTetrokitty, ITetrokitty]


    let currentPosition = 4

    let currentRotation = 0


//randomly select a kitten and the first rotation


  let random = Math.floor(Math.random()*Tetrokitten.length)


  let current = Tetrokitten[random][currentRotation]
  
  



// draw the kittens

function draw() {

    current.forEach(index => { squares[currentPosition + index].classList.add('Tetrokitty')
    
    })

    }


draw()    
    

// undraw the kittens

function undraw() {

    current.forEach(index => { squares[currentPosition + index].classList.remove('Tetrokitty')

})

}


// move down the kitten every second

timerId = setInterval(moveDown, 1000)

//assign functions to keyCodes!!!

function control(e) {

    if(e.keyCode === 37)  {
      moveLeft() 
    } else if (e.keyCode === 38){
      rotate()
    
    } else if (e.keyCode === 39){
      moveRight()
    
    } else if (e.keyCode === 40){
      moveDown()
    
    }
}

document.addEventListener('keyup', control)




   
//move down function

   function moveDown() {

    undraw()
    currentPosition += width
    draw()
    freeze()
    
    }
    
        
// freeze function

 function freeze() {
    
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
    
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    
    // start a new kitten falling
    random = nextRandom
    
    nextRandom= Math.floor(Math.random()*Tetrokitten.length)
    current = Tetrokitten[random][currentRotation]
    currentPosition = 4    
    draw()
    displayShape()
        
    }    
}   


// move the kitten left, unless is at the edge or blocked. 

function moveLeft(){
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
    
    if(!isAtLeftEdge) currentPosition -=1
    

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition +=1
        
      }


  draw()

}

//move the kitten right, unless is a the edge or blocked.

function moveRight(){
    undraw()
    
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    
    if(!isAtRightEdge) currentPosition +=1
    

    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1
        
      }



  draw()

}

//rotate the kittens



function rotate() {

    undraw()
    currentRotation ++ 
    if(currentRotation === current.length) {//if the current rotation gets to 4, make it go back to 0
        currentRotation = 0
    
    }
    current = Tetrokitten[random][currentRotation]
    draw()
}


//show up next kitten

const displaySquares = document.querySelectorAll('.mini-grid-tetris div')
const displayWidth = 4
let displayIndex = 0


// kitten without the rotation

const upNextTetrokitten = [
[1, displayWidth+1, displayWidth*2+1, 2],//Ltetrokitty
[0, displayWidth, displayWidth+1, displayWidth*2+1],//ztetrokitty
[1, displayWidth, displayWidth+1, displayWidth+2]//Ttretrokitty
[0, 1, displayWidth, displayWidth+1]//Otretrokitty
[1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //Itetrokitty

]





//display the shape in the mini-grid display


 function displayShape() {
    //remove any trace of kitten form the entire grid
      displaySquares.forEach(square => {
      square.classList.remove('Tetrokitty')
      square.style.backgroundColor = ''
    })
    upNextTetrominoes[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('tetromino')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
    })
  }

})
