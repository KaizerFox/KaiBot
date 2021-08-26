module.exports = {
	name: 'gay',
	description: 'gay',
	execute(message, args) {

        const config = require('./../config.json');

        async function type(channel,bool,number) {	
            if(`${bool}` === `true`) {
            return await channel.startTyping(`${number}`); 
            }
            if(`${bool}` === `false`) { 
            return await channel.stopTyping(true);	
            }	
        }

        member = message.mentions.members.first();
        if (!member) {
          member = args.join(" ");
        }
    
    
        if (`${member}` === `<@${config.owner}>`) {
          type(message.channel,true,3);
          message.channel.send(`${member} is **109%** gay`);
          return type(message.channel,false,0);
        }
    
      
    type(message.channel,true,3);
    message.channel.send(`${member} is **${Math.floor(Math.random() * 1000) + 1}%** gay`);
    return type(message.channel,false,0);
         
	},
};
