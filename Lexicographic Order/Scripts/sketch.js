var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function setup() 
{
	createCanvas(windowWidth, windowHeight);
}

function draw() 
{
	background(0);
	var t = "";
	for (var i = 0; i < data.length; i++)
	{
		t += data[i] + ";";
	}
	fill(255);
	textSize(60);
	text(t, 10, height / 2);
	
	console.log(data);
	data = nextOrder(data.slice());
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
function swap(array, a, b)
{
	var temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}