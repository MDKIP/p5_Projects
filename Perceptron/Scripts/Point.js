function Point(x, y, size)
{
	this.x = x;
	this.y = y;
	this.size = size;
	if (this.y > this.x)
	{
		this.c = 1;
	}
	else
	{
		this.c = -1;
	}
}
Point.prototype.show = function()
{
	if (this.c == 1)
	{
		fill(255);
		stroke(0);
	}
	else if (this.c == -1)
	{
		fill(0);
		stroke(255);
	}
	ellipse(this.x, this.y, this.size, this.size);
}
Point.prototype.color = function(c)
{
	fill(c);
	ellipse(this.x, this.y, this.size-1, this.size-1);
}