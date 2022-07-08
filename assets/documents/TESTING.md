# Website Testing

## HTML and CSS Validation Testing

- All pages were passed through either the W3C CSS validator, W3C Markup Validator or JSHint JavaScript Validator (depending on relevance).
- Any issues found have been rectified and all pages now pass with no errors to show.  

###  W3C HTML Validator

#### index.html
![Feedback from run through the W3 HTML validator for index.html](/assets/images/index-w3c-result.png)

###  W3C CSS Validator

#### style.css
![Feedback from run through the W3 CSS validator for style.css](/assets/images/css-w3c-result.png)

###  JSHint Validator
- Some warnings displayed due to splitting of JavaScript betweeen multiple files. When code combined and ran together, these warnings disappear.
- All other warnings determined to be unavoidable and do not affect running of code ("Functions declared within loops referencing an outer scoped variable may lead to confusing semantics").

#### display.js
![Feedback from run through the JSHint linter for display.js](/assets/images/display-jshint-result.png)

#### game.js
![Feedback from run through the JSHint linter for game.js](/assets/images/game-jshint-result.png)

---
## Lighthouse
- All page variations were ran through Lighthouse on Chrome Devtools for both desktop and mobile device display. Standard site appearance ran in incognito mode on deployed site, variations ran through Gitpod preview server. Any issues were dealt with and all now have a high passing mark.

#### index.html with welcome message
- Desktop

![Screenshot of Lighthouse score for index.html on desktop](/assets/images/index-welcome.png)

- Mobile

![Screenshot of Lighthouse score for index.html on mobile](/assets/images/index-mobile.png)

#### index.html with settings menu
- Desktop

![Screenshot of Lighthouse score for index.html on desktop](/assets/images/index-desktop.png)

- Mobile

#### index.html with how to play
- Desktop

![Screenshot of Lighthouse score for index.html on desktop](/assets/images/index-desktop.png)

- Mobile

#### index.html with level-up
- Desktop

![Screenshot of Lighthouse score for index.html on desktop](/assets/images/index-desktop.png)

- Mobile

#### index.html with completion message
- Desktop

![Screenshot of Lighthouse score for index.html on desktop](/assets/images/index-desktop.png)

- Mobile

#### index.html with dark theme
- Desktop

![Screenshot of Lighthouse score for index.html on desktop](/assets/images/index-desktop.png)

- Mobile

#### index.html with rainbow theme
- Desktop

![Screenshot of Lighthouse score for index.html on desktop](/assets/images/index-desktop.png)

- Mobile

#### index.html with pink theme
- Desktop

![Screenshot of Lighthouse score for index.html on desktop](/assets/images/index-desktop.png)

- Mobile

---
## Manual testing

### Homepage
- All links tested manually **31/5/22** and found to be working as intended
- Interactive elements tested manually on **31/5/22** and found to be working as intended

### Contact page
- All links tested manually **31/5/22** and found to be working as intended
- Interactive elements tested manually on **31/5/22** and found that map iframes are not interactive within the deployed site, but do open up a larger map in a new tab when clicked and therefore still useful to the user. Tried to see if this was an issue with Github pages as the maps are interactive in the testing site but unable to find an answer.
- Form validation tested manually on **31/5/22** and found to be working as intended

### Sign-up page
- All links tested manually **31/5/22** and found to be working as intended
- Form validation tested manually on **31/5/22** and found to be working as intended

### Thank you page
- All links tested manually **31/5/22** and found to be working as intended

---
## Different browsers
- Tested and found to be working as intended on the following browsers :
    - Chrome
    - Firefox
    - Microsoft Edge
- Unable to test on Safari as unble to download on my Windows PC
- Certain features such flexbox are not supported on Internet Explorer and therefore some feature are not displaying properly. However, Internet Explorer was retired by Microsoft in August 2021 and is no longer supported.

---
## Different devices with Chrome Devtools
- Tested on the following devices via Chrome Devtools and found to be working as intended:
    - iPhone SE
    - iPhone XR
    - iPhone 12 Pro
    - Pixel 5
    - Samsung Galaxy S8+
    - Samsung Galaxy S20 Ultra
    - iPad Air
    - iPad Mini
    - Surface Pro 7
    - Surface Duo 
    - Samsung Galaxy A51/71
    - Nest Hub
    - Nest Hub Max

---
## Media Queries
- Media queries were introduced at the below break points:
    - 1765px
    - 1300px
    - 1100px
    - 950px
    - 840px
    - 730px
    - 690px
    - 525px
    - 406px

---
## Bugs
### Resolved Bugs
- Issues with flexbox forcing non-active FAQs to open along with active ones, solved with help from [Techstacker](https://techstacker.com/prevent-flexbox-child-element-height-stretch-css/)
- Issue with select element and required attribute solved with help from [Jibin and Adhan Timothy Younes (users on Stack Overflow)](https://stackoverflow.com/questions/44322824/select-required-not-working)
- Issue where footer would appear above the bottom on the page on the thank you page solved with help from [CSS Tricks](https://css-tricks.com/couple-takes-sticky-footer/)
- Issues where transparent overlay of header would show elements with 'position: relative' attribute through when scrolling, even after  adding sticky opaque backing div solved by removing backing div from section that was not sticky and increasing z-index value.
- Issue with summary elements showing a single-pixel-wide line of white between the background colour and the border solved by applying separate styling to '[open]' and closed details elements

### Unresolved Bugs
- Map iframes are not interactive within the deployed site, but do open up a larger map in a new tab when clicked and therefore still useful to the user. Tried to see if this was an issue with Github pages as the maps are interactive in the testing site but unable to find an answer.
- Phone simulation on [Am I Responsive?](https://ui.dev/amiresponsive) shows gradient fade div over hero image in an undesirable position. This is not the case when simulating on Devtools and I have been unable to emulate it, and have therefore struggled to resolve it at this stage
- Number input element in sign-up form sometimes sticks as focused, even when another input it clicked, leaving the element with a white background. I have tried researching ways to fix this but this does not seem to be a problem that other coders often face/notice so have been unable to find guidance on how to prevent it.




Footer
© 2022 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
