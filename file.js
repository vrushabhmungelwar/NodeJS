const { constants } = require("buffer");
const fs = require("fs");

fs.readFile("./welcome.txt", "utf-8", (err, data) => {
  console.log(data);
});

const quote = "hi";
const niceQuote = "\nvrushabh";

// fs.appendFile("./awesome.txt", niceQuote, (err) => {
//   console.log("completed writing!!!");
// });

// fs.writeFile("./awesome.txt", quote, (err) => {
//   console.log("completed writing!!!");
// });


// fs.writeFileSync("./awesome.txt", quote, (err) => {
//   console.log("completed writing!!!");
// });

fs.unlink("./awesome.txt", (err) => {
  console.log("Deleted successfully!");
});

// const quote2 = "hello";

// function createQuotes(noOfFiles, quote2) {
//   for (let i = 1; i <= noOfFiles; i++) {
//     fs.writeFile(`./backup/text-${i}.txt`, quote2, (err) => {
//       console.log("completed writing!!!", i);
//     });
//   }
// }
// const [, , noOfFiles] = process.argv;
// createQuotes(noOfFiles, quote2);

fs.readdir("./backup", (err, files) => {
  if (err) {
    console.log(err);
  }
  console.log(files);
});
