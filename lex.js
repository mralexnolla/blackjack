
let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;
 
let hidden;
let deck;

let canHit = true;

    window.onload = function(){
        buildDeck();
        shuffleDeck();
        startGame();
    }

// build Deck function 

function buildDeck(){
    let types = ["C", "D", "H", "S"];
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    
    deck = [];

    for(let i=0; i < types.length; i++){
        for(let j=0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i])
        
        }
    }
    
}

// function to shuffle

function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length)  // this is just to get any random index in the deck

        // swapping positions between the exact card deck[i] with a random card deck[j] ie shufling
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp
    }
    console.log(deck)
}

// start game function to handle the dealer and the player ie you

function startGame(){
    hidden = deck.pop()  // remove a card from the end of the array
    
    dealerSum += getValue(hidden)  
    dealerAceCount += checkAce(hidden)
    // console.log(hidden)
    // console.log(dealerSum)

    //rule: if the dealer sum is less than 17 he must pisk a card. If greater than 17 then he must stay
    while(dealerSum < 17){
        let cardImg = document.createElement("img");   // created an image tag <img />
        let card = deck.pop();                          // picked a card from the deck say 4-C.png
        cardImg.src = "./cards/" + card + ".png"
        dealerSum += getValue(card)
        dealerAceCount += checkAce(card)
        document.getElementById("dealer-cards").append(cardImg)  // basically adding the cards to the dealers until he gets 17 or more 
    }
   //console.log("dealer sum "+ dealerSum)

   // now we give cards to the user, must start with only two cards 
    for(let i=0; i < 2; i++){
        let cardImg = document.createElement("img");   // created an image tag <img />
        let card = deck.pop();                          // picked a card from the deck say 4-C.png
        cardImg.src = "./cards/" + card + ".png"
        yourSum += getValue(card)
        yourAceCount += checkAce(card)
        document.getElementById("your-cards").append(cardImg)
        document.getElementById("your-sum").textContent = yourSum;
    }
    //console.log("Your sum: " + yourSum)

    

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay)

}

function getValue(card){
    let data  = card.split("-"); // .split will break the card into an array eg 6-S => ["6","S"]
    let value = data[0];
    if(isNaN(value)){   // checking to see if the first element is not a number ['A', 'C']
        if(value == "A"){
            return 11    // A is 11
        }
        return 10  // j Q K  are all 10
    }

    // in case we are returning a number, then convert the value to integer
    return parseInt(value)

}

function checkAce(card){
    if(card[0] == "A"){
        return 1;
    }
    return 0;
}

//function adds a card when you click on the hit button
function hit(){
    if(!canHit){
        return
    }
        let cardImg = document.createElement("img");   // created an image tag <img />
        let card = deck.pop();                          // picked a card from the deck say 4-C.png
        cardImg.src = "./cards/" + card + ".png"
        yourSum += getValue(card)
        yourAceCount += checkAce(card)
        document.getElementById("your-cards").append(cardImg)
        
        //cards should go pass 21
        if(reduceAce(yourSum, yourAceCount) > 21){
            canHit = false
        }

        console.log(yourSum)
        document.getElementById("your-sum").textContent = yourSum;

}

function reduceAce(playerSum, playerAceCount){
    while(playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum
}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount);   // sum dealer cards taking into consideration the ACe
    yourSum = reduceAce(yourSum, yourAceCount); // sum players cards taking into consideration the ace

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";   // reveal the hidden card 

    let message = "";

    if(yourSum > 21){
        message = `You loose!Your sum is ${yourSum}`;
    }else if(dealerSum > 21){
        message = `you win ! Dealer Sum is ${dealerSum}`;
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
        }).then(() => jsConfetti.addConfetti())
    }
    // you and the delear have a sum < 21
    else if(yourSum == dealerSum){
        message = `Tie!`
    }else if(yourSum > dealerSum){
        message = `You win! Your sum is ${yourSum}`;
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
        }).then(() => jsConfetti.addConfetti())
    }else if(yourSum < dealerSum){
        message = `You loose! Your sum is ${yourSum}`;
    }

    console.log(yourSum)
    console.log(dealerSum)

    document.getElementById("dealer-sum").textContent = dealerSum;
    document.getElementById("your-sum").textContent = yourSum;
    document.getElementById("message").textContent = message;
}


function newGame(){
    // e.preventDefault();
   location.reload();


}

document.getElementById("newGame").addEventListener("click", newGame)


