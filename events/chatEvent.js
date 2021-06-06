
module.exports = {
    event: "message", // Event
    once: false,
    async run (message, client) {
if(message.author.bot) return
let db = client.db
if(await db.has(`${message.guild.id}_chatchannel`)) {
let channelid = await db.get(`${message.guild.id}_chatchannel`)
if (!channelid) return
       if(channelid != message.channel.id) return
      client.brain.chatSend(message)
        }
}
};