//https://discordapp.com/oauth2/authorize?client_id=670312397688537109&scope=bot&permissions=9999999999

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const colors = require("colors");
const io = require('@pm2/io');
let yiff = require('yiff');
const weather = require("weather-js");
const memer = require("discordmeme.js");
const util = require("util");
const owoify = require('owoify-js').default
const p = `${config.prefix}`;

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

function clean(text) {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

async function type(channel,bool,number) {	
if(`${bool}` === `true`) {
return await channel.startTyping(`${number}`); 
}
if(`${bool}` === `false`) { 
return await channel.stopTyping(true);	
}	
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


  if(command === "invite"){
    try{
      return await message.channel.send("<https://discordapp.com/oauth2/authorize?client_id=670312397688537109&scope=bot&permissions=9999999999>");
    } catch(e){
      return await console.log(`${e.message}`);
    }
  }

  if (command === "help") {
    try {
     await type(message.channel,true,3);
     var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
     await sendRandomEmbed(message.channel,"command list:",`\n For everyone: \n ${p}help \n ~stats \n ~ping {website} \n ~8ball [question] \n ${p}weather [zip/state initials] \n ${p}permissions [user] \n ${p}ping \n ${p}invite \n ${p}userinfo [user] \n ${p}avatar [user] \n ${p}randomhex \n ~color [hex] \n ${p}uptime \n ${p}owoify [level] [message]
     \n \n Admin Only: \n ${p}kick [user] [reason] \n ~ban [user] [reason] \n \n Owner Only: \n ${p}eval [code]  \n ${p}cmd [windows command] \n ${p}hook [message]`);
     await type(message.channel,false,0);
         return;
       } catch (e) {
         return;
       }
     }

     if (command === 'stats') {
      const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
      const cpu = require('os').cpus().map(i => i.model);
      const cpuLength = cpu.length;
      const cpuType = cpu[0];
      let totalSeconds = (client.uptime / 1000);
      let days = Math.floor(totalSeconds / 86400);
      let hours = Math.floor(totalSeconds / 3600);
      totalSeconds %= 3600;
      let minutes = Math.floor(totalSeconds / 60);
      let seconds = Math.round(totalSeconds % 60);
      let member = message.author
      var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
      var channels = client.channels.filter(c => c.type === 'text').size
      var vchannels = client.channels.filter(c => c.type === 'voice').size
      let owoifyname = owoify(`${member.username}`,"uwu"); 
      let owoifyCpuLength = owoify(`${cpuLength}`,"owo")
      let owoifyCpuType = owoify(`${cpuType}`,"owo")

      const embed = new Discord.RichEmbed()
        .setTitle("📊 Bwowot Stats - Invite")
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=670312397688537109&scope=bot&permissions=9999999999`)
        .setColor(RandomNoHash)
        .addField("Guiwd Cwount", `${client.guilds.size}`, true)
        .addField("Usew Cwount", `${client.users.size}`, true)
        .addField("Channyews", `Text: ${channels} \n Voice: ${vchannels}`, true)
        .addField("Pwocesswow", `${owoifyCpuLength}x ${owoifyCpuType}`, true)
        .addField("Mwemwowwy usage", `${memoryUsage}MB`, true)
        .addField("Uptimwe", `${days} days, ${hours} hwouws, ${minutes} minyutes and ${seconds} secwonds`, true)
        .setTimestamp()
        .setFooter(`Wequested by ${owoifyname}`, member.displayAvatarURL)
      message.channel.send({ embed });
      //return message.channel.send(`Guild count: ${client.guilds.size} \n User count: ${client.users.size}`);
  
    }

    
  if (command === "8ball") {
    var fortunes = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes - definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "Very doubtful."
    ]

    // const args = args.join(" ");
    if (!args[2]) {
      return message.channel.send("Ask a **FUWW** questiowon ;;w;;");
    }

    let owoball = owoify(`${fortunes[Math.floor(Math.random() * fortunes.length)]}`,"uwu");

    await sendRandomEmbed(message.channel, `🎱 Magic 8baww`, `${owoball}`, 0x0000FF);
  }

     if (command === "owoify") {
      //args start at 0 (idek)
      let m = args.slice(1).join(' ');
      try {
          if(`${args[0]}` === "1"){ //user would say owoify 1 message
            death = owoify(`${m}`, 'owo');
          } if(`${args[0]}` === "2"){ //user would say owoify 2 message
           death = owoify(`${m}`, 'uwu');
          } if(`${args[0]}` === "3"){ //user would say owoify 3 message 
           death = owoify(`${m}`, 'uvu');
          } if(`${args[0]}` !== "1" && `${args[0]}` !== "2" && `${args[0]}` !== "3") { //if user says anything else but 1 2 and 3
             death = owoify(`${m}`, 'owo');
          }
          return await message.channel.send(`${death}`);
         } catch (e) {
           return;
         }
       }

       if (command === "ban") {

        if (!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")
    
        if (message.author.id !== config.owner) {
          if (!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) {
            await type(message.channel, true, 3);
            var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
            error = new Discord.RichEmbed()
              .setColor(RandomNoHash)
              .addField("Error", "Sorry, you don't have permissions to use this!"),
              await message.channel.sendEmbed(error)
            await type(message.channel, false, 0)
            return;
          }
        }
    
    
    
        let member = message.mentions.members.first() || message.guild.members.get(args[0])
        if (!member) return message.channel.send("Please provide a user to Ban!")
    
        if (`${message.author.id}` === `${member.id}`) {
          await type(message.channel, true, 3);
          await message.channel.send("I'm not sure why you would ban yourself");
          return await type(message.channel, false, 0);
        }
    
        if (`${member.id}` === `${config.owner}`) {
          await type(message.channel, true, 3);
          await message.channel.send("you can't ban the bot owner.");
          return await type(message.channel, false, 0);
        }
    
    
        if (!member.bannable) {
          await type(message.channel, true, 3);
          await message.channel.send("guild member is too powerful!");
          return await type(message.channel, false, 0);
        }
    
        let reason = args.slice(1).join(' ');
        if (!reason) {
          reason = "No reason provided";
        }
    
        await member.ban(reason)
          .catch(async (error) => {
            await type(message.channel, true, 3);
            message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`)
            await type(message.channel, false, 0);
          });
    
        await sendRandomEmbed(message.channel, `Ban Event`, `${member} has been banned by ${message.author} \n reason: ${reason}`, 0xFF0000)
        return;
      }
    
      if (command === "kick") {
    
    
        if (message.author.id !== config.owner)
          if (!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")
    
    
        if (!message.guild.me.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to do this!")
    
        let kickMember = message.mentions.members.first() || message.guild.members.get(args[0])
        if (!kickMember) return message.channel.send("Please provide a user to Kick!")
    
        if (`${message.author.id}` === `${kickMember.id}`) {
          await type(message.channel, true, 3);
          await message.channel.send("i'm not sure why you would kick yourself");
          return await type(message.channel, false, 0);
        }
    
        if (`${kickMember.id}` === `${config.owner}`) {
          await type(message.channel, true, 3);
          await message.channel.send("you can't kick the bot owner.");
          return await type(message.channel, false, 0);
        }
    
        if (!kickMember.kickable) {
          await type(message.channel, true, 3);
          await message.channel.send("guild member is too powerful!");
          return await type(message.channel, false, 0);
        }
    
        let reason = args.slice(1).join(' ');
        if (!reason) {
          reason = "No reason provided";
        }
    
        await kickMember.kick(reason)
          .catch(error => sendRandomEmbed(message.channel, `Error`, `Sorry ${message.author}, I couldn't kick because of : ${error}`, 0xFF0000))
        await sendRandomEmbed(message.channel, `Kick Event`, `${kickMember} has been kicked by ${message.author} \n reason: ${reason}`, 0xFFD000)
        return;
    
        /*let embed = new Discord.RichEmbed()
        .setColor(colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "kick")
        .addField("Mutee:", kickMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())
        
            let sChannel = message.guild.channels.find(c => c.name === "tut-modlogs")
            sChannel.send(embed)*/
    
      }

      if (command === "ping") {
        if (!args[0]) {
          const m = await message.channel.send("pinging...");
          return await m.edit(`⏱Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        } else {
          try {
            let strx = args.join(" ");
            const m = await message.channel.send("ok, pinging...");
            let msg = await require("child_process").execSync(`ping -n 4 ${strx}`).toString();
            await m.edit(`${msg}`, { code: "css" });
          } catch (err) {
            await message.channel.send(`\`100% packet loss\` \`\`\`xl\n${clean(err)}\n\`\`\``);
          }
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

    if (command === "addrole") {
      var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
      //var args = message.content.split(" ");
       //args.shift();
      
       if (!args[0]) {
        await type(message.channel,true,3);
        await message.reply(`usage: ${p}addrole [name] [color]`);
        return await type(message.channel,false,0);
      }
    
      message.guild.createRole({
        name: args[0],
        color: args[1]
      })
      .then(role => {
      // await type(message.channel,true,3);
       sendRandomEmbed(message.channel,"Role Created",`${role.name}`,role.hexcolor || RandomNoHash);
      //  return await type(message.channel,false,0);
      })
    };

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

    if (command === "color") {
    const strx = args.join(" ");
    if(!strx || `${strx}` === "0") {
      var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
      strx = RandomNoHash
    }
     await type(message.channel,true,3);
  
      await sendRandomEmbed(message.channel,"color",`${strx}`,strx);
      return await type(message.channel,false,0);
      }

      if (command === 'permissions') {
        if (config.selfbot === "true") {
          if (message.author.id !== config.owner) {
            return;
          }
        }
        try {
          let member = message.mentions.members.first();
    
          if(!member) {
            
            try{
              return message.channel.send("usage: ~permissions [@user]");
            } catch(e) {
              return console.log(`couldnt send message because: ${e}`);
            }
          }
    
          await type(message.channel,true,3);
          try{
          await message.author.sendMessage(`here is a  list of permssions of ${member}'s permissions in ${message.guild.name}`);
          await message.author.sendMessage('```json\n' + util.inspect(message.channel.permissionsFor(member).serialize()) + '```');
          done = true;
          } catch(e) {
           return message.channel.send(`<@${message.author.id}> i must be able to dm you to prevent spam.`);
          }
          await message.channel.send(`sent a list of ${member}'s permission's to your dms, please check them.`);
          return await type(message.channel,false,0);
        } catch (e) {
          return;
        }
      };
    
    
  

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