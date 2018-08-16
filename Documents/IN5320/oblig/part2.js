// Creating a close button and appending it to each list item.
var nodeList = document.getElementsByTagName('li');
var i;
for (i = 0; i < nodeList.length; i++){
    var span = document.createElement('span');
    var txt = document.createTextNode('X');
    span.className = 'closebutton';
    span.appendChild(txt);
    nodeList[i].appendChild(span);
}

// Click on a close button to hide the list item
var closebutton = document.getElementsByClassName('closebutton');
var i;
for (i = 0; i < closebutton.length; i++){
    closebutton[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = 'none';
    }
}

function loadList(){
    console.log('kjører getsavedlist');
        for (i = 0; i < localStorage.length; i++){
            var li = document.createElement('li');
            var savedValue = localStorage.key(i);
            console.log(savedValue);
            li.appendChild(document.createTextNode(savedValue));
            document.getElementById('userlist').appendChild(li);
            var span = document.createElement('span');
            var txt = document.createTextNode('X');
            span.className = 'closebutton';
            span.appendChild(txt);
            li.appendChild(span);
            span.onclick = function() {
                localStorage.removeItem(savedValue);
                var div = this.parentElement;
                div.style.display = 'none';
                console.log(localStorage);
                }
        }
}



    


// Function for appending the input to the list
function appendInput(){
   var li = document.createElement('li');
   var inputValue = document.getElementById('toadd').value;
   var t = document.createTextNode(inputValue);
   li.appendChild(t);
   if (inputValue === '') {
       alert('Write something in the field to add!');
   } else {
       document.getElementById('userlist').appendChild(li);
       document.getElementById('toadd').value = '';
       // Creating a close button for the element just added
       var span = document.createElement('span');
       var txt = document.createTextNode('X');
       span.className = 'closebutton';
       span.appendChild(txt);
       li.appendChild(span);
       var id = inputValue;
       localStorage.setItem(inputValue, li.textContent);
       console.log(localStorage);
       console.log(localStorage.key(1));
       console.log(localStorage);
    
       span.onclick = function() {
        localStorage.removeItem(inputValue);
        var div = this.parentElement;
        div.style.display = 'none';
        console.log(localStorage);
        }
   }
   /*for(i = 0; i < closebutton.length; i++){
       closebutton[i].onclick = function() {
           localStorage.removeItem([i]);
           var div = this.parentElement;
           div.style.display = 'none';
       }
   }*/
}