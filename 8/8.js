import * as utilities from "../utilities.js";

function parseLine(line) {
    const segments = line.split('|');
    const inputSegments = segments[0]
        .trim()
        .split(' ')
        .map(segment => segment.trim())
        .map((a) => a.split("")
            .sort((a, b) => a > b ? 1 : -1)
            .join(""));
    ;
    const outputSegments = segments[1]
        .trim()
        .split(' ')
        .map(segment => segment.trim())
        .map((a) => a.split("")
            .sort((a, b) => a > b ? 1 : -1)
            .join(""));

    return {
        input: inputSegments,
        output: outputSegments,
        allDigits: inputSegments.concat(outputSegments)
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

function findSignal(input, condition) {
    const index = input.allDigits.findIndex(condition);
    return input.allDigits.splice(index, 1)[0];
}

function substractSignal(a, b) {
    return a.split("")
        .filter((it) => !b.includes(it))
        .join("");
}

function includesSignal(a, b) {
    return substractSignal(b, a).length === 0;
}


function partTwo(input) {

    const result = input.reduce((accumulator, inputLine) => {
        const signals = {
            1: findSignal(inputLine, (a) => a.length === 2),
            4: findSignal(inputLine, (a) => a.length === 4),
            7: findSignal(inputLine, (a) => a.length === 3),
            8: findSignal(inputLine, (a) => a.length === 7)
        }

        // 9 is the only remaining digit that includes all of the signals in 4
        signals[9] = findSignal(inputLine, (a) => includesSignal(a, signals[4]));

        // The remaining digits that have 6 signals are 0 and 6. 1 is included in 0 but not 6
        signals[0] = findSignal(inputLine, it => it.length === 6 && includesSignal(it, signals[1]));

        // 6 is the only remaining digit that has 6 signals
        signals[6] = findSignal(inputLine, it => it.length === 6);

        // 3 is the only remaining signal that includes a 7
        signals[3] = findSignal(inputLine, it => includesSignal(it, signals[7]));

        // 2 and 5 remain. 2 has 2 signals in common with 4
        signals[2] = findSignal(inputLine, it => substractSignal(signals[4], it).length === 2);

        // Only 5 remains. It has 5 signals.
        signals[5] = findSignal(inputLine, it => it.length === 5);

        const digits = {};
        for (const digit in signals) {
            digits[signals[digit]] = digit;
        }

        return accumulator + parseInt(inputLine.output.map(it => digits[it]).join(""));
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

    const partTwoKnownAnswer = partTwo(knownInput);
    console.log(`Part Two Known: ${partTwoKnownAnswer}`);

    const partTwoAnswer = partTwo(input);
    console.log(`Part Two: ${partTwoAnswer}`);
} catch (error) {
    console.error(error);
}