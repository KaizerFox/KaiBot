module.exports = {
	name: 'reload',
	description: 'reload a command so i dont have to restart the bot',
	execute(message, args) {
		const config = require('./../config.json');

		let ownerID = `${config.owner}`
		if (message.author.id !== ownerID) {
		  return message.channel.send("this command is owner only go fuck yourself with a giant dildo, have a great day :)");
		}
	
		const path = require('path');
	    delete require.cache[require.resolve(path.join(process.cwd(), 'commands',args[0]+'.js'))];
		return message.channel.send(`reloaded ${args[0]}.js successfully`);
		
	},
};
