/*eslint no-unused-vars: "error"*/
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
/*global window , document,FileReader*/

var flag = 0;

window.onload = function () {
    this.takenSlices =[];
    let pushDone  = false ;

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
			theBrain();
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
			
			if (this.allArrays[startRow][startCol + Number(index) ] === "T") noOfT++ ;
			if (this.allArrays[startRow][startCol + Number(index) ] === "M") noOfM++ ;
			currentNo ++
		} else break;
	}
	return {
		noOfT ,
		noOfM ,
		startRow:startRow,
		endRow : startRow,
		startCol:startCol,
		endcol : startCol + Number(index)-1
		
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
			if (this.allArrays[startRow + Number(index)][startCol] === "T") noOfT++ ;
			if (this.allArrays[startRow + Number(index)][startCol] === "M") noOfM++ ;
			currentNo ++
		}else break;
	}
	return {
		noOfT ,
		noOfM ,
		startRow:startRow,
		startCol:startCol,
		endRow : startRow + Number(index)-1,
		endcol : startCol
		
	}
}

function solveByColZigiag (startRow ,startCol, noOfCells){
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
		if (cell === 'T') noOfT++;
		if (cell === 'M') noOfM++;
	}
	return {
		noOfT ,
		noOfM ,
		startRow:startRow,
		startCol:startCol,
		endRow : startRow + (cells.length/2) -1,
		endcol : startCol+1
		
	}
}

function solveByRowZigiag (startRow ,startCol, noOfCells){
	var noOfT = 0;
	var noOfM = 0;
	var start; 
	var end;
	var currentNo = 0;
	var cells = [];

	for (index in this.allArrays){
		if (currentNo < noOfCells){

			cells.push(this.allArrays[startRow][ Number(index) + startCol]);
			cells.push(this.allArrays[  startRow + 1 ][ Number(index) +startCol ]);
			currentNo += 2;
		}else break;
	}
	
	if (cells.length > noOfCells) {
		cells.pop();
		cells.pop();
	}

	for (let cell of cells ){ 
		if (cell === 'T') noOfT++;
		if (cell === 'M') noOfM++;
	}
	console.log("cells length "+cells.length);
	console.log("equation output"+((cells.length/2) -1));
	return {
		noOfT ,
		noOfM ,
		startRow: startRow,
		startCol: startCol,
		endRow : startRow + 1 ,
		endcol : startCol + (cells.length/2) -1
		
	};


}

function getSlice(startRow,startCol,methodId,number_of_cells){
    if(methodId== 1){
        return solveByRows(startRow,startCol,number_of_cells);
    }else if(methodId== 2){
        return solveByCols(startRow,startCol,number_of_cells);
    }else if(methodId==3){
        return solveByRowZigiag(startRow,startCol,number_of_cells);
    }else{
        return solveByColZigiag(startRow,startCol,number_of_cells);
    }
}

function makeDecision() {
	const min = this.condtions.minNoOfCells;
	const max = this.condtions.maxNoOfCells;

	const rndmNoOfCells = Math.floor(Math.random()*(max - min) + min );
	const rundmId = Math.floor(Math.random() * 4 + 1);
	

	object={
		noOfCells : rndmNoOfCells,
		methodId: rundmId
	};
	return object;

}

function theBrain(startRow = 0 , startCol = 0) {
	const rundm = makeDecision();
	let slice = getSlice(startRow , startCol, rundm.methodId, rundm.noOfCells);

	if (slice.noOfT >= this.condtions.minNoOfIng && slice.noOfM >= this.condtions.minNoOfIng)
		pushSlice(rundm,slice,startRow,startCol);
		else {
		for (let index = rundm.noOfCells+1 ; index<=this.condtions.maxNoOfCells; index++){
			slice = getSlice(startRow, startCol, rundm.methodId, index);
			console.log("method id "+rundm.methodId);
			console.log(slice);
			if(slice.noOfT >= this.condtions.minNoOfIng && slice.noOfM >= this.condtions.minNoOfIng){
                pushSlice(rundm,slice,startRow,startCol);
                this.pushDone = true;
                break;
            }
		}
		if (!this.pushDone) {
			if (flag <4){
				flag ++;
				theBrain(startRow, startCol);
			}
				flag = 0;
				changeRowAndCol(rundm,slice,startRow,startCol);
			
		}
	}
}

function pushSlice(rundm,slice,startRow,startCol ) {
    this.takenSlices.push({
        startRow  : startRow ,
        startCol : startCol,
        endRow : slice.endRow,
        endCol : slice.endCol
    });
    changeRowAndCol(rundm.methodId,slice,startRow,startCol)

}
 function changeRowAndCol(id,slice,startRow,startCol){
 	switch (id){
        case 1 : theBrain(slice.endRow, slice.endCol +1);
            break;
        case  2 : theBrain(slice.endRow+1, slice.endCol);
            break;
        case 3 : theBrain(startRow, slice.endCol +1);
            break;
        case 4 : theBrain(slice.endRow +1, startCol);
    }
 }



