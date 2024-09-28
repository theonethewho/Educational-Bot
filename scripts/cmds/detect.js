module.exports = {
    config: {
        name: "detect",
        role: 0,
        author: "Micazhla",
        longDescription: "Not a command."
    },
    onStart: async function ({ }) {},
    onChat: async function ({ message, event, api, usersData }) {
        const userMsg = event.body.toLowerCase();
        const userName = await usersData.getName(event.senderID);
        const splitUp = userMsg.split(/[ ,]+/);
        const keywords = ["hello", "hey", "hi", "ayo", "yo", "hii", "helloo", "hellooo", "hiii", "ey"];
        const response = [
            `Hello ${userName}! How are you today?`,
            `Hey there ${userName}, is there anything I can help?`,
            `Hi, ${userName}, how are you?`
        ];

        for (let keyword of keywords) {
            if (splitUp.includes(keyword)) {
                const random = Math.floor(Math.random() * response.length);
                const randomResponse = response[random];
                message.reply(randomResponse);
                break;
            }
        }
    }
};
