module.exports = {
    config: {
        name: "spinwheel",
        role: 0,
        author: "Micazhla // og by XaviaTeam",
        longDescription: "spin the wheel and win money!",
        guide: "{pn}"
    },
    onStart: async function ({ api, message, event, usersData }) {
        const { senderID, messageID, threadID, body } = event;
        const userMoney = await usersData.get(senderID, money);
        const userName = await usersData.getName(senderID);
        const wins = [10000, 50000, 500000, 1000000, 1000000000, 50000000000];
        const randomIndex = Math.floor(Math.random() * wins.length);
        const result = wins[randomIndex];

        message.reply("Spinning wheel, please wait.");

        setTimeout (() => {
            if (result === 50000000000) {
                message.reply(`Jackpot! You won $${result} amount of money.`);
                usersData.addMoney(event.senderID, result);
            } else {
                message.reply(`Congratulations, you won $${result} amount of money.`);
                usersData.addMoney(event.senderID, result);
            }
        }, 5000);
    }
};
