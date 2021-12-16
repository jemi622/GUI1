//initialize a bunch of variables
var bestScore = 0 
var currscore = 0
var Letters = []
var Rack = []
let dict = []
let distribution = []

//the big master tile data array that stores each letter's value, amount, and image
var ScrabbleTiles = 
    [
        {"letter":"A", "value" : 1,  "amount" : 9,  "image":"graphics_data/Scrabble_Tiles/a.jpg"},
        {"letter":"B", "value" : 3,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/b.jpg" },
        {"letter":"C", "value" : 3,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/c.jpg" },
        {"letter":"D", "value" : 2,  "amount" : 4,  "image":"graphics_data/Scrabble_Tiles/d.jpg" },
        {"letter":"E", "value" : 1,  "amount" : 12, "image":"graphics_data/Scrabble_Tiles/e.jpg" },
        {"letter":"F", "value" : 4,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/f.jpg" },
        {"letter":"G",  "value" : 2,  "amount" : 3,  "image":"graphics_data/Scrabble_Tiles/g.jpg" },
        {"letter":"H",  "value" : 4,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/h.jpg" },
        {"letter":"I",  "value" : 1,  "amount" : 9,  "image":"graphics_data/Scrabble_Tiles/i.jpg"  },
        {"letter":"J",  "value" : 8,  "amount" : 1,  "image":"graphics_data/Scrabble_Tiles/j.jpg"  },
        {"letter":"K",  "value" : 5,  "amount" : 1,  "image":"graphics_data/Scrabble_Tiles/k.jpg"  },
        {"letter":"L",  "value" : 1,  "amount" : 4,  "image":"graphics_data/Scrabble_Tiles/l.jpg"  },
        {"letter":"M",  "value" : 3,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/m.jpg"  },
        {"letter":"N",  "value" : 1,  "amount" : 6,  "image":"graphics_data/Scrabble_Tiles/n.jpg"  },
        {"letter":"O",  "value" : 1,  "amount" : 8,  "image":"graphics_data/Scrabble_Tiles/o.jpg"  },
        {"letter":"P",  "value" : 3,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/p.jpg"  },
        {"letter":"Q",  "value" : 10, "amount" : 1,  "image":"graphics_data/Scrabble_Tiles/q.jpg"  },
        {"letter":"R",  "value" : 1,  "amount" : 6,  "image":"graphics_data/Scrabble_Tiles/r.jpg"  },
        {"letter":"S",  "value" : 1,  "amount" : 4,  "image":"graphics_data/Scrabble_Tiles/s.jpg"  },
        {"letter":"T",  "value" : 1,  "amount" : 6,  "image":"graphics_data/Scrabble_Tiles/t.jpg"  },
        {"letter":"U",  "value" : 1,  "amount" : 4,  "image":"graphics_data/Scrabble_Tiles/u.jpg"  },
        {"letter":"V",  "value" : 4,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/v.jpg"  },
        {"letter":"W",  "value" : 4,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/w.jpg"  },
        {"letter":"X",  "value" : 8,  "amount" : 1,  "image":"graphics_data/Scrabble_Tiles/x.jpg"  },
        {"letter":"Y",  "value" : 4,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/y.jpg"  },
        {"letter":"Z",  "value" : 10, "amount" : 1,  "image":"graphics_data/Scrabble_Tiles/z.jpg"  },
        {"letter":"_",  "value" : 0,  "amount" : 2,  "image":"graphics_data/Scrabble_Tiles/_.jpg" }
    ]

//The array that holds the board data, its images, each slot's type
var ScrabbleBoard = 
    [
        {"type":"Blank","lMultiply":1, "wMultiply":1,"image": "graphics_data/blank.png"},
        {"type":"Blank","lMultiply":1, "wMultiply":1,"image": "graphics_data/blank.png"},
        {"type":"Double","lMultiply":1, "wMultiply":2,"image": "graphics_data/double.png"},
        {"type":"Blank","lMultiply":1, "wMultiply":1,"image": "graphics_data/blank.png"},
        {"type":"Blank","lMultiply":1, "wMultiply":1,"image": "graphics_data/blank.png"},
        {"type":"Blank","lMultiply":1, "wMultiply":1,"image": "graphics_data/blank.png"},
        {"type":"Double","lMultiply":1, "wMultiply":2,"image": "graphics_data/double.png"}   
    ]

$(document).ready(function()
{   
    //Parses the dictionary 
    $.ajax({
        url: "https://jemi622.github.io/GUI1/HW5/words.txt",
        success: function(result) {
            //adds each word to the dictionary array
            var words = result.split("\n")
            for (var i = 0; i < words.length; ++i) {
                dict.push([words[i].toUpperCase()])
            }
        }
    });
    for (var i = 0; i < 7; i++)
    {   
        //sets up the board, adds image and stores index and type
        $("#board").append("<img id = 'boardtile" + i + "'class= 'board' index = '" + i + "'type = '" + ScrabbleBoard[i].type + "'src = '" + ScrabbleBoard[i].image + "' />")
    }
    reset()
})

//is called when a letter is dropped into the board
function addLetter(event,ui)
{
    const letter = ui.draggable.attr('Letter')
    const id = ui.draggable.attr('id')
    const type = $(this).attr('type')
    const index = $(this).attr('index')
    //loop to determine if the Letters array is actually empty or not
    var empty = true
    if (Letters.length != 0 && Letters !== undefined) {
        for (var i in Letters) {
            if (i) {
                empty = false
                break
            }
        }
    }
    //Loop to determine if this letter is being dragged from one board slot to another
    var dupe = false
    for (var i in Letters) {
        if (i) {
            if(Letters[i]['id'] == id){
                delete Letters[i]
                dupe = true
                break
            }
        }
    }
    var valid = empty
    if (!empty) {
        var skip = false
        //loop to determine if you are trying to place a tile in an occupied slot
        for (var i = 0; i < Letters.length; ++i) {
            if (Letters[i]) {
                if (index == i) {
                    skip = true
                    break
                }
            }
        }
        if (!skip) {
            //loop to determine if the tile is being placed touching an existing one
            for (var i = 0; i < Letters.length; ++i) {
                if (Letters[i]) {
                    if (index == i + 1 || index == i - 1) {
                        valid = true
                        break
                    } 
                }
            }
        }
    }
    if (valid) {
        //adds dropped letter to Letters[]
        Letters[index] = {index,type,letter,id}
        if (!dupe){
            //loop to remove the dropped letter from Rack[]
            for (var i = 0; i < Rack.length; ++i) {
                if (Rack[i]) {
                    if (Rack[i]['id'] == id) {
                        delete Rack[i]
                        break
                    }  
                }
            }
        }
        //snaps tile to center of slot
        ui.draggable.position({
            of: $(this),
        })
    } else {
        //moves tile back to where it came from in the rack
        ui.draggable.css({"position": "relative", "top": "", "left": ""})
    }
}

//function called when tile placed in rack
function removeLetter(event,ui)
{
    const letter = ui.draggable.attr('Letter')
    const id = ui.draggable.attr('id')
    //adds moved tile to Rack[] 
    Rack[id] = {letter, id} 
    //loop to remove tile from Letters[]
    for (var i = 0; i < Letters.length; ++i) {
        if (Letters[i]) {
            if (Letters[i]['id'] == id) {
                delete Letters[i]
                break
            }
        }
    }
    //snaps back to the rack
    ui.draggable.css({"position": "relative", "top": "", "left": ""})
    update()
}

//sets up some draggables and droppables
function update()
{
    //letter draggable, makes it snap and makes it return to its position if not dropped 
    $(".letterTile").draggable({
        snapMode: 'inner',
        revertDuration: 200,
        start: function(event,ui){
            $(this).draggable("option", "revert", "invalid")
        }
    })
    //board droppable
    $(".board").droppable({
        accept: '.letterTile',
        drop: addLetter
    })
    //rack droppable
    $('#rack').droppable({
        accept: '.letterTile',
        drop: removeLetter,
    });
}

//function to score the word when the submit button is pressed
function score()
{
    var word = ""
    var blank = false
    //loop to fill the word string with the made word, also checks for blanks
    for(var j = 0; j < Letters.length; ++j) {
        if (Letters[j]) {
            var key = Letters[j]['letter']
            word += key
            if (key == "_")
                blank = true
        } else {
            word += " "
        }
    }
    word = word.trim()
    let i = 0
    //special case if a blank is used
    if (blank) {
        //generates all words it could be
        var words = []
        for (j = 0; j < 27; ++j) {
            words[j] = word.replace("_", ScrabbleTiles[j].letter)
        }
        var b = false
        //checks all 26 words against the dictionary
        for (j = 0; j < 26; ++j) {
            for (i = 0; i < dict.length; i++) {
                if (dict[i][0] == words[j]) {
                    b = true
                    break
                }
            } 
            if (b)
                break
        }
    } else {
        //checks the word against the dictionary
        for (i = 0; i < dict.length; i++) {
            if (dict[i][0] == word) {
                break
            }
        }
    }

    //clears any previous alerts
    var elements = document.getElementsByClassName('alert');
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }

    //if word not found, alert
    if (i == dict.length) {
        document.getElementById('rack').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Not a valid word</div>');
    //otherwise calculate the score
    } else {
        //adds the value of each letter to the current score, and * 2 if double letter tile
        for(var j = 0; j < Letters.length; ++j) {
            if (Letters[j]) {
                var key = Letters[j]['letter']
                const tiles = Letters[j]['type']
                const value = ScrabbleTiles.filter((val) => val.letter == key)[0].value

                if (tiles == 'Double')
                {
                    currscore += value * 2
                }
                else
                {
                    currscore += value
                }
            }
        }

        //sets the best score
        if (bestScore < currscore)
        {
            bestScore = currscore
        }

        //clears the board, sets the scores
        clear()
        $("#Score").text(currscore)
        $("#BestScore").text(bestScore)
    }
    
}

//function to reset everything
function reset()
{
    currscore = 0
    Letters = []
    Rack = []
    $("#Score").text("0")
    $("#rack").empty()
    //generates the proper distribution of letters
    distribution = []
    for (var i = 0; i < 27; ++i){
        for (var j = 0; j < ScrabbleTiles[i].amount; ++j){
            distribution.push([ScrabbleTiles[i].letter])
        }
    }
    //generates 7 completely new tiles using the distribution
    for(var i = 0; i < 7; ++i)
    {
        //generates a random number
        const x = Math.floor(Math.random() * (100 - i))
        const letter = distribution[x]
        const index = ScrabbleTiles.filter((val) => val.letter == letter)[0]
        //appends new tile to rack
        $("#rack").append("<img id= '" + i + "' class = 'letterTile' letter= '" + index.letter + "' src= '" + index.image + "' />")
        const id = i
        //adds tile to Rack[]
        Rack[i] = {letter, id}
        distribution.splice(x,1)
    }
    //updates tiles left counter
    $("#TilesLeft").text(distribution.length)
    update()
    //removes any alerts
    var elements = document.getElementsByClassName('alert');
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }
}

//function to clear board in bewteen rounds
function clear() {
    Letters = []
    $("#rack").empty()
    //regenerates #rack using Rack[]
    for (var i = 0; i < 7; ++i) {
        //If a tile exists in that slot, add it again in that spot
        if (Rack[i]) {
            const index = ScrabbleTiles.filter((val) => val.letter == Rack[i]['letter'])[0]
            $("#rack").append("<img id= '" + i + "' class = 'letterTile' letter= '" + index.letter + "' src= '" + index.image + "' />")
        //otherwise generate a new one (see reset function for more details)
        } else {
            if (distribution.length > 0) {
                const x = Math.floor(Math.random() * distribution.length)
                const letter = distribution[x]
                const index = ScrabbleTiles.filter((val) => val.letter == letter)[0]
                $("#rack").append("<img id= '" + i + "' class = 'letterTile' letter= '" + index.letter + "' src= '" + index.image + "' />")
                const id = i
                Rack[i] = {letter, id}
                distribution.splice(x,1)
            }
        }
    }
    //updates tiles left counter
    $("#TilesLeft").text(distribution.length)
    update()
}