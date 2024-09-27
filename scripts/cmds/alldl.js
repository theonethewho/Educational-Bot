module.exports = {
config: {
name: "alldl",
author: "Jun",
role: 0,
countDown: 2,
category: "Media"
},
onStart: async function ({ message, args }) {
const url = args[0];
if (!url || !url.startsWith("https")) {
return message.reply("please provide a valid url");
}
try {
message.reply({
attachment: await global.utils.getStreamFromURL(await Download_Video(url))
});
} catch (error) {
message.reply(`Error: ${error}`);
}
}
};
async function Download_Video(url) {
  try {
    const response = await require("axios").get(`https://tanvir-dot.onrender.com/scrape/download`, {
      params: { url }
    });
    return response.data.formats[0].url;
  } catch (error) {
    throw new Error(error.message);
  }
}
