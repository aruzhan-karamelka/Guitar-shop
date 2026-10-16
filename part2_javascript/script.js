const fullName = "Malika Bektassova";
let age = 18;
const isStudent = true;
let favouriteColor = "black";
console.log(fullName, typeof fullName);
console.log(age, typeof age);
console.log(isStudent, typeof isStudent);
console.log(favouriteColor, typeof favouriteColor);
age = 19
console.log("New age:", age);

const userName = prompt("What is your name?");
alert("Hello, " + userName + "!");
console.log("My name is " + userName + ", group MT-2502.");

const a = Number(prompt("First number:"));
const b = Number(prompt("Second number:"));
console.log("Sum:", a + b);
console.log("Difference:", a - b);
console.log("Product:", a * b);
console.log("Quotient:", a / b);
console.log("Remainder:", a % b);

const myName = "Malika Bektassova";
console.log(myName.length);
console.log(myName.toUpperCase());
console.log(myName.toLowerCase());
console.log(myName.slice(0, 3));
console.log("Dream&Strings " + "is a great guitar shop.");


let counter = 10;
console.log(counter);
counter++;
console.log(counter);
counter += 5;
console.log(counter);
counter -= 3;
console.log(counter);
counter *= 2;
console.log(counter);
counter /= 4;
console.log(counter);

function dogToHuman(dogAge){
    const humanAge = (dogAge - 2) * 4 + 21;
    console.log("Dog age " + dogAge + " to human age " + humanAge);
}
dogToHuman(2);
dogToHuman(5);

function greetUser(name){
    console.log("Hello, " + name + "!");
}
function calculateSum(x, y){
    return x + y;
}
function calculateRectangleArea(w, h){
    return w * h;
}
greetUser("Malika");
greetUser("Aruzhan");
console.log(calculateSum(3, 4));
console.log(calculateSum(10, 20));
console.log(calculateRectangleArea(5, 3));
console.log(calculateRectangleArea(8, 2));