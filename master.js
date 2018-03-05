//DEF. POKEMON

class Pokemon {
	constructor (name, PS, special, type) {
		this.name = name;
		this.PS = PS;
		this.special = special;
		this.type = type;
	}

	basico(){return basic()};
	extra(){return xtra()};
	especial(){return special()};
}

let Pikachu = new Pokemon ('Pikachu', 250, 20, 'electric');
let Charmander = new Pokemon ('Charmander', 250, 25, 'fire');
let Squirtle = new Pokemon ('Squirtle', 250, 18, 'water');
let Bulbasaur = new Pokemon ('Bulbasaur', 250, 23, 'plant');

//SELECT POKEMON

let pika = document.getElementById('pikachu');
let charm = document.getElementById('charmander');
let squir = document.getElementById('squirtle');
let bulba = document.getElementById('bulbasaur');


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData('img', ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData('img');
    ev.target.appendChild(document.getElementById(data));
}


//ATTACKS

let random = (min, max) => Math.floor( Math.random() * (max - min  + 1) ) + min
let basic = () => random (10, 0)
let xtra = () => random (5, 2)
let special = () => random (20, 10)


//BATTLE

