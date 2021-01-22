module.exports = {
	name: 'stats',
	description: 'shows bot stats',
	execute(message, args, client) {

        const Discord = require('./../node_modules/discord.js');
        const owoify = require('./../node_modules/owoify-js').default;

        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const cpu = require('os').cpus().map(i => i.model);
        const cpuLength = cpu.length;
        const cpuType = cpu[0];
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.round(totalSeconds % 60);
        let member = message.author
        var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
        var channels = message.guild.channels.cache.filter(c => c.type === 'text').size
        var vchannels = client.channels.cache.filter(c => c.type === 'voice').size
        const oper = require('os').platform
        const PID = process.pid;
        let owoifyname = owoify(`${member.username}`,"uwu"); 
  
        const embed = new Discord.MessageEmbed()
          .setTitle("📊 Bot Stats - Click To Invite")
          .setURL(`https://discordapp.com/oauth2/authorize?client_id=670312397688537109&scope=bot&permissions=8`)
          .setColor(RandomNoHash)
          .addField("Guild Count", `${client.guilds.size}`, true)
          .addField("User Count", `${client.users.size}`, true)
          .addField("Channels", `Text: ${channels} \n Voice: ${vchannels}`, true)
          .addField("Processor", `${cpuLength}x ${cpuType}`, true)
          .addField("Memory usage", `${memoryUsage}MB`, true)
          .addField("Operating System", `${oper}`,true)
          .addField("Uptime", `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`, true)
          .addField("Process Id", `${PID}`,true)
          .setTimestamp()
          .setFooter(`requested by ${owoifyname}`, member.displayAvatarURL)
  
         message.channel.send({ embed });

        //return message.channel.send(`Guild count: ${client.guilds.size} \n User count: ${client.users.size}`);
    
	},
};
