//https://discordapp.com/oauth2/authorize?client_id=595240806953123840&scope=bot&permissions=9999999999

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const colors = require("colors");
const io = require('@pm2/io');
let yiff = require('yiff');
const weather = require("weather-js");
const memer = require("discordmeme.js");

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
      let User = member.user
      let UserName = member.user.username
      let Color = member.displayHexColor
        let ID = member.id
      let Avatar = member.user.avatarURL
      let HighestRole = member.highestRole.name
      let JoinedAt = member.joinedAt
    
      if(member.user.bot == false) {
        emo = "❌";
      } else {
        emo = "✅";
      }
    
          const embed = new Discord.RichEmbed()
              .setColor(`${Color}`)
              .setThumbnail(`${Avatar}`)
              .setTitle(`${UserName}'s Info`)
              .setFooter(`bot account: ${emo}`)
              .setDescription(`• Nickname: ${member.nickname}
              • ID: ${ID}
              • Join Date: ${JoinedAt} 
              • Created at: ${User.createdAt}
              • Highest role: ${HighestRole}
              • Status: ${User.presence.status}
              • Game: ${User.presence.game ? User.presence.game.name : 'None'}`);
          return await message.channel.send(embed);
      //await type(message.channel,true,3); 
      //await sendRandomEmbed(message.channel,"User's Info:",`name: ${User} \n id: ${ID} \n Join Date: ${JoinedAt} \n Highest role: ${HighestRole}`);
      //return await type(message.channel,false,0);
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
        message.channel.send("this was made ownyew onywy iny case of abuse");
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
      if(message.channel.nsfw || message.channel.type == "dm") {
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
    message.channel.send("sowwy i couwdnyt finyd those tags :(");
    return;
  } 
} else {
  message.channel.send("no");
  return;
}
};

if(command === "hook") {
  try { await message.delete(); } catch(e) { console.log(`${e.message}`); }
  try{
  const strx = args.join(" ");
  const hook = new Discord.WebhookClient(`${config.hookID}`, `${config.hookToken}`);
  await hook.send(`${strx}`);
  } catch(e) {
    console.log(`${e.message}`);
    return;
  }
  return;
}

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
      message.channel.send("this was made ownyew onywy iny case of abuse");
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
      message.channel.send("this was made ownyew onywy iny case of abuse");
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

if(command === "weather") {
  weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) { // Make sure you get that args.join part, since it adds everything after weather.
    if (err) message.channel.send(err);

    // We also want them to know if a place they enter is invalid.
    if (result.length === 0) {
        message.channel.send('**Please enter a valid location.**') // This tells them in chat that the place they entered is invalid.
        return; // This exits the code so the rest doesn't run.
    }

    // Variables
    var current = result[0].current; // This is a variable for the current part of the JSON output
    var location = result[0].location; // This is a variable for the location part of the JSON output

    // Let's use an embed for this.
    const embed = new Discord.RichEmbed()
        .setDescription(`**${current.skytext}**`) // This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
        .setAuthor(`Weather for ${current.observationpoint}`) // This shows the current location of the weather.
        .setThumbnail(current.imageUrl) // This sets the thumbnail of the embed
        .setColor(0x00AE86) // This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
        .addField('Timezone',`UTC${location.timezone}`, true) // This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
        .addField('Degree Type',location.degreetype, true)// This is the field that shows the degree type, and is inline
        .addField('Temperature',`${current.temperature} Degrees`, true)
        .addField('Feels Like', `${current.feelslike} Degrees`, true)
        .addField('Winds',current.winddisplay, true)
        .addField('Humidity', `${current.humidity}%`, true)

        // Now, let's display it when called
        message.channel.send({embed});
});
}

if (command === "meme") {
  let meme = await memer.meme()

  const embed = new Discord.RichEmbed()
  .setTitle('Random Meme')
  .setImage(meme)
  .setTimestamp()
  .setFooter(`KaiBot`, client.user.displayAvatarURL)
  
  message.channel.send(embed);
}
  
if (command === "badmeme") {
  let msg = await message.channel.send("Generating...")
    memes.generate(client,msg)
      msg.delete();
}

});

try {
  process.on('unhandledRejection', async (err) => await console.log(`error code\n${err.stack}\n also heres a smiley thing: "o_O"\nprobably will fix error next week :^)`));
} catch (e) {
  console.log(e);
};


client.login(config.token)