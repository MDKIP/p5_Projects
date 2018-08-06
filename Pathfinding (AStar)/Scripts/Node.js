function Node(x, y)
{
	this.x = x;
	this.y = y;
	this.neightbours = [];
	this.searched = false;
	this.parent = null;
	this.isObstacle = false;
	this.f = 0;
	this.h = 0;
	this.g = 0;
}
Node.prototype.show = function(color)
{
	var size = canvasSize / nodesInLine;
	stroke(0);
	fill(color)
	rect(this.x, this.y, size, size);
}
Node.prototype.addNeightbour = function(node)
{
	this.neightbours.push(node);
}