document.addEventListener('DOMContentLoaded', () => {domloaded=true; })

var speed=1;
var gamestarted = false;
var divstructure="";
var playerx;
var playery;
var playerxactual;
var playeryactual;
var bulletnum = 0;
var bulletspeed = 5;
var xmax=768;
var ymax=500;
var frameclicks=0;
var score=0;
var xres=1024;
var yres=768;
var livesmax=5;
var lives=livesmax;;
var startenergy=100;
var energy=100;
var framedelay=16;
var playerdead=false;
var gamefirststarted=false;
var level=0;
var badguyArray = []
var badguyArrayTimed=[]
var levelLoaded=false;
var badguyentrycounter=0;

includeJs("level1.js");

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

var shotSound = new sound("sfx/shotSound.mp3");


function includeJs(jsFilePath) {        //stolen from https://stackoverflow.com/questions/950087/how-do-i-include-a-javascript-file-in-another-javascript-file
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.body.appendChild(js);
}

var liesdefault={
	name: 'liesBullet', 
	type: 'lies',
	img: 'images/lies.png',
	hitscore: 10,
	hitdamage: 5,
	health: 1,
	xwidth : 40, 
	ywidth : 20,
	xvel: 0.0,
	yvel: 1.0,
	xpos: 0.0,
	ypos: 0.0,
	time: -1,
};


divstructure+="<div id='background'><img src='images/background.png' class='stretch' alt='' /></div>"
divstructure+="<div id='energy'></div>"
divstructure+="<div id='lives'></div>"
divstructure+="<div id='frameclicks'></div>"
divstructure+="<div id='score'></div>"
divstructure+="<div id='level'></div>"




for (i = 0; i <= 100; i++) {
  divstructure += "<div id='"+i+"'>" + "</div>";
}

for (i = 0; i < 200; i++) {
  divstructure += "<div id='bullet"+i+"'>" + "</div>";
}

//for (i = 0; i < 200; i++) {
//  divstructure += "<div id='badguy"+i+"'>" + "</div>";
//}

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

energydiv=document.getElementById("energy");
energydiv.style.position="absolute";
energydiv.style.left=xmax-200;
energydiv.style.top=40;

livesdiv=document.getElementById("lives");
livesdiv.style.position="absolute";
livesdiv.style=xmax-200;
livesdiv.style.top=10;

leveldiv=document.getElementById("level");
leveldiv.style.position="absolute";
leveldiv.style=xmax-200;
leveldiv.style.top=100;

function starColor(){
	return (Math.floor(Math.random()*128+127).toString(16))+(Math.floor(Math.random()*128+127).toString(16))+(Math.floor(Math.random()*128+127).toString(16));
}

