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
			solveByRows(allArrays,condtions.minNoOfIng,condtions.maxNoOfCells);

			
			
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

function solveByRows(arr,l,h){ 
	var min = 2*l,
		max = h,
	 	countT=0,
	 	countM=0,
	 	cell,
	 	slicesArray=[],
	 	AllSlicesArray=[],
	 	cellsUnused=[],
	 	sliceIndex ="",
	 	countMin=0,
	 	holdSlice=[];
	 	//loop on array row by row
	 	for (var i =0 ;i<arr.length;i++){
		for(var j=0;j<arr[i].length;j++){
			cell = arr[i][j];//define value of each cell
			if (cell == 'T'){
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
				if (countT >= l && countM >= l){ //check minimum number of each ingredient
				slicesArray.push(sliceIndex) ;
				init();
				}else{
					cellsUnused.push(sliceIndex) ;
					j --;//if slice is refused , take the last cell chosen again 
					init();
				}
			}
		}
			AllSlicesArray.push(slicesArray);
			holdSlice+=slicesArray;
			slicesArray=[];
			init();	
	}
	//console.log(holdSlice);
	console.log("cells that is unused:"+cellsUnused);
	console.log("slices:"+AllSlicesArray);

	//initialize variable 
	function init(){
		sliceIndex="";
			countM=0;
			countT=0;
			countMin=0;
	}
	//to calculate number of cells
	var number_of_cells=0
	for (var elem =0 ; elem<AllSlicesArray.length;elem++){
		for (var i = 0; i < AllSlicesArray[elem].length; i++) {
			
			number_of_cells+=AllSlicesArray[elem][i].length;
		}
		
	}
console.log("numbers of cells:"+number_of_cells);
	
}
