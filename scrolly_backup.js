var speed=1;
var gamestarted = false;
var divstructure="";
var playerx;
var playery;
var bulletnum = 0;
var bulletspeed = 5;
var xmax=768;
var ymax=500;
var frameclicks=0;
var score=0;

divstructure+="<div id='background'><img src='images/background.png' class='stretch' alt='' /></div>"
divstructure+="<div id='frameclicks'></div>"
divstructure+="<div id='score'></div>"




for (i = 0; i < 100; i++) {
  divstructure += "<div id='"+i+"'>" + "</div>";
}

for (i = 0; i < 200; i++) {
  divstructure += "<div id='bullet"+i+"'>" + "</div>";
}

for (i = 0; i < 200; i++) {
  divstructure += "<div id='badguy"+i+"'>" + "</div>";
}

divstructure+="<div id='player'><img src='images/player1sprite.png'></div>"
document.getElementById("content").innerHTML=divstructure;
frameclickdiv=document.getElementById("frameclicks");
frameclickdiv.style.position="absolute";
frameclickdiv.style.left=xmax-200;
frameclickdiv.style.top=100;

scorediv=document.getElementById("score");
scorediv.style.position="absolute";
scorediv.style.left=xmax-200;
scorediv.style.top=70;

function starColor(){
	return (Math.floor(Math.random()*128+127).toString(16))+(Math.floor(Math.random()*128+127).toString(16))+(Math.floor(Math.random()*128+127).toString(16));
}

function fire(){
	if (gamestarted==true){
		console.log("fire");
		if(bulletnum == 200){bulletnum = 0;}
		b=document.getElementById("bullet"+bulletnum);
		p=document.getElementById("player");
		b.style.top = p.style.top;
		x=parseFloat(p.style.left.replace(/[^\d.-]/g, ''));
		x+=7;
		b.style.left = x+'px';
		b.innerHTML = "!";
		b.style.position = "absolute";
		b.style.display="inline";
		bulletnum++;
	}
}

for(i=0; i<50; i++){
	document.getElementById(i).innerHTML=".";
	var x = Math.random()*xmax;
	var y = Math.random()*ymax;
	placeDiv(i, x, y, 1);
}

function getCoords(event){
	playerx = event.clientX;
	playery = event.clientY;
	//console.log(playerx+" "+playery);
}

	//Adding a test badguy
	
placeDivimage("badguy0", 350, 100, "johnson.png", 50, 50);


function gameloop(){
	//game loop in here
	gamestarted=true;
	player=document.getElementById('player');
	

	
	
	
	for(i=0; i<50; i++){						//Loop to move the stars
		star=document.getElementById(i);
		x=parseFloat(star.style.left.replace(/[^\d.-]/g, ''));
		y=parseFloat(star.style.top.replace(/[^\d.-]/g, ''));
		
		if (y>ymax){
		y=0;
		x=Math.random()*xmax;
		star.style.color=starColor();
		}
		else{
			y=y+((i+10)*speed/50);
		}
		
		if(y<0){
			y=500;
			x=Math.random()*xmax;
			star.style.color=starColor();
		}
		star.style.top=y+'px';
		star.style.left=x+'px';
	}
	if(playerx<xmax){
		placeDiv('player', playerx-8, ymax-50, 0);
	}
	else {
		placeDiv('player', xmax-5, ymax-50, 0);
	}
	
	for(i=0; i<200; i++){   //Loop to move the bullets
		b=document.getElementById("bullet"+i);
		x=parseFloat(b.style.left.replace(/[^\d.-]/g, ''));
		y=parseFloat(b.style.top.replace(/[^\d.-]/g, ''));
		if (y<=-50){
			b.style.display="none";
		}
		if (y>-50){
			y-=bulletspeed;
		}
		placeDiv("bullet"+i, x, y, 0);
		//Check for a collision with a badguy and deduct energy from badguy
		badguy=document.getElementById("badguy0");
		badguyxstart=Number(parseFloat(badguy.style.left.replace(/[^\d.-]/g, '')));
		badguyystart=Number(parseFloat(badguy.style.top.replace(/[^\d.-]/g, '')));
		badguyxend=Number(parseFloat(badguy.style.left.replace(/[^\d.-]/g, '')));
		badguyxend+=Number(parseFloat(badguy.style.width.replace(/[^\d.-]/g, '')));
		badguyyend=Number(parseFloat(badguy.style.top.replace(/[^\d.-]/g, '')));
		badguyyend+=Number(parseFloat(badguy.style.height.replace(/[^\d.-]/g, '')));
		if((x>badguyxstart) && (x<badguyxend) && (y>badguyystart) && (y<badguyyend)){
			console.log("hit");
			placeDiv("bullet"+i, 0, -10, 0);
			score++;
		}
	}
	
	frameclickdiv.innerHTML=frameclicks;
	frameclicks++;
	scorediv.innerHTML=score;
	setTimeout("gameloop()", 16);
}


function placeDiv(divId, xpos, ypos, newcolor){
	var d=document.getElementById(divId);
	d.style.position="absolute";
	d.style.left=xpos+'px';
	d.style.top=ypos+'px';
	if (newcolor == 1){
		d.style.color=starColor();
	}
	
}

function placeDivimage(divId, xpos, ypos, imagestring, width, height){
	var d=document.getElementById(divId);
	d.style.position="absolute";
	d.style.left=xpos+'px';
	d.style.top=ypos+'px';
	d.style.height=height+'px';
	d.style.width=width+'px';
	d.innerHTML="<img height='100%' width='100%' src='images/"+imagestring+"'>";
}




