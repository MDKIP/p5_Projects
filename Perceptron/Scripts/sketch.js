var canvasSize = 750;
var learningRate = 0.1;
var pointsNumber = 500;
var pointSize = 7;
var points = [];
var brain;

function setup() 
{
	createCanvas(canvasSize, canvasSize);
	for (var i = 0; i < pointsNumber; i++)
	{
		points[i] = new Point(floor(random(canvasSize)), floor(random(canvasSize)), pointSize);
	}
	brain = new Perceptron(learningRate);
}

function draw() 
{
	background(0);
	for (var i = 0; i < pointsNumber; i++)
	{
		var current = points[i];
		current.show();
		var result = brain.train(current);
		if (result == true)
		{
			current.color(color(0, 255, 0));
		}
		else
		{
			current.color(color(255, 0, 0));
		}
	}
	drawLine();
}
function drawLine()
{
	stroke(255, 51, 255);
	line(0, 0, width, height);
}