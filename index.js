// Express | Ignore this if you're gonna self host
const chalk = require('chalk');
const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Hello World, How are you :D') // Tell in comments 
})

app.listen(port, () => {
    console.log(`
  ${chalk.blue(`====================`)}
  ${chalk.blue(`||`)} ${chalk.green(`Server online!`)} ${chalk.blue(`||`)} 
  ${chalk.blue(`====================`)}`)
})

// Code
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({disableEveryone: true});
client.brain = require('./util/chatSend');
client.commands = new Discord.Collection();

client.on('ready', () => {
  console.log(`
  ${chalk.blue(`==================================`)} 
  ${chalk.blue(`||`)} ${chalk.green(`${client.user.tag} is online!`)} ${chalk.blue(`||`)} 
  ${chalk.blue(`==================================`)}
  ${chalk.grey(`Credits: Rup#2626`)}`); // You will probably remove credits ;-;
});
// Command Handler
client.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;

  let messageArray = message.content.split(" "),
    cmd = messageArray[0].toLowerCase(),
    args = messageArray.slice(1),
    prefix = "!"; // Add Prefix

  if (!message.content.startsWith(prefix)) return;
  let commandfile =
    client.commands.get(cmd.slice(prefix.length))
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
    console.log(chalk.greenBright(`
    Loaded - ${f}
    `))

    client.commands.set(pull.config.name, pull);
  });
});

// Login
client.login(process.env.token); // Your Discord Bot Token
