module.exports = {
	name: 'qr',
	description: 'generate qr code image',
	args: true,
	async execute(message, args) {
        try {
            const strx = args.join(" ");
            if (!strx) return;
        
            let msg = await message.channel.send("generating code, please wait...");
           
            const qr = require("qr-image");
            var qr_svg = qr.image(`${strx}`, { type: 'png' });
            qr_svg.pipe(require('fs').createWriteStream('/temp/qr.png'))
        
            await msg.delete(); 
            await message.channel.send({
              files: ['/temp/qr.png']
            }).then(r =>{
            try {
              fs.unlink('/temp/qr.png', function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                return;
            }); 
        
          }catch(e) { return console.log("no file"); } 
          })
        } catch(e) {}

	},
};
