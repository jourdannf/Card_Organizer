# Online Card Collection #

## Project Overview ##

This project implements a digital card collection with a fake database of cards and users using Objects provided in the data folder. 

For the sake of time, the card collection currently shows every card provided in the database regardless of user. When a user attempts to add a card to the database via the form on the addCards page, the program assumes, a user with the userId 203 is adding a card to the databse. In the future, I'd like to add login capabilities, so that these pages are only accessible via logging in and so that a user can only view their own cards if they're logged into the website. 

Additionally, file upload is not possible with bodyParser, so image files cannot actually be added to newly made cards. In the future, I'd like to include this functionality as well. 

## Languages Used ##

* ExpressJS
* PugJS
* NodeJS 