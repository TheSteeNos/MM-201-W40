import { print, askQuestion } from "./io.mjs"
import { debug, DEBUG_LEVELS } from "./debug.mjs";
import { ANSI } from "./ansi.mjs";
import showSplashScreen from "./splash.mjs";
import { TERMS } from "./terms.mjs";

const GAME_BOARD_SIZE = 3;
const PLAYER_1 = 1;
const PLAYER_2 = -1;
const DECIDED_LANGUAGE_IS_ENGLISH = 1;
const DECIDED_LANGUAGE_IS_NORWEGIAN = 2;

const MENU_CHOICES = {
    MENU_CHOICE_START_GAME: 1,
    MENU_CHOICE_START_GAME_VS_COMPUTER: 2,
    MENU_CHOICE_SHOW_SETTINGS: 3,
    MENU_CHOICE_EXIT_GAME: 4
};

const NO_CHOICE = -1;

let language = TERMS.EN;
let gameboard;
let currentPlayer;


clearScreen();
showSplashScreen();
setTimeout(start, 2500);



//#region game functions -----------------------------

async function start() {

    do {

        let chosenAction = NO_CHOICE;
        chosenAction = await showMenu();

        if (chosenAction == MENU_CHOICES.MENU_CHOICE_START_GAME) {
            await runGame();
        }else if (chosenAction == MENU_CHOICES.MENU_CHOICE_START_GAME_VS_COMPUTER) {
            await runGameVsCpu(); 
        }else if (chosenAction == MENU_CHOICES.MENU_CHOICE_SHOW_SETTINGS) {
            await showSettings();
        } else if (chosenAction == MENU_CHOICES.MENU_CHOICE_EXIT_GAME) {
            clearScreen();
            process.exit();
        }

    } while (true)

}

async function runGame() {

    let isPlaying = true;

    while (isPlaying) {
        initializeGame();
        isPlaying = await playGame();
    }
}

async function runGameVsCpu() {

    let isPlaying = true;

    while (isPlaying) {
        initializeGame();
        isPlaying = await playGameVsCpu();
    }
}

async function showMenu() {

    let choice = -1;
    let validChoice = false;

    while (!validChoice) {
        clearScreen();
        print(language.MENU + ANSI.RESET);
        print(ANSI.COLOR.GREEN + language.PLAY + ANSI.RESET);
        print(ANSI.COLOR.BLUE + language.PLAYCPU + ANSI.RESET);
        print(ANSI.COLOR.YELLOW + language.SETTINGS + ANSI.RESET);
        print(ANSI.COLOR.RED + language.EXIT + ANSI.RESET);

        choice = await askQuestion(language.EMPTY);

        if ([MENU_CHOICES.MENU_CHOICE_START_GAME, MENU_CHOICES.MENU_CHOICE_START_GAME_VS_COMPUTER, MENU_CHOICES.MENU_CHOICE_SHOW_SETTINGS, MENU_CHOICES.MENU_CHOICE_EXIT_GAME].includes(Number(choice))) {
            validChoice = true;
        }
    }

    return choice;
}

async function showSettings() {
    let choice = -1;
    let validChoice = false;

    while (!validChoice) {
        clearScreen();
        print(language.OPT.TITLE)
        print(ANSI.COLOR.BLUE + language.OPT.ENG + ANSI.RESET);
        print(ANSI.COLOR.RED + language.OPT.NOR + ANSI.RESET);
        

        choice = await askQuestion(language.EMPTY);

        if ([DECIDED_LANGUAGE_IS_ENGLISH, DECIDED_LANGUAGE_IS_NORWEGIAN].includes(Number(choice))) {
            validChoice = true;
            }

            if (Number(choice) == DECIDED_LANGUAGE_IS_ENGLISH) {
            language = TERMS.EN;
            } else if (Number(choice) == DECIDED_LANGUAGE_IS_NORWEGIAN) {
            language = TERMS.NO;
        }
    }
}

async function playGame() {
    let outcome = null;
    do {
        clearScreen();
        showGameBoardWithCurrentState();
        showHUD();
        let move = await getGameMoveFromTheCurrentPlayer();
        updateGameBoardState(move);
        outcome = evaluateGameState();
        if (outcome === null) {
            changeCurrentPlayer();
        }
    } while (outcome == null)

    showGameSummary(outcome);
    return await askWantToPlayAgain();
}

async function playGameVsCpu() {
    let outcome = null;
    do {
        clearScreen();
        showGameBoardWithCurrentState();
        showHUD();
        let move = await getGameMoveFromTheCurrentPlayer();
        updateGameBoardState(move);
        outcome = evaluateGameState();
        
        if (outcome === null) {
            cpuPlays();
            outcome = evaluateGameState();
        }
    } while (outcome == null)

    showGameSummary(outcome);
    return await askWantToPlayAgain();
}

async function askWantToPlayAgain() {
    let answer = await askQuestion(language.PLAY_AGAIN_QUESTION);
    let playAgain = true;
    if (answer && answer.toLowerCase()[0] != language.CONFIRM) {
        playAgain = false;
    }
    return playAgain;
}

