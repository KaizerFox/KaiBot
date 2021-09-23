const path = require('path');

module.exports = {
	name: 'sexflag',
	description: 'Turns any image into a sexuality!!!!! uwu',
	args: true,
	execute(message, args) { 
		if (message.attachments.size > 0) {
			let request = require(`request`);
			let fs = require('fs');
			var imgSent = (message.attachments).array();

			   request.get(imgSent.proxyURL)
            .on('error', console.error)
            .pipe(fs.createWriteStream(`Img-${Date.now()}`));//The "Img-${Date.now}" Guarantees Unique file names.
    }  

	},
};
