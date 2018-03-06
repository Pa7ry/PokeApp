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
	healing(){return heal()}
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

//DAMAGE

let random = (min, max) => Math.floor( Math.random() * (max - min  + 1) ) + min
let basic = () => random (10, 0)
let xtra = () => random (5, 2)
let special = () => random (20, 10)
let heal = () => random (40, 20)

//BATTLE

//START

let btn = document.getElementById('fight');
let control = document.getElementById('battleAction');
let life1 = document.getElementsByClassName('ps1');
let life2 = document.getElementsByClassName('ps2');


btn.addEventListener('click', ()=>{
document.getElementById('select').className = 'hide';
btn.className = 'hide';
control.className = '';
})


//BUTTONS

 let bas = document.getElementById('normal');
 let spe = document.getElementById('super');
 let ps = document.getElementById('useHeal');
 let exit = document.getElementById('exit');

bas.addEventListener('click', ()=>{

})

spe.addEventListener('click', ()=>{

})

ps.addEventListener('click', ()=>{

})

exit.addEventListener('click', ()=>{
	document.getElementById('select').className = '';
	btn.className = '';
	control.className = 'hide';
	let yn = confirm('¿Estás seguro de que deseas abandonar?');
	/*if(yn == false) {
		.preventDefault(); //no cancela ARREGLAR
	}*/
})

let pokeLife = 0;
let info = document.getElementById('text');

bas.addEventListener('click', ()=>{
	pokeLife = Pikachu.ps - basico();
	//pokeLife = Charmander.ps - basico();
	//pokeLife = Squirtle.ps - basico();
	//pokeLife = Bulbasaur.ps - basico();
	info.innerHTML = `<li>${Pikachu.name} ha recibido ${basico()} puntos de daño, le quedan ${pokeLife} PS.</li>`
})
