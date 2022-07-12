const button = document.querySelector('button');
const images = document.querySelectorAll('img');

const gameSummary = {
    count: 0,
    win: 0,
    lose: 0,
    draw: 0,
}

const game = {
    playerHand: '',
    computerHand: '',
    result: '',
}

images.forEach(image => image.addEventListener('click', playerGetHand));

function playerGetHand () {
    this.classList.add('selected');
    if (this.dataset.option == 'kamień') {
        images[1].classList.remove('selected');
        images[2].classList.remove('selected');
    }
    if (this.dataset.option == 'nożyce') {
        images[2].classList.remove('selected');
        images[0].classList.remove('selected');
    }
    if (this.dataset.option == 'papier') {
        images[0].classList.remove('selected');
        images[1].classList.remove('selected');
    }
    game.playerHand = this.dataset.option;
}

function computerGetHand() {
    game.computerHand = images[Math.floor(Math.random() * 3)].dataset.option;
}

function publishResult() {

    if ((game.playerHand == 'kamień' && game.computerHand == 'nożyce') ||
        (game.playerHand == 'papier' && game.computerHand == 'kamień') ||
        (game.playerHand == 'nożyce' && game.computerHand == 'papier')){
        game.result = 'Gracz';
    }
    else if (game.playerHand == game.computerHand){
        game.result = 'Remis';
    }
    else {
        game.result = 'Komputer';
    }
    document.querySelector('.winner').textContent = game.result;
}

function updateBoard(winner) {

    gameSummary.count++
    document.querySelector('.games span').textContent = gameSummary.count;

    if (winner == 'Gracz') {
        gameSummary.win++;
        document.querySelector('.won span').textContent = gameSummary.win;
    }
    else if (winner == 'Komputer') {
        gameSummary.lose++;
        document.querySelector('.lost span').textContent = gameSummary.lose;
    }
    else if (winner == 'Remis') {
        gameSummary.draw++;
        document.querySelector('.draw span').textContent = gameSummary.draw;
    }
}

function startGame() {

    if (!game.playerHand) {
        alert('Ty durniu! Nie wybrałeś ręki');
        return;
    }

    computerGetHand();

    document.querySelector('p.playerchoice span').innerHTML = `<strong>${game.playerHand}</strong>`;
    document.querySelector('p.computerchoice span').innerHTML = `<strong>${game.computerHand}</strong>`;

    publishResult();

    updateBoard(game.result);

    images.forEach(image => {image.classList.remove('selected')});

    game.playerHand = '';
}

button.addEventListener('click', startGame);