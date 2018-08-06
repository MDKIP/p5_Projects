var canvasSize = 700;
var nodesInLine = 30;
var nodes = new Array(nodesInLine);
var start;
var end;
var isSearching = true;
var searchQueue = [];
var searchedNodes = [];
var neightbours = [];
var obstacles = [];

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
	start = nodes[floor(random(nodesInLine))][floor(random(nodesInLine))];
	end = nodes[floor(random(nodesInLine))][floor(random(nodesInLine))];
	for (var y = 0; y < nodesInLine; y++)
	{
		for (var x = 0; x < nodesInLine; x++)
		{
			if (random(100) < random(45))
			{
				if (nodes[y][x] !== start && nodes[y][x] !== end)
				{
					nodes[y][x].isObstacle = true;
					obstacles.push(nodes[y][x]);
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
			if (y >= 1 && !currentNode.isObstacle)
			{
				currentNode.addNeightbour(nodes[y - 1][x]);
			}
			// bottom node
			if (y < nodesInLine - 1 && !currentNode.isObstacle)
			{
				currentNode.addNeightbour(nodes[y + 1][x]);
			}
			// left node
			if (x >= 1 && !currentNode.isObstacle)
			{
				currentNode.addNeightbour(nodes[y][x - 1]);
			}
			// right node
			if (x < nodesInLine - 1 && !currentNode.isObstacle)
			{
				currentNode.addNeightbour(nodes[y][x + 1]);
			}
		}
	}
	
	searchQueue.push(start);
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
	
	for (var i = 0; i < searchedNodes.length; i++)
	{
		searchedNodes[i].show(color(51, 0, 102));
	}
	for (var i = 0; i < neightbours.length; i++)
	{
		neightbours[i].show(color(255, 0, 255));
	}
	for (var i = 0; i < obstacles.length; i++)
	{
		obstacles[i].show(color(0, 0, 0));
	}
	
	if (searchQueue.length > 0 && isSearching)
	{
		var current = searchQueue.shift();
		neightbours.splice(neightbours.indexOf(current), 1);
		if (current !== start && current !== end)
		{
			searchedNodes.push(current);
			current.show(color(51, 0, 102));
		}
		if (current === end)
		{
			console.log("Znaleziono ścieżkę! :\)");
			isSearching = false;
		}
		else
		{
			current.searched = true;
			
			for (var i = 0; i < current.neightbours.length; i++)
			{
				var currentNeightbour = current.neightbours[i];
				
				if (!searchQueue.includes(currentNeightbour) && !currentNeightbour.searched)
				{
					currentNeightbour.parent = current;
					if (currentNeightbour !== end)
					{
						currentNeightbour.show(color(255, 0, 255));
						neightbours.push(currentNeightbour);
					}
					searchQueue.push(currentNeightbour);
				}
			}
		}
	}
	else if (!isSearching)
	{
		var node = end;
		while (node.parent != null)
		{
			if (node !== end)
			{
				node.show(color(0, 204, 204));
			}
			node = node.parent;
		}
	}
	else if (isSearching && neightbours.length === 0)
	{
		console.log("Ścieżka nie istnieje :\(");
		isSearching = false;
	}
}