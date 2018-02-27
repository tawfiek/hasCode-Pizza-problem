window.onload = function () {
    this.takenSlices =[];
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;


    function onInitFs(fs) {

        fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {

            console.log(fileEntry.isFile);
            console.log(fileEntry.name );
            console.log(fileEntry.fullPath);

        });

    }

    window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs);


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

            let allMatches = getAllMatchSlices();
            console.log(allMatches);
            // sliceSlices();
            calCells();
        };
        reader.readAsText(file);



    });

};

// ********************************************* Separating Sting *********************************************
function seprateString (text){
    let allArrays = [];
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
        }
        else{

            conditionArray.push(hold);
            hold = "";
        }

        if ( col === allArrays[0].length -1){
            conditionArray.push(hold);
            hold = "";
        }
    }
    this.condtions =  {
        noOfRows : conditionArray[0],
        noOfCols :  conditionArray[1],
        minNoOfIng : conditionArray[2],
        maxNoOfCells : conditionArray[3],
        minNoOfCells : 2*conditionArray[2],
        probabilities : probabilities(2*conditionArray[2], conditionArray[3])
    };
    this.allArrays = allArrays.slice(1);
    return this.allArrays ;
}

// *****************************************************************************************



// ************************************* Get probabilities **********************************
function probabilities(min, max) {
    let probability = [];
    for (let num = min; num <= max; num++) {
         for (let i = num ; i > 0 ; i--) {
             if (num % i === 0){
                 probability.push({num : num/i , factor: i});
             }
         }
    }
    return probability ;
}


// *****************************************************************************************


function getAllMatchSlices () {
    let allMatches =[];
   for(let i =0 ; i < this.allArrays.length ;i++){
       for(let j=0 ; j < this.allArrays[i].length;j++){
           for (let prob of this.condtions.probabilities){
               let noOfT = 0;
               let noOfM = 0 ;
               for (let rowNo= i ; rowNo < i+prob.num ; rowNo ++ ) {
                  for (let colNo= j ; colNo < j+prob.factor ; colNo++ ) {

                      if ( i+prob.num <= this.condtions.noOfRows && j+prob.factor <= this.condtions.noOfCols ){
                          if (this.allArrays[rowNo][colNo] === 'T') noOfT++;
                          if (this.allArrays[rowNo][colNo] === 'M') noOfM++;
                      }
                  }
               }
               if (noOfT >= this.condtions.minNoOfIng && noOfM >= this.condtions.minNoOfIng){
                   allMatches.push({
                       startRow : i ,
                       startCol : j ,
                       endRow : i+prob.num-1 ,
                       endCol : j+prob.factor-1,
                       commonCells : 0,
                       noOfCells: noOfM+noOfT
                   });
               }
           }
       }
   }
   return allMatches ;
}

// *********************************** Find The Common Cells *********************************************************

function findCommon(){
	let possibleSlices = getAllMatchSlices();

	for (const index in possibleSlices ) {
        for (let i = Number(index) +1 ;  i < Number(index) + Math.pow(this.condtions.maxNoOfCells-1, 2) ; i++){
            let commanRows ;
            let commanCol ;
            if (i >= possibleSlices.length ) {
                break;
            }
           let currntSlice = possibleSlices[index];
           let nextSlice = possibleSlices[i];
           // ***************  For Rows ******************************
           if (currntSlice.endRow > nextSlice.endRow){
                commanRows = nextSlice.endRow - currntSlice.startRow +1 ;
           } else if (currntSlice.endRow < nextSlice.endRow) {
                commanRows = currntSlice.endRow - nextSlice.startRow +1 ;
           }else if (currntSlice.endRow = nextSlice.endRow){
               if (currntSlice.startRow > nextSlice.startRow ) {
                   commanRows = nextSlice.endRow - currntSlice.startRow + 1 ;
               } else {
                   commanRows = currntSlice.endRow - nextSlice.startRow + 1 ;
               }
           }
        //    ***************************************************************
        //     ************* For Coll ***********************************

            if (currntSlice.endCol > nextSlice.endCol){
                commanCol = nextSlice.endCol - currntSlice.startCol +1 ;
            } else if (currntSlice.endCol < nextSlice.endCol) {
                commanCol = currntSlice.endCol - nextSlice.startCol +1 ;
            }else if (currntSlice.endCol = nextSlice.endCol){
                if (currntSlice.startCol > nextSlice.startCol ) {
                    commanCol = nextSlice.endCol - currntSlice.startCol + 1 ;
                } else {
                    commanCol = currntSlice.endCol - nextSlice.startCol + 1 ;
                }
            }
            if (commanRows > 0  && commanCol > 0  ) {
               possibleSlices[index].commonCells  += commanCol*commanRows;
               possibleSlices[i].commonCells += commanRows*commanCol;
            }
        }
	}
        // console.log(possibleSlices.sort(function (a,b) {
        //     const n = a.commonCells - b.commonCells;
        //     if (n !==0 ) return n ;
        //     return b.noOfCells - a.noOfCells
        // }));

	    return possibleSlices.sort(function (a,b) {
             const n = b.noOfCells - a.noOfCells;
             if (n !==0 ) return n ;
             return a.commonCells - b.commonCells;
        });

}

