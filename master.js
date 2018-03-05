//DEF. POKEMON

class Pokemon {
	constructor (name, ps, type, img) {
		this.name = name;
		this.ps = ps;
		this.type = type;
		this.img = img;
	}

	basico(){return basic()};
	extra(){return xtra()};
	especial(){return special()};
}

let Pikachu = new Pokemon ('Pikachu', 100, 'electric', 'img/pikachu.png');
let Charmander = new Pokemon ('Charmander', 100, 'fire', 'img/charmander.png');
let Squirtle = new Pokemon ('Squirtle', 100, 'water', 'img/bulbasaur.png');
let Bulbasaur = new Pokemon ('Bulbasaur', 100, 'plant', 'img/squirtle.png');

//SELECT POKEMON

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
	let data = ev.dataTransfer.getData('text');
    ev.target.style.backgroundImage="url(" + data + ")";
}

//ATTACKS

let random = (min, max) => Math.floor( Math.random() * (max - min  + 1) ) + min
let basic = () => random (10, 0)
let xtra = () => random (5, 2)
let special = () => random (20, 10)


//BATTLE
 let btn = document.getElementById('fight')
 let control = document.getElementById('controls')
 btn.addEventListener('click', ()=>{
	document.getElementById('select').className = 'hide';
	btn.className = 'hide';
	control.className = '';
 })