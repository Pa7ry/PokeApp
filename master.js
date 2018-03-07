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

let data;

function drop(ev) {
    ev.preventDefault();
	data = ev.dataTransfer.getData('text');
	ev.target.style.backgroundImage="url(" + data + ")";
	let pickPoke = (pokeee)=>{
		console.log(data)
	}
	pickPoke();
}


//DAMAGE

let random = (min, max) => Math.floor( Math.random() * (max - min  + 1) ) + min
let basic = () => random (10, 0)
let xtra = () => random (5, 2)
let special = () => random (20, 10)
let heal = () => random (30, 20)



//BATTLE

//START

let btn = document.getElementById('fight');
let control = document.getElementById('battleAction');
let life1 = document.getElementsByClassName('ps1');
let life2 = document.getElementsByClassName('ps2');
let select = document.getElementById('select');
let btnCtrl = document.getElementById('controls');

btn.addEventListener('click', ()=>{
	select.className = 'hide';
	btn.className = 'hide';
	control.className = '';
	btnCtrl.className = '';
})


//BUTTONS

 let bas = document.getElementById('normal');
 let spe = document.getElementById('super');
 let psPlus = document.getElementById('useHeal');
 let exit = document.getElementById('exit');


let pokeLife = Pikachu.ps;
let pokeLifeIA = Charmander.ps;
let info1 = document.getElementById('text1');
let info2 = document.getElementById('text2');
let progress1 = document.getElementById('ps1');
let progress1T = document.getElementById('ps1T');
let progress2 = document.getElementById('ps2');
let progress2T = document.getElementById('ps2T');
let count = 0;
let countH = 0;

 //EXIT

exit.addEventListener('click', ()=>{
	let yn = confirm('¿Estás seguro de que deseas abandonar?');
	if(yn == true) {
		select.className = '';
		btn.className = '';
		control.className = 'hide';
		btnCtrl.className = 'hide';
	}
})


//BASIC ATTACK

bas.addEventListener('click', ()=>{
	count++;
	if (count > 5){
		count = 5;
	}
	console.log(count);
	pokeLife = pokeLife - basic();
	pokeLifeIA = pokeLifeIA - basic();

	if (pokeLife > 0 && pokeLifeIA >0){
		info1.innerHTML = `<p style='color: red;'>${Pokemon.name} ha recibido ${basic()} puntos de daño, le quedan ${pokeLife} PS.</p>`
		info2.innerHTML = `<p style='color: blue;'>${Pokemon.name} ha recibido ${basic()} puntos de daño, le quedan ${pokeLifeIA} PS.</p>`;
		
		progress1T.innerHTML = `${pokeLife}`;
		progress2T.innerHTML = `${pokeLifeIA}`;

		progress1.value=`${pokeLife}`;
		progress2.value=`${pokeLifeIA}`;

	} else if (pokeLife <= 0 && pokeLifeIA >0) {
		info1.innerHTML = `<p style='color: red;'>${Pokemon.name} se ha debilitado</p>`
		info2.innerHTML = `<p style='color: blue;'><b>¡${Pokemon.name} ha ganado!</b></p>`;
		
		progress1T.innerHTML = 'K.O.';

	} else if (pokeLife > 0 && pokeLifeIA <=0){
		info1.innerHTML = `<p style='color: red;'>${Pokemon.name} se ha debilitado</p>`
		info2.innerHTML = `<p style='color: blue;'><b>¡${Pokemon.name} ha ganado!</b></p>`;
		
		progress2T.innerHTML = 'K.O.';
	}
})


//SPECIAL ATTACK

spe.addEventListener('click', ()=>{
	if (count == 5){
		count = 0;
		pokeLife = pokeLife - special();
		pokeLifeIA = pokeLifeIA - special();

		if (pokeLife > 0 && pokeLifeIA >0){
			info1.innerHTML = `<p style='color: red;'>${Pokemon.name} ha recibido ${special()} puntos de daño, le quedan ${pokeLife} PS.</p>`
			info2.innerHTML = `<p style='color: blue;'>${Pokemon.name} ha recibido ${special()} puntos de daño, le quedan ${pokeLifeIA} PS.</p>`;
			
			progress1T.innerHTML = `${pokeLife}`;
			progress2T.innerHTML = `${pokeLifeIA}`;
			
			progress1.value=`${pokeLife}`;
			progress2.value=`${pokeLifeIA}`;
	
		} else if (pokeLife <= 0 && pokeLifeIA >0) {
			info1.innerHTML = `<p style='color: red;'>${Pokemon.name} se ha debilitado</p>`
			info2.innerHTML = `<p style='color: blue;'><b>¡${Pokemon.name} ha ganado!</b></p>`;

			progress1T.innerHTML = 'K.O.';

		} else if (pokeLife >= 0 && pokeLifeIA <=0){
			info1.innerHTML = `<p style='color: red;'>${Pokemon.name} se ha debilitado</p>`
			info2.innerHTML = `<p style='color: blue;'><b>¡${Pokemon.name} ha ganado!</b></p>`;

			progress2T.innerHTML = 'K.O.';
		}
	}
})


//HEAL

psPlus.addEventListener('click', ()=>{
	info1.innerHTML = `<p style='color: red;'>${Pokemon.name} tiene ${pokeLife} PS, es pronto para tomar una poción.</p>`
	info2.innerHTML = `<p style='color: blue;'>${Pokemon.name} tiene ${pokeLifeIA} PS, es pronto para tomar una poción.</p>`;
		
		if (pokeLife <= 70 && pokeLifeIA <= 70) {
			countH++;

			if (countH < 3) {
				console.log(countH);
				pokeLife = pokeLife + heal();
				pokeLifeIA = pokeLifeIA + heal();

				info1.innerHTML = `<p style='color: red;'>${Pokemon.name} ha recuperado ${heal()} puntos de vida, le quedan ${pokeLife} ps.</p>`
				info2.innerHTML = `<p style='color: blue;'>${Pokemon.name} ha recuperado ${heal()} puntos de vida, le quedan ${pokeLifeIA} ps.</p>`;
				
				progress1T.innerHTML = `${pokeLife}`;
				progress2T.innerHTML = `${pokeLifeIA}`;
				
				progress1.value=`${pokeLife}`;
				progress2.value=`${pokeLifeIA}`;

			}  else {
				info1.innerHTML = `<p style='color: red;'>No puedes usar más pociones.</p>`
				info2.innerHTML = `<p style='color: blue;'>No puedes usar más pociones.</p>`;
			}

		} else if (pokeLife <= 0 && pokeLifeIA >0) {
			info1.innerHTML = `<p style='color: red;'>${Pokemon.name} se ha debilitado</p>`
			info2.innerHTML = `<p style='color: blue;'><b>¡${Pokemon.name} ha ganado!</b></p>`;
			
			progress1T.innerHTML = 'K.O.';
		
		} else if (pokeLife >= 0 && pokeLifeIA <=0){
			info1.innerHTML = `<p style='color: red;'>${Pokemon.name} se ha debilitado</p>`
			info2.innerHTML = `<p style='color: blue;'><b>¡${Pokemon.name} ha ganado!</b></p>`;
			
			progress2T.innerHTML = 'K.O.';
		}
})


// getElementsByAttribute( attrib, value )