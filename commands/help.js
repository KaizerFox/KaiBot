module.exports = {
    name: 'help',
    description: 'help command',
    execute(message) {
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
                string = string + `${file.replace('.js', '')}, `;
            });

            message.channel.send(string);
        });

        

    },
};
