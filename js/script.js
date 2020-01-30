
//--- Вибірка елементів
const hourLine = document.querySelector('#clock__line-hours');
const minutesLine = document.querySelector('#clock__line-minutes');
const secondsLine = document.querySelector('#clock__line-seconds');
const clock = document.querySelector('#clock');
const clockWrapper = document.querySelector('#clock__wrapper');
const circle = document.querySelector('#circle');
const season = document.querySelectorAll('.season');
const season1 = document.querySelector('#season1');
const season2 = document.querySelector('#season2');
const season3 = document.querySelector('#season3');
const season4 = document.querySelector('#season4');
//--------------------

//--- Кольори для годинника
const colorDay = '#EAFF4B';
const colorNight = '#7F85A6';

const colorWinter = '#FFFFFF';
const colorSpring = '#3CFF42';
const colorSummer = '#F9FF53';
const colorAutumn = '#DB7C33';
//--------------------

//--- Правильний вибір години
function getHour() {
	let time = new Date();
	let hours = time.getHours();
	if (hours > 12) {
		return (hours - 12);
	} else {
		return hours
	}
}
//--------------------------

//--- Функція постійного руху годинника і її запуск
function setTime() {
	let time = new Date();
	let lastSeconds = time.getSeconds() * 6 - 90;
	let lastMinutes = time.getMinutes() * 6 - 90;
	let lastHour = ((getHour() + (time.getMinutes() / 60)) * 30) - 90 ;

	TweenMax.set( secondsLine, {
		rotation: lastSeconds
	})

	TweenMax.set( minutesLine, {
		rotation: lastMinutes
	})

	TweenMax.set( hourLine, {
		rotation: lastHour
	})
}

setInterval(setTime, 1000);

setTime();
//--------------------------------------------

//---Вибір якого кольору буде годинник в залежності від години і від місяця
function clockColor() {
	let time = new Date();
	let hour = time.getHours();
	let month = time.getMonth();

	if (month == 0 || month == 1) {
		if (hour > 17 || hour < 9) {
			return colorNight;
		} else {
			return colorDay;
		}
	} else if (month == 2 || month == 3) {
		if (hour > 20 || hour < 8) {
			return colorNight;
		} else {
			return colorDay;
		}
	} else if (month == 4 || month == 5) {
		if (hour > 22 || hour < 6) {
			return colorNight;
		} else {
			return colorDay;
		}
	} else if (month == 6 || month == 7) {
		if (hour > 22 || hour < 7) {
			return colorNight;
		} else {
			return colorDay;
		}
	} else if (month == 8 || month == 9) {
		if (hour > 20 || hour < 8) {
			return colorNight;
		} else {
			return colorDay;
		}
	} else if (month == 10 || month == 11) {
		if (hour > 18 || hour < 8) {
			return colorNight;
		} else {
			return colorDay;
		}
	} 
}
//------------------------------------------------------------

//--- Колір годинника і виклик функції яка його зафарбовувати буде
TweenMax.set(clockWrapper, {
	backgroundColor: clockColor()
})

function clockFill() {	
	TweenMax.to(clockWrapper, 60, {
		backgroundColor: clockColor()
	})	
}

setInterval(clockFill, 60000);

clockFill();
//-----------------------------------------------------------------

//---Пори року

//---Сезонний фон
TweenMax.set([clock, circle], {
	backgroundColor: getSeason(true)
})
//---------------

//---Сезонна картинка
TweenMax.set(season, {
	backgroundImage: getSeason(false)
})
//-------------------

//--- Функція для вибору пори року
function getSeason(color) {
	let time = new Date();
	let month = time.getMonth();
	
	if (color) {
		if (month == 0 || month == 1 || month == 11) {
			return colorWinter;
		} else if (month == 2 || month == 3 || month == 4) {
			return colorSpring;
		} else if (month == 5 || month == 6 || month == 7) {
			return colorSummer;
		} else {
			return colorAutumn;
		}
	} else {
		if (month == 0 || month == 1 || month == 11) {
			return 'img/winter.svg';
		} else if (month == 2 || month == 3 || month == 4) {
			return 'img/spring.svg';
		} else if (month == 5 || month == 6 || month == 7) {
			return 'img/summer.svg';
		} else {
			return 'img/autumn.svg';
		}
	}
}
//---------------------------------


//--- Сезонна анімація
seasonImagePoints = [
	{ x: 0,    y: 0 },
	{ x: 212,  y: 212 },
	{ x: 0,    y: 420 },
	{ x: -210, y: 212 },
	{ x: 0,    y: 0 }
];

const seasonImageDuration = 60;
const seasonImageCurviness = 1.6;
const seasonImageBezier = { values: seasonImagePoints, curviness: seasonImageCurviness };
const seasonImageRotation = 180;
const seasonImageEase = Linear.easeNone;
const seasonImageRepeat = -1;
const seasonImageDelay = 15;

const tl = new TimelineMax();

tl.staggerTo(season, seasonImageDuration, { 
		bezier: seasonImageBezier, 
		ease: seasonImageEase, 
		rotation: seasonImageRotation,
		repeat: seasonImageRepeat
	}, 
	seasonImageDelay
);
//---------------------

//--- Demo Text
const gsapText = document.querySelector('#gsap-text');

TweenMax.fromTo(gsapText, 3, {
		opacity: 0,
		y: 200,
		scale: 0.1
	}, {
		opacity: 1,
		y: 0,
		scale: 1,
		ease: Back.easeOut.config(1.7)
	}
);
//-------------