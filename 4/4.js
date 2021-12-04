import * as utilities from "../utilities.js";

try {
    const lines = await utilities.readFileLines('./input.txt');

    const numbersDrawn = lines[0].split(',').map(Number);
    console.log(`Numbers drawn: ${numbersDrawn}`);

    const boards = [];
    let i = 2;
    while (i < lines.length) {
        const boardLines = lines.slice(i, i + 5);
        const board = boardLines.map(line => line.split(' ').filter(x => x !== '').map(Number));
        boards.push(board);
        i += 6;
    }
    console.log(`Number of boards: ${boards.length}`);

    const part1Answer = partOne(boards, numbersDrawn);
    console.log(`Part 1:${part1Answer}`);

    const part2Answer = partTwo(boards, numbersDrawn);
    console.log(`Part 2:${part2Answer}`);
} catch (error) {
    console.error(error);
}

function partOne(boards, numbers) {
    let winningBoard = undefined;
    let lastNum = 0;

    for (let i = 0; i < numbers.length; i++) {
        winningBoard = boards.find(board => isWinner(board, numbers.slice(0, i)));

        if (winningBoard) {
            lastNum = i;
            break;
        }
    }

    return scoreBoard(winningBoard, numbers.slice(0, lastNum));
}

function partTwo(boards, numbers) {
    let winningBoards = [];
    let lastNum = 0;

    for (let i = 0; i < numbers.length; i++) {
        for (const board of boards) {
            if (isWinner(board, numbers.slice(0, i))) {
                lastNum = i; winningBoards.push(board);
            }
        }
        boards = boards.filter(board => !winningBoards.includes(board));
    }

    const winningBoard = winningBoards[winningBoards.length - 1];
    return scoreBoard(winningBoard, numbers.slice(0, lastNum));
}

function isWinner(board, numbers) {
    return containsWinningRow(board, numbers) || containsWinningColumn(board, numbers);
}

function containsWinningRow(board, numbers) {
    return board.some(row =>
        row.every(number => numbers.includes(number))
    );
}

function containsWinningColumn(board, numbers) {
    for (let column = 0; column < board[0].length; column++) {
        if (board.every(row => numbers.includes(row[column]))) {
            return true;
        }
    }
    return false;

}

function scoreBoard(board, numbers) {
    const uncalledNums = board.reduce((previous, row) =>
        ([...previous, ...row])).filter(number => !numbers.includes(number));
    const uncalledSum = uncalledNums.reduce((previous, number) =>
        (previous + number), 0);
    return uncalledSum * Number(numbers[numbers.length - 1]);
}
