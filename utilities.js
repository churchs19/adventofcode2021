import { readFile } from "fs/promises";

const isNullOrWhitespace = function (input) {
    return !input || !input.trim();
}

const readFileLines = async function (filePath) {
    const data = await readFile(filePath, "UTF-8");

    const lines = data.split(/\r?\n/)
        .map(line => line.trim());

    console.log(`# lines read: ${lines.length}`);

    return lines;
}

export {
    isNullOrWhitespace,
    readFileLines
};