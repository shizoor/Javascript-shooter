


var borisdefault={
	name: 'borisHappy', 
	type: 'boris1',
	img: 'images/johnson.png',
	hitscore: 10,
	hitdamage: 5,
	health: 100,
	xwidth : 50, 
	ywidth : 50,
	xvel: -1,
	yvel: 0,
	xpos: 350,
	ypos: 100,
	time: 10,
};


var govedefault={
	name: 'gove', 
	type: 'gove',
	img: 'images/govetwat.png',
	hitscore: 10,
	hitdamage: 5,
	fire_every: 100.0,
	fire_counter: 100.0,
	health: 100,
	xwidth : 70, 
	ywidth : 50,
	xvel: -1,
	yvel: 0,
	xpos: 250,
	ypos: 100,
	yfloor: 100,
	time: 1400,
};


var badguyArrayTimed= [
]

var loadLevel=[
function level0(){
for (i=0; i<3; i++){
	borisdefault.time=300+i*50;
	badguyArrayTimed.push({...borisdefault});
	console.log("Johnson added");
}


for (i=0; i<3; i++){
	badguyArrayTimed.push({...govedefault});
	govedefault.time=1400+i;
	console.log("Gove added");
}
},
function level1(){
for (i=0; i<3; i++){
	borisdefault.time=300+i*50;
	badguyArrayTimed.push({...borisdefault});
	console.log("Johnson added");
}


for (i=0; i<100; i++){
	badguyArrayTimed.push({...govedefault});
	govedefault.time=1400+i*10;
	console.log("Gove added");
}
},
function level2(){},
function level3(){},
function level4(){},
function level5(){},
function level6(){},
function level6(){},
function level8(){},
function level9(){},
function level10(){},
function level11(){},
];