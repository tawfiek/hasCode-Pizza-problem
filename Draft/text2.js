var countT=0,
 	countM=0,
 	slicesIndeces=[],
 	AllSlicesArray=[],
 	cellsUnused=[],
 	AllCellsUnused=[],
 	sliceIndex ="",
 	countMin=0;
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
				solveByRows2(window.allArrays,window.condtions.minNoOfIng,window.condtions.maxNoOfCells );

        };
		reader.readAsText(file);
		
	});
    
};
//seperate string 
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

function solveByRows2(arr,l,min){
	 	//loop on array row by row
	 	for (var i in arr){
			for(var j in arr[i]){
				if (arr[i][j] == 'T'){countT++;}
				else {countM++;}	

				sliceIndex +=j 
				countMin++;

				if (countMin >= min){
					//check minimum number of each ingredient
					if (countT >= l && countM >= l){ 
						slicesIndeces.push(sliceIndex) ; //push index of slice 
						init();
					}else{
						cellsUnused.push(sliceIndex); 
						init();
					}
				}	
			}
			if(countMin<min){
				cellsUnused.push(sliceIndex);
				init();
			}
			if (cellsUnused.length >= 1) {
				AllCellsUnused.push(cellsUnused); //push slices of the whole row 
				cellsUnused=[];
				init();
			}
			if (slicesIndeces.length >= 1) {
				AllSlicesArray.push(slicesIndeces); //push slices of the whole row 
				slicesIndeces=[];
				init();
			}
					
		}
		for (element in AllCellsUnused){
			console.log("cells that is unused at row "+element+" is:"+AllCellsUnused[element]);
		}
		
		console.log("number of cells is unused: "+countCellsUnused());

		for (element in AllCellsUnused){
			console.log("cells that is used at row "+element+" is:"+AllSlicesArray[element]);
		}
		//console.log("slices:"+AllSlicesArray);
		console.log("number of slices: "+countSlices());
		console.log("numbers of cells: "+countCells());
		
} 
//initialize variable 
function init(){
	sliceIndex="";
		countM=0;
		countT=0;
		countMin=0;
}

function countSlices(){
	var number_of_slices=0
		for (var elem =0 ; elem<window.AllSlicesArray.length;elem++){
			number_of_slices += window.AllSlicesArray[elem].length;
			
		}
	return number_of_slices;
}

function countCells(){
	var number_of_cells=0
		for (var elem =0 ; elem<window.AllSlicesArray.length;elem++){
			for (var i = 0; i < window.AllSlicesArray[elem].length; i++) {
				
				number_of_cells+=window.AllSlicesArray[elem][i].length;
			}
			
		}
		return number_of_cells;

}

function countCellsUnused(){
	var number_of_cells=0
		for (var elem =0 ; elem<window.AllCellsUnused.length;elem++){
			for (var i = 0; i < window.AllCellsUnused[elem].length; i++) {
				
				number_of_cells+=window.AllCellsUnused[elem][i].length;
			}
			
		}
		return number_of_cells;

}