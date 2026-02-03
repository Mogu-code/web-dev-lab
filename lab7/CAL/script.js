let display = document.getElementById("display");
let clickSound = document.getElementById("clickSound");

function playSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function pressButton(value) {
    playSound();
    display.value += value;
}

function clearDisplay() {
    playSound();
    display.value = "";
}

function calculateResult() {
    playSound();
    try {
        let result = eval(display.value);

        if (result === Infinity) {
            display.value = "Error";
        } else {
            display.value = result;
        }
    } catch {
        display.value = "Invalid";
    }
}
