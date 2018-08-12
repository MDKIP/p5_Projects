function Perceptron(learnigRate)
{
	this.learnigRate = learnigRate;
	this.weigths = [];
	for (var i = 0; i < 2; i++)
	{
		this.weigths[i] = random(-1, 1);
	}
}
Perceptron.prototype.train = function(point)
{
	var result = this.getGuess(point.x, point.y);
	if (result == point.c)
	{
		return true;
	}
	else
	{
		var error = point.c - result;
		this.weigths[0] += error * point.x * this.learnigRate;
		this.weigths[1] += error * point.y * this.learnigRate;
		return false;
	}
}
Perceptron.prototype.getGuess = function(x0, x1)
{
	var score = x0 * this.weigths[0] + x1 * this.weigths[1] + 1;
	if (score > 0)
	{
		return 1;
	}
	else if (score < 0)
	{
		return -1;
	}
	else 
	{
		console.log("Score wyniósł 0.");
		return -1;
	}
}