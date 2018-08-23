
// Function for appending the input to the list
function appendInput(){
  //creating a list element and appending the input to it
   var div = document.createElement('div');
   var li = document.createElement('li');
   var inputValue = document.getElementById('toadd').value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   div.appendChild(li)

   //if the input is empty, send alert
   if (inputValue === '') {
       alert('Write something in the field to add!');
   } else {
      //appending the li to the unordered list and emptying the input field
       document.getElementById('userlist').appendChild(div);
       document.getElementById('toadd').value = '';
       // Creating a close button for the element just added
       var span = document.createElement('span');
       var txt = document.createTextNode('X');
       span.className = 'closebutton';
       span.appendChild(txt);
       div.appendChild(span);

       //creating an id for the list element to be used to identify it in the local localStorage
       div.id = Math.floor(Math.random() * (10000 - 0) + 0);

       // creating a JSON object with the value and id to be locally stored
       var liobj = {
         value: inputValue,
         id: div.id
       };
       localStorage.setItem(div.id, JSON.stringify(liobj));

       // adding funciton for removing li element
       span.onclick = function() {
        localStorage.removeItem(this.parentElement.id);
        var div = this.parentElement;
        div.style.display = 'none';
        console.log(localStorage);
        }
   }
}

//funciton for loading the list from local storage
function loadList(){
        //for every element in localstorage
        for (i = 0; i < localStorage.length; i++){
            var div = document.createElement('div');
            var li = document.createElement('li');
            //parsing the object saved on position[i]
            var liobj = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //setting the id
            div.id = liobj.id;
            //setting the text
            li.appendChild(document.createTextNode(liobj.value));
            div.appendChild(li);
            //appending to the list
            var ul = document.getElementById('userlist');
            ul.appendChild(div);
            //creating delete button
            var span = document.createElement('span');
            var txt = document.createTextNode('X');
            span.className = 'closebutton';
            span.appendChild(txt);
            div.appendChild(span);
            span.onclick = function() {
                localStorage.removeItem(this.parentElement.id);
                var div = this.parentElement;
                div.style.display = 'none';
                console.log(localStorage);
                }
        }
}
var rooms = [
  'Euler',
  'Java',
  'C',
  'Shell',
  'Lisp',
  'Scheme',
  'Simula',
  'Smalltalk'
];

//function for populating a list
function populator(s) {
  var li = document.createElement('li');
  li.appendChild(document.createTextNode(s));
  var ul = document.getElementById('userlist2');
  ul.appendChild(li);
  console.log('hallo');
}

//function for applying a function to elements in a List
const applytoAll = (onthis, applythis) => {onthis.map(applythis)};

function ifirooms() {
  applytoAll(rooms, populator);
}

function startsWith(element, searchWord){
  return element.startsWith(searchWord);
}

function search(list, searchWord){
  var results = [];
  for(i = 0; i < list.length; i++){
    listtext = list[i].toLowerCase();
    usersSearch = searchWord.toLowerCase();
    if(startsWith(listtext, usersSearch)){
      results.push(list[i]);
    }
  }
  return results;
}

function usersearch(){
  console.log("hm");
  var inputValue = document.getElementById('search').value;
  var ul = document.getElementById('userlist2');
  ul.innerHTML = '';
  var newlist = search(rooms, inputValue);
  applytoAll(newlist, populator);
};

function getPopulation(){
  var inputValue = document.getElementById('countrytoadd').value;
  var xhttp = new XMLHttpRequest();
  var d = new Date();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400){
      alert('Not a valid name!');
    }else if (this.readyState == 4 && this.status == 200){
      var responseParsed = JSON.parse(this.response);
      var li = document.createElement('li');
      li.id = inputValue;
      var increaseAmount = populationIncrease(responseParsed.total_population[0].population,
        responseParsed.total_population[1].population);
      var startpopulation = responseParsed.total_population[0].population;
      var t = document.createTextNode(inputValue + ' - ' + startpopulation);
      li.appendChild(t);
      var licontainer = document.createElement('div');
      licontainer.appendChild(li);
      document.getElementById('countrylist').appendChild(licontainer);
      document.getElementById('countrytoadd').value = '';

      var increasingPopulation = setInterval(increaser, 1000);

      //timer
      function increaser(){
        console.log('øker ' + inputValue);
        startpopulation = startpopulation + increaseAmount;
        document.getElementById(inputValue).textContent = (inputValue + ' - ' + Math.floor(startpopulation));
      };

      var span = document.createElement('span');
      var txt = document.createTextNode('X');
      span.className = 'closebutton';
      span.appendChild(txt);
      licontainer.appendChild(span);
      span.onclick = function() {
          var div = this.parentElement;
          div.style.display = 'none';
          clearInterval(increasingPopulation);
          }
    }
  }
  xhttp.open('GET', 'http://api.population.io/1.0/population/' + inputValue + '/today-and-tomorrow/?format=json');
   xhttp.send();
};

function populationIncrease(today, tomorrow){
  return((tomorrow - today) / 86400);
}


