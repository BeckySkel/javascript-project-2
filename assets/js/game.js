/**
 * The main game function, called when the player selects a weapon
 * creates a random answer for the computer and battles it against the player's choice
 */
 function battle(weapon) {
    // -- retrieve weapons from objects array
    let weapons = weaponChoices();

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
    userDisplay.style.color = '#3c3c3c';

    // -- compare responses and display outcome
    let outcomeText = document.getElementById('outcome');
    let outcome;
    if (weapon === compResponse.loses[0] || weapon === compResponse.loses[1]) {
        outcome = 'win';
        outcomeText.innerHTML = `You ${outcome}!`;
    } else if (weapon === compResponse.wins[0] || weapon === compResponse.wins[1]) {
        outcome = 'lose';
        outcomeText.innerHTML = `You ${outcome}!`;
    } else {
        outcome = 'Draw';
        outcomeText.innerHTML = `${outcome}!`;
    }

    displayScores(outcome);
}


/**
 * Creates and stores an array of objects to be used as weapons in the game functions
 * returns the full array
 */
function weaponChoices() {
    // -- initialise core weapons in objects array
    let coreWeapons = [{
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
    ];

    // -- initialise additional weapons in objects array
    let additionalWeapons = [{
            value: 'lizard',
            wins: ['paper', 'spock'],
            loses: ['scissors', 'rock'],
            icon: `<i class="fa-solid fa-hand-lizard"></i>`
        },
        {
            value: 'spock',
            wins: ['scissors', 'rock'],
            loses: ['paper', 'lizard'],
            icon: `<i class="fa-solid fa-hand-spock"></i>`
        }
    ];

    let weapons;

    // -- if all buttons present, combine weapon arrays
    let allWeaponsUnlocked = document.getElementById('weapon-select').children.length;
    if (Number(allWeaponsUnlocked) === 5) {
        weapons = [].concat(coreWeapons, additionalWeapons);
    } else {
        weapons = coreWeapons;
    }

    return weapons;
}


/**
 * Displays a faded preview of the weapon choice when user hovers over the asscociated button
 */
function preview(weapon) {
    let weapons = weaponChoices();

    let userDisplay = document.getElementById('user-display');
    userDisplay.style.color = '#d3d3d3';
    let weaponIndex = weapons.findIndex(object => {
        return object.value === weapon;
    });
    userDisplay.innerHTML = `<span id="preview">${weapons[weaponIndex].icon}</span>`;
}


/**
 * Stops preview of weapon choice and clears display area
 */
function stopPreview() {
    let previewDisplay = document.getElementById('preview');
    if (previewDisplay !== null) {
        previewDisplay.remove();
    }
}


/**
 * Increments progress bar to indicate progress towards next level
 * increases with wins, decreases with losses, remains the same with draws 
 */
function incrementScoreBar(points) {
    // -- read current level and width of score-bar from DOM
    let level = Number(document.getElementById('level').innerHTML);
    // let requiredWins = Number(level) + 2;
    let requiredWins = Number(level);
    let scoreBarWidth = document.getElementById('score-bar').offsetWidth;
    let progress = scoreBarWidth / requiredWins;

    let progressBar = document.getElementById('progress-bar');
    let calculatedWidth = Number(progress) * Number(points);
    progressBar.style.width = `${calculatedWidth}px`;

    // -- level up once progress bar is full
    // -- slight allowance for rounded numbers within progress calculation
    if (progressBar.offsetWidth >= scoreBarWidth - 2) {
        disableBackground();
        setTimeout(function () {
            ++level;
          if (level === 6) {
            displayMessage('winner');
            disableBackground();
            level = '';
          } else {
            displayMessage(level);}
            document.getElementById('level').innerHTML = level;
            progressBar.style.width = 0;
        }, 500);

    }
}


/**
 * Runs after player selects a weapon and the outcome is decided
 * calculates and displays scores based on outcome
 */
function displayScores(outcome) {
    // -- retrieve current scores
    let wins = Number(document.getElementById('wins').innerHTML);
    let loses = Number(document.getElementById('loses').innerHTML);
    let draws = Number(document.getElementById('draws').innerHTML);

    // -- calculate points needed to progress to next level
    let level = Number(document.getElementById('level').innerHTML);
    // let requiredWins = Number(level) + 2;
    let requiredWins = Number(level);
    let scoreBarWidth = document.getElementById('score-bar').offsetWidth;
    let progress = scoreBarWidth / requiredWins;
    let points = document.getElementById('progress-bar').offsetWidth / Number(progress);

    // -- increment scores
    if (outcome === 'win') {
        ++wins;
        ++points;
    } else if (outcome === 'lose') {
        ++loses;
        --points;
    } else {
        ++draws;
    }

    // -- display scores
    document.getElementById('wins').innerHTML = wins;
    document.getElementById('loses').innerHTML = loses;
    document.getElementById('draws').innerHTML = draws;

    if (points <= 0) {
        incrementScoreBar(0);
    } else {
        incrementScoreBar(points);
    }
}