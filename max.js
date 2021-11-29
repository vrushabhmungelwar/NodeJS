console.log("max!!!!");
console.log(process.argv);


const [, , nums] = process.argv;
console.log("Input string: ",nums);

const arr = JSON.parse(nums);
console.log("converted to array: ",arr);
console.log("Max number is : ",Math.max(...arr));