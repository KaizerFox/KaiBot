module.exports = {
	name: 'randomstring',
	description: 'Generate a random string',
	async execute(message) {
        var crypto = require("crypto");
        var id = crypto.randomBytes(20).toString('hex');
        var st = id.toString()
        await type(message.channel,true,3);
        await message.channel.send("" + st);
        return await type(message.channel,false,0);
	},
};
