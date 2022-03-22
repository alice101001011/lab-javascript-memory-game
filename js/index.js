const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
memoryGame.shuffleCards();

window.addEventListener('load', (event) => {
  let html = '';
  memoryGame.cards.forEach((pic) => {
    html += `
      <div class="card" data-card-name="${pic.name}">
        <div class="back" name="${pic.img}"></div>
        <div class="front" style="background: url(img/${pic.img}) no-repeat"></div>
      </div>
    `;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', (event) => {
      // TODO: write some code here
      console.log(`Card clicked: ${card}`);

      //! note to self: steps/structure
      // 1. toggle class .turned on card click to turn clicked card face up
      // 2. push clicked card to empty array pickedCards (defined in MemoryGame class constructor)
      // 3. array should only hold two cards to be compared
      // 4. when two cards were clicked, use checkIfPair to compare (checkIfPair receives two arguments, card1 and card2)
      // 5. if checkIfPair returns true, keep class .turned to keep card pairs face up
      // 6. if checkPair returns false, toggle class .turned to turn cards back
      // 7. reset pickedCards array for both possibilities to empty array
      // 8. setTimeout for if checkIfPair returns false – otherwise second card isn't even turned
      // 9. get DOM elements to later be able to output the count of pairs clicked and pairs guessed
      // 10. prevent clicking more than two cards in a guessing round -> tried different approaches, none of them worked
      // 11. count pairsGuessed and pairsClicked (-> DOM elements)
      // 12. use checkIfFinished to check if all pairs were guessed 

      card.classList.add('turned');
      memoryGame.pickedCards.push(card);

      const pairsClicked = document.querySelector('#pairs-clicked');
      const pairsGuessed = document.querySelector('#pairs-guessed');
      const card1 = memoryGame.pickedCards[0];
      const card2 = memoryGame.pickedCards[1];
      //console.log(card1, card2);
      const nameCard1 = card1.dataset.cardName;
      const nameCard2 = card2.dataset.cardName;
      //console.log(nameCard1, nameCard2);

      if (memoryGame.pickedCards.length === 2) {
        
        if (memoryGame.checkIfPair(nameCard1, nameCard2)) {
          console.log('yay, you found a pair!');
          memoryGame.pickedCards = [];
          pairsGuessed.innerText = memoryGame.pairsGuessed;
        } else {
          console.log('try again!');
          setTimeout(() => {
            card1.classList.remove('turned');
            card2.classList.remove('turned');
          }, 2000);
          memoryGame.pickedCards = [];
        }
        pairsClicked.innerText = memoryGame.pairsClicked;
        if (memoryGame.checkIfFinished()) console.log("You're done!");
      }
    });
  });
});
