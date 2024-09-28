const axios = require('axios');

const fs = require('fs');


module.exports = {

  config: {

    name: "teach",

    version: "1.0.1",

    author: "Kaizenji",

    countDown: 5,

    role: 0,

    shortDescription: "Teach Simsimi",

    longDescription: { en: "teach {message} => {response}"},

    category: "fun",

    guide: "{p} teach message => response",

  },


onStart: async function ({ api, event, args, reply }) {

    const content = args.join(" ");

    const [ask, ans] = content.split("=>").map(item => item.trim());


    // Checking arguments

    if (!ask || !ans) return api.sendMessage('𝖬𝗂𝗌𝗌𝗂𝗇𝗀 𝗊𝗎𝖾𝗋𝗒!\n𝖾𝗑𝖺𝗆𝗉𝗅𝖾: 𝗍𝖾𝖺𝖼𝗁 𝗁𝗂 => 𝗁𝖾𝗅𝗅𝗈', event.threadID);


    const url = `https://sim-server-0xx.onrender.com/teach?ask=${encodeURIComponent(ask)}&ans=${encodeURIComponent(ans)}`;


    try {

        const response = await axios.get(url);

        if (response.data) {

            api.sendMessage(`Successfully teached!🥳\n\nYour ask: ${ask}\nMy response: ${ans}`, event.threadID);

        } 

    } catch(err) {

        api.sendMessage('Error while teaching', event.threadID);

        console.log(err);

         }

         }

};
