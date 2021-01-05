const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log('Number:', randomNum);

window.SpeachRecognition = 
window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeachRecognition();

// start recognition and game
recognition.start();

// Capture user speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>You Said: </div>
    <span class="box">${msg}</span>
    `
}

// Check MSG against number
function checkNumber(msg) {
    const num = +msg;

    //Is valid number
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div>That is not a valid number</div>'
        return
    }

    // Check in range
    if(num > 100 || num < 1) {
        msgEl.innerHTML = `<div>Number Must Be Between 1 - 100`
        return;
    }

    // checkNumber
    if(num === randomNum) {
        document.body.innerHTML = `
        <h2>Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `
    } else if(num > randomNum) {
        msgEl.innerHTML += `<div>Go Lower</div>`
    } else {
        msgEl.innerHTML += `<div>Go Higher</div>`
    }
}

// Gen Rand number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Speak Result 
recognition.addEventListener('result', onSpeak);

//End SR service
recognition.addEventListener('end', ()=> recognition.start())

document.body.addEventListener('click', (e) => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
})