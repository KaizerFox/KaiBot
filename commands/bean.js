module.exports = {
	name: 'bean',
	description: 'bean someone',
	args: true,
	async execute(message, args) {

        
        member = message.mentions.members.first();
        if (!member) {
          member = args.join(" ");
        }

		member.setNickname(`(beaned)` + ` ${member.displayName}`);
        await message.channel.send(`✅ Sucessfully Beaned ${member}`);
	},
};
