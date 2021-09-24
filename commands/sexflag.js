
const path = require('path');
const fs = require('fs');

module.exports = {
	name: 'sexflag',
	description: 'Turns any image into a sexuality!!!!! uwu',
	args: true,
	execute(message, args) { 
		if (message.attachments.size > 0) {
			if (message.attachments.every(attachIsImage)){
				fs.writeFileSync(`./${a.name}`, a.file)
			}
		}
	},
};


function attachIsImage(msgAttach) {
    var url = msgAttach.url;
    //True if this url is a png image.
    return url.indexOf("png", url.length - "png".length /*or 3*/) !== -1;
}

