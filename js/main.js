/* Name: Viet Cuong Nguyen
** Student ID: 300973502
** Createion Date: 2020/02/03
** Game description: Slot Machine Game
*/

/// <reference path="jquery.js" />
let playerMoney = 1000;
let winnings = 0;
let jackpot = 5000;
let turn = 0;
let playerBet = 0;
let winNumber = 0;
let lossNumber = 0;
let spinResult;
let fruits = "";
let winRatio = 0;
let grapes = 0;
let bananas = 0;
let sevens = 0;
let cherries = 0;
let bars = 0;
let bells = 0;
let oranges = 0;
let blanks = 0;

let counter = 1;

/* Utility function to show Player Stats */
function showPlayerStats()
{
    winRatio = winNumber / turn;
    $("#jackpot").text("Jackpot: $" + jackpot);
    $("#playerMoney").text("Player Money: $" + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}

/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    let jackPotTry = Math.floor(Math.random() * 51 + 1);
    let jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        playSound("../sounds/jackpot.wav");
        displayImages('../img/coin.png','../img/coin.png','../img/coin.png');
        $("div#winOrLose>p").text("You Won the $" + jackpot + " Jackpot!!");
    // alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
        showPlayerStats();
        
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    $("div#winOrLose>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    $("div#winOrLose>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    let betLine = [" ", " ", " "];
    let outCome = [0, 0, 0];

    for (let spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "Grapes";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "Banana";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "Orange";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "Cherry";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "Bar";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "Bell";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "Seven";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if(bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        playSound("../sounds/ding.mp3");
        winNumber++;
        showWinMessage();
    }
    else
    {
        let obj1 = document.createElement("audio");
        obj1.src = "../sounds/error.wav"; 
        obj1.play(); 
        lossNumber++;
        jackpot += parseInt(playerBet);
        showLossMessage();
    }
    
}

/* When the player clicks the spin button the game kicks off */
$("#spinButton").click( function () {
    playerBet = $("div#entry>input").val();

    if (playerMoney == 0)
    {
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            showPlayerStats();
        }
    }
    else if (playerBet > playerMoney) {
        $("div#winOrLose>p").text("not enough Money!");
        playSound("../sounds/error.mp3");
        // alert("You don't have enough Money to place that bet.");
    }
    else if (playerBet <= 0) {
        $("div#winOrLose>p").text("must be a positive $ amount!");
        playSound("../sounds/error.mp3");
        // alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        counter = 1;
        $("div#winOrLose>p").text("");
        $("#spinButton").attr("disabled", true);
        $("#jackpotBtn").attr("disabled", true);
        $("#reset").attr("disabled", true);
        var obj = document.createElement("audio");
        obj.src = "../sounds/sound1.mp3"; 
        obj.play(); 
        setTimeout(() => {
            obj.pause();
            obj.currentTime = 0;
            displayResult();
            $("#jackpotBtn").attr("disabled", false);
            $("#reset").attr("disabled", false);
        }, 1200);
        repeat();
        setTimeout(() => {
            $("#spinButton").attr("disabled", false);
        }, 1800);
        
    }
    else {
        $("div#winOrLose>p").text("Invalid bet amount!");
        playSound("../sounds/error.mp3");
        // alert("Please enter a valid bet amount");
    }
});

/* When the player clicks the reset button to reset the game */
$("#reset").click(function () {
    playSound("../sounds/reset.wav")
    resetAll();
    showPlayerStats();
    $("div#winOrLose>p").text("");
});

/* When the player clicks the jackpot button to get a jackpot*/
$("#jackpotBtn").click(function () {
    playSound("../sounds/jackpot.wav");
    lossNumber++;
    displayImages('../img/coin.png','../img/coin.png','../img/coin.png');
    $("div#winOrLose>p").text("You Won the $" + jackpot + " Jackpot!!");
    // alert("You Won the $" + jackpot + " Jackpot!!");
    playerMoney += jackpot;
    jackpot = 1000;
    showPlayerStats();
});

/* Get the images based on the name of the value*/
function getImage(name) {
    slotName:String;
    switch(String(name)) {
        case "Banana":
            slotName =  '../img/banana.png';
        break;
        case "Bar":
            slotName = '../img/bar.png';
        break;
        case "Cherry":
            slotName = '../img/cherry.png';
        break;
        case "Orange":
            slotName = '../img/orange.png';
        break;
        case "Bell":
            slotName = '../img/bell.png';
        break;
        case "Grapes":
            slotName = '../img/grape.png';
        break;
        case "Seven":
            slotName = '../img/seven.png';
        break;
        default:
            slotName = '../img/blank.png';
    }
    return slotName;
    
}

// repeat random images for 2 seconds
function repeat()
{
    randomImage();
    if (counter < 22){
        counter++
        window.setTimeout(repeat, 50);
    }
    
}

// display result after generate random spin Result
function displayResult() {
    spinResult = Reels();
    fruits = spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2];
    $("div#result>p").text(fruits);
    displayImages(getImage(spinResult[0]),getImage(spinResult[1]),getImage(spinResult[2]));
    determineWinnings();
    turn++;
    showPlayerStats();
}

// generate random images for each slot.
function randomImage()
{
    let pics = Array('../img/banana.png', '../img/bar.png','../img/cherry.png',
                    '../img/orange.png', '../img/bell.png', '../img/grape.png',
                    '../img/seven.png', '../img/blank.png', '../img/blank.png',
                    '../img/coin.png');
    let randomNum1 = Math.floor(Math.random() * pics.length);
    let randomNum2 = Math.floor(Math.random() * pics.length);
    let randomNum3 = Math.floor(Math.random() * pics.length);
    displayImages(pics[randomNum1], pics[randomNum2], pics[randomNum3]);
    // callback();
}

// Generate sound based on the win/lose/jackpot condition
function playSound(soundPath) {
    let sound = document.createElement("audio");
        sound.src = soundPath; 
        sound.play();
}

// display image for each slot
function displayImages(img1, img2, img3) {
    $("#slot1").attr('src', img1);
    $("#slot2").attr('src', img2);
    $("#slot3").attr('src', img3);
}



