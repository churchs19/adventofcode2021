import { readFile } from "fs/promises";
import { stringify } from "querystring";
import { isNull } from "util";

try {
  const data = await readFile("./input.txt", "UTF-8");

  const lines = data.split(/\r?\n/).filter(it => !isNullOrWhitespace(it)).map(line => {
    const lineData = line.split(" ");
    return {
      direction: lineData[0].trim(),
      distance: parseInt(lineData[1].trim(), 10)
    };
  });

  console.log(`# lines: ${lines.length}`);

  const part1Position = lines.reduce((previous, current) => {
    if (current.direction === "forward") {
      return { horizontal: previous.horizontal + current.distance, depth: previous.depth };
    } else if (current.direction === "up") {
      return { horizontal: previous.horizontal, depth: previous.depth - current.distance };
    } else {
      return { horizontal: previous.horizontal, depth: previous.depth + current.distance };
    }
  }, { horizontal: 0, depth: 0 });

  console.log(`Part 1 Position: ${part1Position.horizontal} ${part1Position.depth}`);
  const part1Answer = part1Position.horizontal * part1Position.depth;
  console.log(`Part 1: ${part1Answer}`);

  const part2Position = lines.reduce((previous, current) => {
    if (current.direction === "forward") {
      return { horizontal: previous.horizontal + current.distance, depth: previous.depth + (previous.aim * current.distance), aim: previous.aim };
    } else if (current.direction === "up") {
      return { horizontal: previous.horizontal, depth: previous.depth, aim: previous.aim - current.distance };
    } else {
      return { horizontal: previous.horizontal, depth: previous.depth, aim: previous.aim + current.distance };
    }
  }, { horizontal: 0, depth: 0, aim: 0 });
  console.log(`Part 2 Position: ${part2Position.horizontal} ${part2Position.depth} ${part2Position.aim}`);
  const part2Answer = part2Position.horizontal * part2Position.depth;
  console.log(`Part 2: ${part2Answer}`);

} catch (error) {
  console.error(error);
}

function isNullOrWhitespace(input) {
  return !input || !input.trim();
}