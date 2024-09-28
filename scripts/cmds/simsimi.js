const axios = require("axios");


module.exports = {

  config: {

    name: "sim",

    version: "1.0.1",

    author: "Kaizenji",

    countDown: 5,

    role: 0,

    shortDescription: "simsimi",

    longDescription: { en: "chat with sim"},

    category: "fun",

    guide: "{p}sim <ask>",

  },


onStart: async function ({ api, event, args, reply }) {

         try {

         let message = args.join(" ");

         if (!message) {

                return api.sendMessage(`please put a message`, event.threadID, event.messageID);

         }


         const response = await axios.get(`https://sim-server-0xx.onrender.com/sim?query=${message}`);

         const respond = response.data.success;

         api.sendMessage(respond, event.threadID, event.messageID);

  } catch (error) {

         console.error("An error occurred:", error);

         api.sendMessage("api error", event.threadID, event.messageID);
}
}
};
