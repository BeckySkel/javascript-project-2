// -- main game
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            let weapon = this.getAttribute("weapon-type");
            battle(weapon);
        });
    }

    setTimeout(displayMessage('welcome'), 1000);
});

// welcome message with instructions and game settings?
function displayMessage(messageType) {
    // -- disable buttons
    let weapons = document.getElementById("weapon-select");

    for (let i = 0; i < weapons.children.length; i++) {
        weapons.children[i].disabled = true;
    }

    //  -- create and display message container
    let messageContainer = document.createElement('div');
    messageContainer.id = 'message-container';
    messageContainer.style.top = '35%';
    messageContainer.style.animation = 'slide-in 1s ease-out';

    let body = document.getElementsByTagName('body')[0];
    body.appendChild(messageContainer);

    // -- display message (welcome or level up)
    if (messageType === 'welcome') {
        messageContainer.innerHTML = `
        <h2>Welcome!</h2>
        <p>Ultimate RPS is a game of Rock, Paper, Scissors.. with a twist!
        Level up as you battle the computer and win fun upgrades along your way to victory!
        </p>
        <div id="message-buttons">
        <button id="settings">Settings</button>
        <button>Begin!</button>
        </div>
        `;
    } else if (messageType === 'winner') {
        messageContainer.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You've reached level 5 and completed the game! Click below if you'd like to restart:</p>
        <button></button>
        `;
    } else {
        messageContainer.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You've reached level ${messageType}. Choose an upgrade to continue:</p>
        <button></button>
        <button></button>
        <button></button>
        `;
    }

    let settings = document.getElementById('settings');
    settings.addEventListener("click", function() {
        messageContainer.style.top = '100%';
        messageContainer.style.animation = 'slide-out 1s linear';
        for (let i = 0; i < weapons.children.length; i++) {
            weapons.children[i].disabled = false;
        }
    });
}

// -- main game
function battle(weapon) {
    let weapons = [{
            value: 'rock',
            wins: ['scissors', 'lizard'],
            loses: ['paper', 'spock'],
            icon: `<i class="fa-solid fa-hand-back-fist"></i>`
        },
        {
            value: 'paper',
            wins: ['spock', 'rock'],
            loses: ['scissors', 'lizard'],
            icon: `<i class="fa-solid fa-hand"></i>`
        },
        {
            value: 'scissors',
            wins: ['paper', 'lizard'],
            loses: ['rock', 'spock'],
            icon: `<i class="fa-solid fa-hand-scissors"></i>`
        }
        // lizard loses rock and scissors, beats paper and spock
        // spock loses to lizard and paper, beats rock and scissors
    ]

    // -- display computer's choice
    let compResponse = weapons[Math.floor(Math.random() * weapons.length)];
    let compDisplay = document.getElementById('comp-display');
    compDisplay.innerHTML = compResponse.icon;

    // -- display user's choice
    let userDisplay = document.getElementById('user-display');
    // solution to display user selection found at https://bobbyhadz.com/blog/javascript-array-find-index-of-object-by-property
    let weaponIndex = weapons.findIndex(object => {
        return object.value === weapon;
    });
    userDisplay.innerHTML = weapons[weaponIndex].icon;

    // -- display outcome 
    let outcomeText = document.getElementById('outcome');
    let outcome;
    if (weapon === compResponse.loses[0] || weapon === compResponse.loses[1]) {
        outcome = 'win';
        outcomeText.innerHTML = `You ${outcome}!`;
    } else if (weapon === compResponse.wins[0] || weapon === compResponse.wins[1]) {
        outcome = 'lose'
        outcomeText.innerHTML = `You ${outcome}!`;
    } else {
        outcome = 'Draw'
        outcomeText.innerHTML = `${outcome}!`;
    }

    // -- calculate and display scores
    displayScores(outcome);
}


// record & display score
function displayScores(outcome) {
    let wins = Number(document.getElementById('wins').innerHTML);
    let loses = Number(document.getElementById('loses').innerHTML);
    let draws = Number(document.getElementById('draws').innerHTML);

    let level = Number(document.getElementById('level').innerHTML);
    let requiredWins = Number(level) + 2;
    let scoreBarWidth = document.getElementById('score-bar').offsetWidth;
    let progress = scoreBarWidth / requiredWins;
    let points = document.getElementById('progress-bar').offsetWidth / Number(progress);

    if (outcome === 'win') {
        ++wins;
        ++points;
    } else if (outcome === 'lose') {
        ++loses;
        --points;
    } else {
        ++draws
    }

    document.getElementById('wins').innerHTML = wins;
    document.getElementById('loses').innerHTML = loses;
    document.getElementById('draws').innerHTML = draws;

    if (points <= 0) {
        incrementScoreBar(0);
    } else {
        incrementScoreBar(points);
    }
}


// incrememnt score-bar & next level
function incrementScoreBar(points) {
    let level = Number(document.getElementById('level').innerHTML);
    let requiredWins = Number(level) + 2;
    let scoreBarWidth = document.getElementById('score-bar').offsetWidth;
    let progress = scoreBarWidth / requiredWins;

    let progressBar = document.getElementById('progress-bar');
    let calculatedWidth = Number(progress) * Number(points);
    progressBar.style.width = `${calculatedWidth}px`;

    if (progressBar.offsetWidth === scoreBarWidth) {
        setTimeout(function () {
            ++level;
            level === 5 ? displayMessage('winner') : displayMessage(level);
            document.getElementById('level').innerHTML = level;
            progressBar.style.width = 0;
        }, 500);

    }
}

// display image when hovering over button





// warning on leaving that progress will be lost

// unlock new upgrade at next level?

// theme/upgrade selector?