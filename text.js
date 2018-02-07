window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];

				var reader = new FileReader();
				console.log(file.type);
		
				reader.onload = function(e) {
					fileDisplayArea.innerText = reader.result;
				}
				
				reader.readAsText(file);	
		
		});
}
