const startButton = document.getElementById('start');
const restartButton = document.getElementById('restart');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const gameTime = document.getElementById('time');
const board = document.getElementById('board');
const colors = ['#ff0000', '#09ff00', '#0066ff'];
let time = 0;
let score = 0;
let timerInterval;

startButton.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

restartButton.addEventListener('click', (event) => {
    screens[1].classList.remove('up');
    gameTime.parentNode.classList.remove('hide');
    board.innerHTML = '';
    restartButton.classList.add('hide');
    clearInterval(timerInterval);
    time = 0;
    score = 0;
})


timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    };
});

function startGame() {
    timerInterval = setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
};

function decreaseTime () {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        };
        setTime(current);
    }
};

function setTime(value) {
    gameTime.innerHTML = `00:${value}`;
};

function finishGame() {
    clearInterval(timerInterval);
    gameTime.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
    restartButton.classList.remove('hide');
};

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    const color = getRandomColor();

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = color;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);

    return colors[index];
}