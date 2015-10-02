var socket = io('localhost'); // connect to server

var streetscale = 30; 
var carSpeed = 10;
var animateMotion = null;
 
generate1 = function () {
	console.log("generate1");
	socket.emit('generate1', { my: 'file' }); // raise an event on the server
	streetscale = 60;
	}	
	
generate2 = function () {
	console.log("generate2");
	socket.emit('generate2', { my: 'file' }); // raise an event on the server
	streetscale = 60/2;
	}
	
socket.on('display', function (data) {
		console.log('displayyy');
		displayTrack(data);
	});
