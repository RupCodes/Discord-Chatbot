const Discord = require('discord.js');
const client = new Discord.Client();

function embed (title, des, foot, thum){
  if(!des) des = ""
  if(!foot) foot = ""
  const em = new Discord.MessageEmbed()
  .setTitle(title)
  .setColor('#1BB1B0')
  .setThumbnail(thum)
  .setDescription(des)
  .setFooter(foot)
  return em
}

module.exports = embed
