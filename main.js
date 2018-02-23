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

            let allMatches = getAllMatchSlices();
            console.log(allMatches);
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

                      if ( i+prob.num <= this.condtions.noOfRows && j+prob.factor <=this.condtions.noOfCols){
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
                       commonCells : 0
                   });
               }
           }
       }
   }
   return allMatches ;
}