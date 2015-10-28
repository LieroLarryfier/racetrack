//TODO: improve path recognition, render trees, render sand incurves, render curbs only in curves,
//render stands, render start and finish line, render start grid, render different grass, (render ismoetric view)
var longestSubPath = function (path) {
		var pathArray = Snap.parsePathString(path);
		var subPathArray = [];
		var longestPath = 0;
		var subPath = "";
		var returnPath = "";
		var returnPathArray = [];
		
		for (x in pathArray) {
			
			subPathArray.push(pathArray[x]);
			if (pathArray[x][0] == 'z') {
				
				var subPath = subPathArray.toString().replace(/,/g," ");
				var pathLength = Snap.path.getTotalLength(subPath);
				if (longestPath < pathLength) {
					longestPath = pathLength;
					returnPath = Snap.path.toAbsolute(subPath);
					returnPathArray = Snap.parsePathString(returnPath);
					subPathArray = [];
					subPath = "";
				}
			}
		}
		var pointsArray = [];
		for (point in returnPathArray) {
			var x = returnPathArray[point][1];
			var y = returnPathArray[point][2];
			if (x > 0 && y > 0) {
				
				pointsArray[point] = {x, y};
			}
		}
		
		polygon = pointsArray;

		return returnPath;
}

var STAGE_HEIGHT;
var STAGE_WIDTH;
var iteration = 0;

var trackPngData;

function trackAsPng() {
				var svg = document.getElementById("svg" + iteration);
				var img = document.getElementById("exportPng");
				svg.toDataURL("image/png", {
					callback: function(data) {
						trackPngData = data;
						startGame();
					}
				})
				iteration++;
			}

var displayTrack = function (data) {
	
	Snap.load(data.svg, function (f) {
		var svg = f.select("svg");
		STAGE_WIDTH = parseInt(svg.attr("width"));
		STAGE_HEIGHT = parseInt(svg.attr("height"));
		var g = f.select("g");
		var p = g.select("path");
		
		var trackPath = longestSubPath(p);
		
		
		
		p.attr({
			transform : "translate(0.000000, 0.00000) scale(1.00000,1.00000)",
			d : trackPath,
			fill : "none"
			});
		
		var white = p.clone();
		white.attr({
			stroke : "white",
			'stroke-width' : streetscale,
		});
		
		var curbs = p.clone();
		curbs.attr({
			stroke : "red",
			'stroke-width' : streetscale,
			'stroke-dasharray' : [streetscale*0.2, streetscale/4]
		});

		var street = p.clone();
		street.attr({
			stroke : "grey",
			'stroke-width' : streetscale*3/4,
		});
		
		var line = p.clone();
		line.attr({
			stroke : "white",
			'stroke-width' : "2px",
			'stroke-dasharray' : [streetscale*0.2, streetscale/4],
			fill : "none",
			id : "theMotionPath"
		});
		
		var s = Snap(STAGE_WIDTH, STAGE_HEIGHT);
		var bg = s.rect(0,0,STAGE_WIDTH,STAGE_HEIGHT);
		bg.attr({
			fill : "rgb(0, 153, 0)"
		});
		s.append(white);
		s.append(curbs);
		s.append(street);
		s.append(line);
			
			
		var car1 = s.rect(0,-17,20,10);
		car1.attr({
			fill : "#ff00a3"
		});
		var car2 = s.rect(0,7,20,10);
		car2.attr({
			fill : "#b3ff00"
		});
		
		addAnimateMotion(s, car1);
		addAnimateMotion(s, car2);
		
		var svgId = "svg" + iteration;
			s.attr({
				id : svgId
			});
		
		
		trackAsPng();
		
		
		
	});

};	