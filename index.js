// .ENV
require("dotenv").config();
// Express | Ignore this if you're gonna self host
const chalk = require('chalk');
const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Server Online!') // Tell in comments 
})

app.listen(port, () => {
    console.log(`${chalk.green(`Server online!`)}`)
})

// Code
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
client.brain = require('./util/chatSend');
client.em = require("./util/embed")
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Database Mongo 
/*
const { Database } = require("quickmongo");
client.db = new Database(process.env.mongoUrl);

client.db.on("ready", () => {
    console.log("   ==========================\n   Mongo Database connected!\n   ==========================");
})
*/
// Database Quick.db
client.db = require('quick.db');

// Don't use both at same time or code will stop working

// Ready
client.on('ready', () => {
  console.log(`${client.user.username} is Online`)
setInterval(async () => {
const statuses = [`.help`, `Discord-Chatbot`]
   client.user.setActivity(statuses[Math.floor(Math.random() * statuses.length)], { type: "STREAMING", url: "https://www.twitch.tv/discord"})
}, 10000)
});

// Event Handler
fs.readdir('./events/', (err, files) => { 
    if (err) return console.error(err); 
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`); 
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0]; 
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const once = eventFunction.once; 

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args, client)); 
        } catch (error) {
            console.error(error.stack); 
        }
    });
});

// Command Handler
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
// command 
  let messageArray = message.content.split(" "),
    cmd = messageArray[0].toLowerCase(),
    args = messageArray.slice(1),
    prefix = "."; // Add Prefix

  if (!message.content.startsWith(prefix)) return;
  let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)));
  if (commandfile) commandfile.run(client, message, args);

});


fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(R => R.endsWith('.js'));
  if (jsfile.length <= 0) {
    return console.log(chalk.red("There are no commands"));
  }
  jsfile.forEach((f, i) => {
    let pull = require(`./commands/${f}`);
    console.log(`Loaded - ${f} | ${pull.config.aliases}`)

    client.commands.set(pull.config.name, pull);
if (pull.config.aliases) pull.config.aliases.forEach(alias => client.aliases.set(alias, pull.config.name))
  });
});
// Login
client.login(process.env.token); // Your Discord Bot Token
