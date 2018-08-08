var increment = 0.01;
var start = 0;
var incrementSlider;
var speedSlider;
var noiseDetailSlider;
var noiseHeightSlider;
var incrementP;
var speedP;
var detailP;
var heightP;
function setup() 
{
	createCanvas(windowWidth, windowHeight * 2/3);
	
	var p = createP("Increment: ");
	p.position(10, windowHeight * 2/3 + 10);
	incrementSlider = createSlider(0, 0.2, 0.01, 0);
	incrementSlider.size(500, 20);
	incrementSlider.position(100 ,windowHeight * 2/3  + 25);
	incrementP = createP(incrementSlider.value());
	incrementP.position(625, windowHeight * 2/3 + 10);
	
	var p = createP("Speed: ");
	p.position(10, windowHeight * 2/3 + 40);
	speedSlider = createSlider(0, 0.5, 0.01, 0);
	speedSlider.size(500, 20);
	speedSlider.position(100 ,windowHeight * 2/3  + 55);
	speedP = createP(speedSlider.value());
	speedP.position(625, windowHeight * 2/3 + 40);
	
	var p = createP("Detail: ");
	p.position(10, windowHeight * 2/3 + 70);
	noiseDetailSlider = createSlider(1, 10, 4, 1);
	noiseDetailSlider.size(500, 20);
	noiseDetailSlider.position(100 ,windowHeight * 2/3  + 85);
	detailP = createP(noiseDetailSlider.value());
	detailP.position(625, windowHeight * 2/3 + 70);
	
	var p = createP("Height: ");
	p.position(10, windowHeight * 2/3 + 100);
	noiseHeightSlider = createSlider(0, 1, 0.5, 0);
	noiseHeightSlider.size(500, 20);
	noiseHeightSlider.position(100 ,windowHeight * 2/3  + 115);
	heightP = createP(noiseHeightSlider.value());
	heightP.position(625, windowHeight * 2/3 + 100);
}
function draw() 
{
	background(0);
	var perlinPos = start;
	increment = incrementSlider.value();
	fill(0);
	beginShape();
	for (var x = 0; x < width; x++)
	{
		stroke(255);
		noiseDetail(noiseDetailSlider.value(), noiseHeightSlider.value());
		vertex(x, map(noise(perlinPos), 0, 1, 0, height));
		perlinPos += increment;
	}
	endShape();
	start += speedSlider.value();
	
	incrementP.html(incrementSlider.value());
	speedP.html(speedSlider.value());
	detailP.html(noiseDetailSlider.value());
	heightP.html(noiseHeightSlider.value());
}