'use strict';

//global variables
let allItems = [];
let selections = 0;
let selectionsAllowed = 25;
let displayValidation = []; //use array to make sure no two images are rendered together
//dom footholds
let imagesContainer = document.querySelector('section');
let imageOne = document.querySelector('#img-1');
let imageTwo = document.querySelector('#img-2');
let imageThree = document.querySelector('#img-3');
let viewResultsButton = document.querySelector('#view-results');
let resultsContent = document.querySelector('#results');
// constructor function

function createItem(name, fileExtension = 'jpg'){
  //properties from arugments
  this.name = name;
  this.src = `./img/${name}.${fileExtension}`;
  //other properties
  this.viewed = 0;
  this.clicked = 0;

  allItems.push(this);
}

new createItem('bag', 'jpg');
new createItem('breakfast');
new createItem('bubblegum');
new createItem('chair');
new createItem('cthulhu');
new createItem('dog-duck');
new createItem('dragon');
new createItem('pen');
new createItem('pet-sweep');
new createItem('scissors');
new createItem('shark');
new createItem('sweep', 'png');
new createItem('tauntaun');
new createItem('unicorn');
new createItem('water-can');
new createItem('wine-glass');


//other functions
function handleContainerClick(event){
  if (event.target === imagesContainer){
    alert('Please select an IMAGE');
  }
}

function handleImageClick(event){
  for (let i = 0; i < allItems.length; i++){
    if (allItems[i].name === event.target.alt){
      allItems[i].clicked = allItems[i].clicked + 1;
    }
  }
  selections++;
  if (selections === selectionsAllowed){
    alert('All done!');
    renderResults();
    imagesContainer.textContent = '';
  }
  renderItems();
}

function getRandomIndex(){
  return Math.floor(Math.random() * allItems.length);
}

//use getrandomindex
//pull object from allItems with index
//add object.src to img element in index.html
function renderItems(){
  for(let i = 0; i < 3;){
    let index = getRandomIndex();
    if (!displayValidation.includes(allItems[index])){
      displayValidation.push(allItems[index]);
      let image = document.querySelector(`#img-${i+1}`);
      image.src = allItems[index].src;
      image.alt = allItems[index].name;
      allItems[index].viewed++;
      i++;
    }
  }
  displayValidation = [];
}

function renderResults(){
  resultsContent.innerHTML = '';
  viewResultsButton.innerHTML = '';
  for(let i =0; i < allItems.length; i++){
    let p = document.createElement('p');
    p.textContent = `${allItems[i].name} : ${allItems[i].clicked} / ${allItems[i].viewed}`;
    viewResultsButton.appendChild(p);
  }
}
//event listeners
imagesContainer.addEventListener('click', handleContainerClick); //handles misclicks
imageOne.addEventListener('click', handleImageClick);
imageTwo.addEventListener('click', handleImageClick);
imageThree.addEventListener('click', handleImageClick);
viewResultsButton.addEventListener('click', renderResults);

//proof of life


//need to run

renderItems();
