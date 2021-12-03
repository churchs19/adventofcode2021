import { readFile } from "fs/promises";
import * as utilities from "../utilities.js";

try {
    const data = await readFile("./input.txt", "UTF-8");

    const lines = data.split(/\r?\n/)
        .filter(it => !utilities.isNullOrWhitespace(it))
        .map(line => line.trim());

    console.log(`# lines: ${lines.length}`);
    console.log(`Lines[0]: ${lines[0]}`);

    const result = lines.reduce((previous, current) => {
        for (let i = 0; i < current.length; i++) {
            previous[i] = current[i] === '1' ? previous[i] + 1 : previous[i];
        }
        return previous;
    }, new Array(lines[0].length).fill(0, 0, lines[0].length));

    const gamma = result.map(it => it >= lines.length / 2 ? '1' : '0').join('');
    const epsilon = result.map(it => it >= lines.length / 2 ? '0' : '1').join('');
    console.log(`Gamma: ${gamma} : ${parseInt(gamma, 2)}`);
    console.log(`Epsilon: ${epsilon} : ${parseInt(epsilon, 2)}`);

    const part1Answer = parseInt(gamma, 2) * parseInt(epsilon, 2);
    console.log(`Part 1:${part1Answer}`);

    const oxygenFilterValue = oxygenFilter(0, lines);
    const co2FilterValue = co2Filter(0, lines);
    console.log(`Oxygen Filter: ${oxygenFilterValue} : ${parseInt(oxygenFilterValue, 2)}`);
    console.log(`CO2 Filter: ${co2FilterValue} : ${parseInt(co2FilterValue, 2)}`);

    const part2Answer = parseInt(oxygenFilterValue, 2) * parseInt(co2FilterValue, 2);
    console.log(`Part 2:${part2Answer}`);
} catch (error) {
    console.error(error);
}

function oxygenFilter(index, array) {
    if (array.length === 1) {
        return array[0];
    }
    const count = array.reduce((previous, current) => current[index] === '1' ? previous + 1 : previous, 0)
    if (count >= array.length / 2) {
        return oxygenFilter(index + 1, array.filter(it => it[index] === '1'));
    } else {
        return oxygenFilter(index + 1, array.filter(it => it[index] === '0'));
    }
}

function co2Filter(index, array) {
    if (array.length === 1) {
        return array[0];
    }
    const count = array.reduce((previous, current) => current[index] === '1' ? previous + 1 : previous, 0)
    if (count < array.length / 2) {
        return co2Filter(index + 1, array.filter(it => it[index] === '1'));
    } else {
        return co2Filter(index + 1, array.filter(it => it[index] === '0'));
    }
}