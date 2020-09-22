var numSquares = 6;
var colorStrings = [];
var colorValues = [];
var pickedColor;
var colArr = ["R", "G", "B"]
var squares = document.querySelectorAll(".square");
var palletes = document.querySelectorAll(".pallete-square")
var messageDisplay = document.getElementById("message");
var topBar = document.querySelector("#top-bar");
var resetButton = document.querySelector("#reset");
var easyBtn = document.querySelector("#easyBtn")
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        })
    }
}

function setupSquares() {
    for (var i = 0; i < squares.length; i++) {
        //add initial colors to squares
        //add event listeners 
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor[0]) {
                messageDisplay.textContent = "Correct!";
                changeColors(clickedColor);
                resetButton.textContent = "Play Again?"
            } else {
                this.style.backgroundColor = "white";
                messageDisplay.textContent = "Try Again"

            }
        })
    }
}

function setupPallete() {
    for (var i = 0; i < palletes.length; i++) {
        var color = [0, 0, 0];
        color[i] = pickedColor[1][i];
        color = "rgb(" + String(color) + ")";
        palletes[i].style.backgroundColor = color;
        palletes[i].textContent = colArr[i] + "  " + pickedColor[1][i]

    }
}


function reset() {
    //generate all new colorStrings
    var tempArr = generateRandomColors(numSquares);
    colorStrings = tempArr[0];
    colorValues = tempArr[1];
    //pick a new random color
    pickedColor = pickColor();
    //change display of the rgb pallets based on picked colors 
    setupPallete();
    messageDisplay.textContent = "";
    resetButton.textContent = "New Colors";
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
        if (colorStrings[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colorStrings[i];
        } else {
            squares[i].style.display = "none";
        }

    }

}



resetButton.addEventListener("click", function() {
    reset();
});



function changeColors(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;

    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colorStrings.length);
    return [colorStrings[random], colorValues[random]]
}

function generateRandomColors(num) {
    //make an array
    var stringArray = [];
    var valueArray = []
    var tempArray = []
        //add num random colors to array 
    for (var i = 0; i < num; i++) {
        tempArray = randomColor()
        stringArray.push(tempArray[0])
        valueArray.push(tempArray[1])
    }
    //return that array 

    return [stringArray, valueArray]
}

function randomColor() {
    //pick a "red" from 0-255
    var r = Math.floor(Math.random() * 256)

    //pick a "green" from 0-255
    var g = Math.floor(Math.random() * 256)

    //pick a "blue" from 0-255
    var b = Math.floor(Math.random() * 256)

    return ["rgb(" + r + ", " + g + ", " + b + ")", [r, g, b]];
}