module.exports = {
	name: 'randomhex',
	description: 'randomhex idk im lazy',
	async execute(message, args) {

        const Discord = require('./../node_modules/discord.js');
        
        async function sendRandomEmbed(channel,title,message,hex,image,thumbnail) {
            try {
            if(!hex || hex === 0) {
            hex = (Math.random() * 0xFFFFFF << 0).toString(16);
            } 
            if(!image && !thumbnail) {
            embed = new Discord.MessageEmbed()
              .setColor(hex)
              .addField(`${title}`, `${message}`),
              await channel.send(embed)
            }
            if(!image && thumbnail) {
              embed = new Discord.MessageEmbed()
              .setColor(hex)
              .setThumbnail(`${thumbnail}`)
              .addField(`${title}`, `${message}`),
              await channel.send(embed)
            }
            if(image) {
              embed = new Discord.MessageEmbed()
              .setColor(hex)
              .setImage(`${image}`)
              .addField(`${title}`, `${message}`),
              await channel.send(embed)
            }
          } catch(e) {
            return channel.send(`an error occured, or the bot doesnt have send embed perms: ${e.message}`);
          }
          }

        var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
    
        await sendRandomEmbed(message.channel,"random color hex:",`${RandomNoHash}`,RandomNoHash);

	},
};
