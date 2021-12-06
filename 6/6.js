import * as utilities from "../utilities.js";

function processDay(lanternfish) {
    let addedFishCount = 0;
    const refreshedFish = lanternfish.map(fish => {
        if (fish.state === 0) {
            addedFishCount = addedFishCount + fish.count;
            return {
                state: 6,
                count: fish.count
            };
        }
        return {
            state: fish.state - 1,
            count: fish.count
        };
    });

    if (addedFishCount > 0) {
        return refreshedFish.concat([{
            state: 8,
            count: addedFishCount
        }]);
    } else {
        return refreshedFish;
    }
}

function countFish(lanternfish, numDays) {
    let day = 0;
    let state = lanternfish.map(fish => {
        return {
            state: fish,
            count: 1
        };
    });
    while (day < numDays) {
        day++;
        state = processDay(state);
    }
    return state.reduce((previous, current) => previous + current.count, 0);
}

try {
    const knownLines = await utilities.readFileLines('./known.txt');
    const lines = await utilities.readFileLines('./input.txt');

    const knownLanternfish = knownLines
        .filter(line => !utilities.isNullOrWhitespace(line))
        .map(line => line.split(','))[0]
        .map(line => parseInt(line));

    const lanternfish = lines
        .filter(line => !utilities.isNullOrWhitespace(line))
        .map(line => line.split(','))[0]
        .map(line => parseInt(line));

    const knownAnswer = countFish(knownLanternfish, 18);
    console.log(`Known answer: ${knownAnswer}`);

    const partOneAnswer = countFish(lanternfish, 80);
    console.log(`Part One: ${partOneAnswer}`);

    const partTwoAnswer = countFish(lanternfish, 256);
    console.log(`Part Two: ${partTwoAnswer}`);
} catch (error) {
    console.error(error);
}
