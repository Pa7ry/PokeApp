//CLASS POKEMON

class Pokemon {
	constructor (name, ps, type, img) {
		this.name = name;
		this.ps = ps;
		this.type = type;
		this.img = img;
	}
}

const Pikachu = new Pokemon ('pikachu', 100, 'electric', 'img/pikachu.png');
const Charmander = new Pokemon ('charmander', 100, 'fire', 'img/charmander.png');
const Squirtle = new Pokemon ('squirtle', 100, 'water', 'img/bulbasaur.png');
const Bulbasaur = new Pokemon ('bulbasaur', 100, 'plant', 'img/squirtle.png');

const Pokemons = [Pikachu, Charmander, Squirtle, Bulbasaur];


// VARS
let data;
let sel;
let selectedPokemons = [];

//SELECT POKEMON

function allowDrop(ev) {
	ev.preventDefault();
}



function drag(ev) {
	ev.dataTransfer.setData('text', ev.target.id);
	return sel = ev.target.className;
}



function drop(ev) {
    ev.preventDefault();
	data = ev.dataTransfer.getData('text');
	ev.target.style.backgroundImage="url(" + data + ")";
	let pickPoke = (sel)=> {
		console.log(sel);
		for(let p of Pokemons) {
			console.log(sel, p.name);
			if(sel == p.name) {
				selectedPokemons.push(p);
				console.log(selectedPokemons)
				selectedPokemons[0].ps = selectedPokemons[0].ps;
				selectedPokemons[1].ps = selectedPokemons[1].ps;
			}
		}
	}
	pickPoke(sel);
}


//DAMAGE

let random = (min, max)=> Math.floor( Math.random() * (max - min  + 1) ) + min;
let basic = ()=> random (10, 0);
let xtra = ()=> random (5, 2);
let special = ()=> random (20, 10);
let heal = ()=> random (30, 20);


//BATTLE

//START

let btn = document.getElementById('fight');
let control = document.getElementById('battleAction');
let progress1 = document.getElementById('ps1');
let progress1T = document.getElementById('ps1T');
let progress2 = document.getElementById('ps2');
let progress2T = document.getElementById('ps2T');
let select = document.getElementById('select');
let btnCtrl = document.getElementById('controls');
let poke1 = document.getElementById('poke1');

btn.addEventListener('click', ()=>{
	select.className = 'hide';
	btn.className = 'hide';
	control.className = '';
	btnCtrl.className = '';
	progress1.className = '';
	progress2.className = '';
	progress1T.className = '';
	progress2T.className = '';
})



//BUTTONS

let bas = document.getElementById('normal');
let spe = document.getElementById('super');
let psPlus = document.getElementById('useHeal');
let exit = document.getElementById('exit');

let info1 = document.getElementById('text1');
let info2 = document.getElementById('text2');
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
		progress1.className = 'hide';
		progress2.className = 'hide';
		progress1T.className = 'hide';
		progress2T.className = 'hide';
		poke1.style.backgroundImage = 'none';
		poke2.style.backgroundImage = 'none';
		selectedPokemons = [];
	}
})


//BASIC ATTACK

