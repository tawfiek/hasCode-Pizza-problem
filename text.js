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
			console.log(solveByCols(0,0, window.condtions.minNoOfCells));
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
