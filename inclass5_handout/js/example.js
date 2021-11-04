//ADD NEW ITEM TO END OF LIST
var list = document.getElementsByTagName('ul')[0];
var item = document.createElement("li");
item.appendChild(document.createTextNode("cream"));
list.appendChild(item);

// ADD NEW ITEM START OF LIST
var newI = document.createElement('li');
newI.appendChild(document.createTextNode('kale'));
list.insertBefore(newI, list.firstChild);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var items = document.getElementsByTagName("li");
for (let i = 0; i < items.length; i++) {
    items[i].setAttribute('class', 'cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var heading = document.getElementsByTagName('h2')[0];
var count = document.createElement('span');
var totalItems = items.length;
count.textContent = totalItems;
heading.appendChild(count);