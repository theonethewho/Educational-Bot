global.botSetting.chatOff = false;

modules.exports = {
    config: {
        name: "chat",
        role: 0,
        author: "Micazhla",
        longDescription: "Turn chat on/off",
        guide: {
            "{pn} <on/off>"
        }
    },
    onStart: async function ({ api, event, message, args, usersData, threadsData, role }) {
        const { senderID, messageID, threadID } = event;

        if (args[0] == "on") {
            if (role < 1) {
                return message.send("You're not an admin.")
            }

            global.botSetting[threadID] = global.botSetting[threadID] || {};
            global.botSetting.chatOff = false;
            api.setMessageReaction("✅", messageID, () => {}, true);
        } else if (args[0] == "off") {
            if (role < 1) {
                return message.send("You're not an admin.")
            }

            global.botSetting[threadID] = global.botSetting[threadID] || {};
            global.botSetting.chatOff = true;
            api.setMessageReaction("✅", messageID, () => {}, true);
        }
    },
    onChat: async function ({ api, message, role, usersData, threadsData, event }) {
        const { senderID, messageID, threadID, body } = event;
        const getName = await usersData.getName(senderID);
        const getThreadName = await api.getThreadInfo(threadID).name;
        const chatOff = global.botSetting.chatOff;
        const adminUid = "61557494398506";
        const body = body.join(" ");

        if (chatOff) {
            if (role < 1) {
                api.sendMessage("chat off po.", messageID, threadID);

                api.sendMessage(`DETECTED MESSAGE WHILE CHAT OFF\nSender: ${getName}\nGroup: ${getThreadName}\nBody: "${body}"`, adminUid);
            }
        }
    }
};
