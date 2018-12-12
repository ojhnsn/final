	"use strict";
	function setScreenshotUrl(url) {
		var glitchParams = {
			amount:     Math.random()*99,
			iterations: Math.random()*99,
			quality:    Math.random()*99,
			seed:       Math.random()*99
		};

var screenshotImage = new Image();
screenshotImage.src = url;

screenshotImage.onload = function() {
	     glitch(glitchParams)
			.fromImage(screenshotImage)
			.toDataURL()
			.then(function (dataURL) {
				console.log(dataURL);
				var out = new Image();
				out.src = dataURL;
				document.getElementById('glitch-container').appendChild(out);
			});
			var bg;
var y = 0;
var glitchId = 100;

function setup() {
 bg = loadImage('*?screenshot.html?id=' + glitchId++);
 createCanvas(innerWidth, innerHeight, WEBGL);
}
	}
}
function draw() {
  background(bg);

  stroke(226, 204, 0);
  line(0, y, width, y);

  y++;
  if (y > height) {
    y = 0;
  }
	rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  torus(50, 15);
}
