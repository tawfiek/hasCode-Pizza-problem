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
        //console.log(file.type);
		reader.onload = function (e) {
            fileDisplayArea.innerText = reader.result;
        };
        reader.readAsText(file);
    });
};
