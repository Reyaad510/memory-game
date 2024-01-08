const gameContainer = document.getElementById("game");
const startGameBtn = document.querySelector("#start-game");
const score = document.querySelector("#score");
const restart = document.querySelector("#restart");
const h2 = document.querySelector("h2");
let clicked = 0;
matchArr = [];
targetArr = [];
let start = "false";
let guessScore = 0;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "pink",
  "blue",
  "green",
  "orange",
  "purple",
  "pink",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    // Storing last arr element in a temp variable
    let temp = array[counter];
    // Setting last array[counter(9 -> 8 -> 7 -> 6)] to random color from array[index]
    array[counter] = array[index];
    // Setting the random array[index] to the color of what array[counter] was that was stored in variable temp before it had changed
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// Start game
if (start === "false") {
  gameContainer.classList.add("clicked");
}

startGameBtn.addEventListener("click", function (e) {
  start = "true";
  gameContainer.classList.remove("clicked");
  gameContainer.classList.remove("blur");
  h2.classList.remove("blur");
  e.target.style.display = "none";
  restart.style.display = "flex";
});

// Restart game
restart.addEventListener("click", function (e) {
  start = "false";

  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }

  e.target.style.display = "none";
  startGameBtn.style.display = "flex";
  guessScore = 0;
  score.innerText = guessScore;

  shuffle(COLORS);
  createDivsForColors(shuffledColors);
  gameContainer.classList.add("clicked");
  gameContainer.classList.add("blur");
  h2.classList.add("blur");
});

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if (clicked < 2) {
    event.target.style.backgroundColor = event.target.className;
    event.target.classList.add("clicked");
    matchArr.push(event.target.className);
    targetArr.push(event.target);

    clicked++;
  }
  if (clicked == 2) {
    gameContainer.classList.add("clicked");
    let colorOne = matchArr[0];
    let colorTwo = matchArr[1];
    if (colorOne === colorTwo) {
      setTimeout(function () {
        clicked = 0;
        targetArr = [];
        matchArr = [];
        gameContainer.classList.remove("clicked");
      }, 500);
      guessScore++;
      score.innerText = guessScore;

      console.log("Match!");
    } else {
      setTimeout(function () {
        targetArr[0].style.backgroundColor = "antiquewhite";
        event.target.style.backgroundColor = "antiquewhite";
        event.target.classList.remove("clicked");
        targetArr[0].classList.remove("clicked");
        clicked = 0;
        targetArr = [];
        matchArr = [];
        gameContainer.classList.remove("clicked");
      }, 1000);
      guessScore++;
      score.innerText = guessScore;

      console.log("No match. Try again!");
    }
  }
}

// when the DOM loads

createDivsForColors(shuffledColors);
