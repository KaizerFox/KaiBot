module.exports = {
	name: 'cmd',
	description: 'cmd command',
	async execute(message, args) {

        function sleep(delay) {
            var start = new Date().getTime();
            while (new Date().getTime() < start + delay);
          }

        const config = require('./../config.json');

        let ownerID = `${config.owner}`
        if (message.author.id !== ownerID) {
          return;
        }
  
    let code = args.join(" ");
    
      const util = require('util');
            const exec = util.promisify(require('child_process').exec);
    
            async function ls(b) {
              const {
                stdout,
                stderr
              } = await exec(`${b}`);
              if (`${stdout}` == "") {
                if (`${stderr}` !== "") {
                  output = stderr;
                } else {
                  output = "output: " + stdout;
                }
              } else {
                output = "output: " + stdout;
              }
              if (`${stdout}` == "" | `${stderr}` == "") {
                output = "output: " + stdout + "\n error: " + stderr;
              }
              sleep(3);
              return await message.channel.send("note: (ignore blank errors/outputs)\n" + `\`\`\`cmd\n${output}\n\`\`\``);
            }
    ls(`${code}`);

	},
};
