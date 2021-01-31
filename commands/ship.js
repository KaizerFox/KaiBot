module.exports = {
	name: 'ship',
	description: 'ship',
	execute(message, args) {
    
        let strx = args[0]
        if (!strx) return;
        let jtrx = args[1]
        if(!jtrx) return;
      
        var mystring = `${strx}`;
        mystring = mystring.replace(`${jtrx}`,'');
        let colnew = mystring; 
        
        return message.channel.send(`MATCH MAKING: \n ${colnew} + ${jtrx} \n **${Math.floor(Math.random() * 100) + 1}%**`);
        
	},
};
