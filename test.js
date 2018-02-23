/*eslint no-unused-vars: "error"*/
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
/*global window , document,FileReader*/

let flag = 0;

window.onload = function () {
    this.takenSlices =[];
    let pushDone  = false ;

    "use strict";
    const fileInput = document.getElementById('fileInput'),
        fileDisplayArea = document.getElementById('fileDisplayArea');
    fileInput.addEventListener('change', function (e) {
            let file = fileInput.files[0],
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
    let conditionArray = [],
        hold = "";
    for(let col =0; col<allArrays[0].length; col++){
		if(allArrays[0][col] !== " " ){
			hold += allArrays[0][col];
		}else{

			conditionArray.push(hold);
			hold = "";
		}
	}
	this.condtions =
	this.allArrays = allArrays.slice(1);
	return this.allArrays ;
}

function solveByRows(startRow ,startCol, noOfCells){
    let noOfT = 0;
    let noOfM = 0;
    let currentNo = 0;


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
		endCol : startCol + Number(index)-1

	}
}

function solveByCols(startRow ,startCol, noOfCells) {
    let noOfT = 0;
    let noOfM = 0;
    let currentNo = 0;
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
		endCol : startCol

	}
}

function solveByColZigiag (startRow ,startCol, noOfCells){
	var noOfT = 0;
	var noOfM = 0;
	var currentNo = 0;
	var cells = [];

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
		endCol : startCol+1

	}
}

function solveByRowZigiag (startRow ,startCol, noOfCells){
    let noOfT = 0;
    let noOfM = 0;
    let currentNo = 0;
    let cells = [];

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
		endCol : startCol + (cells.length/2) -1

	};
}


function solveByThreeRows(startRow ,startCol, noOfCells){
    let noOfT = 0;
    let noOfM = 0;
    let currentNo = 0;
    let cells = [];

    for (index in this.allArrays){
        if (currentNo < noOfCells){

            cells.push(this.allArrays[startRow][ Number(index) + startCol]);
            cells.push(this.allArrays[  startRow + 1 ][ Number(index) +startCol ]);
            cells.push(this.allArrays[  startRow + 2 ][ Number(index) +startCol ]);
            currentNo +=3 ;
        }else break;
    }


    if (cells.length > noOfCells) {
        cells.pop();
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
        endRow : startRow + 2 ,
        endCol : startCol + (cells.length/3) -1
    }

}

function solveThreeCol (startRow ,startCol, noOfCells) {
    let noOfT = 0;
    let noOfM = 0;
    let currentNo = 0;
    let cells = [];

    for (index in this.allArrays){
        if (currentNo < noOfCells){
            cells.push(this.allArrays[ Number(index) + startRow ][startCol]);
            cells.push(this.allArrays[ Number(index) + startRow ][ startCol + 1 ]);
            cells.push(this.allArrays[ Number(index) + startRow ][ startCol + 2 ]);
            currentNo += 3;
        }else break;
    }

    if (cells.length > noOfCells) {
        cells.pop();
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
        endRow : startRow + (cells.length/3) -1,
        endCol : startCol+2

    }
}

function getSlice(startRow,startCol,factor ,number_of_cells, methodSlection) {
    if (methodSlection === 'row') {
        switch (factor) {
            case 1 : {
                return solveByRows(startRow, startCol, number_of_cells);
            }
            case  2 : {
                return solveByRowZigiag(startRow, startCol, number_of_cells);
            }
            case 3 : {
                return solveByThreeRows(startRow, startCol, number_of_cells);
            }
        }
    }

    if (methodSlection === 'col') {
        switch (factor) {
            case 1 : {
                return solveByCols(startRow, startCol, number_of_cells);
            }
            case  2 : {
                return solveByColZigiag(startRow, startCol, number_of_cells);
            }
            case 3 : {
                return solveThreeCol(startRow, startCol, number_of_cells);
            }
        }
    }
}

// function makeDecision() {
// 	const min = this.condtions.minNoOfCells;
// 	const max = this.condtions.maxNoOfCells;
//
// 	const rndmNoOfCells = Math.floor(Math.random()*(max - min) + min );
// 	const rundmId = Math.floor(Math.random() * 4 + 1);
//
//
// 	object={
// 		noOfCells : rndmNoOfCells,
// 		methodId: rundmId
// 	};
// 	return object;
//
// }

    function theBrain(startRow = 0, startCol = 0) {
        let pushedSlice;
        for (let probability of this.condtions.probabilities) {
            let slice = getSlice(startRow, startCol, probability.factor, probability.factor * probability.num, 'row');
            if (slice.noOfT >= this.condtions.minNoOfIng && slice.noOfM >= this.condtions.minNoOfIng) {
                pushSlice(slice, startRow, startCol);
                pushedSlice = slice;
                this.pushDone = true;
                break;
            } else {
                slice = getSlice(startRow, startCol, probability.factor, probability.factor * probability.num, 'col');
                if (slice.noOfT >= this.condtions.minNoOfIng && slice.noOfM >= this.condtions.minNoOfIng) {
                    pushSlice(slice, startRow, startCol);
                    pushedSlice = slice;
                    this.pushDone = true;
                    break;
                }
            }
            this.pushDone = false;
        }

        if (this.pushDone) {
            if (pushedSlice.endRow < this.allArrays.length-1 && pushedSlice.endCol < this.allArrays[2].length-1) {
                theBrain(pushedSlice.endRow + 1, pushedSlice.endCol + 1)
            } else return;
        }
        if (!this.pushDone) {
            if (startRow + 1 < this.allArrays.length-1 && startCol + 1 < this.allArrays[1].length-1) {
                theBrain(startRow + 1, startCol + 1)
            } else return;
        }


    }

    function pushSlice(slice, startRow, startCol) {

        this.takenSlices.push({
            startRow: startRow,
            startCol: startCol,
            endRow: slice.endRow,
            endCol: slice.endCol
        });
        console.log(this.takenSlices);


    }

    // function changeRowAndCol(id,slice,startRow,startCol){
    // 	switch (id){
    //        case 1 : theBrain(slice.endRow, slice.endCol +1);
    //            break;
    //        case  2 : theBrain(slice.endRow+1, slice.endCol);
    //            break;
    //        case 3 : theBrain(startRow, slice.endCol +1);
    //            break;
    //        case 4 : theBrain(slice.endRow +1, startCol);
    //    }
    // }


    function probabilities(min, max) {
        let probability = [];
        for (let num = min; num <= max; num++) {
            if (num % 3 === 0) {
                const y = num / 3;
                probability.push({num: y, factor: 3});
            }
            if (num % 2 === 0) {
                const y = num / 2;
                probability.push({num: y, factor: 2});
            }
            probability.push({num: num, factor: 1});
        }
        return probability;
    }

