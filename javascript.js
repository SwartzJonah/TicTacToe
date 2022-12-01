
//Player Factory
const player = (name, letter) => {
    return { name, letter };
};

//GameBoard Module
const gameBoard = (() => {
    const restartBtn = document.querySelector('#restartBtn');
    const boardPiece = document.querySelector('.boardPiece');
    const board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    for (i = 0; i < 9; i++) {
        let piece = document.createElement('div');
        piece.className = 'piece';
        piece.setAttribute('spot', i);
        piece.textContent = board[i];
        piece.addEventListener('click', () => {
            if (piece.textContent === " ") {
                if (controller.winner === false && controller.round <= 9) {
                    piece.textContent = controller.currentPlayer.letter;
                    piece.classList.add(controller.currentPlayer.letter);
                    board[piece.getAttribute('spot')] = controller.currentPlayer.letter;
                    controller.checkWinner();
                    if (controller.winner === false) {
                        controller.nextPlayer(0);
                        controller.round += 1
                    }
                    if (controller.winner === false && controller.round === 9) {
                        controller.Tie();
                    }
                }
                console.log(controller.winner);
            }
        })
        boardPiece.appendChild(piece);
    }
    restartBtn.addEventListener('click', () => {
        console.log(board);
        controller.round = 0;
        controller.nextPlayer(1);
        const reset = document.querySelectorAll('.piece');
        reset.forEach(piece => {
            piece.textContent = " ";
            piece.classList.remove('X');
            piece.classList.remove('O');
        })
        for (i = 0; i < 9; i++) {
            board[i] = " ";
        }
        console.log(board);
    })
    return { board };
})();

//Controller Module
const controller = (() => {
    const turn = document.getElementById('Turn');
    const playerOne = player('Player One', 'X');
    const playerTwo = player('Player Two', 'O');
    let currentPlayer = playerOne;
    let round = 0;
    let winner = false;

    function Tie() {
        turn.textContent = 'Tie';
    }

    function nextPlayer(reset) {
        if(reset !=1){
            if (this.currentPlayer === playerOne) {
            this.currentPlayer = playerTwo;
            turn.textContent = "It is Player Two's (O) turn!";
            } else if (this.currentPlayer === playerTwo) {
            this.currentPlayer = playerOne;
            turn.textContent = "It is Player One's (X) turn!";
            }
        } else {
            this.currentPlayer = playerOne;
            turn.textContent = "It is Player One's (X) turn!";
        }
    }

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];


    function checkWinner() {
        let temp;
        for (i = 0; i < 8; i++) {
            temp = winningCombos[i];
            if (gameBoard.board[temp[0]] === this.currentPlayer.letter && gameBoard.board[temp[1]] === this.currentPlayer.letter && gameBoard.board[temp[2]] === this.currentPlayer.letter) {
                turn.textContent = `Winner! ${this.currentPlayer.name} ${this.currentPlayer.letter}!`;
                this.winner = true;
            }
        }
    }
    return { nextPlayer, Tie, checkWinner, currentPlayer, round, winner, turn };
})();

