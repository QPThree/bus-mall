'use strict';
//global variables
let allItems = [];
let selections = 0;
let selectionsAllowed = 25;

//dom footholds
let imagesContainer = document.querySelector('section');
let imageOne = document.querySelector('#img-1');
let imageTwo = document.querySelector('#img-2');
let imageThree = document.querySelector('#img-3');
let viewResultsButton = document.querySelector('#view-results');
let resultsContent = document.querySelector('#results');

// ---constructor functions---
//constructor for images
function CreateItem(name, fileExtension = 'jpg'){
  //properties from arugments
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  //other properties
  this.viewed = 0;
  this.clicked = 0;
  allItems.push(this);
}
//constructor for queue array
function QueueArray(){
  this.elements = new Array(6);
}
//method to add to end of queue via push()
QueueArray.prototype.addToQueue = function (e) {
  this.elements.push(e);
};
//method to remover from beginning of queue via shift()
QueueArray.prototype.removeFromQueue = function (){
  return this.elements.shift();
};

//pull items from storage
//1. getItems
let retrievedAllItems = localStorage.getItem('allItems');
if (retrievedAllItems){
  //2. JSON.parse the items
  retrievedAllItems = JSON.parse(retrievedAllItems);
  allItems = retrievedAllItems;

}else{
  new CreateItem('bag');
  new CreateItem('breakfast');
  new CreateItem('bubblegum');
  new CreateItem('bathroom');
  new CreateItem('chair');
  new CreateItem('cthulhu');
  new CreateItem('dog-duck');
  new CreateItem('dragon');
  new CreateItem('pen');
  new CreateItem('pet-sweep');
  new CreateItem('scissors');
  new CreateItem('shark');
  new CreateItem('sweep', 'png');
  new CreateItem('tauntaun');
  new CreateItem('unicorn');
  new CreateItem('water-can');
  new CreateItem('wine-glass');
}
//create objects
//queue list for validation
let doubleDisplayValidationQueue = new QueueArray();

//gener functions
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
    renderMainChart();
    renderRatioChart();
    imagesContainer.textContent = '';

    //add allItems array to local storage
    //1. stringify
    let stringifiedAllItems = JSON.stringify(allItems);
    //2. add to local storage
    localStorage.setItem('allItems', stringifiedAllItems);
    return;
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
  return clicksArr;
}
//get all item views
function getItemViews(){
  let viewsArr = [];
  for (let i = 0; i < allItems.length; i++){
    viewsArr.push(allItems[i].viewed);
  }
  return viewsArr;
}
//used to render second chart
function getViewToClickRatio(){
  let viewsArr = getItemViews();
  let clicksArr = getItemClicks();
  let ratioArr = [];

  for (let i = 0; i<allItems.length; i++){
    ratioArr.push(clicksArr[i] / viewsArr[i]);
  }
  return ratioArr;
}
//uses getrandomindex
//pull object from allItems with index
//add object.src to img element in index.html
function renderItems(){
  for(let i = 0; i < 3;){
    let index = getRandomIndex();
    let item = allItems[index];
    if ((!doubleDisplayValidationQueue.elements.includes(item))){
      doubleDisplayValidationQueue.addToQueue(item);
      doubleDisplayValidationQueue.removeFromQueue();
      let image = document.querySelector(`#img-${i+1}`);
      image.src = allItems[index].src;
      image.alt = allItems[index].name;
      allItems[index].viewed++;
      i++;
    }
  }
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
//renders main item click and views chart
function renderMainChart(){
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
//renders ratio of an items click to views
function renderRatioChart(){
  let ctx = document.getElementById('ratio-chart').getContext('2d');
  new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: getItemNames(),
      datasets: [{
        label: 'Clicks : Views Ratio',
        data: getViewToClickRatio(),
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

//proof of life if needed


//need to run for page to work
renderItems();


