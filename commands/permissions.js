module.exports = {
	name: 'permissions',
	description: 'lists your perms',
	args: true,
	async execute(message) {
            let member = message.mentions.members.first()
            const util = require("util");
            if(!member) {
              
              try{
                return message.channel.send("usage: ~permissions [@user]");
              } catch(e) {
                return console.log(`couldnt send message because: ${e}`);
              }
            }

            try{
            await message.author.send(`here is a  list of permssions of ${member}'s permissions in ${message.guild.name}`);
            await message.author.send('```json\n' + util.inspect(message.channel.permissionsFor(member).serialize()) + '```');
            done = true;
            } catch(e) {
             console.log(`${e.message}`);
             return message.channel.send(`<@${message.author.id}> i must be able to dm you to prevent spam.`);
            }
            await message.channel.send(`sent a list of ${member}'s permission's to your dms, please check them.`);
	},
};
