/*eslint no-unused-vars: "error"*/
/*eslint no-unused-vars: ["error", { "args": "none" }]*/
/*global window , document,FileReader,Image*/
window.onload = function () {
    "use strict";
    var fileInput = document.getElementById('fileInput'),
        fileDisplayArea = document.getElementById('fileDisplayArea');
    fileInput.addEventListener('change', function (e) {
        var file = fileInput.files[0],
            imageType = /image*/,
            reader;

        if (file.type.match(imageType)) {
            reader = new FileReader();

            reader.onload = function (e) {
                fileDisplayArea.innerHTML = "";

				var img = new Image();
				img.src = reader.result;

				fileDisplayArea.appendChild(img);
            };

            reader.readAsDataURL(file);
        } else {
            fileDisplayArea.innerHTML = "File not supported!";
				//console.log(file.type);
				
        }
    });

};
