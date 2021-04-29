
module.exports.run = async(client, message, args) => {
client.brain.chatSend(message)
}
module.exports.config = {
  name: 'chat'
}