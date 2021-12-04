import * as utilities from "../utilities.js";

try {
    const lines = await utilities.readFileLines('./known.txt');

    console.log(`# lines: ${lines.length}`);

    // const part1Answer = parseInt(gamma, 2) * parseInt(epsilon, 2);
    // console.log(`Part 1:${part1Answer}`);

    // const part2Answer = parseInt(oxygenFilterValue, 2) * parseInt(co2FilterValue, 2);
    // console.log(`Part 2:${part2Answer}`);
} catch (error) {
    console.error(error);
}
