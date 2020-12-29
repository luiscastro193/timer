"use strict";
let delay = localStorage.delay ? parseInt(localStorage.delay) : 0;
let timer = localStorage.timer ? parseInt(localStorage.timer) : null;
let timerElement = document.getElementById('timer');
let delayInput = document.getElementById('delay');

if (delay)
	delayInput.value = delay;

function setTimer(event) {
	event.preventDefault();
	let minutes = parseInt(event.target.elements['minutes'].value);
	let seconds = parseInt(event.target.elements['seconds'].value);
	timer = Date.now() - (minutes * 60 + seconds + delay) * 1000;
	localStorage.timer = timer;
	event.target.reset();
}

function setDelay() {
	delay = delayInput.value ? parseInt(delayInput.value) : 0;
	localStorage.delay = delay;
}

setInterval(function() {
	if (timer) {
		let currentTime = (Date.now() - timer) / 1000 - delay;
		let minutes = Math.floor(currentTime / 60);
		let seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
		timerElement.textContent = `${minutes}:${seconds}`;
	}
}, 10);
