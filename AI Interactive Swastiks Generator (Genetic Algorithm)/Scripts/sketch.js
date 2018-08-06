var population;
var dnaLength = 16;
var boxSize = 300;
var mutationChance = 10;
var swastiks = [];

function setup() 
{
	createCanvas(windowWidth, boxSize + 1);;
	var btn = createButton("Nowa Generacja");
	btn.mousePressed(newGeneration);
	btn.position(width / 2, boxSize + 100);
	btn.size(200, 75);
	population = new Population(6, dnaLength);
	for (var i = 0; i < population.objectsValue; i++)
	{
		swastiks[i] = new Swastika(population.objects[i], i * boxSize);
	}
}
function draw() 
{
	for (var i = 0; i < population.objectsValue; i++)
	{
		swastiks[i].draw();
	}
}
function newGeneration()
{
	population.createNewGeneration();
	population.mutate(mutationChance);
	for (var i = 0; i < population.objectsValue; i++)
	{
		swastiks[i].dispose();
		swastiks[i] = new Swastika(population.objects[i], i * boxSize);
	}
	clear();
}
function drawSwastik(color, xPos, yPos, segmentsWidth, segmentsHeight, endWidth, endHeight)
{
	fill(color);
	rect(xPos, yPos, segmentsWidth, segmentsWidth);
	// górne ramie
	rect(xPos, yPos, segmentsWidth, -segmentsHeight);
	rect(xPos + segmentsWidth, yPos - segmentsHeight, endHeight, endWidth);
	// prawe ramie
	rect(xPos + segmentsWidth, yPos, segmentsHeight, segmentsWidth);
	rect(xPos + segmentsHeight, yPos + segmentsWidth, endWidth, endHeight);
	// dolne ramie
	rect(xPos, yPos + segmentsWidth, segmentsWidth, segmentsHeight);
	rect(xPos, yPos + segmentsHeight, -endHeight, endWidth);
	// lewe ramie
	rect(xPos, yPos, - segmentsHeight, segmentsWidth);
	rect(xPos - segmentsHeight, yPos , endWidth, -endHeight);
}