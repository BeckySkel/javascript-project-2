# Ultimate RPS

![The Ultimate RPS website displayed on different devices](/assets/images/responsive-test.png)

- Ultimate RPS is a fun game of Rock, Paper, Scissors which includes the option to enhance the background colours and game-play by leveling up and unlocking upgrades. Play against the computer with increasing levels of difficulty and try to win in an few games as possible.

## Links

[Link to the live project (right click to open in new tab)](https://beckyskel.github.io/javascript-project-2/)

[Link to the project repository (right click to open in new tab)](https://github.com/BeckySkel/javascript-project-2)

---
## Table of Contents
- [Strategy](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#strategy-1)
    - [Target Audience](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#target-audience)
    - [User Stories](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#user-stories)
- [Scope](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#scope-1)
    - [Research](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#research)
    - [Future Features](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#future-features)
    - [Testing](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#testing)
- [Structure](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#structure-1)
    - [Wireframes](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#wireframes)
    - [Information Architecture](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#information-architecture)
- [Skeleton](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#skeleton-1)
    - [Current Features](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#current-features)
    - [Technologies Used](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#technologies-used)
- [Surface](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#surface-1)
    - [Design](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#design)
    - [Deployment](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#deployment)
- [Credits](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#credits)
    - [Content](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#content)
    - [Media](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#media)
    - [Acknowledgemnets](https://github.com/BeckySkel/javascript-project-2/blob/main/README.md#acknowledgements)

---
## Strategy

### Target Audience
- The website is targeted towards children -> young adults and may also appeal to some older adults too. The site will primarily be used for entertainment and killing-time but can also be used by those who would like to learn the rules of the classic game of Rock, Paper, Scissors. 

### User Stories

#### Children/Newer Player
*These are youger users who perhaps are new to playing computer games but are looking for something fun and engaging.*
- As a child, I would like a simple but exciting layout and intuitive design.
- As a child, I wouldn't want to see too many long paragraphs or complicated instructions.
- As a child, I would like to receive positive feedback for playing the game correctly and improving my skills.

#### Young-Adults/Experienced Player
*These are users who are likely to have some experience using internet browsers and playing comuter games.*
- As a young-adult, I would like the chance to customise my game to suit my unique style.
- As a young-adult, I would like familiar concepts and lay out so that I can easily navigate the site.
- As a young-adult, I would like a goal to work towards so that I can beat the game.

---
## Scope

### Research
- Before any planning, I conducted research into other similar games and took note of the rules and format, as well as which features I thought were affective and would be good to include for my target audiences.

### Future Features

#### Audio Feedback
- I'd like to include positive sounds for a win and negative sounds for losses as a means of audio feedback to the player. This would be useful to visually impaired players in particular. A toggle to turn audio on and off would be included in the sttings menu.

#### Image Upgrade
- Another upgrade which could be included would be swapping out the [https://fontawesome.com/](Font Awesome) icons for realistic images or pixelated styles.

#### Multiplayer
- I'd like to include online-play so that people from around the world can compete with each other 1 vs 1 matches or knck-out tournaments. This would keep things interesting for the player and improve the replayability. 

### Testing
- Throughout the project, I relied heavily on [Chrome Devtools](https://developer.chrome.com/docs/devtools/) to help me view this project on different screen sizes so that I could adjust elements, create media queries for responsive design and debug js functions by logging outcomes to the console. 
- Please follow [this link](assets/documents/TESTING.md) for full list of tests carried out on this website

---
## Structure

### Wireframes
- After looking at common designs and features and deciding what I would like to include, I mapped out the intended features of the website using [Balsamiq]() to create wireframes of each page
- [View the wireframes here](assets/documents/wireframes.pdf)

### Information architecture
- Ultimate RPs is a single-page website which relies on JavaScript to manipulate the DOM and display different areas of the site in pop-up messages.
- The useful information is presented in an animated message container that slides in fromt he top of the screeen and exits at the bottoms once the user has read the displayed information and interacted with the appropriate elements. 
- The main game area is permanently displayed in the center of the screen, tucked behind any displayed messages until the user is ready to start playing. There are only 3 to 5 buttons to interact with but these manipulate various sections of the screen to display the user's choice, computer's choice, the outcome of the game and the amount of wins, losses and draws the user has acheived throughout their session.
- Once a player reaches the next level by incrementing the progress bar to fill the container, a message is displayed via the sliding message container letting the player know that they have levelled-up and offers them 3 upgrades to choose from. Once the player has chosen, the message slides out and the upgrade is applied.
- In the top right of the page is 2 buttons which call the settings menu where a player can enable and disable their unlocked upgrades, or the rules on how to play the game. Both icons temporarily disappear when a message is displayed to avoide overlap.

---
## Skeleton

### Current Features

#### Header/navigation
- The main navigation bar features a soft black background with a large logo to the far-left that links back to the homepage, 3 divider-separated links in white alongside it, and 2 bold button-style links to the far-right. The different formatting and separation of the navigation links is due to the different roles they play: the left links link to different sections on the main homepage and the right-hand links lead to different pages of the website.
- The header is sticky and consistent across all pages and screen sizes so the user can always easily return to all pages/sections.
- On the homepage, the header is transparent when over the hero image to provide a better view of the contents but opaque after scrolling as to reduce distractions and noise when scrolling. 
- I have used CSS to provide visual aid when hovering over each link but added no styling for the ‘active’ page as this may cause confusion when using the homepage links as you can scroll from one section to the next without the use of the links. The supporting pages are also a lot smaller with large headings so ‘active’ styling is unnecessary.

![Screenshot of the naivgation bar](assets/images/header.png)

#### Hero image
- The hero image takes up the majority of the viewport and shows a man running on a treadmill.
- The bottom of the image fades into a black div to harmonise with the transparent header and transition into the first section. There is a large slogan that spreads across the bottom of the hero image and onto the first section, taking up the rest of the screen-space and further aiding the transition. The overlapping, shadowed text of this slogan is carried throughout the site on headers.
- The image size and placement changes slightly based on the screen size so the subject is vertically-centred and can always been seen.
- The large image will capture the users attention and immediately conveys the use of the website.

![Screenshot of the hero image](assets/images/hero.png)

#### Key points
- The key selling points are presented on 3 large cards in a line with single sentences and a large icon, relevant to the information.
- These cards provide the user a good starting-point of the most desirable features that the gym has to offer, without having to scroll too far or read too much.

![Screenshot of the key points section](assets/images/key-points.png)

#### About us
- The about us section consists of a large heading, an image and 3 paragraphs of the gym’s key principles and selling-points. There is also a large ‘Join now!’ link which leads to the sign-up page; the styling of this link is consistent with the same link in the navigation bar.
- The intention is to provide the user with some useful information about the gym and their membership plans.
- There are 2 links within the text of the paragraphs which lead to the locations section of the contact page and the sign-up page respectively. The text within the link is relevant to the destination but aria labels have been added to avoid ambiguity and let the visually impaired know where the link will take them. These links will be highlighted with a yellow background when hovered over.
- As the screen size shrinks, the image will display on top of the text to provide more room.

![Screenshot of the about us section](assets/images/about-us.png)

#### Gym features
- The features section is split into 3 captions and their associated images.
- The caption is a short, single-sentence block of text with a heading. The images relate to what is said in the captions.
- As the viewport shrinks, the captions and images stack on top of each other to fit the screen.
- These images and captions provide the user with a peek into the gym and lets them know what to expect should they choose to join.

![Screenshot of the gym features section](assets/images/features.png)

#### FAQs
- To save space, the FAQs have been placed in details elements which extend when clicked. This was a standard which I noticed when completing research towards this project.
- The summary of the element is the question, this is always visible, and the response is hidden until the element is clicked. 
- Styling has been applied when hovering over the summary and when the element is active in order to tell the user that this element can be interacted with and to provide clear definition between the questions and answers when open.
- The user can interact with these elements to show the answer to any questions they may be interested in.
- There are 2 internal links within the answer paragraphs which lead to the contact and sign up pages. The text within the links is relevant to the destination but aria labels have been added to aid the visually impaired. The links are highlighted yellow when hovered over.

![Screenshot of the FAQs section - all elements closed/inactive](assets/images/faqs-closed.png)
![Screenshot of the FAQs section - one element open/active](assets/images/faqs-open.png)

#### Reviews
- 3 user reviews have been placed in a container that the user can use links to interact with in order to scroll along, left or right. This is replaced on smaller screens with a plain scrolling section to avoid crowding the screen.
- Each review has a heading with the reviewers name and a paragraph block with their review.
- Users will be able to see what others have thought about the gym and it's features before they sign up.
- A border with 2 quote icons is placed over the review window and buttons with left and right chevrons are placed on either side. These control the direction of the scroll. A transition of 0.5 seconds has been applied so that there is a smooth scroll between the reviews.
- The yellow background is bright and eye-catching and the subtle shadows give the illusion that the review and buttons are floating over the background.

![Screenshot of the reviews section](assets/images/reviews.png)

#### Footer
- All pages require some scrolling on most screen sizes and therefore a ‘back to top’ button has been provided. The button features an up arrow icon for illustration of the outcome. As the screen shrinks, the text is removed and the icon remains so the outcome is clear without visually crowding the footer.  
- Non sticky so that the user can see more of the site while scrolling through.
- External links to social medias, opening in a separate tab. Aria labels provided for visually impaired.
- The footer mirrors the layout of the header bar for visual balance.

![Screenshot of the footer](assets/images/footer.png)

#### Locations
- The contact page features 2 sections. The first is the current locations of the gyms, along with their addresses and contact information so that the user can contact their gym directly if they need to.
- The info is presented in floating cards with a google map iframe, a heading with the city name, and a table to present the contact info in an organised way. Clicking a link on the iframe opens a full-size google map in a new tab. 
- Icons are placed to the left of the contact info to act as bullet points and clues to the instruction of the following information.
- The 3 cards change shape and configuration on smaller screen sizes until stacked on top of each other.

![Screenshot of the locations section](assets/images/locations.png)

#### Contact
- The contact section is a query submission form for users who would like to contact the company in general instead of a specific location. It will validate that the required fields have been filled in before allowing the user to submit.
- On submission, the page will refresh and a pop-up thank you message will display letting the user know that their message has been sent and we will be in contact. Dummy form, info not actually processed.
- Single line of Javascript used to convey to the user that submission was successful.

![Screenshot of the locations section](assets/images/contact.png)

#### Sign-up
- The sign up page consists of a single section with a detailed sign-up for split into 2 fieldsets - "your details and "your membership".
- The user inputs their personal and contact info into the first section and then chooses their desired location and plan in the second. The required fields are validated before submitting and terms and conditions are available as a document that open on a new tab.
- After submitting, the user is directed to a thank you page to show that the submission was successfully sent, lets them know what to expect next and provides a link to the contact page if they have any questions.
- Another dummy form, info not actually processed

![Screenshot of the 'your details' fieldset of the sign-up form](assets/images/su-details.png)
![Screenshot of the 'your membership' fieldset of the sign-up form](assets/images/su-membership.png)
![Screenshot of the thank you message](assets/images/su-thankyou.png)

### Technologies used

#### Languages
- [HTML](https://en.wikipedia.org/wiki/HTML)
- [CSS](https://en.wikipedia.org/wiki/CSS)
- [Git](https://en.wikipedia.org/wiki/Git) for version control
- [JavaScript](https://en.wikipedia.org/wiki/JavaScript)

#### Other resources
- [Gitpod](https://www.gitpod.io/) to alter and manage website files
- [Github](https://github.com/) to create and store website files
- [Github Pages](https://pages.github.com/) to deploy site
- [Chrome Devtools](https://developer.chrome.com/docs/devtools/) to test site throughout process
- [Balsamiq](https://balsamiq.com/) to create wireframes
- [Coolors](https://coolors.co/) to choose a colour scheme
- [Google Fonts](https://fonts.google.com/) for the website font (Cabin)
- [Font Awesome](https://fontawesome.com/) used to add icons
- [Favicon.io](https://favicon.io/favicon-generator/) used to create favicon
- [Code Institute](https://codeinstitute.net/) fullstack developer course to learn how to create
- [W3Schools](https://www.w3schools.com/) for help with common coding issues
- [Am I Responsive?](https://ui.dev/amiresponsive) for device simulations

---
## Surface

### Design

#### Colour scheme

![The colour scheme I used](assets/images/colours.png)

- A bright but soft colour-scheme has been chosen to provide a pleasing display without distracting from the game-play.
- For the upgrades, bold colours and patterns were chosen to privide contrast between options and improve customisation and feeling of reward.
- I used [Coolors](https://coolors.co/) to help pick a colour scheme.
- There is an angled gradient in all backgrounds ranging from more subtle to very striking.
- The base colours are X, X and X . With X, X and X acting as highlights.


#### Imagery
- There are currently no images used in this site.

#### Typography
- All text is in the Cabin font. It is a humanist sans which is clear and easily read at both larger and smaller font sizes. It’s classic, yet modern, style pairs well with the softer colours and rounded edges of the website.
- Sans serif has been used as the fallback option as it is the closest web-safe font.

#### Icons
- [Font Awesome](https://fontawesome.com/) icons were used for navigation buttons as well as for the main game display.

### Deployment
- This site was deployed on Github Pages, following the below steps:
    1. Acces the Github repository [here](https://github.com/BeckySkel/html-css-project-1)
    2. Navigate to the **Settings** tab (far right tab)
    3. Open the **Pages** information
    4. Select branch **main**
    5. Wait for site to deploy (this make take a few minutes) 
- Access the live site [here](https://beckyskel.github.io/html-css-project-1/)

---
## Credits

### Content
- Websites used for initial research:
     - []()
- Issue with trying to display the chosen weapon icon by using code to map the index in an array solved with code from [Borislav Hadzhiev](https://bobbyhadz.com/blog/javascript-array-find-index-of-object-by-property)
- CSS Code for 3D heading from [Mandy Michael](code for 3D effect from https://codepen.io/mandymichael/pen/VprZaq)
- Code for preloadinf etc suggested by lighthouse thingy
- 3 buttons code inspired by but heavily idited by me []()

### Media
- All icons fromm [Font Awesome](https://fontawesome.com/)
- All CSS gradietns acheived with []()

### Acknowledgements
- [Code Institute](https://codeinstitute.net/) for providing excellent learning content 
- Reuben Ferrante as my mentor and providing vital feedback throughout
- [W3Schools](https://www.w3schools.com/) for quick and easy guidance on HTML and CSS
- The users of [Stack Overflow](https://stackoverflow.com/) for asking and answering some of the harder JavaScript questions
- Other CI students for sharing their work and providing inspiration and guidance

---

Becky Skelcher 2022