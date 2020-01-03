//https://discordapp.com/oauth2/authorize?client_id=595240806953123840&scope=bot&permissions=9999999999

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const colors = require("colors");
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




client.on("ready", () => {
 client.user.setPresence({game:{name: "with code"}});
  console.log("loaded".green)
});


async function sendRandomEmbed(channel,title,message,hex,image,thumbnail) {
  if(!hex || hex === 0) {
  hex = (Math.random() * 0xFFFFFF << 0).toString(16);
  } 
  if(!image && !thumbnail) {
  embed = new Discord.RichEmbed()
    .setColor(hex)
    .addField(`${title}`, `${message}`),
    await channel.sendEmbed(embed)
  }
  if(!image && thumbnail) {
    embed = new Discord.RichEmbed()
    .setColor(hex)
    .setThumbnail(`${thumbnail}`)
    .addField(`${title}`, `${message}`),
    await channel.sendEmbed(embed)
  }
  if(image) {
    embed = new Discord.RichEmbed()
    .setColor(hex)
    .setImage(`${image}`)
    .addField(`${title}`, `${message}`),
    await channel.sendEmbed(embed)
  }

}


client.on("message", async message => {
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if (command === "help") {
    let p = `${config.prefix}`
    try {
     await type(message.channel,true,3);
     var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
     await sendRandomEmbed(message.channel,"command list:",`\n For everyone: \n ${p}help \n ${p}userinfo [@user] \n ${p}avatar [@user] \n ${p}randomhex \n ${p}uptime 
     \n \n Owner Only: \n ${p}eval [code]  \n ${p}cmd [windows command]`);
     await type(message.channel,false,0);
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
    let Avatar = member.user.avatarURL
    await type(message.channel,true,3); 
    await sendRandomEmbed(message.channel,"User's Info:",`name: ${User} \n id: ${ID} \n Join Date: ${JoinedAt} \n Highest role: ${HighestRole}`,0,0,`${Avatar}`);
    return await type(message.channel,false,0);
  }

  if (command === "avatar") {
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  let Avatar = member.user.avatarURL

var mystring = `${Avatar}`;
var replace = mystring.replace(`?size=2048`,'?size=4096');
var after = `${replace}`;

  await type(message.channel,true,3);
  await sendRandomEmbed(message.channel,"Avatar:",`${after}`,0,`${after}`);
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
        message.channel.send("this was made owner only in case of abuse");
        return;
      }
      try {
        const code = args.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        
        await message.channel.send(clean(evaled), {
          code: "xl"
        });
      } catch (err) {
        await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }

    if (command === "cmd") {
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
            return await message.channel.send("note: (ignore blank errors/outputs)\n" + `\`\`\`cmd\n${output}\n\`\`\``);
          }
  ls(`${code}`);
  }

    if(command === "yiff") {
      const strx = args.join(" ");
      try{ 
      await yiff.e621.CubFilter(`${strx}`).then(async(r) => {
        var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
        const embed = new Discord.RichEmbed()
            .setColor(RandomNoHash)
            .setAuthor("e621")
            .setImage(r.image)
            .setFooter(`Artist: ${r.artist.join(" ")} | Score: ${r.score} | Fav. Count: ${r.fav_count} | ID: ${r.postID}`);
        return await message.channel.send(embed);
    });
  } catch(e) {
    message.channel.send("sorry i couldnt find those tags :(");
    return;
  }
  };



  if (command === "die") {
    if (message.author.id !== config.owner) {
     message.channel.send("no");
     return;
    }
  type(message.channel,true,3);
  message.channel.send(":(").then(async(r) => { 
    await type(message.channel,false,0);
    await sleep(100);
    await process.exit(0);
  });
  }

  if(command === "yiffspamdm") {
    if (message.author.id !== config.owner) {
      message.channel.send("this was made owner only in case of abuse");
      return;
    }
    let member = message.mentions.members.first();
    const strx = args.slice(1).join(' ');
    message.channel.send(`spamming yiff to <@${member.id}>`);
    setInterval(async () => {
    await yiff.e621.CubFilter(`${strx}`).then(async(r) => {
      var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
      const embed = new Discord.RichEmbed()
          .setColor(RandomNoHash)
          .setAuthor("e621")
          .setImage(r.image)
          .setFooter(`Artist: ${r.artist.join(" ")} | Score: ${r.score} | Fav. Count: ${r.fav_count} | ID: ${r.postID}`);
      return await member.send(embed);
  });
    }, 1000)
  }

  if(command === "spamdm") {
    if (message.author.id !== config.owner) {
      message.channel.send("this was made owner only in case of abuse");
      return;
    }
    let member = message.mentions.members.first();
    const strx = args.slice(1).join(' ');
    message.channel.send(`spamming <@${member.id}>`);
    try {
    setInterval(async () => {
      return await member.send(`${strx}`);
    }, 1000);
  } catch(e) {
    await message.channel.send(`${e.message}`);
    return;
  }
  }

  if(command === "uptime") {

 type(message.channel,true,3);
 async function duration(ms) {
  const sec = Math.floor((ms / 1000) % 60).toString();
  const min = Math.floor((ms / (1000 * 60)) % 60).toString();
  const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
  const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
  return await `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds, `;
}
 
message.channel.send(`I have been online for: ${duration(client.uptime)}`)
}


});

try {
  process.on('unhandledRejection', async (err) => await console.log(`error code\n${err.stack}\n also heres a smiley thing: "o_O"\nprobably will fix error next week :^)`));
} catch (e) {
  console.log(e);
};


client.login(config.token)