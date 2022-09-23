# Economy Bot #
![JavaScript](https://img.shields.io/badge/-JavaScript-black?style=flat-square&logo=javascript)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white)
![Heroku](https://img.shields.io/badge/-Heroku-430098?style=flat-square&logo=heroku)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat-square&logo=mongodb&logoColor=white)
![Discord](https://img.shields.io/badge/discord.js-%237289DA.svg?style=flat-square&logo=discord&logoColor=white)

Economy bot is a simplified version of a Discord bot built for a gaming community to assist with their in game transactions. It is able to give daily metals prices, provides quotes for sales / buying, and creates a process to handle those transactions both out and in game. 

# Using this bot on your own server #
**Bot Currently Set To Private For Development**

**Will make public during October 2022**

## Local Copy ##
If you are looking to build your own discord bot I would recommend starting by reading the [Discord.js Guide](https://discordjs.guide) which helped me in building this bot. 

## Prerequisites ##
- **MongoDB:** This bot utilises [MongoDB](https://www.mongodb.com/docs/manual/tutorial/getting-started/) in order to hold data such as the meal prices. In order ot replicate this repo you will need your own database. 
- **node.js:** Make sure you have [node.js](https://nodejs.org/en/) installed 
- **metals-api:** You will need a [metals-api](https://metals-api.com/) account if you wish to use that api

## Set Up ##
1. Run 
    ```
    npm install
    ```
2. Create `.env` file to hold your tokens (follow `example.env`)
3. In discord run `\pricesInit` to seed initial prices

# Usage #
 ## Current Commands ## 
- /updatePrices - Updates prices in mongoDB from https://metals-api.com (can only be run once per day)
- /prices - Displays latest prices held in mongoDB
- /account - Creates an account in the database to hold some values used by the bot 
- /pricesInit - Seeds the database with initial prices

# Roadmap #

- [x] Create Server
- [x] Create Bot
- [x] Connect API
- [x] Connect MongoDB
- [x] Add simple price commands
- [x] Add account creation
- [ ] Create game activity replacement
- [ ] Add sales commands
- [ ] Add ticket system
- [ ] Add sales rankings
- [ ] Make public



