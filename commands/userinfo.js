const path = require('path');
const fs = require('fs');
const axios = require('axios');
const ColorThief = require('color-thief-node');
const Jimp = require('jimp');

module.exports = {
    name: 'sexflag',
    description: 'Turns any image into a sexuality!!!!! uwu',
    args: true,
    async execute(message, args) { 
        const avatarUrl = message.member.user.displayAvatarURL({
            "format": "png",
            "dynamic": true,
            "size": 4096
        });

        const colors = await ColorThief.getPaletteFromURL(avatarUrl, 3, true);
        const flag = await new Jimp(500, 500);
        for (let i = 0; i < 3; i++) {
            flag.scan(0, i * 500 / 3, 500, 500 / 3, (x, y, idx) => {
                flag.bitmap.data[idx + 0] = colors[i][0];
                flag.bitmap.data[idx + 1] = colors[i][1];
                flag.bitmap.data[idx + 2] = colors[i][2];
                flag.bitmap.data[idx + 3] = 255;
            });
        }
        const flagPath = `./temp/flag_${message.member.user.id}.png`;
        await flag.writeAsync(flagPath);

        // Send the flag image back to the user.
        await message.channel.send({ files: [flagPath] });

        // Delete the temporary file.
        fs.unlinkSync(flagPath);
    },
};
