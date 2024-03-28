let winMessage = document.querySelector(".winMessage");
let game = document.querySelector(".game");
let gamecont = document.querySelector(".game_cont");
let tiles = document.querySelectorAll(".tile");
let restart = document.querySelector(".restart");
let winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

restart.disabled = true;

tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
});

function userAction(tile, index) {
    if (isGameActive && tile.innerText == '') {
        tile.innerText = currentPlayer;
        style(tile);
        updateBoard(index);
        winMessage.innerHTML = "Match In Progress..";
        checkWinOrTie();
        changePlayer();
    }
};
        

function style(tile) {
    if (currentPlayer === 'X') {
        tile.style.color = "#054AF1";
    } else {
        tile.style.color = "#FF312E";
    }
}

function updateBoard(index) {
    board[index] = currentPlayer;
};

function checkWinOrTie() {
    let roundWon = false;
    winMessage.innerText == "Match In Progress";
    for (let i = 0; i < 8; i++) {
        let comb = winCombinations[i];
        const a = tiles[comb[0]].innerText;
        const b = tiles[comb[1]].innerText;
        const c = tiles[comb[2]].innerText;
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        winMessage.innerText = "Player " + currentPlayer + " Has Won!";
        if(currentPlayer=='X'){
            winMessage.style.color="#054AF1";
            gamecont.style.backgroundColor="#054AF19a";
        }else{winMessage.style.color="#FF312E";
        gamecont.style.backgroundColor="#FF312E9a";
    }
        restart.disabled = false;
        isGameActive = false;
    }
    else if (!board.includes('')) {
        winMessage.innerText = "Tie";
        restart.disabled = false;
    }
};

function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

restart.addEventListener("click", () => {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    if (currentPlayer === 'O') {
        changePlayer();
    }
    tiles.forEach(tile => {
        tile.innerText = '';
    });
    winMessage.innerText = 'Get, Set, Start!';
    winMessage.style.color="#000";
    gamecont.style.backgroundColor="#FFFFFF";
    restart.disabled = true;
});