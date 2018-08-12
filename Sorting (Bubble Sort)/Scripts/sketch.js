var length = 100;
var rectWidth;
var collection = [];
var lastIndex;
var wasSwap;
var isSorted;

function setup() 
{
	createCanvas(1000 , 500);
	
	for (var i = 0; i < length; i++)
	{
		collection[i] = floor(random(height));
	}
	
	rectWidth = width / length;
	lastIndex = 0;
	wasSwap = false;
	isSorted = false;
}

function draw() 
{
	background(100);
	
	for (var i = 0; i < length; i++)
	{
		var value = collection[i];
		if (i == lastIndex && !isSorted)
		{
			fill(0, 255, 0);
		}
		else
		{
			fill(0);
		}
		rect(rectWidth * i, height, rectWidth, -value);
	}
	if (!isSorted)
	{
		nextOrder();
	}
}

function nextOrder()
{
	if (lastIndex < collection.length)
	{
		if (collection[lastIndex] > collection[lastIndex+1])
		{
			swap(collection, lastIndex, lastIndex + 1);
			wasSwap = true;
		}
		lastIndex++;
	}
	else
	{
		if (!wasSwap)
		{
			isSorted = true;
		}
		wasSwap = false;
		lastIndex = 0;
	}
}
function swap(a, i, j)
{
	var temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}