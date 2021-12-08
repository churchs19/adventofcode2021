import * as utilities from "../utilities.js";

function parseLine(line) {
    const segments = line.split('|');
    const inputSegments = segments[0].trim().split(' ').map(segment => segment.trim());
    const outputSegments = segments[1].trim().split(' ').map(segment => segment.trim());

    return {
        input: inputSegments,
        output: outputSegments
    };
}

function partOne(input) {
    const result = input.reduce((accumulator, line) => {
        return accumulator + line.output.reduce((previous, current) => {
            if (current.length === 2 || current.length === 3 || current.length === 4 || current.length === 7) {
                return previous + 1;
            }
            return previous;
        }, 0);
    }, 0);
    return result;
}

try {
    const knownLines = await utilities.readFileLines('./known.txt');
    const lines = await utilities.readFileLines('./input.txt');

    const knownInput = knownLines.filter(line => !utilities.isNullOrWhitespace(line)).map(parseLine);
    const input = lines.filter(line => !utilities.isNullOrWhitespace(line)).map(parseLine);

    const partOneKnownAnswer = partOne(knownInput);
    console.log(`Part One Known: ${partOneKnownAnswer}`);

    const partOneAnswer = partOne(input);
    console.log(`Part One: ${partOneAnswer}`);

} catch (error) {
    console.error(error);
}