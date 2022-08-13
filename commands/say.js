module.exports = {
	name: 'say',
	description: 'say something',
	async execute(message, args) {

		const Util = require('../node_modules/discord.js/src/util/Util.js');

		let strx = args.join(" ");
		const msg = Util.removeMentions(strx);

		return await message.channel.send(`${msg}`);
	},
};
