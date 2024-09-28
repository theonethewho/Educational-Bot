module.exports = {
    config: {
        name: "transfer",
        role: 0,
        author: "Micazhla",
        longDescription: "Transfer your money to other users",
        category: "Economy",
        usage: "{pn} <@mention or uid> <amount>"
    },
    onStart: async function ({ args, api, event, usersData, message }) {
        const { body, messageID, threadID, senderID, mentions } = event;
        let uid;
        const coin = parseInt(args[1], 10);

        // Check if user is mentioned
        if (Object.keys(mentions).length > 0) {
            uid = Object.keys(mentions)[0];
        } else {
            uid = args[0];
        }

        if (!uid || isNaN(coin) || coin <= 0) {
            const p = global.utils.getPrefix(threadID);
            return message.reply(`Wrong Syntax, use ${p}transfer <@mention or uid> <amount>`);
        }

        const senderName = await usersData.getName(senderID);
        const receiverName = await usersData.getName(uid);
        const senderMoney = await usersData.get(senderID, "money");
        const receiverMoney = await usersData.get(uid, "money");

        if (senderMoney < coin) {
            return message.reply("You don't have enough money!");
        }

        // Deduct money from sender
        await usersData.set(senderID, { money: senderMoney - coin });

        // Add money to receiver
        await usersData.set(uid, { money: receiverMoney + coin });

        message.reply({
            body: `💸 ${senderName} has successfully transferred ${coin} coins to ${receiverName}.`,
            mentions: [
                {
                    tag: receiverName,
                    id: uid
                }
            ]
        });
    }
};
