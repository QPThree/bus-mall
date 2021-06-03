'use strict';

//global variables
let allItems = [];
let selections = 0;
let selectionsAllowed = 25;
let doubleDisplayValidation = []; //use array to make sure no two images are rendered together
let consecutiveDisplayValidation = [];
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
    renderChart();
    imagesContainer.textContent = '';
  }
  renderItems();
}

function getRandomIndex(){
  return Math.floor(Math.random() * allItems.length);
}

//for loop to get each items name and returns array of them
function getItemNames(){
  let namesArr = [];
  for (let i = 0; i < allItems.length; i++){
    namesArr.push(allItems[i].name);
  }
  return namesArr;
}

//get all item clicks
function getItemClicks(){
  let clicksArr = [];
  for (let i = 0; i < allItems.length; i++){
    clicksArr.push(allItems[i].clicked);
  }
  console.log(clicksArr);
  return clicksArr;
}

//get all item views
function getItemViews(){
  let viewsArr = [];
  for (let i = 0; i < allItems.length; i++){
    viewsArr.push(allItems[i].viewed);
  }
  console.log(viewsArr);
  return viewsArr;
}

//use getrandomindex
//pull object from allItems with index
//add object.src to img element in index.html
function renderItems(){
  for(let i = 0; i < 3;){
    let index = getRandomIndex();
    if ((!doubleDisplayValidation.includes(allItems[index])) && (!consecutiveDisplayValidation.includes(allItems[index]))){
      doubleDisplayValidation.push(allItems[index]);
      consecutiveDisplayValidation[i] = allItems[index];
      let image = document.querySelector(`#img-${i+1}`);
      image.src = allItems[index].src;
      image.alt = allItems[index].name;
      allItems[index].viewed++;
      i++;
    }
  }
  doubleDisplayValidation = [];
}
//displays chart inside canvas element
function renderResults(){
  resultsContent.innerHTML = '';
  viewResultsButton.innerHTML = '';
  for(let i =0; i < allItems.length; i++){
    let p = document.createElement('p');
    p.textContent = `${allItems[i].name} : ${allItems[i].clicked} / ${allItems[i].viewed}`;
    viewResultsButton.appendChild(p);
  }
}

function renderChart(){
  let ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: getItemNames(),
      datasets: [{
        label: '# of Clicks',
        data: getItemClicks(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },{
        label: '# of Views',
        data: getItemViews(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(255, 159, 64, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



//event listeners
imagesContainer.addEventListener('click', handleContainerClick);
imageOne.addEventListener('click', handleImageClick);
imageTwo.addEventListener('click', handleImageClick);
imageThree.addEventListener('click', handleImageClick);
viewResultsButton.addEventListener('click', renderResults);

//proof of life
console.log(getItemNames());

//need to run
renderItems();


