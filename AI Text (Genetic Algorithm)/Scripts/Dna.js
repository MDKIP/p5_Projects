function Dna(length)
{
	this.genes = [];
    this.fitness = 0;
	this.prob = 0;
	
    for (let i = 0; i < length; i++) 
	{
		this.genes[i] = newChar();
    }
}
Dna.prototype.crossover = function(partner)
{
	var child = new Dna(this.genes.length);
	/*// Po połowie mieszanie.
	var helpBool = false;
	for (let i = 0; i < this.genes.length; i++)
	{
		if (helpBool)
		{
			child.genes[i] = this.genes[i];
		}
		else
		{
			child.genes[i] = partner.genes[i];
		}
		helpBool = !helpBool;
	}
	*/
	// Po połowie z lewej i prawej strony.
	let midpoint = floor(random(this.genes.length));
	for (let i = 0; i < this.genes.length; i++) 
	{
		if (i > midpoint) 
		{
			child.genes[i] = this.genes[i];
		}
		else 
		{
			child.genes[i] = partner.genes[i];
		}
    }
	// Tylko dobre geny. (tylko w celach prezentacyjnych bo to błąd logiczny)
	/* for (let i = 0; i < this.genes.length; i++)
	{
		if (this.genes[i] == destination.charAt(i))
		{
			child.genes[i] = this.genes[i];
		}
		else if (partner.genes[i] == destination.charAt(i))
		{
			child.genes[i] = partner.genes[i];
		}
		else
		{
			if (random(100) > 50)
			{
				child.genes[i] = this.genes[i];
			}
			else 
			{
				child.genes[i] = partner.genes[i];
			}
		}
	}
	*/
	
	return child;
}
Dna.prototype.mutate = function(chance)
{
	for (var i = 0; i < this.genes.length; i++)
	{
		if (chance >= random(100))
		{
			this.genes[i] = newChar();
		}
	}
}
Dna.prototype.calcFitness = function()
{
	var score = 0;
	
	
	for (var i = 0; i < destination.length; i++)
	{
		
		
		if (this.genes[i] === destination.charAt(i))
		{
			score++;
		}
	}
	
	this.fitness = (score / destination.length) * 100;
	this.fitness = pow(this.fitness, 2);
}
Dna.prototype.ToString = function() 
{
    return this.genes.join("");
}