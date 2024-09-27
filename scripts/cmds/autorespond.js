module.exports = {
    config: {
        name: "autoreact",
        version: 1.0,
        role: 0,
        author: "Micazhla",
        longDescription: "React on chats based on emojis"
    },
    onStart: async function ({ }) {},
    onChat: async function ({ api, event }) {
        const reactWord = {
            "💗": [ "azry", "azryteah", "az", "mica", "micazhla", "cazhla", "jamaica", "hi", "hii", "hiii", "hiiii", "hello", "helloo", "hellooo", "helloooo", "yo", "ey", "eyy", "eyyy", "hallo", "hallu", "hellu", "hey", "hi'ed", "hello'ed", "ayo" ],
            "🎀": [ "good morning", "good morningg", "good morninggg", "good morningggg", "goodmorning", "goodmorningg", "goodmorninggg", "goodmorningggg", "morning", "morningg", "morningg", "morninggg", "morninggg", "morningggg", "good afternoon", "good afternoonn", "good afternoonnn", "afternoon", "aft", "evening", "eve", "evee", "eveningg", "eveninggg" ],
            "⁉️": [ "asim", "asem", "baho", "bantutt", "bantut", "bantuttt", "bantot", "bantott", "bantottt", "ambaho", "bahu", "nigga", "nigger", "gay", "pangit", "slut", "slutt", "ass", "butthole", "fuck", "tangina", "putangina", "shit", "shet" ],
            "😠": [ "no", "noo", "nooo", "ayaw", "ayoko", "ayoq", "ayaw ko", "ayaw kk", "naur" ]
        };

        const reactWords = {
            "😆": [ "haha", "hshs", "love", "orek", "kilalanin mo binabangga mo" ],
            "🤷": [ "idk", "hindi ko alam", "di ko alam", "alam", "san", "where", "what", "how", "when", "kailan", "kelan", "ano" ]
        };

        const messageBody = event.body.toLowerCase();

        // Reaction for exact matches
        for (const [reactEmoji, triggers] of Object.entries(reactWord)) {
            if (triggers.some(trigger => messageBody === trigger)) {
                api.setMessageReaction(reactEmoji, event.messageID, true);
            }
        }

        // Reaction for partial matches
        for (const [reactEmoji, triggers] of Object.entries(reactWords)) {
            if (triggers.some(trigger => messageBody.includes(trigger))) {
                api.setMessageReaction(reactEmoji, event.messageID, true);
            }
        }

        if (messageBody === "xavian") {
            api.sendMessage("I'm here.");
        }
    }
};
