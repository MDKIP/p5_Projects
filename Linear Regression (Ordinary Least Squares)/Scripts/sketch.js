var canvasSize = 600;
var pointSize = 10;
var m = 1;
var b = 0;
var xAverage;
var yAverage;
var points = [];

function setup() 
{
	createCanvas(canvasSize, canvasSize);
}

function draw() 
{
	background(0);
	
	for (var i = 0; i < points.length; i++)
	{
		var v = points[i];
		fill(255);
		var x = map(v.x, 0, 1, 0, width);
		var y = map(v.y, 0, 1, height, 0);
		ellipse(x, y, pointSize, pointSize);
	}
	
	
	if (points.length >= 2)
	{
		calculateM();
		calculateB();
		drawLine();
	}
}

function mousePressed()
{
	var x = map(mouseX, 0, width, 0, 1);
	var y = map(mouseY, 0, height, 1, 0);
	var vector = createVector(x, y);
	points.push(vector);
	
	var xSum = 0;
	for (var i = 0; i < points.length; i++)
	{
		xSum += points[i].x;
	}
	xAverage = xSum / points.length;
	
	var ySum = 0;
	for (var i = 0; i < points.length; i++)
	{
		ySum += points[i].y;
	}
	yAverage = ySum / points.length;
}
function calculateM()
{
	var sum1 = 0;
	var sum2 = 0;
	for (var i = 0; i < points.length; i++)
	{
		var x = points[i].x;
		var y = points[i].y;
		sum1 += (x - xAverage) * (y - yAverage);
		sum2 += (x - xAverage) * (x - xAverage);
	}
	m = sum1 / sum2;
}
function calculateB()
{
	b = yAverage - m * xAverage;
}
function drawLine()
{
	var x1 = 0;
	var y1 = m * x1 + b;
	var x2 = 1;
	var y2 = m * x2 + b;
	
	x1 = map(x1, 0, 1, 0, width);
	y1 = map(y1, 0, 1, height, 0);
	x2 = map(x2, 0, 1, 0, width);
	y2 = map(y2, 0, 1, height, 0);
	
	stroke(255);
	line(x1, y1, x2, y2);
}