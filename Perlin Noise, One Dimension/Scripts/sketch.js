var increment = 0.01;
var start = 0;
var incrementSlider;
var speedSlider;
function setup() 
{
	createCanvas(windowWidth, windowHeight * 2/3);
	var p1 = createP("Increment: ");
	p1.position(10, windowHeight * 2/3 + 10);
	incrementSlider = createSlider(0, 0.2, 0.01, 0);
	incrementSlider.size(500, 20);
	incrementSlider.position(150 ,windowHeight * 2/3  + 25);
	var p2 = createP("Speed: ");
	p2.position(10, windowHeight * 2/3 + 40);
	speedSlider = createSlider(0, 0.5, 0.01, 0);
	speedSlider.size(500, 20);
	speedSlider.position(150 ,windowHeight * 2/3  + 55);
}
function draw() 
{
	background(0);
	var perlinPos = start;
	increment = incrementSlider.value();
	for (var x = 0; x < width; x++)
	{
		stroke(255);
		point(x, map(noise(perlinPos), 0, 1, 0, height));
		perlinPos += increment;
	}
	start += speedSlider.value();
}