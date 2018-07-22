


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
var cards=["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-leaf","fa-bicycle","fa-bomb"];
//cards+=cards;
cards = cards.concat(cards);

//initilaize list to store the setuation of the cards
var cards_open=[];
var cards_matched=[];
//initilaize the counter
var counter=0;

var list_i=0;
//to control the time wait
var i_wait=0;
//define variable to hold the 2 open cards
var target1;
var target2;

//define counter to count Moves
var movesCount=0;

//efine counter to count time spend by user
timeSpend=0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//function to display time
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML =
    h + ":" + m + ":" + s;
    timeSpend+=1;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}



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
function display_card(){
  //shuffle the list of cards using the provided "shuffle" method below
  var array=shuffle(cards);
  //array=array.split(',');
  console.log(array);
  //loop through each card and create its HTML
  var card_html = document.querySelector(".deck");
  card_html.innerHTML = '';
  const fragment = document.createDocumentFragment();
  for (i=0;i<16;i++){
    var card = document.createElement("li");
    card.classList.add("card");
    card.classList.add("show");
    card.innerHTML="<i "+"class=\"fa "+array[i]+"\">"+"</i>";

    //console.log(array[i]);
    fragment.appendChild(card);
  }
  card_html.appendChild(fragment);
}



//TODO:add code to control showing the cards for the first time the close it
display_card();

setTimeout(function (){
  var elem=document.getElementsByClassName("card");
  for (var i = 0;i < elem.length; i++) {
  elem[i].classList.remove("show");
}}
, 2500);


//function to control the number of stars
function checkhStar() {
  var stars=3;
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


  var el=document.querySelector(".stars");

  const fragment1 = document.createDocumentFragment();
  el.innerHTML = '';
  for(var i=1;i<=stars;i++){


      var st = document.createElement("li");
      st.innerHTML="<i class=\"fa fa-star\"></i>";
      fragment1.appendChild(st);
    }
    el.appendChild(fragment1);
}

 //display counter on the page
function display_counter(){
  var game_counter = document.querySelector(".moves");
  game_counter.innerHTML=counter;
}


//check matching cards
function check_matching(target){

  var is_open=false;
  for (var i=0;i<cards_open.length;i++){
    if(cards_open[i]==target.innerHTML){
      console.log("matched");
      is_open=true;

      break;
    }

  }
  if(is_open==false){
    //to be sure that we just check the matching for 2 card
    if(list_i>1){
      cards_open=[];
      list_i=0;
    }

    cards_open[list_i]=target.innerHTML;
    list_i+=1;
    return false;
  }
  else {
    cards_matched[cards_matched.length]=target.innerHTML;
    counter+=1;
    cards_open=[];
    list_i=0;
    display_counter();
    return true;

  }
}
//display the card's symbol
function display_card_symbol(target){
  target.classList.add("show");

  //TODO:remove clik event from target
  target.style.pointerEvents = "none";

  var is_match=check_matching(target);
  if(is_match==true){
    var elements = document.getElementsByClassName(target.firstElementChild.classList);
    console.log("elements="+elements);
    for (var i = 0;i < elements.length; i++) {
        elements[i].parentElement.classList.add("match");
        //remove clik event from the 2 target
        elements[i].style.pointerEvents = "none";
    }
    //to reset the 2 target
    i_wait=0;

    //remove clik event from the 2 target
    //target1.style.pointerEvents = "none";
    //target2.style.pointerEvents = "none";

  }
  else {
      //set wait time before close card
      var wait=500;
      //to control the time wait by the  cards
      if(i_wait==0){
        target1=target;
        i_wait=1;

      }
      else {
        target2=target;
        i_wait=0;

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
        movesCount+=1;
        checkhStar();
      }
  }
  //check if all matched
  if(cards_matched.length==8){
    setTimeout(function (){
      alert("Gongratulations you win in "+timeSpend+"S !!!!!!!!!!!!!" );
    }, 1000);

    //reload the page
    setTimeout(function (){
      location.reload();
    }, 3000);

  }

}
 //set up the event listener for a card. If a card is clicked:
var card = document.querySelector(".deck");
card.addEventListener("click", function(event){
    //to be sure that we just check the matching for 2 card
    if(list_i>1){
      cards_open=[];
      list_i=0;

    }
    //display the card's symbol
    var str=String(event.target.classList);
    //console.log(str);
    if(str.includes('card') ){
      display_card_symbol(event.target);
    }
});
//control the reload symbol
var refresh = document.querySelector(".fa-repeat");
refresh.addEventListener("click", function(e){
    location = location;
});
