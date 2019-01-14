const fs = require("fs");
const readline = require('readline');

const data = fs.readFileSync("./data.txt", {
    encoding: "utf8"
});

const lines = data.split("\n");

const filtered = lines.filter(line => line.match("MusicalArtist")).filter(line => line.match("select"));

const result = []

// var cl = readline.createInterface(process.stdin, process.stdout);

// var question = function (q) {
//     return new Promise((res, rej) => {
//         cl.question(q, answer => {
//             res(answer);
//         })
//     });
// };

async function main() {
    for (let lineNum in filtered) {
        let line = filtered[lineNum];

        let parts = line.split(";")

        let q = parts[3];

        if (parts[0] != "" || parts[1] != "" || parts[2] != "") {
            result.push(line);
        }

        // let choice = await question(q);

        // if (!choice) {
        //     console.log("Adding line\n");
        // }
    }

    // cl.close();
    const resultData = result.join("\n");
    fs.writeFileSync("./filteredSelect.csv", resultData);
};

main();

// filtered.forEach(async (line, i) => {
//     // ontology; ontology; ontology; question; sparqlQuery; generatorQuery
//     let parts = line.split(";")
//     // result.push(parts.join(";"));
//     console.log(`${i}: ${parts[3]}`)
// });