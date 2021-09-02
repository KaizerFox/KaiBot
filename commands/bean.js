module.exports = {
	name: 'bean',
	description: 'bean someone',
	args: true,
	async execute(message, args) {

        
        member = message.mentions.members.first();
        if (!member) {
          member = args.join(" ");
        }

		try {
            member.setNickname(`(beaned)` + ` ${member.displayName}`);
            await message.channel.send(`✅ Sucessfully Beaned ${member}`);
            return;
            } catch(e){ 
                try { 
                member.setNickname(`(beaned)` + ` ${member.user.username}`); 
                await message.channel.send(`✅ Sucessfully Beaned, ${member} but used username cause of length`);
                return;
            } catch(e) {
                message.channel.send(`Cannot bean because: ${e.message}`);
                return;
            }
            }
	},
};
