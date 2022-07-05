// Function to wait for DOM to load then get button elements and add event listeners taken from the CI Love Maths Essentials Project
document.addEventListener('DOMContentLoaded', function () {
    // -- add event listeners to buttons to start game
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener('mouseenter', function () {
            let weapon = this.getAttribute("weapon-type");
            preview(weapon);
        });
        button.addEventListener('mouseleave', function () {
            stopPreview();
        });
        button.addEventListener('click', function () {
            let weapon = this.getAttribute("weapon-type");
            battle(weapon);
        });
    }

    // -- add event listener to display settings menu
    let openSettings = document.getElementsByClassName('open-settings')[0];
    openSettings.addEventListener('click', function () {
        displayMessage('settings');
    });

    // -- display welcome message
    setTimeout(displayMessage('welcome'), 1000);

    // -- warn user that all progress will be lost on reload/exit
    window.onbeforeunload = function () {
        return "Are you sure you want to leave? All progress will be lost!";
    }
});

/**
 * A pop-up to display a welcome message, level-up messages and rewards select, settings, game rules or a message of praise for completing the game
 * temporarily disables game buttons when displayed, message disappears when any button clicked
 * takes messageType to determine message to display
 */
function displayMessage(messageType) {
    // -- disable game buttons
    let weapons = document.getElementById("weapon-select").children;

    for (let i = 0; i < weapons.length; i++) {
        weapons[i].disabled = true;
    }

    // -- hide navigation icons
    document.getElementsByTagName('ul')[0].style.display = 'none';

    //  -- create and display message container
    let messageContainer = document.createElement('div');
    messageContainer.id = 'message-container';
    messageContainer.style.top = '30%';
    messageContainer.style.animation = 'slide-in 1s ease-out';
    document.body.appendChild(messageContainer);

    // -- add message HTML (welcome, winner, settings, rules or level up)
    if (messageType === 'welcome') {
        messageContainer.innerHTML = `
        <h2>Welcome!</h2>
        <p>Ultimate RPS is an exciting game of Rock, Paper, Scissors... with a twist!
        Level up as you battle the computer and win fun upgrades along your way to victory!
        </p>
        <div id="message-buttons">
        <button id="rules">Rules</button>
        <button class="open-settings">Settings</button>
        <button>Begin!</button>
        </div>
        `;
    } else if (messageType === 'winner') {
        messageContainer.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You've reached beat level 5 and completed the game! Click below if you'd like to restart:</p>
        <div id="message-buttons">
        <button id="restart">Restart!</button>
        </div>
        <p>The game will be restared and all progress will be lost</p>
        `;
    } else if (messageType === 'settings') {
        let settings = document.getElementById('settings').innerHTML;
        messageContainer.innerHTML = settings;
    } else if (messageType === 'rules') {
        messageContainer.innerHTML = `
        <a class="icons close-window" href="/#"><i class="fa-solid fa-xmark"></i></a>
        <h2>How to Play</h2>
        <ol>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        </ol>
        `;
    } else {
        messageContainer.innerHTML = `
        <h2>Congratulations!</h2>
        <p>You've reached level ${messageType}. Choose an upgrade to continue:</p>
        <div id="message-buttons">
        <button class="upgrade-option">Option 1</button>
        <button class="upgrade-option">Option 2</button>
        <button class="upgrade-option">Option 3</button>
        </div>
        `;
        unlockUpgrade();
    };

    // -- add button to close message window
    let closeWindow = document.getElementsByClassName('close-window');
    for (let i = 0; i < closeWindow.length; i++) {
        closeWindow[i].addEventListener('click', function () {
            closeMessage();
        })
    }

    // -- remove message and take action when option selected
    let messageButtons = document.getElementById("message-buttons").children;

    for (let i = 0; i < messageButtons.length; i++) {
        messageButtons[i].addEventListener('click', function () {
            closeMessage();

            if (messageButtons[i].classList[0] === 'upgrade-option') {
                activateUpgrade(messageButtons[i].classList[1], 'PLACEHOLDER - add action from upgrades list');
            }
        })

        // -- restart game
        if (messageButtons[i].id === 'restart') {
            messageButtons[i].addEventListener("click", function () {
                alert('Page reloading');
                document.location.reload(true);
            });
            // -- open settings
        } else if (messageButtons[i].classList[0] === 'open-settings') {
            messageButtons[i].addEventListener('click', function () {
                displayMessage('settings');
            });
            // -- open game rules
        } else if (messageButtons[i].id === 'rules') {
            messageButtons[i].addEventListener('click', function () {
                displayMessage('rules');
            });
        }

        for (let i = 0; i < weapons.length; i++) {
            weapons[i].disabled = false;
        }
    }


}

// function close() {
//     let messageContainer = document.getElementById('message-container');
//     messageContainer.style.top = '90%';
//     messageContainer.style.animation = 'slide-out 0.8s linear';
//     setTimeout(function () {
//         messageContainer.remove()
//     }, 800);

//     // -- show navigation icons
//     document.getElementsByTagName('ul')[0].style.display = 'block';
// }

function closeMessage() {
    let messageContainer = document.getElementById('message-container');
    messageContainer.style.top = '90%';
    messageContainer.style.animation = 'slide-out 0.8s linear';
    setTimeout(function () {
        messageContainer.remove()
    }, 800);

    // -- show navigation icons
    document.getElementsByTagName('ul')[0].style.display = 'block';
}



/**
 * 
 * @param {*} upgradeType 
 * @param {*} upgradeAction 
 */

function activateUpgrade(upgradeType, upgradeAction) {
    if (upgradeType === 'theme-upgrade') {
        document.body.style.background = upgradeAction;
    } else if (upgradeType === 'game-upgrade') {
        let weaponSelect = document.getElementById('weapon-select');

        if (weaponSelect.children.length === 3) {
            let lizardButton = document.createElement('button');
            lizardButton.setAttribute('weapon-type', 'lizard');
            lizardButton.innerHTML = 'Lizard';
            lizardButton.style.marginLeft = '2rem';
            lizardButton.addEventListener('click', function () {
                let weapon = this.getAttribute("weapon-type");
                battle(weapon);
            });
            lizardButton.addEventListener('mouseenter', function () {
                let weapon = this.getAttribute("weapon-type");
                preview(weapon);
            });
            lizardButton.addEventListener('mouseleave', function () {
                stopPreview();
            });

            let spockButton = document.createElement('button');
            spockButton.setAttribute('weapon-type', 'spock');
            spockButton.innerHTML = 'Spock';
            spockButton.style.marginRight = '2rem';
            spockButton.addEventListener('click', function () {
                let weapon = this.getAttribute("weapon-type");
                battle(weapon);
            });
            spockButton.addEventListener('mouseenter', function () {
                let weapon = this.getAttribute("weapon-type");
                preview(weapon);
            });
            spockButton.addEventListener('mouseleave', function () {
                stopPreview();
            });

            weaponSelect.appendChild(lizardButton);
            weaponSelect.appendChild(spockButton);
        }
    }
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
    ]

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
    ]

    let weapons;

    // -- if all buttons present, combine weapon arrays
    let allWeaponsUnlocked = document.getElementById('weapon-select').children.length;
    console.log(allWeaponsUnlocked);
    if (Number(allWeaponsUnlocked) === 5) {
        weapons = [].concat(coreWeapons, additionalWeapons);
        // console.log(weapons);
    } else {
        weapons = coreWeapons;
        // console.log(weapons);
    }

    return weapons;
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
        outcome = 'lose'
        outcomeText.innerHTML = `You ${outcome}!`;
    } else {
        outcome = 'Draw'
        outcomeText.innerHTML = `${outcome}!`;
    }

    displayScores(outcome);
}

function preview(weapon) {
    let weapons = weaponChoices();

    let userDisplay = document.getElementById('user-display');
    // userDisplay.innerHTML = weapons
    userDisplay.style.color = '#d3d3d3';
    let weaponIndex = weapons.findIndex(object => {
        return object.value === weapon;
    });
    userDisplay.innerHTML = `<span id="preview">${weapons[weaponIndex].icon}</span>`;
}


function stopPreview() {
    let previewDisplay = document.getElementById('preview');
    if (previewDisplay !== null) {
        previewDisplay.remove();
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


// incrememnt score-bar & next level
function incrementScoreBar(points) {
    let level = Number(document.getElementById('level').innerHTML);
    let requiredWins = Number(level) + 2;
    let scoreBarWidth = document.getElementById('score-bar').offsetWidth;
    let progress = scoreBarWidth / requiredWins;

    let progressBar = document.getElementById('progress-bar');
    let calculatedWidth = Number(progress) * Number(points);
    progressBar.style.width = `${calculatedWidth}px`;

    if (progressBar.offsetWidth === scoreBarWidth || progressBar.offsetWidth >= scoreBarWidth) {
        setTimeout(function () {
            ++level;
            level === 6 ? displayMessage('winner') : displayMessage(level);
            document.getElementById('level').innerHTML = level;
            progressBar.style.width = 0;
        }, 500);

    }
}

// unlock new upgrade at next level?
function unlockUpgrade() {
    let upgrades = [{
            name: 'Lizard & Spock',
            identifier: 'lizard-spock',
            type: 'game-upgrade',
            image: `
            <div class="upgrade-display">
            <i class="fa-solid fa-hand-lizard"></i>
            <i class="fa-solid fa-hand-spock"></i>
            </div>
            `,
            action: ''
        },
        {
            name: 'Rainbow Theme',
            identifier: 'purple-theme',
            type: 'theme-upgrade',
            image: `
            <div class="upgrade-display" style="
            background: linear-gradient(135deg, rgba(255,0,21,1) 0%, 
            rgba(255,136,0,1) 15%, 
            rgba(241,255,0,1) 30%, 
            rgba(13,255,0,1) 45%, 
            rgba(0,171,255,1) 60%, 
            rgba(113,0,255,1) 75%, 
            rgba(255,0,200,1) 90%);">
            </div>
            `,
            action: `linear-gradient(135deg, #E6C5ED 0%, #FF9AF7 50%, #E6C5ED 100%) no-repeat;`
        },
        {
            name: 'Pink Theme',
            identifier: 'pink-theme',
            type: 'theme-upgrade',
            image: `
            <div class="upgrade-display" style="background: linear-gradient(135deg, #EDC5D8 0%, #ff95af 50%, #EDC5D8 100%) no-repeat;">
            </div>
            `,
            action: `linear-gradient(135deg, #EDC5D8 0%, #ff95af 50%, #EDC5D8 100%) no-repeat;`
        },
        {
            name: 'Dark Theme',
            identifier: 'dark-theme',
            type: 'theme-upgrade',
            image: `
            <div class="upgrade-display" style="background: linear-gradient(135deg, #232B6F 0%, #2A45CB 50%, #232B6F 100%) no-repeat;">
            </div>
            `,
            action: `linear-gradient(135deg, #232B6F 0%, #2A45CB 50%, #232B6F 100%) no-repeat;`
        }
    ];

    let upgradeOption = document.getElementsByClassName('upgrade-option');

    for (let i = 0; i < 3; i++) {
        let upgrade = upgrades[Math.floor(Math.random() * upgrades.length)];
        upgradeOption[i].innerHTML = `<p>${upgrade.name}</p>` + upgrade.image;
        upgradeOption[i].id = upgrade.identifier;
        upgradeOption[i].classList.add(upgrade.type);

        for (let i = 0; i < upgrades.length; i++) {
            if (upgrades[i].name === upgrade.name) {
                upgrades.splice(i, 1);
            }
        }
    }
}

// disable upgrade once selected and unlock in settings

// settings and upgrade enable/disable 

// play audio clip on winning/losing battle