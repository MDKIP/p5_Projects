var canvasSize = 500;
var citiesValue = 20;
var order = [];
var bestOrder = [];
var bestOrderDistance;
var citiesPos = [];

function setup() 
{	
	createCanvas(canvasSize * 2 + 50, canvasSize + 50);
	
	for (var i = 0; i < citiesValue; i++)
	{
		citiesPos[i] = createVector(random(50, canvasSize), random(50, canvasSize));
	}
	for (var i = 0; i < citiesValue; i++)
	{
		while (true)
		{
			var num = floor(random(citiesValue));
			if (!order.includes(num))
			{
				order.push(num);
				break;
			}
		}
	}
	bestOrder = order.slice();
	bestOrderDistance = 0;
	for (var i = 0; i < citiesValue; i++)
	{
		if (i != 0)
		{
			var cc = citiesPos[order[i]];
			var bc = citiesPos[order[i - 1]];
			bestOrderDistance += dist(cc.x, cc.y, bc.x, bc.y);
		}
	}
}
function draw() 
{
	background(0);
	
	for (var i = 0;i < citiesValue; i++)
	{
		fill(255);
		ellipse(citiesPos[i].x, citiesPos[i].y, 8, 8);
	}
	
	for (var i = 0; i < citiesValue; i++)
	{
		if (i != 0)
		{
			stroke(255, 0 , 127);
			strokeWeight(2);
			line(citiesPos[bestOrder[i]].x, citiesPos[bestOrder[i]].y, citiesPos[bestOrder[i - 1]].x, citiesPos[bestOrder[i - 1]].y);
		}
	}
	
	var distance = 0;
	for (var i = 0; i < citiesValue; i++)
	{
		if (i != 0)
		{
			distance += dist(citiesPos[order[i]].x, citiesPos[order[i]].y, citiesPos[order[i - 1]].x, citiesPos[order[i - 1]].y);
		}
	}
	if (distance < bestOrderDistance)
	{
		console.log("NOWY NAJLEPSZY");
		bestOrder = order.slice();
		bestOrderDistance = distance;
	}
	swap(order, floor(random(citiesValue)), floor(random(citiesValue)));
	
	translate(canvasSize, 0);
	for (var i = 0;i < citiesValue; i++)
	{
		fill(255);
		stroke(255);
		ellipse(citiesPos[i].x, citiesPos[i].y, 8, 8);
	}
	for (var i = 0; i < citiesValue; i++)
	{
		if (i != 0)
		{
			stroke(255);
			strokeWeight(1);
			line(citiesPos[order[i]].x, citiesPos[order[i]].y, citiesPos[order[i - 1]].x, citiesPos[order[i - 1]].y);
		}
	}
}
function swap(list, a, b)
{
	var temp = list[a];
	list[a] = list[b];
	list[b] = temp;
}