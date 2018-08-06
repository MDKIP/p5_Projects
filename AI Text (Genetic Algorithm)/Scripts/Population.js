function Population(mutationRate, numberOfCreatures)
{
	this.mutationRate = mutationRate;
	this.creatures = [];
	this.generation = 1;
	this.perfectScore = 10000;
	this.best = new Dna();
	this.bestOfAll = new Dna();
	this.finished = false;
	
	for (var i = 0; i < numberOfCreatures; i++)
	{
		this.creatures[i] = new Dna(destination.length);
	}
}
Population.prototype.mutate = function()
{
	for (var i = 0; i < this.creatures.length; i++)
	{
		this.creatures[i].mutate(this.mutationRate);
	}
}
Population.prototype.newGeneration = function()
{
	var newGeneration = [];
	
	for (var i = 0; i < this.creatures.length; i++)
	{
		var parentA = this.getRandomCreature();
		var parentB = this.getRandomCreature();
		var child = parentA.crossover(parentB);
		
		newGeneration[i] = child;
	}
	
	this.creatures = newGeneration;
	this.generation++;
}
Population.prototype.getRandomCreature = function()
{
	/*
	while (true)
	{
		var creature = this.creatures[floor(random(this.creatures.length))];
		if (creature.fitness > random(100))
		{
			return creature;
		}
	}
	*/
	var sum = 0;
	for (var i = 0; i < this.creatures.length; i++)
	{
		sum += this.creatures[i].fitness;
	}
	for (var i = 0; i < this.creatures.length; i++)
	{
		var current = this.creatures[i];
		current.prob = current.fitness / sum;
	}
	
	var index = 0;
	var r = random(1);
	while(r > 0)
	{
		r = r - this.creatures[index].prob;
		index++;
	}
	index--;
	return this.creatures[index];
}
Population.prototype.evaluate = function() 
{
    let index = 0;
    for (let i = 0; i < this.creatures.length; i++) 
	{
		if (this.creatures[i].fitness > this.creatures[index].fitness) 
	    {
			index = i;
        }
    }

    this.best = this.creatures[index];
	
    if (this.best.fitness === this.perfectScore) 
	{
		this.finished = true;
    }
	if (this.bestOfAll.fitness < this.best.fitness)
	{
		this.bestOfAll = this.best;
	}
}
Population.prototype.calcFitness = function()
{
	for (var i = 0; i < this.creatures.length; i++)
	{
		this.creatures[i].calcFitness();
	}
}