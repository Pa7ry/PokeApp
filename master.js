//DEF. POKEMON

class Pokemon {
	constructor (name, ps, type, img) {
		this.name = name;
		this.ps = ps;
		this.type = type;
		this.img = img;
	}

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
let pokeee;
let data;

function drop(ev) {
    ev.preventDefault();
	data = ev.dataTransfer.getData('text');
	ev.target.style.backgroundImage="url(" + data + ")";
	let pickPoke = (pokeee)=>{
		console.log(data)
		if (data == 'PokeApp/img/pikachu.png') {
			pokeee == Pikachu;
		} else if (data == 'PokeApp/img/charmander.png') {
			pokeee == Charmander;
		} else if (data == 'PokeApp/img/bulbasaur.png') {
			pokeee == Bulbasaur;
		} else if (data == 'PokeApp/img/squirtle.png') {
			pokeee == Squirtle;
		}
		console.log(pokeee)
	}
	pickPoke();
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
let select = document.getElementById('select')

btn.addEventListener('click', ()=>{
	select.className = 'hide';
	btn.className = 'hide';
	control.className = '';
})


//BUTTONS

 let bas = document.getElementById('normal');
 let spe = document.getElementById('super');
 let ps = document.getElementById('useHeal');
 let exit = document.getElementById('exit');


let pokeLife = Pikachu.ps;
let pokeLifeIA = Charmander.ps;
let info = document.getElementById('text');
let progress1 = document.getElementById('ps1');
let progress1T = document.getElementById('ps1T');
let progress2 = document.getElementById('ps2');
let progress2T = document.getElementById('ps2T');
let count = 0;


 //EXIT

exit.addEventListener('click', (ev)=>{
	select.className = '';
	btn.className = '';
	control.className = 'hide';
	let yn = confirm('¿Estás seguro de que deseas abandonar?');
	if(yn == false) {
		ev.preventDefault(); //no cancela ARREGLAR
	}
})


//BASIC ATTACK

bas.addEventListener('click', ()=>{
	count++;
	if (count > 5){
		count = 0;
	}
	console.log(count);
	pokeLife = pokeLife - basic();
	pokeLifeIA = pokeLifeIA - basic();

	if (pokeLife > 0 && pokeLifeIA >0){
		info.innerHTML = `<p>${pokeee.name} ha recibido ${basic()} puntos de daño, le quedan ${pokeLife} PS.</p>
							<p>${pokeee.name} ha recibido ${basic()} puntos de daño, le quedan ${pokeLifeIA} PS.</p>`;
		progress1T.innerHTML = `${pokeLife}`;
		progress2T.innerHTML = `${pokeLifeIA}`;
		progress1.value=`${pokeLife}`;
		progress2.value=`${pokeLifeIA}`;

	} else if (pokeLife <= 0 && pokeLifeIA >0) {
		info.innerHTML = `<p>${pokeee.name} se ha debilitado</p>
							<p><b>¡${pokeee.name} ha ganado!</b></p>`;
		progress1T.innerHTML = 'K.O.';

	} else if (pokeLife > 0 && pokeLifeIA <=0){
		info.innerHTML = `<p>${pokeee.name} se ha debilitado</p>
							<p><b>¡${pokeee.name} ha ganado!</b></p>`;
		progress2T.innerHTML = 'K.O.';
	}
})


//SPECIAL ATTACK

spe.addEventListener('click', (ev)=>{
	if (count != 5) {
		ev.preventDefault();
		spe.style = 'background= #D81E5B color= #D8DBE2';
	} else if (count == 5){
		count = 0;
		console.log(count);
		console.log(this);
		pokeLife = pokeLife - special();
		pokeLifeIA = pokeLifeIA - special();

		if (pokeLife > 0 && pokeLifeIA >0){
			info.innerHTML = `<p>${pokeee.name} ha recibido ${special()} puntos de daño, le quedan ${pokeLife} PS.</p>
								<p>${pokeee.name} ha recibido ${special()} puntos de daño, le quedan ${pokeLifeIA} PS.</p>`;
			progress1T.innerHTML = `${pokeLife}`;
			progress2T.innerHTML = `${pokeLifeIA}`;
			progress1.value=`${pokeLife}`;
			progress2.value=`${pokeLifeIA}`;
	
		} else if (pokeLife <= 0 && pokeLifeIA >0) {
			bas.preventDefault();
			info.innerHTML = `<p>${pokeee.name} se ha debilitado</p>
								<p><b>¡${pokeee.name} ha ganado!</b></p>`;
			progress1T.innerHTML = 'K.O.';
		} else if (pokeLife >= 0 && pokeLifeIA <=0){
			bas.preventDefault();
			info.innerHTML = `<p>${pokeee.name} se ha debilitado</p>
								<p><b>¡${pokeee.name} ha ganado!</b></p>`;
			progress2T.innerHTML = 'K.O.';
		}
	}
})


//HEAL

ps.addEventListener('click', ()=>{
	if (pokeLife < (100 + heal()) && pokeLifeIA < (100 + heal())){
		info.innerHTML = `<p>${pokeee.name} ha recibido ${special()} puntos de daño, le quedan ${pokeLife} PS.</p>
							<p>${pokeee.name} ha recibido ${special()} puntos de daño, le quedan ${pokeLifeIA} PS.</p>`;
		progress1T.innerHTML = `${pokeLife}`;
		progress2T.innerHTML = `${pokeLifeIA}`;
		progress1.value=`${pokeLife}`;
		progress2.value=`${pokeLifeIA}`;

	} else if (pokeLife <= 0 && pokeLifeIA >0) {
		bas.preventDefault();
		info.innerHTML = `<p>${pokeee.name} se ha debilitado</p>
							<p><b>¡${pokeee.name} ha ganado!</b></p>`;
		progress1T.innerHTML = 'K.O.';
	} else if (pokeLife >= 0 && pokeLifeIA <=0){
		bas.preventDefault();
		info.innerHTML = `<p>${pokeee.name} se ha debilitado</p>
							<p><b>¡${pokeee.name} ha ganado!</b></p>`;
		progress2T.innerHTML = 'K.O.';
	}
})


// getElementsByAttribute( attrib, value )