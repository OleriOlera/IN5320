
// Function for appending the input to the list
function appendInput(){
  //creating a list element and appending the input to it
   var li = document.createElement('li');
   var inputValue = document.getElementById('toadd').value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);

   //if the input is empty, send alert
   if (inputValue === '') {
       alert('Write something in the field to add!');
   } else {
      //appending the li to the unordered list and emptying the input field
       document.getElementById('userlist').appendChild(li);
       document.getElementById('toadd').value = '';
       // Creating a close button for the element just added
       var span = document.createElement('span');
       var txt = document.createTextNode('X');
       span.className = 'closebutton';
       span.appendChild(txt);
       li.appendChild(span);

       //creating an id for the list element to be used to identify it in the local localStorage
       li.id = Math.floor(Math.random() * (10000 - 0) + 0);

       // creating a JSON object with the value and id to be locally stored
       var liobj = {
         value: inputValue,
         id: li.id
       };
       localStorage.setItem(li.id, JSON.stringify(liobj));

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
            var li = document.createElement('li');
            //parsing the object saved on position[i]
            var liobj = JSON.parse(localStorage.getItem(localStorage.key(i)));
            //setting the id
            li.id = liobj.id;
            //setting the text
            li.appendChild(document.createTextNode(liobj.value));
            //appending to the list
            var ul = document.getElementById('userlist');
            ul.appendChild(li);
            //creating delete button
            var span = document.createElement('span');
            var txt = document.createTextNode('X');
            span.className = 'closebutton';
            span.appendChild(txt);
            li.appendChild(span);
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
function applytoAll(onthis, applythis) {
 for(i = 0; i < onthis.length; i++){
   applythis(onthis[i]);
 }
}

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
    if (this.readyState == 4 && this.status == 200){
      console.log(JSON.parse(this.response));
    }
  }
  xhttp.open('GET', 'http://api.population.io/1.0/population/' + inputValue + '/'
   + d.getFullYear() + '-' + d.getMonth() + '-'  + d.getDate() + '/?format=json');
   xhttp.send();
};



