//IIFE -- Immediately Invoked Function Expression
// mean? is an anonymous self-executing function
let game = (function(){
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    let slotBackground:objects.Image;
    let slot1:objects.Image;
    let slot2:objects.Image;
    let slot3:objects.Image;
    let title:objects.Image;
    let betLabel:objects.Label;
    let spinButton:objects.Button;
    let playerLabel:objects.Label;
    let jackpotLabel:objects.Label;
    let status:objects.Label;
    let resetButton:objects.Button;
    let jackpotButton:objects.Button;
    let backround:createjs.Bitmap;
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


    /**
     * Perform Initialization in the Start function
     *
     */
    function Start():void
    {
        console.log(`%c Game Started`, "color: blue; font-size:20px;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // declare the framerate as 60FPS
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        Main();
    }

    /**
     * This is the main Game Loop
     * This function 'triggers' every frame
     */
    function Update():void
    {
        stage.update();
    }

    /**
     * This function is the main function of the game

     */
    function Main():void
    {
        backround = new createjs.Bitmap("./Assets/images/bg.png");
        stage.addChild(backround);
        
        title = new objects.Image("./Assets/images/title.png", 375, 50, true);
        stage.addChild(title);
        // startLabel = new objects.Label("Slot Machine", "80px","Verdana", "#000000", 375, 50, true);
        // stage.addChild(startLabel);

        slotBackground = new objects.Image("./Assets/images/slotmachine.png", 375, 200, true);
        stage.addChild(slotBackground);

        slot1 = new objects.Image("./Assets/images/spin.png", 205, 200, true);
        slot2 = new objects.Image("./Assets/images/spin.png", 375, 200, true);
        slot3 = new objects.Image("./Assets/images/spin.png", 550, 200, true);
        stage.addChild(slot1);
        stage.addChild(slot2);
        stage.addChild(slot3);

        betLabel = new objects.Label("Place Your Bet Here:", "35px","Luckiest Guy", "#000000", 275, 370, true);
        stage.addChild(betLabel);

        spinButton = new objects.Button("./Assets/images/spinBtn.png", 590, 405, true);
        stage.addChild(spinButton);

        playerLabel = new objects.Label("Player Money: $1000", "35px","Luckiest Guy", "#000000", 210, 630, true);
        stage.addChild(playerLabel);

        jackpotLabel = new objects.Label("Jackpot: $5000", "35px","Luckiest Guy", "#ff0000", 160, 680, true);
        stage.addChild(jackpotLabel);

        status = new objects.Label(" ", "50px","Luckiest Guy", "#ff0000", 375, 530, true);
        status.textAlign = 'center';
        stage.addChild(status);

        resetButton = new objects.Button("./Assets/images/resetBtn.png", 530, 630, true);
        stage.addChild(resetButton);

        jackpotButton = new objects.Button("./Assets/images/jackpotBtn.png", 670, 630, true);
        stage.addChild(jackpotButton);
        
        //Spin button clicked
        spinButton.on("click", function() {
            
            playerBet = parseFloat((<HTMLInputElement>document.getElementById("input")).value);

            if (playerMoney == 0)
            {
                if (confirm("You ran out of Money! \nDo you want to play again?")) {
                    resetAll();
                    showPlayerStats();
                }
            }
            else if (playerBet > playerMoney) {
                status.text = "not enough Money!";
                playSound("./Assets/sounds/error.mp3");
                // alert("You don't have enough Money to place that bet.");
            }
            else if (playerBet <= 0) {
                status.text = "Must be a positive $ amount!";
                playSound("./Assets/sounds/error.mp3");
                // alert("All bets must be a positive $ amount.");
            }
            else if (playerBet <= playerMoney) {
                counter = 1;
                status.text = "";

                var obj = document.createElement("audio");
                obj.src = "./Assets/sounds/sound1.mp3"; 
                obj.play(); 
                setTimeout(() => {
                    obj.pause();
                    obj.currentTime = 0;
                    displayResult();
                    spinButton.visible = true;
                    resetButton.visible = true;
                    jackpotButton.visible = true;
                }, 1200);
                spinButton.visible = false;
                resetButton.visible = false;
                jackpotButton.visible = false;
                repeat();
                
                
            }
            else {
                status.text = "Invalid bet amount!";
                playSound("./Assets/sounds/error.mp3");
                // alert("Please enter a valid bet amount");
            }
         });

         resetButton.on("click", function() {
            playSound("./Assets/sounds/reset.wav")
            resetAll();
            showPlayerStats();
            status.text = "";
         });

         jackpotButton.on("click", function() {
            playSound("./Assets/sounds/jackpot.wav");
            lossNumber++;
            displayImages('./Assets/images/coin.png','./Assets/images/coin.png','./Assets/images/coin.png');
            status.text = "You Won the $" + jackpot + " Jackpot!!";
            // alert("You Won the $" + jackpot + " Jackpot!!");
            playerMoney += jackpot;
            jackpot = 1000;
            showPlayerStats();
         });

         
         
    }
    
    /* Utility function to show Player Stats */
    function showPlayerStats()
    {
        jackpotLabel.text = "Jackpot: $" + jackpot;
        playerLabel.text = "Player Money: $" + playerMoney;
    }

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

    function checkJackPot() {
        /* compare two random values */
        let jackPotTry = Math.floor(Math.random() * 51 + 1);
        let jackPotWin = Math.floor(Math.random() * 51 + 1);
        if (jackPotTry == jackPotWin) {
            playSound("./Assets/sounds/jackpot.wav");
            displayImages('./Assets/images/coin.png','./Assets/images/coin.png','./Assets/images/coin.png');
            status.text = "You Won: $" + jackpot;
            // $("div#winOrLose>p").text("You Won the $" + jackpot + " Jackpot!!");
        // alert("You Won the $" + jackpot + " Jackpot!!");
            playerMoney += jackpot;
            jackpot = 1000;
            showPlayerStats();
        }
    }

    /* Utility function to show a win message and increase player money */
    function showWinMessage() {
        playerMoney += winnings;
        status.text = "You Won: $" + winnings;
        resetFruitTally();
        checkJackPot();
    }

    /* Utility function to show a loss message and reduce player money */
    function showLossMessage() {
        playerMoney -= playerBet;
        status.text = "You Lost!";
        resetFruitTally();
    }

    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value:number, lowerBounds:number, upperBounds:number) {
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
            playSound("./Assets/sounds/ding.mp3");
            winNumber++;
            showWinMessage();
        }
        else
        {
            let obj1 = document.createElement("audio");
            obj1.src = "./Assets/sounds/error.wav"; 
            obj1.play(); 
            lossNumber++;
            jackpot += playerBet;
            showLossMessage();
        }
        
    }

    /* Get the images based on the name of the value*/
    function getImage(name:string) {
        let slotName:string;
        switch(name) {
            case "Banana":
                slotName = "./Assets/images/banana.png";
            break;
            case "Bar":
                slotName = "./Assets/images/bar.png";
            break;
            case "Cherry":
                slotName = "./Assets/images/cherry.png";
            break;
            case "Orange":
                slotName = "./Assets/images/orange.png";
            break;
            case "Bell":
                slotName = "./Assets/images/bell.png";
            break;
            case "Grapes":
                slotName = "./Assets/images/grape.png";
            break;
            case "Seven":
                slotName = "./Assets/images/seven.png";
            break;
            default:
                slotName = "./Assets/images/blank.png";
        }
        return slotName;
        
    }

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
        console.log(spinResult[0] + " - " + spinResult[1] + " - " + spinResult[2]);
        // $("div#result>p").text(fruits);
        displayImages(getImage(spinResult[0]),getImage(spinResult[1]),getImage(spinResult[2]));
        determineWinnings();
        turn++;
        showPlayerStats();
    }

    function playSound(soundPath:string) {
        let sound = document.createElement("audio");
            sound.src = soundPath; 
            sound.play();
    }

    // generate random images for each slot.
    function randomImage()
    {
        let pics = Array('./Assets/images/banana.png', './Assets/images/bar.png','./Assets/images/cherry.png',
                        './Assets/images/orange.png', './Assets/images/bell.png', './Assets/images/grape.png',
                        './Assets/images/seven.png', './Assets/images/blank.png', './Assets/images/blank.png',
                        './Assets/images/coin.png');
        let randomNum1 = Math.floor(Math.random() * pics.length);
        let randomNum2 = Math.floor(Math.random() * pics.length);
        let randomNum3 = Math.floor(Math.random() * pics.length);
        displayImages(pics[randomNum1], pics[randomNum2], pics[randomNum3]);
        // callback();
    }
    
    // display image for each slot
    function displayImages(img1:string, img2:string, img3:string) {
        // $("#slot1").attr('src', img1);
        // $("#slot2").attr('src', img2);
        // $("#slot3").attr('src', img3);
        let i1 = new Image();
        i1.src = img1;
        let i2 = new Image();
        i2.src = img2;
        let i3 = new Image();
        i3.src = img3;
       
        slot1.image = i1;
        slot2.image = i2;
        slot3.image = i3;

    }

    


    window.addEventListener("load", Start);

})();