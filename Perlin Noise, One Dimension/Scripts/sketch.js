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
	
	var p1 = createP("Increment: ");
	p1.position(10, windowHeight * 2/3 + 10);
	incrementSlider = createSlider(0, 0.2, 0.01, 0);
	incrementSlider.size(500, 20);
	incrementSlider.position(150 ,windowHeight * 2/3  + 25);
	incrementP = createP(incrementSlider.value());
	incrementP.position(750, windowHeight * 2/3 + 10);
	
	var p2 = createP("Speed: ");
	p2.position(10, windowHeight * 2/3 + 40);
	speedSlider = createSlider(0, 0.5, 0.01, 0);
	speedSlider.size(500, 20);
	speedSlider.position(150 ,windowHeight * 2/3  + 55);
	speedP = createP(speedSlider.value());
	speedP.position(750, windowHeight * 2/3 + 40);
	
	var p2 = createP("Detail: ");
	p2.position(10, windowHeight * 2/3 + 70);
	noiseDetailSlider = createSlider(1, 10, 4, 0);
	noiseDetailSlider.size(500, 20);
	noiseDetailSlider.position(150 ,windowHeight * 2/3  + 85);
	detailP = createP(noiseDetailSlider.value());
	detailP.position(750, windowHeight * 2/3 + 70);
	
	var p2 = createP("Height: ");
	p2.position(10, windowHeight * 2/3 + 100);
	noiseHeightSlider = createSlider(0, 1, 0.5, 0);
	noiseHeightSlider.size(500, 20);
	noiseHeightSlider.position(150 ,windowHeight * 2/3  + 115);
	heightP = createP(noiseHeightSlider.value());
	heightP.position(750, windowHeight * 2/3 + 100);
}
function draw() 
{
	background(0);
	var perlinPos = start;
	increment = incrementSlider.value();
	for (var x = 0; x < width; x++)
	{
		stroke(255);
		noiseDetail(noiseDetailSlider.value(), noiseHeightSlider.value());
		point(x, map(noise(perlinPos), 0, 1, 0, height));
		perlinPos += increment;
	}
	start += speedSlider.value();
	
	incrementP.html(incrementSlider.value());
	speedP.html(speedSlider.value());
	detailP.html(noiseDetailSlider.value());
	heightP.html(noiseHeightSlider.value());
}