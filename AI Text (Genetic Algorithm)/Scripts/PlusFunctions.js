var possibleChars = " aąbcćdeęfghijklłmnńoóprsśtuwyzźżAĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUWYZŹŻ0123456789vV.!@#$%^&*()<>?{},";

function newChar() 
{
	return possibleChars[floor(random(possibleChars.length))];
}