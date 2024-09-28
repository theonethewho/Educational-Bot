module.exports = {
  config: {
    name: "listmembers",
    role: 0,
    author: "Micazhla",
    longDescription: "Lists all members in the current thread"
  },
  onStart: async function ({ api, event, message }) {
    const { threadID } = event;

    try {
      const threadInfo = await api.getThreadInfo(threadID);
      const participantIDs = threadInfo.participantIDs;
      const userInfoPromises = participantIDs.map(id => api.getUserInfo(id));
      const usersInfo = await Promise.all(userInfoPromises);

      const memberList = participantIDs.map(id => {
        const userInfo = usersInfo.find(info => info[id]);
        return userInfo ? `${userInfo[id].name}` : `Unknown`;
      }).join("\n");

      message.send(`Members in this thread:\n${memberList}`);
    } catch (error) {
      console.error(error);
      message.send("An error occurred while fetching the thread members.");
    }
  }
};
