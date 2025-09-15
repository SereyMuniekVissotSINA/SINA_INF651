// Challenge 1: Even Number Finder

let number = 1;
while (number <= 50){
    if (number % 2 === 0){
        console.log(number);
    }
    number++;
}

// Challenge 2: Pin Validator 
let pin = "1234";
let askUser;
do{
     askUser = prompt("Enter your pin: ");
    if (askUser === pin){
        console.log("Correct Pin");
        break;
    }
    else{
        console.log("Incorrect Pin, try again");
    }
} while (true);

// Challenge 3: Multiplication Table with skips

let askNumber = prompt("Enter a number to see its multiplication table: "); 

for (let i = 1; i <= 10; i++){
    let produck = i * 2;
    if (produck % 5 === 0){
        continue;
    }
    console.log(`${askNumber} x ${i} = ${produck}`);    
}

// Challenge 4: Positive/ Negatice Number Checker (If-Else)

let question = prompt("Enter a number: ");
if (question > 0){
    console.log("The number is positive");
} else if (question == 0){
    console.log("The number is zero");
}
else{
    console.log("The number is negative");
}

// Challenge 5: Month Finder (Switch Case)

let askMonth = prompt("Enter a number between 1 and 12: ");
switch (askMonth) {
    case '1':
        console.log("January");
        break;
    case '2':
        console.log("February");
        break;
    case '3':
        console.log("March");
        break;
    case '4':
        console.log("April");
        break;
    case '5':
        console.log("May");
        break;
    case '6':
        console.log("June");
        break;
    case '7':
        console.log("July");
        break;
    case '8':
        console.log("August");
        break;
    case '9':
        console.log("September");
        break;
    case '10':
        console.log("October");
        break;
    case '11':
        console.log("November");
        break;
    case '12':
        console.log("December");
        break;
    default:
        console.log("Invalid Input");
        break;
}