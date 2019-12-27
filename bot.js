//VERSION = 14.7

//https://discordapp.com/oauth2/authorize?client_id=595240806953123840&scope=bot&permissions=9999999999

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const rp = require('discord-rich-presence')('');
const colors = require('colors');
const async = require("async");
const asyncio = require("asyncio");
const util = require("util");
const io = require('@pm2/io');
let yiff = require('yiff');

const die = require("discord.js/src/util/Constants.js");
die.DefaultOptions.ws.properties.$browser = `Discord Android`;

//get cucked discord

io.init({
  metrics: {
    network: {
      ports: true
    }
  }
});

function sleep(delay) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

var http = require('https');
var fs = require('fs');

async function type(channel,bool,number) {	
if(`${bool}` === `true`) {
return await channel.startTyping(`${number}`); 
}
if(`${bool}` === `false`) { 
return await channel.stopTyping(true);	
}	
}

function clean(text) {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

//to type do function: type(message.channel,true,3)
//stop typing is: type(message.channel,false,0)

let ownerID = `${config.owner}`;



client.on("ready", () => {
 client.user.setPresence({game:{name: "with code"}});
  console.log("loaded".green)
});

function sendCodeBlock(channel,message,lang,MessageBefore) {
if(`${lang}` === "") { lang = "xl"; }
if(`${MessageBefore}` !== "") { channel.send(`${MessageBefore}`); }
channel.send("```" + lang + "\n" + "" +  message + "\n```");	
}

async function sendRandomEmbed(channel,title,message,hex) {
  if(!hex) {
  hex = (Math.random() * 0xFFFFFF << 0).toString(16);
  } 
  error = new Discord.RichEmbed()
    .setColor(hex)
    .addField(`${title}`, `${message}`),
    await channel.sendEmbed(error)
}

client.on("message", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if (command === "help") {
    if (config.selfbot === "true") {
      if (message.author.id !== config.owner) {
        return;
      }
    }
    let blacklist = `${config.blacklist}`
    if (message.author.id == blacklist) {
      return;
    }
    try {
  await type(message.channel,true,3);
  var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
  await sendRandomEmbed(message.channel,"command list:",`\n ~help \n ~userinfo \n ~avatar \n ~randomhex \n ~eval`);
	await type(message.channel,false,0)
      return;
    } catch (e) {
      return;
    }
  }

  if (command === "userinfo") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member) {
      await type(message.channel,true,3);
      await message.reply("usage: !userinfo [@user]");
      return await type(message.channel,false,0);
    }
    let User = member
    let ID = member.id
    let HighestRole = member.highestRole.name
    let JoinedAt = member.joinedAt
    await type(message.channel,true,3);
    await message.channel.send(`name: ${User}, id: ${ID}, Join Date: ${JoinedAt}, Highest role: ${HighestRole}, Avatar: ${Avatar}`);
    return await type(message.channel,false,0);
  }

  if (command === "avatar") {
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  let Avatar = member.user.avatarURL

var mystring = `${Avatar}`;
var replace = mystring.replace(`?size=2048`,'?size=4096');
var after = `${replace}`;

  await type(message.channel,true,3);
  await message.channel.send(`Avatar: ${after}`);
  return await type(message.channel,false,0);
  }

  if (command === "randomhex") {
    var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
  
    await type(message.channel,true,3);

    await sendRandomEmbed(message.channel,"random color hex:",`${RandomNoHash}`,RandomNoHash);
    return await type(message.channel,false,0);
    }

    if (command === "eval") {
      let ownerID = `${config.owner}`
      if (message.author.id !== ownerID) {
        return;
      }
      try {
        const code = args.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
         
        await type(message.channel,true,3);
        await message.channel.send(clean(evaled), {
          code: "xl"
        });
        return await type(message.channel,false,0);
      } catch (err) {
        await type(message.channel,true,3);
        await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        return await type(message.channel,false,0);
      }
    }

});

try {
  process.on('unhandledRejection', async (err) => await console.log(`error code\n${err.stack}\n also heres a smiley thing: "o_O"\nprobably will fix error next week :^)`));
} catch (e) {
  console.log(e);
};


client.login(config.token)