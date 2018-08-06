var canvasSize = 700;
var nodesInLine = 40;
var nodes = new Array(nodesInLine);
var start;
var end;
var isSearching = true;
var obstacles = [];
var openSet = [];
var closedSet = [];

function setup() 
{
	createCanvas(canvasSize + 1, canvasSize + 1);
	
	for (var i = 0; i < nodesInLine; i++)
	{
		nodes[i] = new Array(nodesInLine);
	}
  
	for (var y = 0; y < nodesInLine; y++)
	{
		for (var x = 0; x < nodesInLine; x++)
		{
			var size = canvasSize / nodesInLine;
			nodes[y][x] = new Node(x * size, y * size);
		}
	}
	
	//start = nodes[floor(random(nodesInLine))][floor(random(nodesInLine))];
	//end = nodes[floor(random(nodesInLine))][floor(random(nodesInLine))];
	start = nodes[0][0];
	end = nodes[nodesInLine - 1][nodesInLine - 1];
	
	for (var y = 0; y < nodesInLine; y++)
	{
		for (var x = 0; x < nodesInLine; x++)
		{
			var current = nodes[y][x];
			if (random(100) < random(50))
			{
				if (current !== start && current !== end)
				{
					current.isObstacle = true;
					obstacles.push(current);
				}
			}
		}
	}
	for (var y = 0; y < nodesInLine; y++)
	{
		for (var x = 0; x < nodesInLine; x++)
		{
			var currentNode = nodes[y][x];
			
			// ADDING NEIGHTBOURS
			// top node
			if (y >= 1)
			{
				if (!nodes[y - 1][x].isObstacle)
				{
					currentNode.addNeightbour(nodes[y - 1][x]);
				}
			}
			// bottom node
			if (y < nodesInLine - 1)
			{
				if (!nodes[y + 1][x].isObstacle)
				{
					currentNode.addNeightbour(nodes[y + 1][x]);
				}
			}
			// left node
			if (x >= 1)
			{
				if (!nodes[y][x - 1].isObstacle)
				{
					currentNode.addNeightbour(nodes[y][x - 1]);
				}
			}
			// right node
			if (x < nodesInLine - 1)
			{
				if (!nodes[y][x + 1].isObstacle)
				{
					currentNode.addNeightbour(nodes[y][x + 1]);
				}
			}
		}
	}
	
	openSet.push(start);
}
function draw() 
{
	for (var y = 0; y < nodesInLine; y++)
	{
		for (var x = 0; x < nodesInLine; x++)
		{
			nodes[y][x].show(255);
		}
	}
	
	start.show(color(0, 255, 0));
	end.show(color(255, 0, 0));
	
	for (var i = 0; i < obstacles.length; i++)
	{
		obstacles[i].show(color(0, 0, 0));
	}
	for (var i = 0; i < openSet.length; i++)
	{
		if (openSet[i] !== start && openSet[i] !== end)
		{
			openSet[i].show(color(51, 51, 255));
		}
	}
	for (var i = 0; i < closedSet.length; i++)
	{
		if (closedSet[i] !== start && closedSet[i] !== end)
		{
			closedSet[i].show(color(153, 0, 153));
		}
	}
	
	if (openSet.length <= 0)
	{
		isSearching = false;
		console.log("Nie znaleziono.");
		noLoop();
	}
	else if (!isSearching)
	{
		currentPathNode = end;
		while (currentPathNode.parent)
		{
			if (currentPathNode.parent !== start)
			{
				currentPathNode.parent.show(color(0, 255, 255));
			}
			currentPathNode = currentPathNode.parent;
		}
	}
	else
	{
		var minIndex = 0;
		for (var i = 0; i < openSet.length; i++)
		{
			if (openSet[minIndex].f > openSet[i].f)
			{
				minIndex = i;
			}
		}
		
		var current = openSet[minIndex];
		if (current == end)
		{
			isSearching = false;
			console.log("Znaleziono");
			noLoop();
		}
		
		openSet.splice(minIndex, 1);
		closedSet.push(current);
		
		for (var i = 0; i < current.neightbours.length; i++)
		{
			var currentNeightbour = current.neightbours[i];
			if (closedSet.includes(currentNeightbour))
			{
				continue;
			}
			var gScore = current.g + 1;
			var tentativeIsBetter = false;
			if (!openSet.includes(currentNeightbour))
			{
				openSet.push(currentNeightbour);
				currentNeightbour.h = dist(currentNeightbour.x, currentNeightbour.y, end.x, end.y);
				tentativeIsBetter = true;
			}
			else if (gScore < currentNeightbour.g)
			{
				tentativeIsBetter = true;
			}
			if (tentativeIsBetter)
			{
				currentNeightbour.parent = current;
				currentNeightbour.g = gScore;
				currentNeightbour.f = currentNeightbour.g + currentNeightbour.h;
			}
		}
		
		currentPathNode = current;
		while (currentPathNode.parent)
		{
			if (currentPathNode.parent !== start)
			{
				currentPathNode.parent.show(color(0, 255, 255));
			}
			currentPathNode = currentPathNode.parent;
		}
	}
}