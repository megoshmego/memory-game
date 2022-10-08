const cards = document.querySelectorAll('.deck');
 
let flipsCard = false;  
let cardsLock = false;
let cardOne, cardTwo;
    count = 0;
 
function newCard() {
  if (cardsLock) return;
  if (this === cardOne) return;
 
  this.classList.add('flip');
 
  if (!flipsCard) {   // first time a player flips a card 
    flipsCard = true;
    cardOne = this;
 
    return;
  }
 
  cardTwo = this;
  checkForMatch();
}
 
function checkForMatch() {
  let isMatch = cardOne.dataset.framework === cardTwo.dataset.framework;
    
  if (isMatch) {
    stopCards()
  } else{ 
    badCard();
    count++;
    console.log(count);
    document.getElementById("mistake_count").innerHTML = count;
    if (count > 3) {
      setTimeout(function(){
        document.getElementById("game_over").style.display = "block";
      },1000)
    }
  }
}
function stopCards() {
    cardOne.removeEventListener('click', newCard);
    cardTwo.removeEventListener('click', newCard);
   
    reset();
  }
function badCard() {
  cardsLock = true;
 setTimeout(() => {
    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');
 
    reset();
  }, 1000);
}
 
function reset() {
 [flipsCard, cardsLock] = [false, false];
  [cardOne, cardTwo] = [null, null];
}
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
 
cards.forEach(card => card.addEventListener('click', newCard));
function restart_game(){
    location.reload();
  }