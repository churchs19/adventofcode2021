import * as utilities from "../utilities.js";

function buildMap(lines) {
    return lines
        .filter(line => !utilities.isNullOrWhitespace(line))
        .map(line => line.split("").map(Number));
}

function buildAdjacentIndices(x, y) {
    return [
        [x - 1, y - 1],
        [x - 1, y + 1],
        [x + 1, y - 1],
        [x + 1, y + 1],
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ];
}

function processStep(input) {
    const stepOneMap = input.map(line => {
        return line.map(item => item + 1);
    });

}

function partOne(input) {

}

function partTwo(input) {
}

try {
    const knownLines = await utilities.readFileLines('./known.txt');
    const lines = await utilities.readFileLines('./input.txt');

    const knownMap = buildMap(knownLines);
    const inputMap = buildMap(lines);

    const partOneKnownAnswer = partOne(knownMap);
    console.log(`Part One Known: ${partOneKnownAnswer}`);

    const partOneAnswer = partOne(inputMap);
    console.log(`Part One: ${partOneAnswer}`);

    // const partTwoKnownAnswer = partTwo(knownMap);
    // console.log(`Part Two Known: ${partTwoKnownAnswer}`);

    // const partTwoAnswer = partTwo(inputMap);
    // console.log(`Part Two: ${partTwoAnswer}`);
} catch (error) {
    console.error(error);
}