module.exports = {
	name: 'say',
	description: 'say something',
	async execute(message, args) {

		let strx = args.join(" ");

		return await message.channel.send(`${strx}`);
	},
};
