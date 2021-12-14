import * as utilities from "../utilities.js";

try {
    const knownLines = await utilities.readFileLines('./known.txt');
    const lines = await utilities.readFileLines('./input.txt');


    // const partOneKnownAnswer = partOne(knownMap);
    // console.log(`Part One Known: ${partOneKnownAnswer}`);

    // const partOneAnswer = partOne(inputMap);
    // console.log(`Part One: ${partOneAnswer}`);

    // const partTwoKnownAnswer = partTwo(knownMap);
    // console.log(`Part Two Known: ${partTwoKnownAnswer}`);

    // const partTwoAnswer = partTwo(inputMap);
    // console.log(`Part Two: ${partTwoAnswer}`);
} catch (error) {
    console.error(error);
}