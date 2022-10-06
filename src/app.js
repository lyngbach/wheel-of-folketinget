const App = {

	init () {
		this.audio = new Audio('tick.mp3');

		this.isWheelSpinning = false;
		this.timeout = 0;
		this.wheelPin = document.getElementById('wheelPin');
		this.outerWheel = document.getElementById('outerWheel');
		this.canvasWheel = document.getElementById('wheel');

		this.onResize();

		this.setPoliticalParties();
		this.setupWheel();

		window.addEventListener('resize', App.onResize, false);
	},

	setPoliticalParties () {
		this.parties = {
			A: { name: 'Socialdemokratiet', letter: 'A', color: '#A82721' },
			V: { name: 'Venstre', letter: 'V', color: '#254264' },
			F: { name: 'Socialistisk Folkeparti (SF)', letter: 'F', color: '#E07EA8' },
			B: { name: 'De Radikale', letter: 'B', color: '#733280' },
			Ø: { name: 'Enhedslisten', letter: 'Ø', color: '#E6801A' },
			C: { name: 'Konservative', letter: 'C', color: '#96B226' },
			Æ: { name: 'Danmarksdemokraterne', letter: 'Æ', color: '#7896D2' },
			O: { name: 'Dansk Folkeparti', letter: 'O', color: '#EAC73E' },
			D: { name: 'Nye Borgerlige', letter: 'D', color: '#127B7F' },
			I: { name: 'Liberal Alliance', letter: 'I', color: '#3FB2BE' },
			Å: { name: 'Alternativet', letter: 'Å', color: '#2B8738' },
			Q: { name: 'Frie Grønne', letter: 'Q', color: '#5ABE82' },
			M: { name: 'Moderaterne', letter: 'M', color: '#B48CD2' },
			K: { name: 'Kristendemokraterne', letter: 'K', color: '#8B8474' },
			G: { name: 'Grøn Alliance', letter: 'G', color: '#BEAA64' },
		};
	},

	setupWheel () {
		this.wheel = new Winwheel({
			canvasId: 'wheel',
			centerX: null,
			centerY: null,
			responsive: true,
			outerRadius: 250,
			innerRadius: 50,
			textFontSize: 32,
			textFillStyle: 'white',
			textOrientation: 'vertical',
			textAlignment: 'outer',
			textFontWeight: 'normal',
			numSegments: 15,
			strokeStyle: 'white',
			segments: [
				{ 'fillStyle': this.parties.A.color, 'text': this.parties.A.letter },
				{ 'fillStyle': this.parties.V.color, 'text': this.parties.V.letter },
				{ 'fillStyle': this.parties.F.color, 'text': this.parties.F.letter },
				{ 'fillStyle': this.parties.B.color, 'text': this.parties.B.letter },
				{ 'fillStyle': this.parties.Ø.color, 'text': this.parties.Ø.letter },
				{ 'fillStyle': this.parties.C.color, 'text': this.parties.C.letter },
				{ 'fillStyle': this.parties.Æ.color, 'text': this.parties.Æ.letter },
				{ 'fillStyle': this.parties.O.color, 'text': this.parties.O.letter },
				{ 'fillStyle': this.parties.D.color, 'text': this.parties.D.letter },
				{ 'fillStyle': this.parties.I.color, 'text': this.parties.I.letter },
				{ 'fillStyle': this.parties.Å.color, 'text': this.parties.Å.letter },
				{ 'fillStyle': this.parties.Q.color, 'text': this.parties.Q.letter },
				{ 'fillStyle': this.parties.M.color, 'text': this.parties.M.letter },
				{ 'fillStyle': this.parties.K.color, 'text': this.parties.K.letter },
				{ 'fillStyle': this.parties.G.color, 'text': this.parties.G.letter }
			],
			animation: {
				type: 'spinToStop',
				duration: 8,
				spins: 3,
				callbackFinished: App.alertPrize,
				callbackSound: App.playSound,
				soundTrigger: 'pin'
			},
			pins: {
				strokeStyle: 'white',
				number: 15,
				fillStyle: 'white',
				outerRadius: 4
			}
		});
	},

	randomIntFromInterval (min, max) { // min and max included 
		return Math.floor(Math.random() * (max - min + 1) + min)
	},

	startWheel () {
		if (!App.isWheelSpinning) {
			App.wheel.stopAnimation(false);
			App.wheel.rotationAngle = 0;
			App.wheel.draw();

			let randomForce = App.randomIntFromInterval(3, 7);

			App.wheel.animation.spins = randomForce;
			
			App.wheel.startAnimation();

			App.isWheelSpinning = true;
		}
	},

	playSound () {

		// Stop and rewind the sound if it already happens to be playing.
		App.audio.pause();
		App.audio.currentTime = 0;

		// Play the sound.
		App.audio.play();
		App.wheelPin.classList.add('animate');

		clearTimeout(App.timeout);

		App.timeout = setTimeout(() => App.wheelPin.classList.remove('animate'), 70);
	},

	alertPrize (indicatedSegment) {
		const titleText = document.getElementById('titleText');
		const party = App.parties[indicatedSegment.text];

		App.isWheelSpinning = false;
		
		titleText.innerHTML = `Tillykke! Du skal stemme på\n<b class="color${party.letter}">${party.name} (${party.letter})</b>`;
	},

	onResize (event) {
		let newSize;

		if (window.innerWidth < 550) {
			newSize = (window.innerWidth - 50);

			App.outerWheel.style.width = newSize + 'px';
			App.outerWheel.style.height = newSize + 'px';
		}
	}
	
};

App.init();