function slicePizza () {
    console.time("Ahmed&Eman")
    const  allSlices = findCommon();
    let  okSlice  =false ;
    let takenSlice = [] ;
    for  (let slice of allSlices){
        loop1:
        for (let r = slice.startRow; r <= slice.endRow; r++) {
            for (let  c= slice.startCol; c <= slice.endCol; c++){
                if (!this.allArrays[r][c]){
                    okSlice = false;
                    break loop1;
                }
               okSlice = true ;
            }
        }
        if (okSlice){
            for (let r = slice.startRow; r <= slice.endRow; r++) {
                for (let  c= slice.startCol; c <= slice.endCol; c++){
                    this.allArrays [r][c] = 0 ;
                }
            }
            takenSlice.push(slice)
        }
    }

    console.log(takenSlice);
    console.timeEnd('Ahmed&Eman');
    return takenSlice;

}

// ********************** calculate the number of taken cells and log it *************************
 function calCells(){
    let slices = slicePizza();
    let no_of_cells =0;
    for (let slice of slices){
        no_of_cells += slice.noOfCells;
    }
    console.log(no_of_cells);
 }

 // *************************************************************************************************
 //
 // function  margeTaken(taken) {
 //    console.log(taken);
 //     for ( let i = 0 ; i < taken.length ; i++) {
 //         if (taken[i].noOfCells < this.condtions.maxNoOfCells) {
 //             for (let sc= taken[i].startCol-1 ; sc >= 0 ; sc--){
 //                 const noOfAddCells =  1 + taken[i].endRow - taken[i].startRow;
 //                 if ((taken[i].noOfCells + noOfAddCells) <= this.condtions.maxNoOfCells) {
 //                     let cellCheck = false;
 //                     for (let i=0 ; i < noOfAddCells ; i++){
 //                         if (this.allArrays[i+taken[i].startRow][sc]) {
 //                             cellCheck = true ;
 //                         }else {
 //                             cellCheck = false;
 //                             break;
 //                         }
 //                     }
 //                    if(cellCheck){
 //                        for (let i=0 ; i < noOfAddCells ; i++){
 //                            this.allArrays[i+taken[i].startRow][sc]= 0;
 //                        }
 //                        taken[i].startCol = sc ;
 //                        taken[i].noOfCells += noOfAddCells ;
 //                    }else break ;
 //                 }else break ;
 //             }
 //             for (let sr= taken[i].startRow-1 ; sr >= 0 ; sr--){
 //                 const noOfAddCells =  1 + taken[i].endCol - taken[i].startCol;
 //                 if ((taken[i].noOfCells + noOfAddCells) <= this.condtions.maxNoOfCells) {
 //                     let cellCheck = false;
 //                     for (let i=0 ; i < noOfAddCells ; i++){
 //                         if (this.allArrays[sr][i+taken[i].startCol]) {
 //                             cellCheck = true ;
 //                         } else {
 //                             cellCheck = false;
 //                             break;
 //                         }
 //                     }
 //                     if(cellCheck){
 //                         for (let i=0 ; i < noOfAddCells ; i++){
 //
 //                             this.allArrays[sr][i+taken[i].startCol]= 0;
 //                         }
 //                         taken[i].startRow = sr ;
 //                         taken[i].noOfCells +=noOfAddCells;
 //                     }else {
 //                         cellCheck = false;
 //                         break;
 //                     }
 //
 //                 }else break;
 //             }
 //             for (let ec= taken[i].endcol+1 ; ec < this.allArrays[0].length ; ec++){
 //                 const noOfAddCells =  1 + taken[i].endRow - taken[i].startRow;
 //
 //                 if ((taken[i].noOfCells + noOfAddCells) <= this.condtions.maxNoOfCells) {
 //                     let cellCheck = false;
 //                     for (let i=0 ; i < noOfAddCells ; i++){
 //                         if (this.allArrays[i + taken[i].startRow][ec]) {
 //                             cellCheck = true;
 //                         }else  {
 //                             cellCheck = false;
 //                             break;
 //                         }
 //                     }
 //                     if(cellCheck){
 //                         for (let i=0 ; i < noOfAddCells ; i++) this.allArrays[i+taken[i].startRow][ec] =0
 //                         taken[i].endcol = ec ;
 //                         taken[i].noOfCells += noOfAddCells;
 //                     }else {
 //                         cellCheck = false;
 //                         break;
 //                     }
 //                 }else break;
 //             }
 //             for (let er= taken[i].endRow+1 ; er < this.allArrays.length ; er++){
 //                 const noOfAddCells =  1 + taken[i].endCol - taken[i].startCol;
 //                 if ((taken[i].noOfCells + noOfAddCells) <= this.condtions.maxNoOfCells) {
 //                     let cellCheck = false;
 //                     for (let i=0 ; i < noOfAddCells ; i++){
 //                         if (this.allArrays[er][i+taken[i].startCol]) {
 //                             cellCheck = true ;
 //                         }else {
 //                             cellCheck = false ;
 //                             break;
 //                         }
 //                     }
 //                     if(cellCheck){
 //                         for (let i=0 ; i < noOfAddCells ; i++){
 //                             this.allArrays[er][i+taken[i].startCol] = 0;
 //                         }
 //                         taken[i].endRow = er ;
 //                         taken[i].noOfCells +=  noOfAddCells;
 //                     } else {
 //                         cellCheck = false;
 //                         break;
 //                     }
 //                     }else break;
 //
 //             }
 //         }
 //     }
 //     console.log(taken);
 //     console.log(this.allArrays);
 //     return taken ;
 //     }