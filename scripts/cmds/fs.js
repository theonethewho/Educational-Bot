const fs = require('fs');

module.exports = {
    config: {
        name: "fs",
        role: 2,
        author: "Micazhla",
        longDescription: "Get file"
    },
    onStart: async function ({ message, api, event, args }) {
        const file = args[0];
        const filePath = `scripts/cmds/${file}.js`;

        const getFile = fs.readFileSync(filePath, 'utf8');
        message.reply(getFile);
    }
};
