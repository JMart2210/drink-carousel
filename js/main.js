//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
document.querySelector('button').addEventListener('click', fetchDrink);
let allDrinks = {};
let currentIndex = -1;
let intervalID = ''
const pause = document.querySelector('.pause')

function fetchDrink(){
    let drinkAsk = document.querySelector('input').value
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+drinkAsk
    fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        allDrinks = data.drinks
        nextDrink();
        intervalID = setInterval(nextDrink, 4000);
        console.log(intervalID);
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
function nextDrink(){
    ++currentIndex
    console.log({allDrinks, currentIndex})
    if (currentIndex >= allDrinks.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = allDrinks.length - 1
    document.querySelector('h2').innerText = allDrinks[currentIndex].strDrink
    document.querySelector('img').src = allDrinks[currentIndex].strDrinkThumb
    document.querySelector('h3').innerText = allDrinks[currentIndex].strInstructions
    document.querySelector('.next').hidden = false;
    document.querySelector('.back').hidden = false;
    document.querySelector('.pause').hidden = false;
}

document.querySelector('.back').addEventListener('click', function() {
    currentIndex = currentIndex - 2
    clearInterval(intervalID);
    nextDrink();
    pause.innerText = 'Play'
})
document.querySelector('.next').addEventListener('click', function() {
    clearInterval(intervalID);
    nextDrink();
    pause.innerText = 'Pause'
    intervalID = setInterval(nextDrink, 4000);
})
pause.addEventListener('click', function() {
    if (pause.innerText === 'Pause') {
        clearInterval(intervalID);
        pause.innerText = 'Play'
    } else {
        pause.innerText = 'Pause'
        nextDrink();
        intervalID = setInterval(nextDrink, 4000);
    } 
})