


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */



/*
 * Create a list that holds all of your cards
 */
let cards=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
//cards+=cards;
cards = cards.concat(cards);

//initilaize list to store the setuation of the cards
let cardsOpen=[];
let cardsMatched=[];
//initilaize the counter
let counter=0;

let listI=0;
//to control the time wait
let Iwait=0;
//define variable to hold the 2 open cards
let target1;
let target2;

//define counter to count Moves
let movesCount=0;

//define counter to count time spend by user
timeSpend=0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//function to display time
/*From  https://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock*/
let h=0;
let m=0;
let s=1;
let toEnd=false;
function startTime() {
     if(s==60){
       s=0;
       m+=1;
     }
     if (m==60) {
       m=0;
       h+=1;

     }
     document.getElementById('timer').innerHTML =
    h + ":" + m + ":" + s;
    timeSpend+=1;
    s+=1;
    if(toEnd==false){
      let t = setTimeout(startTime, 1000);
    }
}

//function to open model after wining

function openModel(){
  //From :https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
  var txT="<b>Gongratulations</b> you win in <b>***</b>"+timeSpend+"S<b>***</b> <br>"+"<b>***</b>with "+stars+" stars<b>***</b><br>"+"<b>***</b>If you want to play again Press (<b>X</b>) button<b>!***</b>";
  //Stop the timer
  toEnd=true;
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the modal-txt
  const modaTxt = document.getElementById("txt");
  //Set the modal text
  modaTxt.innerHTML=txT;

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];
  //Display the modal
  modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
      //reload the page
         setTimeout(function (){
           location.reload();
         }, 1000);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
function display_card(){
  //shuffle the list of cards using the provided "shuffle" method below
  let array=shuffle(cards);
  //loop through each card and create its HTML
  let cardHtml = document.querySelector(".deck");
  cardHtml.innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (i=0;i<16;i++){
    let card = document.createElement("li");
    card.classList.add("card");
    card.classList.add("animated");
    card.innerHTML="<i "+"class=\"fa "+array[i]+"\">"+"</i>";
    fragment.appendChild(card);
  }
  cardHtml.appendChild(fragment);
}




display_card();
//code to control showing the cards for the first time the close it
// setTimeout(function (){
//   let elem=document.getElementsByClassName("card");
//   for (let i = 0;i < elem.length; i++) {
//   elem[i].classList.remove("show");
// }}
// , 2500);


//function to control the number of stars
let stars=3;
function checkhStar() {

  if (movesCount<16 ){
    stars=3;

  }
  else
    if (movesCount<32){
      stars=2;
    }

    else {

        stars=1;
      }


  let el=document.querySelector(".stars");

  const fragment1 = document.createDocumentFragment();
  el.innerHTML = '';
  for(let i=1;i<=stars;i++){


      let st = document.createElement("li");
      st.innerHTML="<i class=\"fa fa-star\"></i>";
      fragment1.appendChild(st);
    }
    el.appendChild(fragment1);
}

 //display counter on the page
function display_counter(){
  let gameCounter = document.querySelector(".moves");
  gameCounter.innerHTML=movesCount;
}


//check matching cards
function check_matching(target){

  let isOpen=false;
  for (let i=0;i<cardsOpen.length;i++){
    if(cardsOpen[i]==target.innerHTML){
      //console.log("matched");
      isOpen=true;

      break;
    }

  }
  if(isOpen==false){
    //to be sure that we just check the matching for 2 card
    if(listI>1){
      cardsOpen=[];
      listI=0;
    }

    cardsOpen[listI]=target.innerHTML;
    listI+=1;
    return false;
  }
  else {
    cardsMatched[cardsMatched.length]=target.innerHTML;
    counter+=1;
    cardsOpen=[];
    listI=0;

    return true;

  }
}
//display the card's symbol
function display_card_symbol(target){

  movesCount+=1;
  display_counter();
  checkhStar();
  target.classList.add("show");

  //remove clik event from target
  target.style.pointerEvents = "none";

  let is_match=check_matching(target);
  if(is_match==true){
    let elements = document.getElementsByClassName(target.firstElementChild.classList);
    //console.log("elements="+elements);
    for (let i = 0;i < elements.length; i++) {
        elements[i].parentElement.classList.add("match");
        //remove clik event from the 2 target
        elements[i].style.pointerEvents = "none";
        //add animation
        elements[i].parentElement.classList.add("shake");
    }
    //to reset the 2 target
    Iwait=0;

  }
  else {
      //set wait time before close card
      let wait=500;
      //to control the time wait by the  cards
      if(Iwait==0){
        target1=target;
        Iwait=1;

      }
      else {
        target2=target;
        Iwait=0;
        //remove event listener from all card to be sure no other card will clicked until the 2 open card flipped back
        card.removeEventListener("click",cardClick);
        //set wait time to insure that the 2 opened card closed at the same time
        setTimeout(function (){
          target1.classList.remove("show");
          target2.classList.remove("show");
          //add clik event to target 1
          target1.style.pointerEvents = 'auto';
          //add clik event to target 2
          target2.style.pointerEvents = 'auto';
          target1="";
          target2="";

        }, wait);
        //return the event listener to allow for other moves
        card.addEventListener("click",cardClick);
        //count the player moves

      }
  }
  //check if all matched

  if(cardsMatched.length==8){
    setTimeout(function (){
      //display the wining model
      openModel();
    }, 1000);}

}
//set up the event listener for a card. If a card is clicked:
function cardClick(event){
   //to be sure that we just check the matching for 2 card
   if(listI>1){
     cardsOpen=[];
     listI=0;

   }
   //display the card's symbol
   let str=String(event.target.classList);
   //console.log(str);
   if(str.includes('card') ){
     display_card_symbol(event.target);
   }
}

let card = document.querySelector(".deck");
card.addEventListener("click",cardClick);

//control the reload symbol
let refresh = document.querySelector(".fa-repeat");
refresh.addEventListener("click", function(e){
    location = location;
});
