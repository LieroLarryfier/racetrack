//variable declaration
var filesUpload = null;
var file = null;
//var socket = io.connect('http://localhost');
var send = false;

if (window.File && window.FileReader && window.FileList) {
    //HTML5 File API ready
    init();
} else {
    //browser has no support for HTML5 File API
    //send a error message or something like that
    //TODO
}

/**
 * Initialize the listeners and send the file if have.
 */
function init() {
	console.log('init');
    filesUpload = document.getElementById('file');
    filesUpload.addEventListener('change', fileHandler, false);
}

/**
 * Handle the file change event to send it content.
 * @param e
 */
function fileHandler(e) {
    var files = e.target.files || e.dataTransfer.files;

    if (files) {
        //send only the first one
        file = files[0];
    }
}

function sendFile() {
    if (file) {
        //read the file content and prepare to send it
        var reader = new FileReader();

        reader.onload = function(e) {
            console.log('Sending file...');
            //get all content
            var buffer = e.target.result;
            //send the content via socket
            socket.emit('send-file', file.name, buffer);
        };
        reader.readAsBinaryString(file);
    }
}