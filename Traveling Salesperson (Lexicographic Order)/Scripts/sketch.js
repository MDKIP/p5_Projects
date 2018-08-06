var canvasSize = 500;
var citiesValue = 10;
var drawInfoData = true;
var order = [];
var bestOrder = [];
var bestOrderDistance;
var citiesPos = [];
var factorialFromCitiesValue;
var iteriation;

function setup() 
{	
	createCanvas(canvasSize * 2 + 50, canvasSize + 50);
	
	for (var i = 0; i < citiesValue; i++)
	{
		citiesPos[i] = createVector(random(50, canvasSize), random(50, canvasSize));
	}
	for (var i = 0; i < citiesValue; i++)
	{
		order.push(i);
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
	if (drawInfoData)
	{
		factorialFromCitiesValue = getFactorial(citiesValue);
		iteriation = 0;
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
	order = nextOrder(order.slice());
	iteriation++;
	
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
	
	if (drawInfoData)
	{
		fill(255);
		textSize(24);
		text(iteriation + "/" + factorialFromCitiesValue, 10, 34);
		text(iteriation/factorialFromCitiesValue * 100 + "%", 10, height - 10);
	}
}
function swap(list, a, b)
{
	var temp = list[a];
	list[a] = list[b];
	list[b] = temp;
}
function nextOrder(array)
{
	var largestX = -1;
	for (var i = 0; i < array.length; i++)
	{
		if (array[i] < array[i + 1])
		{
			largestX = i;
		}
	}
	if (largestX == -1)
	{
		console.log("KONIEC");
		noLoop();
	}
	var largestY = -1;
	for (var i = 0; i < array.length; i++)
	{
		if (array[largestX] < array[i])
		{
			largestY = i;
		}
	}
	swap(array, largestX, largestY);
	var endArray = array.splice(largestX + 1);
	endArray.reverse();
	array = array.concat(endArray);
	return array;
}
function getFactorial(num)
{
    if (num === 0)
      { return 1; }
    else
      { return num * getFactorial( num - 1 ); }
}