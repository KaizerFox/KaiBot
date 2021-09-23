module.exports = {
	name: 'sexflag',
	description: 'Turns any image into a sexuality!!!!! uwu',
	args: true,
	execute(message, args) { 
		if (message.attachments.size > 0) {
    message.channel.send(`${message.author} sent an image!`);
    message.channel.send('This constitutes revelry and merriment and is strictly outlawed!')
    message.delete();
}

		);
	},
};