bas.addEventListener('click', ()=>{
	count++;
	if (count > 5){
		count = 5;
		spe.classList.add('call');
		spe.classList.remove('disabled');
	}

	console.log(count);
	let attack = basic();
	let attackIA = basic();
	selectedPokemons[0].ps = selectedPokemons[0].ps - attack;
	selectedPokemons[1].ps = selectedPokemons[1].ps -attackIA;

	if (selectedPokemons[0].ps > 0 && selectedPokemons[1].ps >0){
		info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } ha recibido ${ attackIA } puntos de daño, le quedan ${selectedPokemons[0].ps} PS.</p>`
		info2.innerHTML = `<p style='color: blue;'>${ selectedPokemons[1].name } ha recibido ${ attack } puntos de daño, le quedan ${selectedPokemons[1].ps} PS.</p>`;
		
		progress1T.innerHTML = `<b style='color: red'> -${ attack }PS</b> = <span style='color: green'>${ selectedPokemons[0].ps }PS</span>`;
		progress2T.innerHTML = `<b style='color: red'> -${ attackIA }PS</b> = <span style='color: green'>${ selectedPokemons[1].ps }PS</span>`;

		progress1.value=`${selectedPokemons[0].ps}`;
		progress2.value=`${selectedPokemons[1].ps}`;

	} else if (selectedPokemons[0].ps <= 0 && selectedPokemons[1].ps > 0) {
		info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } se ha debilitado</p>`
		info2.innerHTML = `<p style='color: blue;'><b>¡${ selectedPokemons[1].name } ha ganado!</b></p>`;
		
		progress1T.innerHTML = 'K.O.';

	} else if (selectedPokemons[0].ps > 0 && selectedPokemons[1].ps <= 0){
		info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } ha ganado!</b></p>`
		info2.innerHTML = `<p style='color: blue;'><b>¡${ selectedPokemons[1].name } se ha debilitado</p>`;
		
		progress2T.innerHTML = 'K.O.';
	}
});


//SPECIAL ATTACK

spe.addEventListener('click', ()=>{
	if (count == 5){
		count = 0;
		spe.classList.remove('call');
		spe.classList.add('disabled');
		selectedPokemons[0].ps = selectedPokemons[0].ps - special();
		selectedPokemons[1].ps = selectedPokemons[1].ps - special();

		if (selectedPokemons[0].ps > 0 && selectedPokemons[1].ps >0){
			info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } ha recibido ${special()} puntos de daño, le quedan ${selectedPokemons[0].ps} PS.</p>`
			info2.innerHTML = `<p style='color: blue;'>${ selectedPokemons[1].name } ha recibido ${special()} puntos de daño, le quedan ${selectedPokemons[1].ps} PS.</p>`;
			
			progress1T.innerHTML = `${ selectedPokemons[0].ps }`;
			progress2T.innerHTML = `${ selectedPokemons[1].ps }`;
			
			progress1.value=`${ selectedPokemons[0].ps }`;
			progress2.value=`${ selectedPokemons[1].ps }`;
	
		} else if (selectedPokemons[0].ps <= 0 && selectedPokemons[1].ps >0) {
			info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } se ha debilitado</p>`
			info2.innerHTML = `<p style='color: blue;'><b>¡${ selectedPokemons[1].name } ha ganado!</b></p>`;

			progress1T.innerHTML = 'K.O.';

		} else if (selectedPokemons[0].ps >= 0 && selectedPokemons[1].ps <=0){
			info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } se ha debilitado</p>`
			info2.innerHTML = `<p style='color: blue;'><b>¡${ selectedPokemons[1].name } ha ganado!</b></p>`;

			progress2T.innerHTML = 'K.O.';
		} else if (selectedPokemons[0].ps == 0 && selectedPokemons[1].ps == 0) {
			info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } se ha debilitado</p>`
			info2.innerHTML = `<p style='color: blue;'><b>¡${ selectedPokemons[1].name } se ha debilitado</b></p>`;

			progress1T.innerHTML = 'K.O.';
			progress2T.innerHTML = 'K.O.';
		}
	}
})


//HEAL

psPlus.addEventListener('click', ()=>{
	info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } tiene ${selectedPokemons[0].ps} PS, es pronto para tomar una poción.</p>`
	info2.innerHTML = `<p style='color: blue;'>${ selectedPokemons[1].name } tiene ${selectedPokemons[1].ps} PS, es pronto para tomar una poción.</p>`;
		
	if (selectedPokemons[0].ps <= 70 && selectedPokemons[1].ps <= 70) {
		countH++;

		if (countH < 3) {
			console.log(countH);
			selectedPokemons[0].ps = selectedPokemons[0].ps + heal();
			selectedPokemons[1].ps = selectedPokemons[1].ps + heal();

			info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } ha recuperado ${heal()} puntos de vida, le quedan ${selectedPokemons[0].ps} ps.</p>`
			info2.innerHTML = `<p style='color: blue;'>${ selectedPokemons[1].name } ha recuperado ${heal()} puntos de vida, le quedan ${selectedPokemons[1].ps} ps.</p>`;
			
			progress1T.innerHTML = `${selectedPokemons[0].ps}`;
			progress2T.innerHTML = `${selectedPokemons[1].ps}`;
			
			progress1.value=`${selectedPokemons[0].ps}`;
			progress2.value=`${selectedPokemons[1].ps}`;

		}  else {
			info1.innerHTML = `<p style='color: red;'>No puedes usar más pociones.</p>`
			info2.innerHTML = `<p style='color: blue;'>No puedes usar más pociones.</p>`;
		}

	} else if (selectedPokemons[0].ps <= 0 && selectedPokemons[1].ps > 0) {
		info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } se ha debilitado</p>`
		info2.innerHTML = `<p style='color: blue;'><b>¡${ selectedPokemons[1].name } ha ganado!</b></p>`;
		
		progress1T.innerHTML = 'K.O.';
	
	} else if (selectedPokemons[0].ps >= 0 && selectedPokemons[1].ps <= 0){
		info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } ha ganado!</b></p>`;
		info2.innerHTML = `<p style='color: blue;'><b>¡${ selectedPokemons[1].name } se ha debilitado</p>`;
		
		progress2T.innerHTML = 'K.O.';

	} else if (selectedPokemons[0].ps == 0 && selectedPokemons[1].ps == 0) {
		info1.innerHTML = `<p style='color: red;'>${ selectedPokemons[0].name } se ha debilitado</p>`
		info2.innerHTML = `<p style='color: blue;'><b>¡${ selectedPokemons[1].name } se ha debilitado</b></p>`;
		
		progress1T.innerHTML = 'K.O.';
		progress2T.innerHTML = 'K.O.';
	}
})


// getElementsByAttribute( attrib, value )