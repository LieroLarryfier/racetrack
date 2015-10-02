function animateAlongPath( path, element, start, dur ) {
    var len = Snap.path.getTotalLength( path );
    Snap.animate( start, len, function( value ) {
            var movePoint = Snap.path.getPointAtLength( path, value );
			element.attr({ x: movePoint.x, y: movePoint.y, alpha: movePoint.alpha });
    }, dur);
};

var addAnimateMotion = function (s, car) {
		animateMotion = s.el("animateMotion", {
			dur : carSpeed + "s",
			rotate : "auto", 
			repeatCount : "indefinite"
		});
		var mpath = s.el("mpath", {
			'xlink:href' : "#theMotionPath"
		});
		animateMotion.append(mpath);
		console.log(animateMotion);
		car.append(animateMotion);
	};
	
var speed = function () {
	if (carSpeed == 10) {
		carSpeed = 20;
	} else {
		carSpeed = 10;
	}
		animateMotion.attr({
			dur : carSpeed + "s"
		});
}