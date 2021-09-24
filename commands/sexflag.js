const path = require('path');

module.exports = {
    name: 'sexflag',
    description: 'Turns any image into a sexuality!!!!! uwu',
    args: true,
    execute(message, args) { 
        if (message.attachments.size === 1) {
            var extension = message.attachment.contentType
            if(extension == "png" || extension == "jpg" || extension == "jpeg" || extension == "webp") {
                fs.writeFileSync(`./${a.name}`, a.file)
            }
        }  

    },
};
