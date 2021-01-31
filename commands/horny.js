module.exports = {
    name: 'horny',
    description: 'horny %',
    async execute(message) {

        const config = require('./../config.json');
        member = message.mentions.members.first();
        if (!member) {
          member = args.join(" ");
        }
  
        if (`${member}` === `<@${config.owner}>`) {
          return await message.channel.send(`${member} is **100%** horny`);
        }

        await message.channel.send(`${member} is **${Math.floor(Math.random() * 100) + 1}%** horny`);

    },
};
