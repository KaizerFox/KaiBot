const path = require('path');
const fs = require("fs");

module.exports = {
    name: 'sexflag',
    description: 'Turns any image into a sexuality!!!!! uwu',
    args: true,
    execute(message, args) { 
        if (message.attachments.size === 1) {
            if(extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "webp") {
				var a = message.attachment
                fs.writeFileSync(`./${a.name}`, a.file)
			}
        }
    },
};

