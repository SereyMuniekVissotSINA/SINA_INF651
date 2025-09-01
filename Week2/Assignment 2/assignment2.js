// Variables and Data Types
let personName = "Vissot";
let personAge = 22;
let personIsStudent = true;

console.log(typeof personName);
console.log(typeof personAge);
console.log(typeof personIsStudent);

// Basic Arithmetic Operations
let num1 = 10;
let num2 = 5;

let sum = num1 + num2;
let difference = num1 - num2;
let product = num1 * num2;
let quotient = num1 / num2;

console.log("Sum:", sum);
console.log("Difference:", difference);
console.log("Product:", product);
console.log("Quotient:", quotient);

// Working with Strings
let greeting = "This is my first JavaScript assignment!";
console.log(greeting.length);
console.log("First Character is:", greeting.charAt(0), ",and last character is:", greeting.charAt(greeting.length - 1));

// Math Object
let negativeNumber = -15.7;
let sqrtNumber = Math.sqrt(negativeNumber);
let squaredNumber = Math.pow(negativeNumber, 2);
let absNumber = Math.abs(negativeNumber);

console.log("Square Root:", sqrtNumber);
console.log("Squared:", squaredNumber);
console.log("Absolute Value:", absNumber);

// Boolean Logic and Comparisons Operators
let a = 10;
let b = 20;

console.log("a > b:", a > b);
console.log("a < b:", a < b);
console.log("a == b:", a == b);

// Logical Operators

let isAdult = true;
let hasID = false;

console.log("isAdult AND hasID:", isAdult && hasID);
console.log("isAdult OR hasID:", isAdult || hasID);
console.log("NOT isAdult:", !isAdult);

// Using Template Literals
let firstName = "Jonh ";
let lastName = "Doe";

console.log(`Hello Mr.${firstName}${lastName}, Welcome to foundation of Javascript.`);