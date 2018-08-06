var canvasSize = 500;
var cellsInLine = 20;
var cellSize;
var cells = new Array();
var currentCell;
var stack = [];

function setup() 
{
	createCanvas(canvasSize + 1, canvasSize + 1);
    cellSize = canvasSize / cellsInLine;
	
	for (var i = 0; i < cellsInLine; i++)
	{
		cells[i] = new Array();
	}
	
	for (var x = 0; x < cellsInLine; x++)
	{
		for (var y = 0; y < cellsInLine; y++)
		{
			cells[x][y] = new Cell(x * cellSize, y * cellSize, cellSize, x, y);
		}
	}
	for (var y = 0; y < cellsInLine; y++)
	{
		for (var x = 0; x < cellsInLine; x++)
		{
			var currentNode = cells[x][y];
			
			// ADDING NEIGHTBOURS
			// top node
			if (y >= 1)
			{
				currentNode.addNeightbour(cells[x][y - 1]);
			}
			// bottom node
			if (y < cellsInLine - 1)
			{
				currentNode.addNeightbour(cells[x][y + 1]);
			}
			// left node
			if (x >= 1)
			{
				currentNode.addNeightbour(cells[x- 1][y]);
			}
			// right node
			if (x < cellsInLine - 1)
			{
				currentNode.addNeightbour(cells[x + 1][y]);
			}
		}
	}
	currentCell = cells[0][0];
}

function draw() 
{
	for (var x = 0; x < cellsInLine; x++)
	{
		for (var y = 0; y < cellsInLine; y++)
		{
			var current = cells[x][y];
			if (current.visited)
			{
				current.show(color(255, 0, 127));
			}
			else
			{
				current.show(255);
			}
		}
	}
	var numberOfUnvisited = getNumberOfUnvisited();
	if (numberOfUnvisited != 0)
	{
		currentCell.show(color(0, 255, 0));
	}
	if (numberOfUnvisited > 0)
	{
		currentCell.visited = true;
		var unvisitedCell = currentCell.getUnvisitedNeightbour();
		if (unvisitedCell != null)
		{
			stack.push(currentCell);
			if (currentCell.xIndex == unvisitedCell.xIndex && unvisitedCell.yIndex < currentCell.yIndex)
			{
				// TOP Cell
				currentCell.walls[0] = false;
				unvisitedCell.walls[2] = false;
			}
			else if (currentCell.xIndex == unvisitedCell.xIndex && unvisitedCell.yIndex > currentCell.yIndex)
			{
				// BOTTOM Cell
				currentCell.walls[2] = false;
				unvisitedCell.walls[0] = false;
			}
			else if (currentCell.yIndex == unvisitedCell.yIndex && unvisitedCell.xIndex < currentCell.xIndex)
			{
				// LEFT Cell
				currentCell.walls[3] = false;
				unvisitedCell.walls[1] = false;
			}
			else if (currentCell.yIndex == unvisitedCell.yIndex && unvisitedCell.xIndex > currentCell.xIndex)
			{
				// RIGHT Cell
				currentCell.walls[1] = false;
				unvisitedCell.walls[3] = false;
			}
			else
			{
				console.log("ERROR");
			}
			currentCell = unvisitedCell;
		}
		else
		{
			currentCell = stack.pop();
		}
	}
}

function getNumberOfUnvisited()
{
	var output = 0;
	for (var x = 0; x < cellsInLine; x++)
	{
		for (var y = 0; y < cellsInLine; y++)
		{
			var current = cells[x][y];
			if (!current.visited)
			{
				output++;
			}
		}
	}
	return output;
}