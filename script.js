// Function to wait for DOM to load then get button elements and add event listeners inspired by the CI Love Maths Walkthrough Project
document.addEventListener('DOMContentLoaded', function () {
    // -- add event listeners to game buttons to preview selection and begin game
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener('mouseenter', function () {
            let weapon = this.getAttribute("data-type");
          	preview(weapon);
        });
        button.addEventListener('mouseleave', function () {
            stopPreview();
        });
        button.addEventListener('click', function () {
            let weapon = this.getAttribute("data-type");
            battle(weapon);
        });
    }

    // -- add event listeners to navigation icons (settings & game rules)
    let navIcons = document.getElementById('navigation').children;

    for (let navIcon of navIcons) {
        let messageContent = navIcon.children[0].getAttribute('data-destination');
        navIcon.addEventListener('click', function () {
            displayMessage(messageContent);
        });
    }

    // -- lock upgrades in settings menu
    let lockedUpgrades = document.getElementsByClassName('locked');
    for (let upgrade of lockedUpgrades) {
        upgrade.disabled = true;
    }

    // -- display welcome message
    displayMessage('welcome');

    // -- warn user that all progress will be lost on reload/exit
    window.onbeforeunload = function () {
        return "Are you sure you want to leave? All progress will be lost!";
    };
});


/**
 * Disables the game and background elements while a message is displayed
 */
function disableBackground() {
    // -- disable game buttons
    let weapons = document.getElementById("weapon-select").children;

    for (let i = 0; i < weapons.length; i++) {
        weapons[i].disabled = true;
    }

    // -- hide navigation icons (settings & game rules)
    document.getElementById('navigation').style.display = 'none';
}


/**
 * A pop-up to display a welcome message, level-up messages and rewards select, settings, game rules or a message of praise for completing the game
 * temporarily disables game buttons when displayed, message disappears when any button clicked
 * takes messageType to compose message to display
 */
