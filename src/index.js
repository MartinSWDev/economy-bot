// dotenv
require("dotenv").config();
const { discord_bot_token, data_base_token} = process.env;
const { connect } = require("mongoose");

//discord
const { Client, Collection } = require("discord.js");

// fs
const fs = require("fs");

// all intents - could reduce
const client = new Client({ intents: 32767 });

// collections
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];

// require commands
const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

// call functions and start

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(discord_bot_token);

// mongo connection
(async () => {
  await connect(data_base_token).catch(console.error);
})();
