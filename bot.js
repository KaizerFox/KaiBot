//admin access invite: https://discordapp.com/oauth2/authorize?client_id=670312397688537109&scope=bot&permissions=8

//non admin invite: https://discordapp.com/oauth2/authorize?client_id=670312397688537109&scope=bot&permissions=2147483639

const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const colors = require("colors");
const yiff = require('yiff');
const morse = require("morsify") //dont name it anything special if you need to switch apis
const weather = require("weather-js");
const util = require("util");
const qr = require("qr-image");
const fs = require('fs')
const owoify = require('owoify-js').default
const upsidedown = require('upsidedown');
const Human = require('human');
const die = require("discord.js/src/util/Constants.js");
die.DefaultOptions.ws.properties.$browser = `Discord Android`;
const p = `${config.prefix}`;
var pinging = false;

//omegle values v
var Omegle = require('omegle-node');
var om = new Omegle(); //create an instance of `Omegle`

var session = false

var omchannel

//end of omegle values



//get cucked discord

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

function text2Binary(string) {
  return string.split('').map(function (char) {
      return char.charCodeAt(0).toString(2);
  }).join(' ');
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

om.on("waiting", () => {
  if (session == true) {
      omchannel.send("Waiting for stranger")
  }
})

om.on("connected", () => {
  omchannel.send("Connected, remember you're completely anonymous, no one will know your identity, **do not share any personal data** \n to end the chat do ~endchat or ~end")
})

om.on("gotMessage", function(msg) {
  omchannel.send(`Stranger: ${msg}`)
})

om.on("strangerDisconnected", () => {
  om.disconnect();
  session = true
  omchannel.send("Stranger Disconnected")
})

om.on('recaptchaRequired',function(challenge){
	//challenge is the link to the recaptcha image.
	message.channel.send(`prove you're not a robot: ${challenge} \n to solve do ~answer [answer]`);
	//after solving the captcha, send the answer to omegle by calling
	// om.solveReCAPTCHA(answer);
});

om.on('commonLikes',function(likes){
	omchannel.send('Common likes: ' + likes);
});

om.on('gotID',function(id){
	omchannel.send('Connected to server as: ' + id);
	setTimeout(function(){
		if(!om.connected()){
			om.stopLookingForCommonLikes(); // or you could call om.slfcl()
			omchannel.send('Stranger did not connect in time, retrying...');
		}
	},5000);
});

om.on('typing',function(){
	console.log('Stranger is typing...');
});

om.on('stoppedTyping',function(){
	console.log('Stranger stopped typing.');
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

  if (session == true) {
       await om.send(`random discord people: ${message.content}`);
}

  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "help") {
    try {
     await type(message.channel,true,3);
     var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
     await message.channel.send(`<@${message.author.id}>, http://hmm465.epizy.com/commandlist.html`);
     await type(message.channel,false,0);
         return;
       } catch (e) {
         return;
       }
      }

      if(command === "randomstring") {
      var crypto = require("crypto");
      var id = crypto.randomBytes(20).toString('hex');
      var st = id.toString()
      await type(message.channel,true,3);
      await message.channel.send("" + st);
      return await type(message.channel,false,0);
      }
      
      if(command === "answer") {
        const strx = args.join(" ");
        return await om.solveReCAPTCHA(strx);
      }

      if (command === "chat") {
        if(session === false) {
        session = true
        omchannel = message.channel
        chatter = message.author
        await om.connect()
        } else {
          return await message.channel.send("there is already a session going on, this is to prevent high network usage.");
        }
      }

      if(command === "endchat" || command == "end") {
        if(session === true) {
        await om.disconnect();
        session = false
        return await message.channel.send("Disconnected");
        } else {
         return await message.channel.send("there is no session to be ended");
        }
      }

      if (command === "bin") {
        const strx = args.join(" ");
        if (!strx) return;
        let bin = text2Binary(`${strx}`)
        await message.channel.send(`${bin}`);
      }

      if (command === "morse") {  //~morse dec,enc = enc  [message = mor]
        let mor = args.slice(1).join(" ");
        if (!mor) return;
  
        const enc = args.slice(0).join(" ")
        if (!enc) {
          await message.channel.send("error, invalid arugment please use enc or dec \n enc for encoding a message, dec for decoding \n\n examples: \n ~morse enc hi \n ~morse dec .... ..")
          return;
        }
        
        var mystring = `${enc}`;
        mystring = mystring.replace(`${mor}`,'');
        let encnew = mystring; //removes second arugment from the string

        if(`${encnew}` === "dec ") { //includes space cause im lazy, you can fix this if you want though.
          let demors = morse.decode(`${mor}`);
          await message.channel.send(`${demors}`);
        } else if(`${encnew}` === "enc ") {
          let mors = morse.encode(`${mor}`);
          await message.channel.send(`${mors}`);
        } else if(`${encnew}` !== "enc " && `${encnew}` !== "dec ") {
          return await message.channel.send("error, invalid arugment please use enc or dec \n enc for encoding a message, dec for decoding \n\n examples: \n ~morse enc hi \n ~morse dec .... ..");
        }
      }
  

     if (command === "qr") {
      try {
      const strx = args.join(" ");
      if (!strx) return;
  
      await message.channel.startTyping(3);
      let msg = await message.channel.send("generating code, please wait...");
  
      var qr_svg = qr.image(`${strx}`, { type: 'png' });
      qr_svg.pipe(require('fs').createWriteStream('qr.png'))
  
      await msg.delete(); 
      await message.channel.send({
        files: ['./qr.png']
      }).then(r =>{
      try {
        fs.unlink('qr.png', function (err) {
          if (err) throw err;
          // if no error, file has been deleted successfully
          return message.channel.stopTyping(true);
      }); 
  
    }catch(e) { return console.log("no file"); } 
    })
  } catch(e) {}
  }

  if (command ===  "upsidedown" || command === "upside") {
    const strx = args.join(" ");
    if (!strx) return;

    var ok = upsidedown(`${strx}`);
    return await message.channel.send(`${ok}`);
  }
  

  if (command === "spam") {
    let ownerID = `${config.owner}`
    if (message.author.id !== ownerID) {
      return;
    }

    const strx = args.join(" ");
    if (!strx) return;
    
    setInterval(async () => {
      await message.channel.startTyping(3);
      await console.log("typing...");
      await message.channel.send(`${strx}`);
      await sleep(100);
      await console.log("stopping typing...");
      await message.channel.stopTyping(true);
    }, 1000);

  }
  
    if(command === "invite"){
      try{
        return await message.channel.send("http://hmm465.epizy.com/invite.html");
      } catch(e){
        return await console.log(`${e.message}`);
      }
    }

     if (command === "gay") {
      member = message.mentions.members.first();
      if (!member) {
        member = args.join(" ");
      }
  
  
      if (`${member}` === `<@${config.owner}>`) {
        await type(message.channel,true,3);
        await message.channel.send(`${member} is **109%** gay`);
        return await type(message.channel,false,0);
      }

      if(`${member}` === `<@427926447617998858>`) {
        await type(message.channel,true,3);
        await message.channel.send(`${member} is **109%** gay`);
        return await type(message.channel,false,0);
      }

      if(`${member}` === `<@431791835300626443>`) {
        await type(message.channel,true,3);
        await message.channel.send(`${member} is **69%** gay`);
        return await type(message.channel,false,0);
      }
  
    
  await type(message.channel,true,3);
  await message.channel.send(`${member} is **${Math.floor(Math.random() * 100) + 1}%** gay`);
  return await type(message.channel,false,0);
    }

    if (command === "horny") {
      member = message.mentions.members.first();
      if (!member) {
        member = args.join(" ");
      }

      if (`${member}` === `<@${config.owner}>`) {
        await type(message.channel,true,3);
        await message.channel.send(`${member} is **100%** horny`);
        return await type(message.channel,false,0);
      }

      await type(message.channel,true,3);
      await message.channel.send(`${member} is **${Math.floor(Math.random() * 100) + 1}%** horny`);
      return await type(message.channel,false,0);
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
      const oper = require('os').platform
      const PID = process.pid;
      let owoifyname = owoify(`${member.username}`,"uwu"); 

      const embed = new Discord.RichEmbed()
        .setTitle("📊 Bot Stats - Click To Invite")
        .setURL(`https://discordapp.com/oauth2/authorize?client_id=670312397688537109&scope=bot&permissions=8`)
        .setColor(RandomNoHash)
        .addField("Guild Count", `${client.guilds.size}`, true)
        .addField("User Count", `${client.users.size}`, true)
        .addField("Channels", `Text: ${channels} \n Voice: ${vchannels}`, true)
        .addField("Processor", `${cpuLength}x ${cpuType}`, true)
        .addField("Memory usage", `${memoryUsage}MB`, true)
        .addField("Operating System", `${oper}`,true)
        .addField("Uptime", `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`, true)
        .addField("Process Id", `${PID}`,true)
        .setTimestamp()
        .setFooter(`requested by ${owoifyname}`, member.displayAvatarURL)
      message.channel.send({ embed });
      //return message.channel.send(`Guild count: ${client.guilds.size} \n User count: ${client.users.size}`);
  
    }

    if (command === "addrole") {
      let nam = args.slice(1).join(" ");
      if (!nam) return;

      const col = args.slice(0).join(" ")

var mystring = `${col}`;
mystring = mystring.replace(`${nam}`,'');
let colnew = mystring; 

      if (!col) { return await message.channel.send(`${p}addrole [color] [name]`); }
      await message.delete().catch(async (O_o) => {});

      if (message.author.id !== config.owner) {
        if (!message.member.hasPermission(["ADMINISTRATOR"])) {
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
  
      try {
      return await message.guild.createRole({
        name: nam,
        color: colnew,
        permissions: []
      }).then(async die => {
      return await sendRandomEmbed(message.channel, "Role Created", `${nam}`, colnew || 0x323232);
      })
    } catch(e) {
      return;
    }
    };


    if (command === "say") {
      try {
      message.delete();
      const strx = args.join(" ");
      if (!strx) return;
  
      await message.channel.startTyping(3);
      await message.channel.send('`' + `${strx}` + '`');
      return await message.channel.stopTyping(true);
      } catch(e) {
        return await message.channel.send(`${e.message}`);
      }
    }

    if (command === "embed") {
      if (config.selfbot === "true") {
        if (message.author.id !== config.owner) {
          return;
        }
      }
      const strx = args.join(" ");
      if (!strx) return;
      let msgx = args.slice(1).join(' ');
      if (!msgx) return;
      await message.delete().catch(async (O_o) => {});
  
      if (strx == "random " + `${msgx}`) {
        var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
        console.log("randomized color was chosen");
        await type(message.channel,true,3);
        let embed = new Discord.RichEmbed()
          .setColor(RandomNoHash)
          .setDescription(msgx)
        await message.channel.sendEmbed(embed)
        await type(message.channel,false,0)
        return;
      } else {
        console.log("custom color was chosen");
        await type(message.channel,true,3);
        let embed = new Discord.RichEmbed()
          .setColor(strx)
          .setDescription(msgx)
        await message.channel.sendEmbed(embed)
        await type(message.channel,false,0)
        return;
      }
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
        await member.send(`you've been banned by ${message.author}, from ${message.guild.name} \n reason: ${reason}`);
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
        
          await member.send(`you've been kicked by ${message.author}, from ${message.guild.name} \n reason: ${reason}`);
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
            const oper = require('os').platform
            if(`${oper}` === "win32" || `${oper}` === "win64") {
            if(pinging === false){
            pinging = true
            //console.log(`os is ${oper}`);
            let strx = args.join(" ");
            const m = await message.channel.send("ok, pinging...");
            let msg = await require("child_process").execSync(`ping -n 4 ${strx}`).toString();
            await m.edit(`${msg}`, { code: "css" });
            sleep(3);
            return pinging = false;
            } else {
              pinging = false;
              return await message.channel.send("i am already pinging a site, please wait a few seconds");
            }
          } else {
            if(pinging === false){
            pinging = true;
            //console.log("os is something other than windows, assuming its linux.");
            let strx = args.join(" ");
            const m = await message.channel.send("ok, pinging...");
            let msg = await require("child_process").execSync(`ping -c 4 ${strx}`).toString();
            await m.edit(`${msg}`, { code: "css" });
            sleep(3);
            return pinging = false;
            } else {
              pinging = false;
              return await message.channel.send("i am already pinging a site, please wait a few seconds");
            }
          }
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
        await type(message.channel,true,3)
        const code = args.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
        await type(message.channel,false,0);
        sleep(3);
        return await message.channel.send(clean(evaled), {
          code: "xl"
        });
      } catch (err) {
        await type(message.channel,false,0);
        sleep(3);
        return await message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
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

  await type(message.channel,true,3)
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
            await type(message.channel,false,0)
            sleep(3);
            return await message.channel.send("note: (ignore blank errors/outputs)\n" + `\`\`\`cmd\n${output}\n\`\`\``);
          }
  ls(`${code}`);
  }

  if (command === "source") {
    try {
      await type(message.channel,true,3);
      var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
      await message.channel.send(`<@${message.author.id}>, https://github.com/KaizerFox/KaiBot`);
      await type(message.channel,false,0);
          return;
        } catch (e) {
          return;
        }
  }

  if (command === "yiff") {
    if (message.channel.nsfw === false) {
      message.channel.send("This channel isn't marked as NSFW.");
      return;
    }
    let msg = await message.channel.send("Searching...");
    const strx = args.join(" ");
    try {
      await yiff.e621.CubFilter(`${strx}`).then(async (r) => {
        var RandomNoHash = (Math.random() * 0xFFFFFF << 0).toString(16);
        const embed = new Discord.RichEmbed()
          .setColor(RandomNoHash)
          .setURL(r.source)
          .setTitle("e621 - No Image? [link]")
          .setImage(r.image)
          .setFooter(`Artist: ${r.artist.join(" ")} | Score: ${r.score} | Fav. Count: ${r.fav_count} | ID: ${r.postID}`);
        return await message.channel.send(embed)

      });
    } catch (e) {
      await message.channel.send("tag not found (try something else)");
      return;
    }
    await msg.delete();
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

  if(command === "dm") {
    if (message.author.id !== config.owner) {
      message.channel.send("this was made ownyew onywy iny case of abuse");
      return;
    }
    let member = message.mentions.members.first();
    const strx = args.slice(1).join(' ');
    message.channel.send(`dming <@${member.id}>`);
    try{
    return await member.send(`${strx}`);
    } catch(e) {
    return await message.channel.send(`${e.message}`);
    }
  }

  if(command === "uptime") {

 type(message.channel,true,3);

 let totalSeconds = (client.uptime / 1000);
 let days = Math.floor(totalSeconds / 86400);
 let hours = Math.floor(totalSeconds / 3600);
 totalSeconds %= 3600;
 let minutes = Math.floor(totalSeconds / 60);
 let seconds = Math.round(totalSeconds % 60);

await message.channel.send(`Uptime ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`);
return await type(message.channel,false,0);
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
