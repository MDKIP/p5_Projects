function Swastika(dna, x)
{
	this.dna = dna;
	this.x = x;
	this.fp = createP(dna.fitness);
	this.fp.position(x + boxSize / 2, boxSize);
	this.btnPf = createButton("Głosuj");
	this.btnPf.mousePressed(this.plusFitness);
	this.btnPf.size(100, 25);
	this.btnPf.position(x + boxSize / 2 - 50, boxSize + 50);
	this.btnPf.dna = this.dna;
	this.btnPf.fp = this.fp;
}
Swastika.prototype.draw = function()
{
	// Konwertowanie dna na wartości
	var data = this.dna.genes;
	var backRColor = map(data[0], 0, 1, 0, 255);
	var backGColor = map(data[1], 0, 1, 0, 255);
	var backBColor = map(data[2], 0, 1, 0, 255);
	var backAColor = map(data[3], 0, 1, 0, 255);
	var backXPos = map(data[4], 0, 1, 0, 100);
	var backYPos = map(data[5], 0, 1, 0, 100);
	var backWidth = map(data[6], 0, 1, 0, 300);
	var backHeight = map(data[7], 0, 1, 0, 300);
	var symbolRColor = map(data[8], 0, 1, 0, 255);
	var symbolGColor = map(data[9], 0, 1, 0, 255);
	var symbolBColor = map(data[10], 0, 1, 0, 255);
	var symbolAColor = map(data[11], 0, 1, 0, 255);
	var symbolXPos = floor(map(data[12], 0, 1, 60, 150));
	var symbolYPos = floor(map(data[13], 0, 1, 80, 150));
	var a = floor(map(data[14], 0, 1, 0, 50));
	var b = floor(map(data[15], 0, 1, 0, 70) + a / 2);
	
	// Poprawianie wartości
	if (backWidth + backXPos > boxSize)
	{
		backWidth -= backXPos;
	}
	if (backHeight + backYPos > boxSize)
	{
		backHeight -= backYPos;
	}
	
	// Rysowanie sfastyki
	// pudło
	fill(255, 255, 255, 0);
	stroke(0);
	rect(this.x, 0, boxSize, boxSize);
	// tło
	fill(color(backRColor, backGColor, backBColor, backAColor));
	noStroke();
	rect(backXPos + this.x, backYPos, backWidth, backHeight);
	// swastyka
	var swastikColor = color(symbolRColor, symbolGColor, symbolBColor, symbolAColor);;
	drawSwastik(swastikColor, symbolXPos + this.x, symbolYPos, a, b, a, b);
}
Swastika.prototype.plusFitness = function()
{
	this.dna.fitness += 1;
	this.fp.html(this.dna.fitness);
}
Swastika.prototype.dispose = function()
{
	this.fp.html("");
}
