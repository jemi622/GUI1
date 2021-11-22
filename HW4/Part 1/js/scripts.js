/*
File: scripts.js
GUI Assignment: Using the jQuery Plugin/UI with Your Dynamic Table
Jenna Parrillo, UMass Lowell Computer Science, jenna_parrillo@student.uml.edu
Copyright (c) 2021 by Jenna Parrillo. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by Jenna Parrillo on November 16th, 2021
*/

//Makes the submit button actually submit the form if it is valid
$("#submit").click(function(event){
    if($("#inputForm").valid()){
        $("#inputForm").submit()
    }
 });

//Handles validation on click
function validate(){
    //custom method to check if a value is greater than another
    $.validator.addMethod("greaterThan", function (value, element, param) {
        var i = parseInt(value)
        var j = parseInt($(param).val())
        return i >= j
    },"Max must be greater than min");

    //form validator
    $("#inputForm").validate({
        //validation rules. sets range and that it is required for all of the inputs
        rules: {
            minc: {
                required: true,
                range: [-50, 50]
            },
            maxc: {
                required: true,
                range: [-50, 50],
                //adds the custom method
                greaterThan: $("#minc")
            },
            minr: {
                required: true,
                range: [-50, 50]
            },
            maxr: {
                required: true,
                range: [-50, 50],
                //adds the custom method
                greaterThan: $("#minr")
            }
        },
        //custom messages for required and range for each input
        messages: {
            minc: {
                required: "This input is empty. Please enter a value between -50 to 50.",
                range: "Please enter a value between -50 and 50."
            },
            maxc: {
                required: "This input is empty. Please enter a value between -50 to 50.",
                range: "Please enter a value between -50 and 50."
            },
            minr: {
                required: "This input is empty. Please enter a value between -50 to 50.",
                range: "Please enter a value between -50 and 50."
            },
            maxr: {
                required: "This input is empty. Please enter a value between -50 to 50.",
                range: "Please enter a value between -50 and 50."
            }
        },
        //on a successful submit, the matrix function is run
        submitHandler: function() {
            matrix();
            return false;
        },
        //changes the placement of the errors to after the parent div
        errorPlacement(error, element) {
            error.insertAfter(element.parent('div'));
        }
    });
}

function matrix() {
    //get the values if the inputs
    var minc = Number(document.getElementById("minc").value);
    var maxc = Number(document.getElementById("maxc").value);
    var minr = Number(document.getElementById("minr").value);
    var maxr = Number(document.getElementById("maxr").value);
/*
    //Clear all previous alerts
    var elements = document.getElementsByClassName('alert');
    while(elements.length > 0){
      elements[0].parentNode.removeChild(elements[0]);
    }

    var error = false;

    //Empty input error handling. uses a bootstrap alert
    if(document.getElementById('minc').value == '') {
        document.getElementById('minc').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Please enter a value</div>');
        error = true;
    }
    if(document.getElementById('maxc').value == '') {
        document.getElementById('maxc').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Please enter a value</div>');
        error = true;
    }
    if(document.getElementById('minr').value == '') {
        document.getElementById('minr').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Please enter a value</div>');
        error = true;
    }
    if(document.getElementById('maxr').value == '') {
        document.getElementById('maxr').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Please enter a value</div>');
        error = true;
    }

    //minimum value error handling. uses a bootstrap alert
    if(minc < -50) {
        document.getElementById('minc').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Value is too low</div>');
        error = true;
    }
    if(maxc < -50) {
        document.getElementById('maxc').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Value is too low</div>');
        error = true;
    }
    if(minr < -50) {
        document.getElementById('minr').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Value is too low</div>');
        error = true;
    }
    if(maxr < -50) {
        document.getElementById('maxr').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Value is too low</div>');
        error = true;
    }

    //maximum value error handling. uses a bootstrap alert
    if(minc > 50) {
        document.getElementById('minc').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Value is too high</div>');
        error = true;
    }
    if(maxc > 50) {
        document.getElementById('maxc').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Value is too high</div>');
        error = true;
    }
    if(minr > 50) {
        document.getElementById('minr').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Value is too high</div>');
        error = true;
    }
    if(maxr > 50) {
        document.getElementById('maxr').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Value is too high</div>');
        error = true;
    }

    //Min > max error handling. uses a bootstrap alert
    if (minc > maxc) {
        document.getElementById('maxc').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Min cannot be greater than max</div>');
        error = true;
    }
    if (minr > maxr) {
        document.getElementById('maxr').insertAdjacentHTML('afterend', 
        '<div class="alert alert-danger" role="alert">Min cannot be greater than max</div>');
        error = true;
    }

    //returns if any error found
    if (error) {
        return;
    }
*/
    var currX = minc;
    var currY = minr;
    var x;

    //Creates our table
    var table = document.createElement('table');
    table.classList.add('newTable');

    //Row for loop
    for (let i = 0; i <= (Math.abs(maxr - minr) + 1); i++){
        //creates a row
        var row = document.createElement('tr');
        currX = minc;
        //column for loop
        for (let j = 0; j <= (Math.abs(maxc - minc) + 1); j++){
            var col;
            //header type if it is the first row
            if (i == 0) {
                col = document.createElement('th');
            } else {
                col = document.createElement('td');
            }
            //Adds special classes if it is a header or the first column
            if ((i == 0) && (j == 0))  { 
                val = '';
                col.classList.add('firstCell');
            } else if(i == 0) { 
                val = currX;
                currX++;
                col.classList.add('firstRow');
            } else if(j == 0) {
                val = currY;
                col.classList.add('firstCol');
            }
            //otherwise calculate value by multiplication
            else {
                val = currX * currY
                currX++;
            }
            //sets the calculated value to the column
            col.innerHTML = val;
            //add to row
            row.appendChild(col);
        }
        if(i != 0) {
            currY++;
        }
        //add row to table
        table.appendChild(row);
    }
    //adds the created table to the mymatrix div
    document.getElementById('mymatrix').innerHTML = '';
    document.getElementById('mymatrix').appendChild(table);
}
