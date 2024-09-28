module.exports = {
    config: {
        name: "educgc",
        role: 0,
        author: "Annaleiah",
        description: "Join education gc"
    },
    onStart: async function ({ message, event, api }) {
        const userID = event.senderID;
        const targetThread = "26890267070572509";

        api.addUserToGroup(userID, targetThread);
        message.reply("You have been successfully added to to the group chat!");
    }
}
