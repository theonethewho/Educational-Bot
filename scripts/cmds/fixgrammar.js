const axios = require('axios');
module.exports = {
        config: {
                name: "fixgrammar",
                aliases: ["grammar"],
                version: "1.0",
                author: "lee",
                countDown: 5,
                role: 0,
                shortDescription: "is a command that helps improve grammar by suggesting corrections and providing recommendations.",
                longDescription: "is a command that helps improve grammar by suggesting corrections and providing recommendations.",
                category: "study",
                guide: {
                        en: "{pn} [Sentences/Paragraph]"
                },
        },

        onStart: async function ({ message, args, api, event }) {
                const axios = require("axios");
                let { threadID, messageID } = event;
                const text = args.join(" ");
                if (!text) return api.sendMessage(`Hello! It looks like you're missing some prompt, how may I help you with your grammar today?`, threadID, messageID);

                try {
                        const res = await axios.get(`https://api.easy-api.online/api/grammar?query=q${text}`);
                        const { message } = res.data;
                        api.sendMessage(`📜Corrected Paragraph: ${message}`, threadID, messageID);
                } catch (error) {
                        console.error(error);
                        api.sendMessage("An error occurred while making the API request.", threadID, messageID);
                }
        }
};
