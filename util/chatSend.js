const axios = require('axios');

require("./inline.js");

const chatSend = async (message) => {
    let bid = process.env.bid // Your Bid From Brainshop.ai
    let key = process.env.key // Your Key From Brainshop.ai
    let uid = "1"
    let msg = message.content
        message.channel.startTyping()
       await axios.get(`http://api.brainshop.ai/get?bid=${bid}&key=${key}&uid=${uid}&msg=${msg}`)
       .then(res => {
       let reply = res.data;
        if (reply) {
            message.channel.stopTyping();
            message.sendInline(reply.cnt);
        }
       })
};

module.exports = {
    chatSend
};