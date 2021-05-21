const axios = require('axios');

require("./inline.js");

const chatSend = async (message) => {
   try {
    let bid = process.env.bid // Your Bid From Brainshop.ai
    let key = process.env.key // Your Key From Brainshop.ai
    let uid = "1"
    let msg = message.content
        message.channel.startTyping()
       await axios.get(`http://api.brainshop.ai/get?bid=${bid}&key=${key}&uid=${uid}&msg=${msg}`)
       .then(res => {
       let data = res.data;
      let reply = data.cnt
console.log(reply)
        if (reply) {
            message.channel.stopTyping();
            message.sendInline(reply, { allowedMentions: { repliedUser: false } });
        } else if(!reply) {
        message.channel.stopTyping();
        message.sendInline("api did not respond at time [TIME OUT]", { allowedMentions: { repliedUser: false } });
}
       })
 } catch (e) {
        message.channel.stopTyping();
        console.log(e);
    }
};

module.exports = {
    chatSend
};
