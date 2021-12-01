import { readFile } from "fs/promises";
import { start } from "repl";

try {
  const data = await readFile("./input.txt", "UTF-8");

  const lines = data.split(/\r?\n/).map(line => parseInt(line)).filter(it => !isNaN(it));

  console.log(`# lines: ${lines.length}`);

  const part1Answer = countIncreasing(lines);
  console.log(`Part 1:${part1Answer}`);

  const part2Lines = lines
    .map((it, index, arr) => windowSum(arr, index, 3))
    .filter(it => !isNaN(it));
  const part2Answer = countIncreasing(part2Lines);

  console.log(`Part 2:${part2Answer}`);
} catch (error) {
  console.error(error);
}

function windowSum(arr, startIndex, windowSize) {
  let sum = 0;
  for (let i = startIndex; i < startIndex + windowSize; i++) {
    sum += arr[i];
  }
  return sum;
}

function countIncreasing(arr) {
  return arr.reduce((previous, current, index) => {
    if (index === 0) {
      return 0;
    } else {
      if (current > arr[index - 1])
        return previous + 1;
      else
        return previous;
    }
  }, 0);
}