// welcome message?

// -- main game
document.addEventListener("DOMContentLoaded", function () {  
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            let weapon = this.getAttribute("weapon-type");
            battle(weapon);
        });
    }
});

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
    let scoreBar = document.getElementById('score-bar').offsetWidth;
    let progress = scoreBar / 3;
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


// incrememnt score-bar
function incrementScoreBar(points) {
    let scoreBar = document.getElementById('score-bar').offsetWidth;
    let progress = scoreBar / 3;

    let progressBar = document.getElementById('progress-bar');
    let calculatedWidth = Number(progress) * Number(points);
    progressBar.style.width = `${calculatedWidth}px`;

    
}

// calculate level

// if (progressBar.offsetWidth === scoreBar) {
//     alert("congratulations! you've made it to level 2!");
//     progressBar.style.width = 0;
// }

// display image when hovering over button

// unlock new upgrade at next level?

// theme selector?