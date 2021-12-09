import * as utilities from "../utilities.js";

function buildMap(lines) {
    return lines
        .filter(line => !utilities.isNullOrWhitespace(line))
        .map(line => line.split("").map(Number));
}

function buildAdjacentIndices(x, y) {
    return [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ];
}

function isLower(map, x, y, height) {
    if (map[y] === undefined || map[y][x] === undefined) {
        return true;
    }
    return height < map[y][x];
}

function isLowerThanAdjacentPoints(map, x, y) {
    const height = map[y][x];
    for (const [x2, y2] of buildAdjacentIndices(x, y)) {
        if (!isLower(map, x2, y2, height)) {
            return false;
        }
    }
    return true;
}

function findLowPoints(map) {
    const lowPoints = [];

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (isLowerThanAdjacentPoints(map, x, y)) {
                lowPoints.push([x, y]);
            }
        }
    }

    return lowPoints;
}

function findBasinSize(map, sourceX, sourceY, seen) {
    let count = 1;
    for (const [x, y] of buildAdjacentIndices(sourceX, sourceY)) {
        if (!seen[y]) {
            seen[y] = {};
        } else if (seen[y][x]) {
            continue;
        }
        seen[y][x] = true;
        if (map[y] === undefined || map[y][x] === undefined) {
            continue;
        } else if (map[y][x] < 9) {
            count += findBasinSize(map, x, y, seen);
        }
    }
    return count;
}

function partOne(map) {
    const lowPoints = findLowPoints(map);

    const riskSum = lowPoints.map(([x, y]) => map[y][x])
        .reduce((sum, height) => sum + height + 1, 0);

    return riskSum;
}

function partTwo(map) {
    const basins = findLowPoints(map)
        .map(([x, y]) => findBasinSize(map, x, y, { [y]: { [x]: true } }))
        .sort((a, b) => b - a);
    return basins[0] * basins[1] * basins[2];
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

    const partTwoKnownAnswer = partTwo(knownMap);
    console.log(`Part Two Known: ${partTwoKnownAnswer}`);

    const partTwoAnswer = partTwo(inputMap);
    console.log(`Part Two: ${partTwoAnswer}`);

} catch (error) {
    console.error(error);
}