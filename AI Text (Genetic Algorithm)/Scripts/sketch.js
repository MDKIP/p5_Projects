var destination = "Programowanie jest zajebiste, ale tylko tak bardzo.";
var mutation = 1;
var populationNumber = 300;
var population;

function setup() 
{
	createCanvas(windowWidth, windowHeight);
	
	
	population = new Population(mutation, populationNumber);
}

function draw() 
{
	background(0);
	
	population.mutate();
	population.calcFitness();
	population.evaluate();
	
	fill(255, 255, 255);
	
	textSize(30);
	text("Szukana fraza: "+destination, 10, 40);
	
	textSize(30);
	text("Obecna generacja: "+population.generation, 10, 150);
	
	textSize(30);
	text("Najlepszy z generacji: "+population.best.ToString(), 10, 200);
	
	textSize(30);
	text("Wynik najlepszego z generacji: "+Math.sqrt(population.best.fitness), 10, 250);
	
	textSize(30);
	text("Najlepszy ogólnie: "+population.bestOfAll.ToString(), 10, 360);
	
	textSize(30);
	text("Wynik najlepszego: "+Math.sqrt(population.bestOfAll.fitness), 10, 410);
	
	var y = 40;
	for (var i = 0, y = 10; i < population.creatures.length; i++, y += 10)
	{
		textSize(10);
		text(population.creatures[i].ToString(), windowWidth - 600, y);
		text(Math.sqrt(population.creatures[i].fitness), windowWidth - 150, y);
	}
	
	population.newGeneration();
	
	if (population.finished)
	{
		noLoop();
	}
}