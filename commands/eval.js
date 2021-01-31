module.exports = {
	name: 'eval',
	description: 'evaluate your life choices',
	async execute(message, args) {
        const config = require("./../config.json")
        let ownerID = `${config.owner}`

        
        function clean(text) {
            if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
            return text;
        }

        function sleep(delay) {
            var start = new Date().getTime();
            while (new Date().getTime() < start + delay);
          }

        if (message.author.id !== ownerID) {
          message.channel.send("this was made ownyew onywy iny case of abuse");
          return;
        }

        try {
          const code = args.join(" ");
          let evaled = eval(code);
    
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
          sleep(3);
          return await message.channel.send(clean(evaled), {
            code: "xl"
          });
        } catch (err) {
          console.log(err);
          sleep(3);
          return await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }

	},
};
