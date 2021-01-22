module.exports = {
	name: 'owoify',
	description: 'gay',
	execute(message, args) {

            const owoify = require('./../node_modules/owoify-js').default;
            //args start at 0 (idek)
            let m = args.slice(1).join(' ');
                if(`${args[0]}` === "1"){ //user would say owoify 1 message
                  death = owoify(`${m}`, 'owo');
                } if(`${args[0]}` === "2"){ //user would say owoify 2 message
                 death = owoify(`${m}`, 'uwu');
                } if(`${args[0]}` === "3"){ //user would say owoify 3 message 
                 death = owoify(`${m}`, 'uvu');
                } if(`${args[0]}` !== "1" && `${args[0]}` !== "2" && `${args[0]}` !== "3") { //if user says anything else but 1 2 and 3
                   death = owoify(`${m}`, 'owo');
                }
                return message.channel.send(`${death}`);
	},
};
