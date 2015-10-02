var http = require("http");
var fs = require("fs");
var path = require("path");
var mime = require("mime");

function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendPage(response, filePath, fileContents) {
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serverWorking(response, absPath) {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

var server = http.createServer(function(request, response) {
  var filePath = false;

  if (request.url == '/') {
    filePath = "public/index.html";
  } else {
    filePath = "public" + request.url;
  }

  var absPath = "./" + filePath;
  serverWorking(response, absPath);
});

var port_number = server.listen(process.env.PORT || 3000);
var execSync = require('child_process').execSync;

var generateRaceTrack = function(file, socket) {
	console.log('generate: ');
	

	
	 var filePath = "public/";
	 var imagePath = "images/";
	 var filename = null;
	 console.log('file: ' + file);
	 if (file.indexOf(".") > 0) {
		 filename = file.split('.')[0];
	 } else {
		 filename = file;
	 }
	 
	 var bmp = filename + ".bmp";
	 var svg = filename + ".svg";
	
	var child = execSync('potrace -s -u 1 -a 0 -k 0.42 ' + filePath + imagePath + bmp,
		function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		});
		
	var absPath = "./" + filePath + imagePath + svg;
	fs.readFile(absPath, function(err, data) {
        if (err) {
          console.log(err);
        } else {
			console.log('display: ');
			
          socket.emit('display', {svg : imagePath + svg});
        }
      });
};

var convertToBmp = function (fileName) {
	
	var withoutExtension = fileName.split('.')[0];
	
	var child = execSync('imconvert -resize 800x600 ' + fileName + ' ' + withoutExtension + '.bmp',
		function (error, stdout, stderr) {
			console.log('stdout: ' + stdout);
			console.log('stderr: ' + stderr);
			if (error !== null) {
				console.log('exec error: ' + error);
			}
		});
}

var io = require('socket.io').listen(80); // initiate socket.io server

io.sockets.on('connection', function (socket) {
  socket.on('generate1', function () {  
    generateRaceTrack("track", socket);
  });
  socket.on('generate2', function () {  
    generateRaceTrack("t2", socket);
  });
  socket.on('send-file', function(name, buffer) {
        
        //path to store uploaded files (NOTE: presumed you have created the folders)
        var fileName = __dirname + '/public/images/' + name;
		console.log(fileName);
        var fd = fs.openSync(fileName, 'w', 0755);
        fs.writeSync(fd, buffer, null, 'Binary');
        fs.closeSync(fd);
        console.log('File saved successful!');
        
		convertToBmp(fileName);
		
		generateRaceTrack(name, socket);

    });
});	
	

