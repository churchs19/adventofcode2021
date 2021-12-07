import * as utilities from "../utilities.js";

function calculateFuelPart1(sorted, index) {
    return sorted.reduce((previous, current) => {
        return previous + (Math.abs(current - sorted[index]));
    }, 0);
}

function partOne(input) {
    const sorted = input.sort((a, b) => a - b);
    const medianIndex = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
        return Math.floor(calculateFuelPart1(sorted, medianIndex), calculateFuelPart1(sorted, medianIndex + 1));
    } else {
        return calculateFuelPart1(sorted, medianIndex);
    }
}

function calculateFuelPart2(input, mean) {
    return input.reduce((previous, current) => {
        return previous + binomialCoefficient(Math.abs(current - mean));
    }, 0);
}

function binomialCoefficient(input) {
    return (input * (input + 1)) / 2;
}

function partTwo(input) {
    const sorted = input.sort((a, b) => a - b);
    const mean = sorted.reduce((previous, current) => previous + current, 0) / sorted.length;

    return Math.min(
        calculateFuelPart2(sorted, Math.floor(mean)),
        calculateFuelPart2(sorted, Math.ceil(mean))
    );
}

try {
    const knownLines = await utilities.readFileLines('./known.txt');
    const lines = await utilities.readFileLines('./input.txt');

    const knownInput = knownLines
        .filter(line => !utilities.isNullOrWhitespace(line))
        .flatMap(line => line.split(',').map(Number));

    const input = lines
        .filter(line => !utilities.isNullOrWhitespace(line))
        .flatMap(line => line.split(',').map(Number));

    const knownResult = partOne(knownInput);
    console.log(`Known Part One: ${knownResult}`);

    const partOneResult = partOne(input);
    console.log(`Part One: ${partOneResult}`);

    const knownPartTwoResult = partTwo(knownInput);
    console.log(`Known Part Two: ${knownPartTwoResult}`);

    const partTwoResult = partTwo(input);
    console.log(`Part Two: ${partTwoResult}`);
} catch (error) {
    console.error(error);
}