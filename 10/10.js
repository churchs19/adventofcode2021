import * as utilities from "../utilities.js";

const openChars = ['(', '[', '<', '{'];
const closeChars = [')', ']', '>', '}'];
const partOneScoreValues = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};

function partOne(input) {
    let scoreArray = [];
    for (let line of input) {
        let closeOrder = [];
        for (let char of line) {
            if (openChars.includes(char)) {
                closeOrder.unshift(closeChars[openChars.indexOf(char)]);
            } else if (char == closeOrder[0]) {
                closeOrder.shift()
            } else {
                scoreArray.push(char);
                break;
            }
        }
    }

    return scoreArray
        .map(it => partOneScoreValues[it] ?? 0)
        .reduce((a, b) => a + b, 0);
}

const partTwoScoreValues = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
};

function partTwo(input) {
    let scoreArray = [];
    for (let line of input) {
        let incomplete = true;
        let closeOrder = [];
        for (let char of line) {
            if (openChars.includes(char)) {
                closeOrder.unshift(closeChars[openChars.indexOf(char)]);
            } else if (char == closeOrder[0]) {
                closeOrder.shift()
            } else {
                incomplete = false;
            }
        }
        if (incomplete) {
            scoreArray.push(closeOrder);
        }
    }

    const computedScoreArray = scoreArray
        .map(it => {
            return it.map(it => partTwoScoreValues[it] ?? 0)
                .reduce((sum, item) => (sum * 5) + item, 0);
        })
        .sort((a, b) => a - b);

    const score = computedScoreArray[Math.floor(computedScoreArray.length / 2)];
    return score;
}

try {
    const knownLines = await utilities.readFileLines('./known.txt');
    const lines = await utilities.readFileLines('./input.txt');

    const knownInput = knownLines.map(line => line.split(''));
    const input = lines.map(line => line.split(''));

    const partOneKnownAnswer = partOne(knownInput);
    console.log(`Part One Known: ${partOneKnownAnswer}`);

    const partOneAnswer = partOne(input);
    console.log(`Part One: ${partOneAnswer}`);

    const partTwoKnownAnswer = partTwo(knownInput);
    console.log(`Part Two Known: ${partTwoKnownAnswer}`);

    const partTwoAnswer = partTwo(input);
    console.log(`Part Two: ${partTwoAnswer}`);
} catch (error) {
    console.error(error);
}