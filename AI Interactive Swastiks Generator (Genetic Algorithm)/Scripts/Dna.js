function Dna(length)
{
	this.length = length;
	this.fitness = 1;
	this.prob = 0;
	this.genes = [];
	for (var i = 0; i < this.length; i++)
	{
		this.genes[i] = random(1);
	}
}
Dna.prototype.mutate = function(chance)
{
	for (var i = 0; i < this.length; i++)
	{
		if (chance > random(100))
		{
			this.genes[i] = random(1);
		}
	}
}
Dna.prototype.crossover = function(secondParent)
{
	var child = new Dna(this.length);
	var jop = true;
	for (var i = 0; i < this.length; i++)
	{
		if (jop)
		{
			child.genes[i] = this.genes[i];
		}
		else
		{
			child.genes[i] = secondParent.genes[i];
		}
		jop = !jop;
	}
	return child;
}