function showGameSummary(outcome) {
    if (outcome != 0) {
        clearScreen();
        let winningPlayer = (outcome > 0) ? 1 : 2;
        print(ANSI.COLOR.GREEN + language.WINNER.PART1 + ANSI.RESET + language.WINNER.PART2 + winningPlayer + language.WINNER.PART3);
        showGameBoardWithCurrentState();
        print(language.GAMEOVER);
    }
    else if (outcome == 0) {
        clearScreen();
        print(ANSI.COLOR.BLUE + language.DRAW + ANSI.RESET);
        showGameBoardWithCurrentState();
        print(language.GAMEOVER);
    }
}

function changeCurrentPlayer() {
    currentPlayer *= -1;
}

function evaluateGameState() {
    let boardIsFull = true;
    let sum = 0;
    let rDiagonalSum = 0;
    let lDiagonalSum = 0;

    for (let row = 0; row < GAME_BOARD_SIZE; row++) {
        sum = 0;
        for (let col = 0; col < GAME_BOARD_SIZE; col++) {
            sum += gameboard[row][col];

            if (gameboard[row][col] == 0) {
                boardIsFull = false;
            }
        }

        if (Math.abs(sum) == GAME_BOARD_SIZE) {
            return sum / GAME_BOARD_SIZE;
        }
    }

    for (let col = 0; col < GAME_BOARD_SIZE; col++) {
        sum = 0;
        for (let row = 0; row < GAME_BOARD_SIZE; row++) {
            sum += gameboard[row][col];
        

        if (Math.abs(sum) == GAME_BOARD_SIZE) {
            return sum / GAME_BOARD_SIZE;
        }
    }

    rDiagonalSum = 0;
    for (let rDiagonal = 0; rDiagonal < GAME_BOARD_SIZE; rDiagonal++) {
        rDiagonalSum += gameboard[rDiagonal][rDiagonal];
    }

        if (Math.abs(rDiagonalSum) == GAME_BOARD_SIZE) {
        return rDiagonalSum / GAME_BOARD_SIZE;
     }
    }
     
    lDiagonalSum = 0;
    for (let lDiagonal = 0; lDiagonal < GAME_BOARD_SIZE; lDiagonal++) {
        lDiagonalSum += gameboard[lDiagonal][GAME_BOARD_SIZE - 1 - lDiagonal];
    

        if (Math.abs(lDiagonalSum) == GAME_BOARD_SIZE) {
        return lDiagonalSum / GAME_BOARD_SIZE;
        }
    }

    if (boardIsFull) {
        return 0;
    }

    return null;
}

function updateGameBoardState(move) {
    const ROW_ID = 0;
    const COLUMN_ID = 1;
    gameboard[move[ROW_ID] - 1][move[COLUMN_ID] - 1] = currentPlayer;
}

async function getGameMoveFromTheCurrentPlayer() {
    let position = null;
    do {
        let rawInput = await askQuestion(language.PLAYERPROMPTS.PLACE);
        position = rawInput.split(language.SPACE);
    } while (isValidPositionOnBoard(position) == false)

    return position
}

function isValidPositionOnBoard(position) {
    if (position.length !== 2) {
        return false;
    }

    const row = Number(position[0]);
    const col = Number(position[1]);

    if (isNaN(row) || isNaN(col) || row < 1 || row > GAME_BOARD_SIZE || col < 1 || col > GAME_BOARD_SIZE) {
        return false;
    }

    if (gameboard[row - 1][col - 1] !== 0) {
        return false;
    }

    return true;
}

function showHUD() {
    let playerDescription = language.PLAYER.ONE;
    if (PLAYER_2 == currentPlayer) {
        playerDescription = language.PLAYER.TWO;
    }
    print(language.PLAYERPROMPTS.TURN1 + playerDescription + language.PLAYERPROMPTS.TURN2);
}

function showGameBoardWithCurrentState() {
    for (let currentRow = 0; currentRow < GAME_BOARD_SIZE; currentRow++) {
        let rowOutput = language.EMPTY;
        for (let currentCol = 0; currentCol < GAME_BOARD_SIZE; currentCol++) {
            let cell = gameboard[currentRow][currentCol];
            if (cell == 0) {
                rowOutput += ANSI.COLOR.YELLOW + language.MARKS._ + ANSI.RESET;
            }
            else if (cell > 0) {
                rowOutput += ANSI.COLOR.RED + language.MARKS.X + ANSI.RESET;
            } else {
                rowOutput += ANSI.COLOR.GREEN + language.MARKS.O + ANSI.RESET;
            }
        }

        print(rowOutput);
    }
}

function initializeGame() {
    gameboard = createGameBoard();
    currentPlayer = PLAYER_1;
}

function createGameBoard() {

    let newBoard = new Array(GAME_BOARD_SIZE);

    for (let currentRow = 0; currentRow < GAME_BOARD_SIZE; currentRow++) {
        let row = new Array(GAME_BOARD_SIZE);
        for (let currentColumn = 0; currentColumn < GAME_BOARD_SIZE; currentColumn++) {
            row[currentColumn] = 0;
        }
        newBoard[currentRow] = row;
    }

    return newBoard;

}

function clearScreen() {
    console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME, ANSI.RESET);
}

function cpuPlays() {
    let validMove = false;

    while (!validMove) {
        const row = Math.floor(Math.random() * GAME_BOARD_SIZE) + 1;
        const col = Math.floor(Math.random() * GAME_BOARD_SIZE) + 1;
        
        if (isValidPositionOnBoard([row, col])) {
            gameboard[row - 1][col - 1] = PLAYER_2;
            validMove = true;
        }
    }
}

//#endregion