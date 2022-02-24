const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");
const colorDisplayElement = document.getElementById("color-display");

const levels = Array.from(document.getElementsByClassName("mode")); 

let selectedLevelButton = levels.find((level) => {
  const classList = Array.from(level.classList);
  return classList.includes("selected");
}).innerHTML;

let gameLevel = selectedLevelButton.innerHTML;

let squares = getSquares();

levels.forEach((level) => {
    level.addEventListener("click", function() {
        levels.forEach(mode => mode.classList.remove("selected"));
        this.classList.add("selected")  
        
        gameLevel = this.innerHTML;
        setTitleAccordingToGameLevel(gameLevel)
        squares = getSquares()
      
});
});

function getSquares(){
  const allSquares = Array.from(document.getElementsByClassName("square"));
  if(gameLevel == 'Easy'){
    return allSquares.slice(0,3)//set 3 squares on the screen
  }
  else{
    return allSquares//set 6 squares
  }
}

function  setTitleAccordingToGameLevel(currentLevel){
  let allSquares = Array.from(document.getElementsByClassName("square"));
  if (currentLevel == 'Easy'){//set squares to three
   const firstThree = allSquares.slice(0,3)
   const lastThree = allSquares.slice(3,6)

   lastThree.forEach(square => square.classList.add('hidden'))
 }
 else if (currentLevel == 'Hard'){//set six
  allSquares.forEach(square => square.classList.remove('hidden'))
 }
}

//Making all the squares have a backgroung color: RGB
const startButton = document.getElementById("reset");

startButton.addEventListener("click", function (){
  this.innerHTML = "New Colors"
   //assign individual square a background color
  for(let i=0;  i<squares.length; i++){    
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    const rgbString = "rgb("+ red +", "+ green +", " +blue +")"

    const square = squares[i];

    square.dataset.rgb_value = JSON.stringify([red,green,blue])

    //square.style.backgroundColor = "rgb(200, 45,255)"
    square.style.backgroundColor = rgbString 
  }

//Assign header a random rgb value from one of the square values
const randomSquareNumber = Math.floor(Math.random() * squares.length)   
const headerSquareColor = squares[randomSquareNumber]

setHeaderRgbColor(headerSquareColor)
});
 //sorted out the random color generator when start is clicked
 
function setHeaderRgbColor(squareElement){
  const setHeaderElementBackgroundColor = (rgbValues, element) => {
    const [r,g,b] = rgbValues
    const rgbString = `rgb(${r}, ${g}, ${b})`
    console.log(rgbString)
    //element.backgroundColor = "rgb("+ red +", "+ green +", " +blue +")"
    element.style.backgroundColor = rgbString;
    element.innerHTML = rgbValues.find(rgbValue =>{
      return rgbValue  > 0;  
    })
  }
  const rgbString = squareElement.dataset.rgb_value;
  colorDisplayElement.dataset.rgb_value = rgbString;
  const[red, green,blue] = JSON.parse(rgbString); 

  const redBackground = [red,0,0]
  const greenBackground = [0,green,0]
  const blueBackground = [0,0,blue]

  setHeaderElementBackgroundColor(redBackground, rElement)
   setHeaderElementBackgroundColor(greenBackground, gElement)
  setHeaderElementBackgroundColor(blueBackground, bElement)
  
}

//add event listener to each square such that if it is clicked it disappears or changes color
squares.forEach(square =>{
  square.addEventListener("click", function(){
    const headerRgbValue = colorDisplayElement.dataset.rgb_value
    const squareRgbValue = this.dataset.rgb_value

    if(headerRgbValue == squareRgbValue){
      
      setSquareBackgroundAfterCorrect(headerRgbValue)
    }
    else{
     this.classList.add("hidden")
    }

    function setSquareBackgroundAfterCorrect(headerRgbString){
      const [r, g,b] = JSON.parse(headerRgbString)
      const rgbString = `rgb(${r}, ${g}, ${b})`

      squares.forEach(square =>{
        square.classList.remove("hidden") 
        square.style.backgroundColor = rgbString
        square.dataset.rgb_value = colorDisplayElement.dataset.rgb_value
      })
    }
  })
})   