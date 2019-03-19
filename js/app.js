/*
 * Create a list that holds all of your cards
 */

const icons = ["fa fa-diamond", "fa fa-diamond",
               "fa fa-paper-plane-o", "fa fa-paper-plane-o",
               "fa fa-anchor", "fa fa-anchor",
               "fa fa-bolt", "fa fa-bolt",
               "fa fa-cube", "fa fa-cube",
               "fa fa-leaf", "fa fa-leaf",
               "fa fa-bicycle", "fa fa-bicycle",
               "fa fa-bomb", "fa fa-bomb"];

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];

/*
* Initialize the game
*/
function init(){
    
    shuffle(icons);

    for(let i = 0 ; i < icons.length; i++){
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${icons[i]}"></i>`;
        cardsContainer.appendChild(card);

        // Add click event to each card
        click(card);
        
    }
}

let isFirstClick = true;
/*
* Click Event
*/

function click(card) {
    // Card Click Event

    card.addEventListener("click", function () {

        if (isFirstClick) {
            // Start our timer
            startTimer();
            // Change our First Click indicator's value
            isFirstClick = false;
        }

        const currentCard = this;
        const previousCard = openedCards[0];

        // We have an existing opened card
        if (openedCards.length === 1) {

            card.classList.add('open', 'show', 'disable');
            openedCards.push(this);
            // we should match our two opened cards!
            compare(currentCard, previousCard);
        } else {
            // We don't have any opened cards
            card.classList.add('open', 'show', 'disable');
            openedCards.push(this);
        }
    });
}

/*
* compare the 2 cards
*/
function compare(currentCard,previousCard) {
    // Matcher
    if (currentCard.innerHTML === previousCard.innerHTML) {

        // Matched Cards
        currentCard.classList.add('match');
        previousCard.classList.add('match');

        matchedCards.push(currentCard, previousCard);

        openedCards = [];

    }
    else {

        // 500ms and then do it!
        setTimeout(function () {
            currentCard.classList.remove('open', 'show', 'disable');
            previousCard.classList.remove('open', 'show', 'disable');

        }, 500);
        openedCards = [];
    }

    // Add New Move
    addMove();

    if (currentCard.innerHTML === previousCard.innerHTML) {
        // Check if the game is over !
        isOver();
    }
}


/*
* Add Move
*/
const movesContainer = document.querySelector(".moves");

let moves = 0; 
movesContainer.innerHTML = 0;
function addMove() {
    moves++;
    movesContainer.innerHTML = moves;

    // Set the rating
    rating();
}

/*
* Rating
*/
let ratingCount = 3;
const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating() {
    
    if(moves < 15){
        starsContainer.innerHTML = star + star + star;
        ratingCount = 3;
    } else if(moves < 20) {
        starsContainer.innerHTML = star + star;
        ratingCount = 2;
    } else {
        starsContainer.innerHTML = star;
        ratingCount = 1;
    }
}

const timerContainer = document.querySelector(".timer");
let liveTimer,
    min = 0;
    totalSeconds = 0;


// Set the default value to the timer's container
timerContainer.innerHTML = min + ' mins ' + totalSeconds + ' secs';



/*
 * 
 * 
 * We need to call this function ONCE, and the best time to call it
 * is when the user click on a card (The first card!)
 * This means that the user starts playing now! ;)
 */
function startTimer() {
    liveTimer = setInterval(function () {
        // Increase the totalSeconds by 1
        totalSeconds++;
        if(totalSeconds > 60) {
            min++;
            totalSeconds = 0;
        }

        // Update the HTML Container with the new time
        timerContainer.innerHTML = min + ' mins ' + totalSeconds + ' secs';
    }, 1000);

}
// Stop Timer
function stopTimer() {
    clearInterval(liveTimer);
}



/*
* Check if the game is over
*/


function isOver() {
    if (matchedCards.length === icons.length) {
        stopTimer();

        swal({
            allowEscapeKey: false,
            allowOutsideClick: false,
            title: 'Congratulations! You won!',
            text: 'With ' + moves + ' moves and ' + ratingCount + ' stars in ' + min + ' mins ' + totalSeconds + ' secs',
            type: 'success',
            confirmButtonColor: '#02ccba',
            confirmButtonText: 'Play Again!'
        }).then(function (isConfirm) {
            if (isConfirm) {
                reset();
                //  Delete All cards 
                cardsContainer.innerHTML = "";
                // Call 'init' to create new cards
                init();
            }
        })
    }
}
/*
* Restart Button
*/
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener('click', function(){
    //  Delete All cards 
    cardsContainer.innerHTML = "";
    // Call 'init' to create new cards
    init();
    // Reset all related variables
    reset();
});

// reset the game
function reset() {
    // Empty the `matchedCards` array
    matchedCards = [];
    // Emtpy the openedCards array
    openedCards = [];
    // Reset `moves`
    moves = 0;
    movesContainer.innerHTML = moves;

    // Reset `rating`
    starsContainer.innerHTML = star + star + star;

    /*
     * Reset the `timer`
     * 
     * - Stop it first
     * - Then, reset the `isFirstClick` to `true` to be able to start the timer again!
     * - `totalSeconds` must be `0`
     * - Then update the HTML timer's container
     */
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    min = 0;
    timerContainer.innerHTML = min + ' mins ' + totalSeconds + " secs";
}



///// Start the game for the first time!
init();

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



