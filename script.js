const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector("[ data-user]");
const newGameButton = document.querySelector(".btn");
const wiinerData = document.querySelector("[winner-data]");
//some variable that we need in our project
let currentPlayer;
let gameGrid;
// let answer;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

//lets create a function to initialise a game*******
function initGame() {
    //step 1 set current player to x
     currentPlayer = "X";

    //step 2 set all grid to empty 
    gameGrid = ["","","","","","","","",""];

    //step3 update on the UI
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // wiinerData.classList.remove("active");
        //green color ko remove krna hai
        box.classList = `box box${index+1}`;
    });
    wiinerData.classList.remove("active");
    //step3 remove active class to hide btn 
    newGameButton.classList.remove("active");
    //show info-user
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapturn(){
    if(currentPlayer === "X"){
        currentPlayer = "0";
    }
    else{
        currentPlayer = "X";
    }
    
    //UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    // wiinerData.classList.remove("active");
}


//function for reset game*******


function checkGameOver(){
    
  let  answer = "";
    
    
    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

                //check if winner is X
                if(gameGrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                // //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    // //it means we have a winner
    if(answer !== "") {
        wiinerData.classList.add("active");
        wiinerData.innerText = `Winner🏆 Player -> ${answer}`;
        newGameButton.classList.add("active");
        return;
    }

    // //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    // //board is Filled, game is TIE
    if(fillCount === 9) {
        wiinerData.classList.add("active");
        wiinerData.innerText = "Game Tied 😟 !";
        newGameButton.classList.add("active");
    }

}

//check for new button*********
// it means we have wiiner




//function to handle click boxes

function handleClick(index){
    //check if first box is empty or not
    if(gameGrid[index] === ""){
        //update to the UI
        boxes[index].innerText = currentPlayer;
        //it check on 26 line
        gameGrid[index] = currentPlayer;
        
        boxes[index].style.pointerEvents = "none";
        // wiinerData.classList.remove("active");
        
        //now check for turn 
        
swapturn();
//check for winner
checkGameOver();
}
};



//now we add functionality to each boxes
boxes.forEach((box,index) => {
    box.addEventListener("click",() => {
        handleClick(index);
        // console.log(index);
    })
});

newGameButton.addEventListener("click",initGame);
