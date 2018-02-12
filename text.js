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
			this.allArrays = seprateString(reader.result);
			console.log(this.allArrays);
        };
		reader.readAsText(file);
		
	});
	
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
        var r = allArrays[0][0],
	       c = allArrays[0][2],
	       l = allArrays[0][4],
	       h = allArrays[0][6];
	       allArrays = allArrays.slice(1);
		 
		return allArrays ; 
	}
    
};
