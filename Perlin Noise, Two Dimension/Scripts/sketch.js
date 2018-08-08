var canvasSize = 750;
var increment = 0.01;
var start = 0;
var incrementSlider;
var incrementP;
var detailSlider;
var detailP;
var heightSlider;
var heightP;

function setup() 
{
	createCanvas(canvasSize, canvasSize);
	pixelDensity(1);
	
	var p = createP("Increment: ");
	p.position(10, canvasSize);
	incrementSlider = createSlider(0, 0.2, 0.01, 0);
	incrementSlider.size(500, 20);
	incrementSlider.position(100, canvasSize + 15);
	incrementP = createP(incrementSlider.value());
	incrementP.position(625, canvasSize);
	
	var p = createP("Detail: ");
	p.position(10, canvasSize + 30);
	detailSlider = createSlider(1, 10, 4, 1);
	detailSlider.size(500, 20);
	detailSlider.position(100, canvasSize + 45);
	detailP = createP(incrementSlider.value());
	detailP.position(625, canvasSize + 30);
	
	var p = createP("Height: ");
	p.position(10, canvasSize + 60);
	heightSlider = createSlider(0, 1, 0.5, 0);
	heightSlider.size(500, 20);
	heightSlider.position(100, canvasSize + 75);
	heightP = createP(incrementSlider.value());
	heightP.position(625, canvasSize + 60);
	
	var btnGenerate = createButton("Generate");
	btnGenerate.size(200, 80);
	btnGenerate.position(775, canvasSize + 15);
	btnGenerate.mousePressed(generate);
}
function draw() 
{
	incrementP.html(incrementSlider.value());
	detailP.html(detailSlider.value());
	heightP.html(heightSlider.value());
}
function generate()
{
	increment = incrementSlider.value();
	noiseDetail(detailSlider.value(), heightSlider.value());
	loadPixels();
	var xOffset = 0;
	for (var x = 0; x < width; x++)
	{
		var yOffset = 0;
		for (var y = 0; y < height; y++)
		{
			var n = noise(xOffset, yOffset);
			c = map(n, 0, 1, 0, 255);
			
			var index = (x + y * width) * 4;
			pixels[index+0] = c;
			pixels[index+1] = c;
			pixels[index+2] = c;
			pixels[index+3] = 255;
			
			yOffset += increment;
		}
		xOffset += increment;
	}
	updatePixels();
}