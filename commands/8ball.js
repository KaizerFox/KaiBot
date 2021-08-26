module.exports = {
	name: '8ball',
	description: '8ball command idk',
	async execute(message, args) {

        const Discord = require('./../node_modules/discord.js');
        const owoify = require('./../node_modules/owoify-js').default;

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

            var fortunes = [
              "It is certain.",
              "It is decidedly so.",
              "Without a doubt.",
              "Yes - definitely.",
              "You may rely on it.",
              "As I see it, yes.",
              "Most likely.",
              "Outlook good.",
              "Yes.",
              "Signs point to yes.",
              "Reply hazy, try again.",
              "Ask again later.",
              "Better not tell you now.",
              "Cannot predict now.",
              "Concentrate and ask again.",
              "Don't count on it.",
              "My reply is no.",
              "My sources say no.",
              "Outlook not so good.",
              "Very doubtful."
            ]
        
            // const args = args.join(" ");
            if (!args[2]) {
              return message.channel.send("Ask a **FUWW** questiowon ;;w;;");
            }
        
            let owoball = owoify(`${fortunes[Math.floor(Math.random() * fortunes.length)]}`,"uwu");
        
            await sendRandomEmbed(message.channel, `🎱 Magic 8baww`, `${owoball}`, 0x0000FF);
  

	},
};
