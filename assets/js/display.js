// Function to wait for DOM to load then get button elements and add event listeners inspired by the CI Love Maths Walkthrough Project
document.addEventListener('DOMContentLoaded', function () {
    // -- add event listeners to game buttons to preview selection and begin game
    let buttons = document.getElementById('weapon-select').children;

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
        let wins = document.getElementById('wins').innerHTML;
        let loses = document.getElementById('loses').innerHTML;
        let draws = document.getElementById('draws').innerHTML;
        let totalTurns = Number(wins) + Number(loses) + Number(draws);
        console.log(totalTurns);
        messageContainer.innerHTML = `
        <h2>You Won!</h2>
        <p>Congratulations! You've beaten all levels and completed the game in <strong>${totalTurns}</strong> turns.</p> 
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
        <button class="icons close-window" aria-label="Close game rules"><i class="fa-solid fa-xmark"></i></button>
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
    let lockedUpgrades = document.getElementsByClassName('locked'); // -- locked upgrade buttons
    let upgradeOptions = document.getElementsByClassName('upgrade-option'); // -- 3 empty upgade-selection buttons
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
            let scoreboard = document.getElementById('scoreboard');
            if (upgradeIdentifier === 'rainbow-theme') {
                scoreboard.style.background = 'rgba(255, 255, 255, 0.5)';
            } else {
                scoreboard.style.background = 'none';
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