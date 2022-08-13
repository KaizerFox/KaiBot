module.exports = {
    name: 'help',
    description: 'help command',
    execute(message) {
        const config = require("./../config.json");

        const fs = require('fs');

        // directory path
        const dir = './commands/';

        // list all files in the directory
        fs.readdir(dir, (err, files) => {
            if (err) {
                throw err;
            }

            let string = ""

            // files object contains all files names
            // log them on console
            files.forEach(file => {
                string = string + `${config.prefix}` + `${file.replace('.js', '')}\n `;
            });

            message.channel.send(`${string} \n or visit https://kaizer.ga`);
        });

        

    },
};
