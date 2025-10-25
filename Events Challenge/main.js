// When the "Submit" button is clicked, display a welcome message inside outputDiv that says "Welcome, 
// [name]!" (where [name] is the user's input). 

const nameInput = document.getElementById("nameInput");
const outputDiv = document.getElementById("outputDiv");
const submitButton = document.getElementById("submitButton");

function Submit() {
    const name = nameInput.value;
    if (name != "") {
        outputDiv.innerHTML = `Welcome, ${name}!`;
        //Change the background color of outputDiv to green when the button is clicked. 
        outputDiv.style.backgroundColor = "green";
    } 
    //If no name is entered, show an error message in red saying "Error: Please enter a name."
    else {
        outputDiv.innerHTML = "Error: Please enter your name.";
        outputDiv.style.backgroundColor = "red";
    }
}

//Track the mouse movements inside the mouse tracker area. 
const mouseTracker = document.getElementById("mouseTracker");
const mousePosition = document.getElementById("mousePosition");

// Display the mouse's X and Y coordinates in real-time inside the coordinates div.
const coordinatesDiv = document.getElementById("coordinates");
mouseTracker.addEventListener("mousemove", function(event) {
    const x = event.clientX - mouseTracker.getBoundingClientRect().left;
    const y = event.clientY - mouseTracker.getBoundingClientRect().top;
    coordinatesDiv.innerHTML = `X: ${x}, Y: ${y}`;
});

// When the user types into the input field and presses the "Enter" key, the submit button is triggered automatically without needing to be clicked. 
nameInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        Submit();
    } else {
        return;
    }
});
