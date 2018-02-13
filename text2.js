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
			solveByRows2(window.allArrays,window.condtions.minNoOfIng,window.condtions.maxNoOfCells);

			
			
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
	conditionArray.push(hold);
	this.condtions =  {
	noOfRows : conditionArray[0],
	noOfCols :  conditionArray[1],
	minNoOfIng : conditionArray[2],
	maxNoOfCells : conditionArray[3],
	minNoOfCells : 2*conditionArray[2]
	}
	this.allArrays = allArrays.slice(1);
	console.log("condition array" + conditionArray);
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

function solveByRows2(arr,l,h){ 
	var min = h,
		max = h,
	 	countT=0,
	 	countM=0,
	 	slicesIndeces=[],
	 	AllSlicesArray=[],
	 	cellsUnused=[],
	 	sliceIndex ="",
	 	countMin=0;
	 	//loop on array row by row
	 	for (var i in arr){
			for(var j in arr[i]){
				if (arr[i][j] == 'T'){
					//calculate number of T in a slice
					countT++;
				}
				else {
					//calculate number of M in a slice
					countM++;
				}	
				sliceIndex +=j //index of cells in a single slice
				countMin++; //to contol the minimum of number of cells

				if (countMin >= min){
					//check minimum number of each ingredient
					if (countT >= l && countM >= l){ 
						slicesIndeces.push(sliceIndex) ; //push index of slice 
						init();
					}else{
						cellsUnused.push(sliceIndex) ;
						//j --;//if slice is refused , take the last cell chosen again 
						init();
					}
				}	
			}
			if(countMin<min){
				cellsUnused.push(sliceIndex);
				init();
			}
			if (slicesIndeces.length >= 1) {
				AllSlicesArray.push(slicesIndeces); //push slices of the whole row 
				slicesIndeces=[];
				init();
			}
					
		}
	console.log("cells that is unused:"+cellsUnused);
	console.log("slices:"+AllSlicesArray);

	//initialize variable 
	function init(){
		sliceIndex="";
			countM=0;
			countT=0;
			countMin=0;
	}
	console.log("number of slices: "+AllSlicesArray.length)

	//to calculate number of cells
	var number_of_cells=0
	for (var elem =0 ; elem<AllSlicesArray.length;elem++){
		for (var i = 0; i < AllSlicesArray[elem].length; i++) {
			
			number_of_cells+=AllSlicesArray[elem][i].length;
		}
		
	}
	console.log("numbers of cells: "+number_of_cells);
	
}