function fire(){
	console.log("fire called");
	if (gamestarted==true && domloaded==true){
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
		shotSound.play();
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

	//Place badguys
	
function startGame(){    //starts game when player clicks start
	//gamestarted=true;
	playerdead=false;
	if(document.getElementById("gamecomplete")!==null){document.getElementById("gamecomplete").innerHTML="";}
	console.log("startGame called");
	if (!gamefirststarted){
		console.log("Starting game for the first time ...");
		gamefirststarted=true;
		gamestarted=true;
		setTimeout('gameloop()',20);
		
		if (document.getElementById("gamecomplete")!==null){
			var endmessage=document.getElementById("gamecomplete");
			endmessage.remove();
		}
	}
	else {
		if(gamestarted==false){
			gamestarted=true;
			gameloop();
		}
		else {
			console.log("The game's already started, don't click");
			}
	}
}

function stopgame(){     //stops the game for various reaons, like if player dies
	gamestarted=false;
}
	
function placeBadGuys(){
	for (let i=0; i<badguyArray.length; i++)
	{
		b=badguyArray[i];
		placeDivimage("badguy" + b.id, b.xpos, b.ypos, b.img, b.xwidth, b.ywidth);
	}
}

//placeBadGuys();   Commented out for now, badguys appear on gameloop.

function moveBadGuys(){
	for (let i=0; i<badguyArray.length; i++){
		b=badguyArray[i];
		switch (b.name){
			case "borisHappy":
				b.xpos+=b.xvel;
				b.ypos+=b.yvel;
				if(b.xpos<10){
					b.xvel=-b.xvel;
					b.ypos+=10;
				}
				if(b.xpos>763){
					b.xvel=-b.xvel;
					b.ypos+=10;
				}
				if (b.health==30){
					b.yvel-=10;
					b.health=29;
				}
				if (b.health<30){
					b.img="images/johnsongrumpy.png";
					b.yvel+=0.5;
				}
				break;
				case "gove":	
				b.xpos+=b.xvel;
				b.ypos+=b.yvel;

				if(b.xpos<10){
				b.xvel=-b.xvel;
				b.ypos+=10.0;
				}
				if(b.xpos>763){
				b.xvel=-b.xvel;
				b.ypos+=10.0;
				}
				if (b.health<30){
				b.img="images/gove-lowenergy.png";
				}
				if (b.ypos<b.yfloor){
				b.yvel+=1.0;	
				}
				if (b.ypos>=b.yfloor){
				b.yvel=-10;
				b.yfloor++;
				b.xvel=Math.random()*8.0-4.0;
				}
				b.fire_counter--;
				if (b.fire_counter<0){
					liesdefault.xpos = b.xpos;
					liesdefault.ypos = b.ypos;
					liesdefault.xvel = (playerx-b.xpos)/(Math.sqrt((playerx-b.xpos)*(playerx-b.xpos)+(ymax-b.ypos)*(ymax-b.ypos)));
					liesdefault.yvel = (ymax-b.ypos)/(Math.sqrt((playerx-b.xpos)*(playerx-b.xpos)+(ymax-b.ypos)*(ymax-b.ypos)));
					badguyArrayTimed.push({...liesdefault});
					b.fire_counter = b.fire_every;
					console.log("Gove fires lies");
				}
				break;
				default:
				b.xpos+=b.xvel;
				b.ypos+=b.yvel;
				break;
		}
		if (b.health<=0 || b.ypos>yres || b.xpos<-100 || b.xpos>(xres+100) || b.ypos<-100){   // If a badguy is out of bounds or dead, remove it.
			console.log("Removing badguyArray at"+i);
			var d=document.getElementById("badguy"+badguyArray[i].id);
			d.parentNode.removeChild(d);
			if(i>0){
			badguyArray.splice(i, 1);
			console.log("splice used");
			}
			else{
				badguyArray.shift();
				console.log("shift used");
			}
		}
	}
}

function checkfornewbadguys(){
	for (let i=0; i<badguyArrayTimed.length; i++){
		if (frameclicks>=badguyArrayTimed[i].time){
			for(j=0; j<badguyArray.length; j++){
					if(badguyArray.length!=0){
					if(badguyArray[j].id>=badguyentrycounter){badguyentrycounter++}
					}
			}
			badguyArrayTimed[i].id=badguyentrycounter;
			badguyArray.push(badguyArrayTimed[i]);
			if (badguyArrayTimed.length>1){	
			badguyArrayTimed.splice(i, 1);
			}
			else {
				console.log("shift called from checkfornewbadguys");
				badguyArrayTimed.shift();
				}
			badguyentrycounter++;
		}
	}
}



function collisionDetect(){
	for (let i=0; i<badguyArray.length; i++){
			badguy=document.getElementById("badguy"+i);
			b=badguyArray[i];
			badguyxstart=b.xpos;
			badguyystart=b.ypos;
			badguyxend=badguyxstart+b.xwidth;
			badguyyend=badguyystart+b.ywidth;
				for (let j=0; j<200; j++){
					b=document.getElementById("bullet"+j);
					x=parseFloat(b.style.left.replace(/[^\d.-]/g, ''));
					y=parseFloat(b.style.top.replace(/[^\d.-]/g, ''));
					if((x>badguyxstart) && (x<badguyxend) && (y>badguyystart) && (y<badguyyend)){
					console.log("hit subtract badguy"+i+" "+badguyArray[i].hitdamage);
					badguyArray[i].health-=badguyArray[i].hitdamage;
					if (badguyArray[i].name=="borisHappy" && badguyArray[i].health<30){
						badguyArray[i].yvel-=8;
						badguyArray[i].xvel=(-x+(badguyxstart+badguyxend)/2)/4;
					}
					console.log("badguy"+i+".health="+badguyArray[i].health);
					placeDiv("bullet"+j, 0, -20, 0);
					score++;
				}
			}
			if((playerxactual-8>badguyxstart) && (playerxactual+8<badguyxend) && (playeryactual-8>badguyystart) && (playeryactual+8<badguyyend)){
				console.log("badguy"+i+" hit player");
				energy-=10;
			console.log("Removing badguyArray at "+i+" due to collision with player");
			var d=document.getElementById("badguy"+badguyArray[i].id);
			d.parentNode.removeChild(d);
			if(i>0){
			badguyArray.splice(i, 1);
			console.log("splice used");
			}
			else{
				badguyArray.shift();
				console.log("shift used");
			}
			}
	}
}

function gameloop(){
	//game loop in here
	if (domloaded==true && gamestarted==true && playerdead==false) { 
	
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
		if(playerx<xmax){								//Places the player sprite, player sprite size is hardcoded, fix!!!
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
			}
		
		collisionDetect();
		moveBadGuys();
		placeBadGuys();
		checkfornewbadguys();
		nextLevelCheck();
	
		frameclickdiv.innerHTML=frameclicks;
		frameclicks++;
		scorediv.innerHTML="score : " + score;
		energydiv.innerHTML="energy : " + energy;
		livesdiv.innerHTML="lives : " + lives;
		leveldiv.innerHTML="level : " + level;
		playerxactual=playerx;
		playeryactual=ymax-50;
		setTimeout("gameloop()", framedelay);
		if(energy<0.0){
			lives--;
			energy=startenergy;
			stopgame();
		}	
	}
}



function nextLevelCheck(){
	if (badguyArray.length==0 && badguyArrayTimed.length==0){
		levelLoaded=false;
		if(level<11){
		level++;
		console.log("Loading level " + level);
		if (!levelLoaded){
			//includeJs("level"+level+".js");
			loadLevel[level]();
			levelLoaded = true;
		}
		}
		else{ 
		var gamecomplete = document.createElement("gamecomplete");
		var gamecompletetext = document.createTextNode("Game complete!");
		placeDiv("gamecomplete", xmax/2, ymax/2, 1);
		document.getElementById("gamecomplete").width="100px";
		document.getElementById("gamecomplete").height="100px";
		document.getElementById("gamecomplete").appendChild(gamecompletetext);
		playerdead=1;
		lives=livesmax;
		level=0;
		stopgame();
		gamefirststarted=false;
		}
	}
	if (lives<0){
		var gamecomplete = document.createElement("gamecomplete");
		var gamecompletetext = document.createTextNode("You died. Press start to continue.");
		placeDiv("gamecomplete", xmax/2, ymax/2, 1);
		document.getElementById("gamecomplete").width="100px";
		document.getElementById("gamecomplete").height="100px";
		document.getElementById("gamecomplete").appendChild(gamecompletetext);
		playerdead=1;
		lives=livesmax;
		level=0;
		stopgame();
		gamefirststarted=false;
	}
}


function placeDiv(divId, xpos, ypos, newcolor){  //newcolor=0, leave it alone, =1, random color.  
	var d=document.getElementById(divId);
	if(typeof(d) != 'undefined' && d != null){
		d.style.position="absolute";
		d.style.left=xpos+'px';
		d.style.top=ypos+'px';
	if (newcolor == 1){
		d.style.color=starColor();
		}
	}
	else {
		console.log("PlaceDiv says " + divId + " doesn't exist, creating it.");
		var newDiv = document.createElement(divId);
		newDiv.id=divId;
		document.body.appendChild(newDiv);	
		placeDiv(divId, xpos, ypos, newcolor);
	}
}

function placeDivimage(divId, xpos, ypos, imagestring, width, height){
	var d=document.getElementById(divId);
	if(typeof(d) != 'undefined' && d != null){
		d.style.position="absolute";
		d.style.left=xpos+'px';
		d.style.top=ypos+'px';
		d.style.height=height+'px';
		d.style.width=width+'px';
		d.innerHTML="<img height='100%' width='100%' src='"+imagestring+"' onclick='fire()'>";
	}
	else {
		console.log("Ouch, PlaceDivImage says " + divId + " doesn't exist, creating it ...");
		var newDiv = document.createElement(divId);
		newDiv.id=divId;
		document.body.appendChild(newDiv);	
		placeDivimage(divId, xpos, ypos, imagestring, width, height);
	}
}




