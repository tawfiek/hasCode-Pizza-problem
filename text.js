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
			seprateString(text);
			console.log(solveByRowZigiag(0,0, 5));
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
	var conditionArray = [],
		 hold = "";
	for(var col =0;col<allArrays[0].length;col++){
		if(allArrays[0][col] !== " " ){
			hold += allArrays[0][col];
		}else{

			conditionArray.push(hold);
			hold = "";
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

function solveByRows(startRow ,startCol, noOfCells){ 
	var noOfT = 0;
	var noOfM = 0;
	var start; 
	var end; 
	var currentNo = 0 ;
	

	for ( index in this.allArrays[startRow]){
		if (currentNo < noOfCells){
			
			if (this.allArrays[startRow][startCol + Number(index) ] == "T") noOfT++ ; 
			if (this.allArrays[startRow][startCol + Number(index) ] == "M") noOfM++ ;
			currentNo ++
		} else break;
	}
	return {
		noOfT ,
		noOfM ,
		endcol : startCol + Number(index)-1,
		endRow : startRow
	}	
}

function solveByCols(startRow ,startCol, noOfCells) {
	var noOfT = 0;
	var noOfM = 0;
	var start; 
	var end; 
	var currentNo = 0 ;
	for ( index in this.allArrays) {
		if (currentNo < noOfCells){
			if (this.allArrays[startRow + Number(index)][startCol] == "T") noOfT++ ;
			if (this.allArrays[startRow + Number(index)][startCol] == "M") noOfM++ ;
			currentNo ++
		}else break;
	}
	return {
		noOfT ,
		noOfM ,
		endcol : startCol,
		endRow : startRow + Number(index)-1
	}
}

function solveByRowZigiagsolveByColZigiag (startRow ,startCol, noOfCells){
	var noOfT = 0;
	var noOfM = 0;
	var start; 
	var end;
	var currentNo = 0;
	var cells = []

	for (index in this.allArrays){
		if (currentNo < noOfCells){
			cells.push(this.allArrays[ Number(index) + startRow ][startCol]);
			cells.push(this.allArrays[ Number(index) + startRow ][ startCol + 1 ]);
			currentNo += 2;
		}else break;
	}
	
	if (cells.length > noOfCells) {
		cells.pop();
		cells.pop();
	}

	for (let cell of cells ){ 
		if (cell === 'T') noOfT++
		if (cell === 'M') noOfM++
	}
	return {
		noOfT ,
		noOfM ,
		endcol : startCol+1,
		endRow : startRow + (cells.length/2) -1 
	}
}

function solveByRowZigiag (startRow ,startCol, noOfCells){
	var noOfT = 0;
	var noOfM = 0;
	var start; 
	var end;
	var currentNo = 0;
	var cells = []

	for (index in this.allArrays){
		if (currentNo < noOfCells){
			cells.push(this.allArrays[startRow][ Number(index) + startCol ]);
			cells.push(this.allArrays[  startRow + 1 ][ Number(index) +startCol ]);
			currentNo += 2;
		}else break;
	}
	
	if (cells.length > noOfCells) {
		cells.pop();
		cells.pop();
	}

	for (let cell of cells ){ 
		if (cell === 'T') noOfT++
		if (cell === 'M') noOfM++
	}
	return {
		noOfT ,
		noOfM ,
		endcol : startCol + (cells.length/2) -1, 
		endRow : startRow + 1 
	}
}

function makeDecision() {
	const min = this.condtions.minNoOfCells;
	const max = this.condtions.maxNoOfCells;

	const rndmNoOfCells = Math.random()*(max - min) + min ;
	
	const rundmId = Math.random() * 4 + 1;

	return { 
		noOfCells : Math.floor(rndmNoOfCells),
		methodId: Math.floor(rundmId)
	}

}

