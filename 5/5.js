import * as utilities from "../utilities.js";

class LineSegment {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
}

function parseLine(line) {
    const points = line.split('->').map(x => x.trim().split(',').map(y => parseInt(y.trim())));
    return new LineSegment(points[0][0], points[0][1], points[1][0], points[1][1]);
}

function countOverlaps(segments) {
    const map = createMap(segments);

    let count = map.reduce((previous, currentRow) => {
        return previous + (currentRow.reduce((rowSum, currentColumn) => {
            return rowSum + (currentColumn > 1 ? 1 : 0);
        }, 0))
    }, 0);

    return count;
}

function createMap(segments) {
    const map = [];
    for (const { x1, y1, x2, y2 } of segments) {
        drawLine(map, x1, y1, x2, y2);
    }
    return map;
}

function drawLine(map, x1, y1, x2, y2) {
    const dx = Math.sign(x2 - x1);
    const dy = Math.sign(y2 - y1);

    let [x, y] = [null, null];
    while (x !== x2 || y !== y2) {
        x = (x ?? x1 - dx) + dx;
        y = (y ?? y1 - dy) + dy;

        if (map[y] === undefined) { map[y] = []; }
        if (map[y][x] === undefined) { map[y][x] = 0; }
        map[y][x]++;
    }
}


try {
    const lines = await utilities.readFileLines('./input.txt');

    const lineSegments = lines.filter(it => !utilities.isNullOrWhitespace(it)).map(parseLine);

    const partOne = countOverlaps(lineSegments.filter(segment => segment.x1 === segment.x2 || segment.y1 === segment.y2));
    console.log(`Part One: ${partOne}`);

    const partTwo = countOverlaps(lineSegments);
    console.log(`Part Two: ${partTwo}`);
} catch (error) {
    console.error(error);
}



