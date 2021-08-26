module.exports = {
	name: 'randomstring',
	description: 'Generate a random string',
	async execute(message) {
        var crypto = require("crypto");
        var id = crypto.randomBytes(20).toString('hex');
        var st = id.toString()
        await message.channel.send("" + st);
	},
};
