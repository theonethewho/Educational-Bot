module.exports = {
    config: {
        name: "owner",
        role: 0,
        author: "Micazhla",
        aliases: ["own", "master"],
        longDescription: "See owner name and link"
    },
    onStart: async function ({ message, api, event }) {
        const msg = "Name: Micazhla Javhiuor\nAge: 15\nHobby: Coding\nStatus: Single\nLink: https://www.facebook.com/profile.php?id=61557494398506";

        message.reply(msg);
    }
};
