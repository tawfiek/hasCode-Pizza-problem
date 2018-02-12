/*eslint no-unused-vars: "error"*/
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
/*global window , document,FileReader*/

window.onload = function () {
    "use strict";
    var fileInput = document.getElementById('fileInput'),
        fileDisplayArea = document.getElementById('fileDisplayArea');
    	fileInput.addEventListener('change', function (e) {
        var file = fileInput.files[0],
            reader = new FileReader();
		reader.onload = function (e) {
			let text = reader.result;
			fileDisplayArea.innerText = reader.result;
			//seprate string in arrays 
			seprateString(reader.result);
			console.log(window.allArrays);
			console.log(window.condtions);
			
			
        };
		reader.readAsText(file);
		
	});
    
};

function seprateString (text){
	let allArrays = []
	let  arr = [];
	for (let i in text){
		if (text[i] !== '\n'){
			arr.push(text[i]);
		} else {
			allArrays.push(arr);
			arr=[];
		}
	}
	this.condtions =  {
	noOfRows : allArrays[0][0],
	noOfCols :  allArrays[0][2],
	minNoOfIng : allArrays[0][4],
	maxNoOfCells : allArrays[0][6],
	minNoOfCells : 2*allArrays[0][4]
	}
	this.allArrays = allArrays.slice(1);
	 
	return this.allArrays ; 
}

function solveByRows(arraysOfRows){ 
	console.log();
	
}
