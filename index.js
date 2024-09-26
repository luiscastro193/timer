"use strict";
let delay = localStorage.delay ? Number(localStorage.delay) : 0;
let timer = localStorage.timer ? Number(localStorage.timer) : null;
let timerElement = document.getElementById('timer');
let delayInput = document.getElementById('delay');

if (delay)
	delayInput.valueAsNumber = delay;

function setDelay() {
	delay = delayInput.value ? delayInput.valueAsNumber : 0;
	localStorage.delay = delay;
}

function setTimer(event) {
	event.preventDefault();
	let minutes = event.target.elements['minutes'].valueAsNumber;
	let seconds = event.target.elements['seconds'].valueAsNumber;
	timer = Date.now() - (minutes * 60 + seconds + delay) * 1000;
	localStorage.timer = timer;
	event.target.reset();
}

function adjustDelay(event) {
	event.preventDefault();
	let difference = event.target.elements['difference'].valueAsNumber;
	delayInput.valueAsNumber = delay + difference;
	setDelay();
	timer -= difference * 1000;
	localStorage.timer = timer;
	event.target.reset();
}

function updateTimer() {
	if (timer) {
		let currentTime = (Date.now() - timer) / 1000 - delay;
		let minutes = Math.trunc(currentTime / 60);
		let seconds = Math.trunc(currentTime % 60).toString().padStart(2, '0');
		timerElement.textContent = `${minutes}:${seconds}`;
	}
	
	requestAnimationFrame(updateTimer);
}

requestAnimationFrame(updateTimer);
