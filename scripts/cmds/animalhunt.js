module.exports.config = {
  name: "animalhunt",
  version: "1.0.0",
  role: 0,
  author: "Mirai Team",
  longDescription: "Hunt animals!",
  category: "Economy",
  countDown: 20
};

module.exports.onStart = async ({ event, api, message, usersData }) => {
  const { threadID, messageID } = event;
  const animals = [
  { name: "Deer", emoji: "🦌" },
  { name: "Rabbit", emoji: "🐇" },
  { name: "Fox", emoji: "🦊" },
  { name: "Bear", emoji: "🐻" },
  { name: "Squirrel", emoji: "🐿️" },
  { name: "Bug", emoji: "🪳" },
  { name: "Worm", emoji: "🪱" },
  { name: "Dog", emoji: "🦮" },
  { name: "Sloth", emoji: "🦥" },
  { name: "Buffalo", emoji: "🐃" },
  { name: "Sheep", emoji: "🐑" },
  { name: "Peacock", emoji: "🦚" },
  { name: "Mosquito", emoji: "🦟" },
  { name: "Parrot", emoji: "🦜" },
  { name: "Crab", emoji: "🦀" },
  { name: "Shark", emoji: "🦈" },
  { name: "Pufferfish", emoji: "🐡" }
  ];
  const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
  const animalEmoji = randomAnimal.emoji;
  const coin = Math.floor(Math.random() * 50000)
  const userCoin = await usersData.get(event.senderID, "money")

  await usersData.set(event.senderID, { money: userCoin + coin })
  message.reply(`You went hunting and caught a ${randomAnimal.name} ${animalEmoji}!\n\nYou recieved ${coin} coins.`);
};
