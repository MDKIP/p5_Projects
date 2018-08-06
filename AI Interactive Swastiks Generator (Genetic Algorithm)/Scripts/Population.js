function Population(objectsValue, l)
{
	this.objectsValue = objectsValue;
	this.objects = [];
	for (var i = 0; i < this.objectsValue; i++)
	{
		this.objects[i] = new Dna(l);
	}
}
Population.prototype.createNewGeneration = function()
{
	for (var i = 0; i < this.objectsValue; i++)
	{
		var parentA = this.getRandomCreature();
		var parentB = this.getRandomCreature();
		this.objects[i] = parentA.crossover(parentB);
	}
}
Population.prototype.getRandomCreature = function()
{
	var sum = 0;
	for (var i = 0; i < this.objects.length; i++)
	{
		sum += this.objects[i].fitness;
	}
	for (var i = 0; i < this.objects.length; i++)
	{
		var current = this.objects[i];
		current.prob = current.fitness / sum;
	}
	
	var index = 0;
	var r = random(1);
	while(r > 0)
	{
		r = r - this.objects[index].prob;
		index++;
	}
	index--;
	return this.objects[index];
}
Population.prototype.mutate = function(chance)
{
	for (var i = 0; i < this.objects.length; i++)
	{
		this.objects[i].mutate(chance);
	}
}