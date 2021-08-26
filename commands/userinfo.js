module.exports = {
	name: 'userinfo',
	description: 'Display info about yourself or other users',
	async execute(message) {

		const Discord = require('./../node_modules/discord.js');

		let member = message.mentions.members.first()
		if (!member) {
		  await message.reply("usage: !userinfo [@user]");
		  return await type(message.channel,false,0);
		}

		let User = member.user
		let UserName = member.user.username
		let Color = member.displayHexColor
		let ID = member.id
		let JoinedAt = member.joinedAt
	  
		if(member.user.bot == false) {
		  emo = "❌";
		} else {
		  emo = "✅";
		}
	  
			const embed = new Discord.MessageEmbed()
				.setColor(`${Color}`)
				.setTitle(`${UserName}'s Info`)
				.setThumbnail(member.user.displayAvatarURL({
					"format": "png",
					"dynamic": true,
					"size": 4096
					}))
				.setFooter(`bot account: ${emo}`)
				.setDescription(`
				• Nickname: ${member.nickname}
				• ID: ${ID}
				• Join Date: ${JoinedAt} 
				• Created at: ${User.createdAt}
				• Status: ${User.presence.status}
				• Game: ${User.presence.game ? User.presence.game.name : 'None'}`);
			return await message.channel.send(embed);
		//await type(message.channel,true,3); 
		//await sendRandomEmbed(message.channel,"User's Info:",`name: ${User} \n id: ${ID} \n Join Date: ${JoinedAt} \n Highest role: ${HighestRole}`);
		//return await type(message.channel,false,0);

	},
};