function displayMessage(messageType) {
    disableBackground();

    //  -- create and display message container
    let messageContainer = document.createElement('div');
    messageContainer.id = 'message-container';
    messageContainer.style.top = '30%';
    messageContainer.style.animation = 'slide-in 1s ease-out';
    document.body.appendChild(messageContainer);

    // -- add message inner HTML (welcome, winner, settings, rules or level up)
    if (messageType === 'welcome') {
        messageContainer.innerHTML = `
        <h2>Hi There!</h2>
        <p>Welcome to Ultimate RPS; an exciting game of Rock, Paper, Scissors... with a twist!</p>
        <p>Battle it out against the computer and level-up to win fun new themes and game upgrades. Unlock them all to win the game and become the Ultimate RPS champion!</p>
        <div id="message-buttons">
        <button id="rules">Rules</button>
        <button class="open-settings">Settings</button>
        <button>Begin!</button>
        </div>
        `;
    } else if (messageType === 'winner') {
        messageContainer.innerHTML = `
        <h2>You Won!</h2>
        <p>Congratulations! You've beaten all levels and completed the game.</p>
        <p>Why not restart and try to win in fewer turns?</p>
        <div id="message-buttons">
        <button id="restart">Restart!</button>
        </div>
        <p>The game will be reset and all progress will be lost</p>
        `;
    } else if (messageType === 'settings') {
        let settings = document.getElementById('settings').innerHTML;
        messageContainer.innerHTML = settings;
    } else if (messageType === 'rules') {
        messageContainer.innerHTML = `
        <a class="icons close-window"><i class="fa-solid fa-xmark"></i></a>
        <h2>How to Play</h2>
        <p>Use the game buttons to select your weapon.
        Face-off against the computer complete the progress bar to unlock new upgrades at each level.
        Upgrades can be equipped in the settings menu.</p>
        <ul id="how-to-play">
        <li>Rock<i class="fa-solid fa-hand-back-fist"></i> smashes Scissors<i class="fa-solid fa-hand-scissors"></i> and crushes Lizard<i class="fa-solid fa-hand-lizard"></i></li>
        <li>Paper<i class="fa-solid fa-hand"></i> covers Rock<i class="fa-solid fa-hand-back-fist"></i> and disproves Spock<i class="fa-solid fa-hand-spock"></i></li>
        <li>Scissors<i class="fa-solid fa-hand-scissors"></i> cut Paper<i class="fa-solid fa-hand"></i> and decapitates Lizard<i class="fa-solid fa-hand-lizard"></i></li>
        <li>Lizard<i class="fa-solid fa-hand-lizard"></i> eats Paper<i class="fa-solid fa-hand"></i> and bites Spock<i class="fa-solid fa-hand-spock"></i></li>
        <li>Spock<i class="fa-solid fa-hand-spock"></i> vaporizes Rock<i class="fa-solid fa-hand-back-fist"></i> and breaks Scissors<i class="fa-solid fa-hand-scissors"></i></li>
        </ul>
        `;
    } else {
        messageContainer.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You've reached level ${messageType}. Choose an upgrade to continue:</p>
        <div id="message-buttons">
        <button class="upgrade-option" disabled="true">No more upgrades!</button>
        <button class="upgrade-option" disabled="true">No more upgrades!</button>
        <button class="upgrade-option" disabled="true">No more upgrades!</button>
        </div>
        `;
        chooseUpgrade();
    }

    // -- add button to close message window
    let closeWindow = document.getElementsByClassName('close-window');
    for (let i = 0; i < closeWindow.length; i++) {
        closeWindow[i].addEventListener('click', function () {
            closeMessage();
        });
    }

    populateButtons(messageType);
}


/**
 * Adds event listeners to close current message window and either select a new upgrade or display new message
 */
function populateButtons(messageType) {
    // -- add event listeners to toggle upgrades from settings menu
    if (messageType === 'settings') {
        let messageButtons = document.getElementsByClassName('settings-buttons')[1].children;
        for (let i = 0; i < messageButtons.length; i++) {
            messageButtons[i].addEventListener('click', function () {
                let upgradeType = messageButtons[i].classList[1];
                let upgradeIdentifier = messageButtons[i].children[1].classList[1];
                activateUpgrade(upgradeType, upgradeIdentifier);
            });
        }
    } else if (messageType !== 'rules') {
        // -- no buttons present in rules message
        // -- all other buttons close the current message
        let messageButtons = document.getElementById("message-buttons").children;
        for (let i = 0; i < messageButtons.length; i++) {
            messageButtons[i].addEventListener('click', function () {
                closeMessage();

                // -- activate chosen upgrade from level-up
                if (messageButtons[i].classList[0] === 'upgrade-option') {
                    let upgradeType = messageButtons[i].classList[1];
                    let upgradeIdentifier = messageButtons[i].children[1].classList[1];
                    activateUpgrade(upgradeType, upgradeIdentifier);
                }
            });

            if (messageButtons[i].id === 'restart') {
                // -- add event listener to restart game
                messageButtons[i].addEventListener("click", function () {
                    document.location.reload(true);
                });
            } else if (messageButtons[i].classList[0] === 'open-settings') {
                // -- add event listener to open settings
                messageButtons[i].addEventListener('click', function () {
                    setTimeout(function () {
                        displayMessage('settings');
                    }, 500);
                });
            } else if (messageButtons[i].id === 'rules') {
                // -- add event listener to open game rules
                messageButtons[i].addEventListener('click', function () {
                    setTimeout(function () {
                        displayMessage('rules');
                    }, 500);
                });
            }
        }
    }
}


/**
 * Randomly selects locked upgrades from the settings menu in the DOM to offer to player
 * retrieved when player levels-up
 */
function chooseUpgrade() {
    let lockedUpgrades = document.getElementsByClassName('locked'); // locked upgrade buttons
    let upgradeOptions = document.getElementsByClassName('upgrade-option'); // 3 empty upgade-selection buttons
    let upgradeArray = [];

    // -- check if enough locked upgrades remain to fill all option buttons
    // -- if not, only fill as many as required and leave rest blank and remain disabled
    let upgradeAmount = lockedUpgrades.length > upgradeOptions.length ? upgradeOptions.length : lockedUpgrades.length;

    // -- populate an array of all currently locked upgrades
    for (let i = 0; i < lockedUpgrades.length; i++) {
        let upgradeName = lockedUpgrades[i].children[1].classList[1];
        upgradeArray.push(upgradeName);
    }

    // -- randomly choose as many upgrades as needed from the array (3 or less)
    for (let i = 0; i < upgradeAmount; i++) {
        let upgrade = upgradeArray[Math.floor(Math.random() * upgradeArray.length)];

        //  -- remove selected upgrades from list to avoid repeats
        for (let i = 0; i < upgradeArray.length; i++) {
            if (upgrade === upgradeArray[i]) {
                upgradeArray.splice(i, 1);
            }
        }

        // -- update empty upgrades options with randomly-chosen upgrades
        let upgradeOuter = upgradeOptions[i];
        let upgradeInner = document.getElementsByClassName(upgrade)[0].parentElement;
        upgradeOuter.innerHTML = upgradeInner.innerHTML;
        upgradeOuter.disabled = false;
        upgradeOuter.classList.add(upgradeInner.classList[2]);
    }
}


/**
 * Activates the player-selected upgrade from the level-up message
 * upgradeType is the class of the upgrade e.g. theme-upgrade or game-upgrade
 * upgradeIdentifier is the class of the display-upgrade div within the button e.g. dark-theme, pink-theme, etc.
 */
function activateUpgrade(upgradeType, upgradeIdentifier) {
    if (upgradeType === 'theme-upgrade') {
        // -- identify current theme and prevent it being applied again
        let currentTheme = document.body.classList[0];
        if (currentTheme !== upgradeIdentifier) {
            // -- apply selected theme
            document.body.classList.add(upgradeIdentifier);
            let removeClass = document.body.classList[0];
            document.body.classList.remove(removeClass);
            if (upgradeIdentifier === 'dark-theme') {
                document.body.style.color = '#fff';
            } else {
                document.body.style.color = '#3c3c3c';
            }
        }
    } else if (upgradeType === 'game-upgrade') {
        // -- add extra weapon buttons
        let weaponSelect = document.getElementById('weapon-select');
        if (weaponSelect.children.length === 3) {
            addNewWeapon('Lizard');
            addNewWeapon('Spock');
        } else {
            // -- remove buttons if upgrade already applied
            weaponSelect.removeChild(weaponSelect.children[4]);
            weaponSelect.removeChild(weaponSelect.children[3]);
        }
    }

    // -- unlock upgrade in settings menu
    let unlockUpgrade = upgradeType === 'theme-upgrade' ? document.getElementsByClassName(upgradeIdentifier)[1].parentElement : document.getElementsByClassName(upgradeIdentifier)[0].parentElement;
    unlockUpgrade.classList.remove('locked');
    unlockUpgrade.disabled = false;

}


/**
 * Builds and adds extra buttons to weapon select
 * weaponType takes Lizard and Spock 
 */
function addNewWeapon(weaponType) {
    let newButton = document.createElement('button');
    newButton.setAttribute('data-type', weaponType.toLowerCase());
    newButton.innerHTML = weaponType;
    newButton.addEventListener('click', function () {
        let weapon = this.getAttribute("data-type");
        battle(weapon);
    });
    newButton.addEventListener('mouseenter', function () {
        let weapon = this.getAttribute("data-type");
        preview(weapon);
    });
    newButton.addEventListener('mouseleave', function () {
        stopPreview();
    });

    let weaponSelect = document.getElementById('weapon-select');
    weaponSelect.appendChild(newButton);
}


/**
 * Closes the message display and enables buttons and links to continue game
 */
function closeMessage() {
    // -- hide and remove message window
    let messageContainer = document.getElementById('message-container');
    messageContainer.style.top = '100%';
    messageContainer.style.animation = 'slide-out 0.8s linear';
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
        messageContainer.remove();
    }, 750);
    setTimeout(function () {
        document.body.style.overflow = 'visible';
    }, 750);

    // -- show navigation icons after slight delay
    setTimeout(function () {
        document.getElementById('navigation').style.display = 'flex';
    }, 500);

    // -- reinstate game buttons
    let weapons = document.getElementById("weapon-select").children;

    for (let i = 0; i < weapons.length; i++) {
        weapons[i].disabled = false;
    }
}

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
    let requiredWins = Number(level) + 2;
    let scoreBarWidth = document.getElementById('score-bar').offsetWidth;
    let progress = scoreBarWidth / requiredWins;

    let progressBar = document.getElementById('progress-bar');
    let calculatedWidth = Number(progress) * Number(points);
    progressBar.style.width = `${calculatedWidth}px`;

    // -- level up once progress bar is full
    // -- slight allowance for rounded numbers within progress calculation
    if (progressBar.offsetWidth >= scoreBarWidth - 2) {
        setTimeout(function () {
            ++level;
          if (level === 6) {
            displayMessage('winner');
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
    let requiredWins = Number(level) + 2;
    // let requiredWins = Number(level);
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