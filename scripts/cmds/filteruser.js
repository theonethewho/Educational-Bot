function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

module.exports = {
    config: {
        name: "filteruser",
        version: "2.0",
        author: "NTKhang — Annaleiah",
        countDown: 5,
        role: 1,
        description: {
            vi: "lọc thành viên nhóm theo số tin nhắn hoặc bị khóa acc",
            en: "filter group members by number of messages or locked account"
        },
        category: "box chat",
        guide: {
            vi: "   {pn} [<số tin nhắn> | die | clear | stats | listadd <userID> | setcount <userID> <number>]",
            en: "   {pn} [<number of messages> | die | clear | stats | listadd <userID> | setcount <userID> <number>]"
        }
    },

    langs: {
        vi: {
            needAdmin: "⚠ | Vui lòng thêm bot làm quản trị viên của box để sử dụng lệnh này",
            confirm: "⚠ | Bạn có chắc chắn muốn xóa thành viên nhóm có số tin nhắn nhỏ hơn %1 không?\nThả cảm xúc bất kì vào tin nhắn này để xác nhận",
            kickByBlock: "✅ | Đã xóa thành công %1 thành viên bị khóa acc",
            kickByMsg: "✅ | Đã xóa thành công %1 thành viên có số tin nhắn nhỏ hơn %2",
            kickError: "❌ | Đã xảy ra lỗi không thể kick %1 thành viên:\n%2",
            noBlock: "✅ | Không có thành viên nào bị khóa acc",
            noMsg: "✅ | Không có thành viên nào có số tin nhắn nhỏ hơn %1",
            clearSuccess: "✅ | Đã xóa tất cả số tin nhắn đã được đếm.",
            stats: "📊 | Thống kê số tin nhắn:\n%1",
            listAddSuccess: "✅ | Đã thêm thành viên với ID %1 vào danh sách ngoại lệ.",
            listAddError: "❌ | Đã xảy ra lỗi khi thêm thành viên với ID %1 vào danh sách ngoại lệ.",
            setCountSuccess: "✅ | Đã đặt số tin nhắn cho thành viên với ID %1 thành %2.",
            setCountError: "❌ | Đã xảy ra lỗi khi đặt số tin nhắn cho thành viên với ID %1."
        },
        en: {
            needAdmin: "⚠ | Please add the bot as a group admin to use this command",
            confirm: "⚠ | Are you sure you want to delete group members with less than %1 messages?\nReact to this message to confirm",
            kickByBlock: "✅ | Successfully removed %1 members unavailable account",
            kickByMsg: "✅ | Successfully removed %1 members with less than %2 messages",
            kickError: "❌ | An error occurred and could not kick %1 members:\n%2",
            noBlock: "✅ | There are no members who are locked acc",
            noMsg: "✅ | There are no members with less than %1 messages",
            clearSuccess: "✅ | Successfully cleared all counted messages.",
            stats: "📊 | Message count statistics:\n%1",
            listAddSuccess: "✅ | Successfully added member with ID %1 to the exception list.",
            listAddError: "❌ | An error occurred while adding member with ID %1 to the exception list.",
            setCountSuccess: "✅ | Successfully set the message count for member with ID %1 to %2.",
            setCountError: "❌ | An error occurred while setting the message count for member with ID %1."
        }
    },

    onStart: async function ({ api, args, threadsData, message, event, commandName, getLang }) {
        const threadData = await threadsData.get(event.threadID);
        if (!threadData.adminIDs.includes(api.getCurrentUserID()))
            return message.reply(getLang("needAdmin"));

        if (args[0] === "clear") {
            for (const member of threadData.members) {
                member.count = 0;
            }
            await threadsData.set(event.threadID, { members: threadData.members });
            return message.reply(getLang("clearSuccess"));
        }

        if (args[0] === "stats") {
            let statsMessage = '';
            for (const member of threadData.members) {
                statsMessage += `${member.name}: ${member.count} messages\n`;
            }
            return message.reply(getLang("stats", statsMessage));
        }

        if (args[0] === "listadd") {
            const userID = args[1];
            if (!userID) {
                return message.SyntaxError();
            }
            try {
                let exceptionList = threadData.exceptionList || [];
                if (!exceptionList.includes(userID)) {
                    exceptionList.push(userID);
                    threadData.exceptionList = exceptionList;
                    await threadsData.set(event.threadID, { exceptionList });
                    return message.reply(getLang("listAddSuccess", userID));
                } else {
                    return message.reply(getLang("listAddSuccess", userID));
                }
            } catch (error) {
                return message.reply(getLang("listAddError", userID));
            }
        }

        if (args[0] === "setcount") {
            const userID = args[1];
            const count = parseInt(args[2], 10);

            if (!userID || isNaN(count)) {
                return message.SyntaxError();
            }

            try {
                let member = threadData.members.find(member => member.userID == userID);
                if (member) {
                    member.count = count;
                    await threadsData.set(event.threadID, { members: threadData.members });
                    return message.reply(getLang("setCountSuccess", userID, count));
                } else {
                    return message.reply(getLang("setCountError", userID));
                }
            } catch (error) {
                return message.reply(getLang("setCountError", userID));
            }
        }

        if (!isNaN(args[0])) {
            message.reply(getLang("confirm", args[0]), (err, info) => {
                global.GoatBot.onReaction.set(info.messageID, {
                    author: event.senderID,
                    messageID: info.messageID,
                    minimum: Number(args[0]),
                    commandName
                });
            });
        } else if (args[0] == "die") {
            const threadData = await api.getThreadInfo(event.threadID);
            const membersBlocked = threadData.userInfo.filter(user => user.type !== "User");
            const errors = [];
            const success = [];
            for (const user of membersBlocked) {
                if (user.type !== "User" && !threadData.adminIDs.some(id => id == user.id)) {
                    try {
                        await api.removeUserFromGroup(user.id, event.threadID);
                        success.push(user.id);
                    } catch (e) {
                        errors.push(user.name);
                    }
                    await sleep(700);
                }
            }

            let msg = "";
            if (success.length > 0)
                msg += `${getLang("kickByBlock", success.length)}\n`;
            if (errors.length > 0)
                msg += `${getLang("kickError", errors.length, errors.join("\n"))}\n`;
            if (msg == "")
                msg += getLang("noBlock");
            message.reply(msg);
        } else
            message.SyntaxError();
    },

    onReaction: async function ({ api, Reaction, event, threadsData, message, getLang }) {
        const { minimum = 1, author } = Reaction;
        if (event.userID != author)
            return;
        const threadData = await threadsData.get(event.threadID);
        const botID = api.getCurrentUserID();
        const membersCountLess = threadData.members.filter(member =>
            member.count < minimum
            && member.inGroup == true
            // ignore bot and admin box
            && member.userID != botID
            && !threadData.adminIDs.some(id => id == member.userID)
            && (!threadData.exceptionList || !threadData.exceptionList.includes(member.userID))
        );
        const errors = [];
        const success = [];
        for (const member of membersCountLess) {
            try {
                await api.removeUserFromGroup(member.userID, event.threadID);
                success.push(member.userID);
            } catch (e) {
                errors.push(member.name);
            }
            await sleep(700);
        }

        let msg = "";
        if (success.length > 0)
            msg += `${getLang("kickByMsg", success.length, minimum)}\n`;
        if (errors.length > 0)
            msg += `${getLang("kickError", errors.length, errors.join("\n"))}\n`;
        if (msg == "")
            msg += getLang("noMsg", minimum);
        message.reply(msg);
    },

    onChat: async ({ usersData, threadsData, event }) => {
        const { senderID, threadID } = event;
        const threadData = await threadsData.get(threadID);
        const members = threadData.members || [];
        const findMember = members.find(user => user.userID == senderID);

        if (!findMember) {
            members.push({
                userID: senderID,
                name: await usersData.getName(senderID),
                nickname: null,
                inGroup: true,
                count: 1
            });
        } else {
            findMember.count += 1;
        }
        await threadsData.set(threadID, { members });
    }
};
