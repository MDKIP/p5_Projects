function Cell(x, y, size, xIndex, yIndex)
{
	this.x = x;
	this.y = y;
	this.size = size;
	this.xIndex = xIndex;
	this.yIndex = yIndex;
	this.visited = false;
	this.walls = [true, true, true, true];
	this.neightbours = [];
}
Cell.prototype.show = function(color)
{
	fill(color);
	noStroke();
	rect(this.x, this.y, this.size, this.size);
	fill(0);
	stroke(0);
	strokeWeight(2);
	if (this.walls[0] == true)
	{
		line(this.x, this.y, this.x + this.size, this.y);
	}
	if (this.walls[1] == true)
	{
		line(this.x + this.size, this.y, this.x + this.size, this.y + this.size);
	}
	if (this.walls[2] == true)
	{
		line(this.x, this.y + this.size, this.x + this.size, this.y + this.size);
	}
	if (this.walls[3] == true)
	{
		line(this.x, this.y, this.x, this.y + this.size);
	}
}
Cell.prototype.addNeightbour = function(c)
{
	this.neightbours.push(c);
}
Cell.prototype.getUnvisitedNeightbour = function()
{
	var uNeightbours = [];
	for (var i = 0; i < this.neightbours.length; i++)
	{
		if (!this.neightbours[i].visited)
		{
			uNeightbours.push(this.neightbours[i]);
		}
	}
	if (uNeightbours.length > 0)
	{
		return uNeightbours[floor(random(uNeightbours.length))];
	}
	else
	{
		return null;
	}
}