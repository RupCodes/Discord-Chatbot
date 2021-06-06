module.exports.run = async(client, message, args) => {
let db = client.db
if (!message.member.hasPermission("ADMINSTRATOR")) return message.channel.send(client.em("", "You don't have permissions to do this. D:"))
if(!args[0]) return message.channel.send(client.em("", "how about you mention a channel or give a channel id. :/"))
let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
if (!channel) return message.channel.send(client.em('', 'This is not a channel'))

db.set(`${message.guild.id}_chatchannel`, `${channel.id}`)
message.channel.send(client.em('Chat Channel', `Chat Channel of this server is set to ${channel}`))
}
module.exports.config = {
  name: 'setchat',
  aliases: ['sc']
}