module.exports = {
  config: {
    name: "name",
    role: 0,
    author: "Hiro",
    longDescription: "Change your name??",
    category: "Fun"
  },
  onStart: async function ({ usersData, event, args, message }) {
    const name = args.join(" ");
    await usersData.set(event.senderID, { name: name });
    message.reply(`Successful! Your name now is ${name}`);
  }
};