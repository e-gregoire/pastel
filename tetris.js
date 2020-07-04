
document.addEventListener('DOMContentLoaded', () => {

// Code goes here
    const grid = document.querySelector('.tetris-grid')    
    let squares = Array.from(document.querySelectorAll('.tetris-grid div'))    
    const scoreDisplay = document.querySelector('#tetris-score')    
    const startButton = document.querySelector('#tetris-start')  
    const easyButton= document.querySelector('#tetris-easy') 
    const mediumButton= document.querySelector('#tetris-medium') 
    const hardButton= document.querySelector('#tetris-hard')  
    const width = 10    
    let nextRandom = 0    
    let timerId    
    let score = 0    
    const colors = [
        'rgb(237, 44, 70)',
        'rgb(230, 115, 0)',
        'rgb(102, 0, 255)',
        'rgb(153, 51, 153)',
        'rgb(0, 179, 134)'   
    ]  
    
    //stop the window from scrolling with the arrows
    window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

    
// Tetrokitten
    const LTetrokitty = [    
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]    
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
    squares[currentPosition + index].style.backgroundColor = colors[random]    
     })
    }
    draw()        

// undraw the kittens
function undraw() {
    current.forEach(index => { squares[currentPosition + index].classList.remove('Tetrokitty')    
    squares[currentPosition + index].style.backgroundColor = ''
     })
    }

//assign functions to keyCodes!!!
  function control(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 38) {
      rotate()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
     moveDown()
     }
  }
  
  document.addEventListener('keydown', control)
   
//move down function
function moveDown() {
    undraw()
    currentPosition += width
    draw()
    freeze()
  } 
      
//freeze function
  function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))
      //start a new kitten falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * Tetrokitten.length)
      current = Tetrokitten[random][currentRotation]
      currentPosition = 4
      draw()
      displayShape()
      addScore()
      gameOver()
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
const displayIndex = 0

// kitten without the rotation
const upNextTetrokitten = [
    [1, displayWidth+1, displayWidth*2+1, 2], //lTetrokitty
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetrokitty
    [1, displayWidth, displayWidth+1, displayWidth+2], //tTetrokitty
    [0, 1, displayWidth, displayWidth+1], //oTetrokitty
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1] //iTetrokitty
  ]

//display the shape in the mini-grid display
 function displayShape() {
    //remove any trace of kitten form the entire grid
      displaySquares.forEach(square => {
      square.classList.remove('Tetrokitty')
      square.style.backgroundColor = ''
      })
      upNextTetrokitten[nextRandom].forEach( index => {
      displaySquares[displayIndex + index].classList.add('Tetrokitty')
      displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
      
    })
  }   
    //add functionality to the buttons 
  easyButton.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 1000)
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      displayShape()
    }
  })  
  
  mediumButton.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 700)
      nextRandom = Math.floor(Math.random()*theTetrominoes.length)
      displayShape()
    }
  })
  
  hardButton.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
      } else {
      draw()
      timerId = setInterval(moveDown, 300)
      nextRandom = Math.floor(Math.random()*Tetrokitten.length)
      displayShape()
    }
 })
 
  //add score
function addScore() {
    for (let i = 0; i < 199; i +=width) {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
        if(row.every(index => squares[index].classList.contains('taken'))) {
        score +=10
        scoreDisplay.innerHTML = score
        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('Tetrokitty')
          squares[index].style.backgroundColor = ''
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  } 
  
//game over function
function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
    scoreDisplay.innerHTML = 'End'+ ':' + score   
    //scoreDisplay.innerHTML = score
    clearInterval(timerId)
  
   } 
 }
})
