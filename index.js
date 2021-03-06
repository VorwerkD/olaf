

//bot stuffs

const Discord = require('discord.js');
const client = new Discord.Client();
const FuzzySet = require('fuzzyset.js');
const token = process.env.DISCORD_BOT_SECRET;
const tmi = require('tmi.js');
var urban = require('urban');
//const { Client } = require('pg');
/*
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
*/

const tmiclient = new tmi.Client({
	options: { debug: true },
	connection: {
		secure: true,
		reconnect: true
	},
	identity: {
		username: 'vorwerkBot',
		password: process.env.DISCORD_BOT_SECRET
	},
	channels: [ 'vorwerk_d' ]
});
tmiclient.on('message', onMessageHandler);
tmiclient.on('connected', onConnectedHandler);
tmiclient.connect();

function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === '!discord') {
    tmiclient.say(target, `https://discord.gg/GUKXv7j`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

var prefix = "."
const fs = require('fs');
var isUpdating;
var isUpdated;
client.wait = require('util').promisify(setTimeout);
var CronJob = require('cron').CronJob;
var commands = ["help", "ping", "flip", "lotto", "kick", "clearChat", "live", "urban", "guildnum", "console",  "reset", "reverse", "test", "user","update","gg","createchannel","deletechannel","addtochannel"];
var commandHelp = ["You're reading it!",
  "Pongs!", "Flips a coin", "Gives you your lotto numbers- Doesn't gaurentte you win though :wink:",
  "kicks a valid user, just tag them\nRequires Admin role",
  "Clears the current channel of messages <14 days old add a number<100 to clear - defaults to 100 \nRequires Admin role",
  "check to see if the given twitch streamer is live", "Searches urban dictionary for a word/phrase. Attach -r for a random word",
  "Updates the guild numbers channels", "Logs the input to the console ",  "shuts down and resets the bots login. Vorwerk only", "Reverses your input", "A test command", "Gives information on the user", "Manually updates the cached guilds","Gives the swgoh.gg link of the requested user","Creates a channel for phantom recruiting; @ people to add them on creation","Deletes a channel that is mentioned","Adds tagged users to the tagged Channel"]
var olafTest = '570738555773648897'//chan id
var boysChan = '694347738988412978'
var vorwerkChan = '676955393145962496'
//twitch stuffs
var streamList = ["yautjaridley", "Vorwerk_D","cptbroskiz","lasko_us","Lighttripleking","flight23white","Vorwerk_D"]
var streamChan = ["547923999552700436", vorwerkChan,boysChan,boysChan,boysChan,boysChan,boysChan]
var streams = [
["yautjaridley",["547923999552700436"],["<@&550184470565748740> "]],
["Vorwerk_D",[vorwerkChan,boysChan],["<@&680209821743841348> ","@everyone"]],
["cptbroskiz",[boysChan],["@everyone"]],
["lasko_us",[boysChan],["@everyone"]],
["Lighttripleking",[boysChan],["@everyone"]],
["flight23white",[boysChan],["@everyone"]]
];
var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var activities = ["\nBefore Reset: Spend Cantina Energy\nAfter Reset: Spend Energy on Light Side Battles",
  "\nBefore Reset: Spend Energy on Light Side Battles\nAfter Reset: Spend Energy",
  "\nBefore Reset: Spend Energy\nAfter Reset: Spend Energy on Hard Mode Battles",
  "\nBefore Reset: Spend Energy on Hard Mode Battles\nAfter Reset: Complete Daily Challenges",
  "\nBefore Reset: Complete Daily Challenges\nAfter Reset: Spend Energy on Dark Side Battles",
  "\nBefore Reset: Spend Energy on Dark Side Battles\nAfter Reset: Complete Arena Battles",
  "\nBefore Reset: Complete Arena Battles\nAfter Reset: Spend Cantina Energy"
];
var wakeups = ["Morning Phantom!", "Monday morning, you sure look fine.", "You will never have this day again Phantom so make it count!", "Rise up and attack the day with enthusiasm!", "Rise and shine Phantom", "Happy Friday Phantom! It's almost the weekend!", "Happy Weekend Phantom, enjoy the days off"];
const TwitchClient = require('twitch').default;
const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;
const twitchClient = TwitchClient.withClientCredentials(clientId, clientSecret);

const ApiSwgohHelp = require('api-swgoh-help');
const rosters = ["Name", "allyCode"]
const names = ["Names"];
var allianceUsers = [];
var codes = [135718294, 418877148, 399663774, 618277879, 484271262, 582412773]
var codes1 =[135718294, 418877148];
var codes2 =[399663774, 618277879];
var codes3 = [484271262, 582412773];
var texts = ["filler",
  "Led by <@116901947428044809>\n600 Tickets Daily\nTicket reset @ 5:30 PST\nDS HOTH- 45 :star:\nLS HOTH- 45 :star:\nDS GEO- 26 :star: 24 Wat shards <:watshard:709573349579161705>\nLS GEO- 10 :star:\nHSTR: Launch at 6pm PST, 24 hr join\nHAAT: Launch at 8pm PST, 23 hr join\nHPIT:Simmed",//rebellion
  "Led by <@375883958405038091>\n600 Tickets Daily\nTicket reset @ 7:30 CST\nDS HOTH- 43 :star:\nLS HOTH- 37 :star:\nDS GEO- 25 :star: 25 Wat shards <:watshard:709573349579161705>\nLS GEO- 9 :star: 1 KAM shard\nHSTR: Launch at 8pm CST, 22 hr join\nHAAT: Launch at 8pm CST, 24 hr join\nHPIT:Simmed",//empire
  "Led by <@137343307553439744>\n600 Tickets Daily\nTicket reset @ 5:30 CST\nDS HOTH- 41 :star:\nLS HOTH- 44 :star:\nDS GEO- 23 :star: 22 Wat shards <:watshard:709573349579161705>\nLS GEO- 10 :star:",//havoc
  "Led by <@414535355354578949>\n400 Tickets Daily\nTicket reset @ 6:30 PST\nDS HOTH- 33 :star:\nLS HOTH- 39 :star:\nDS GEO- 17 :star: 6 Wat shards<:watshard:709573349579161705>\nLS GEO- 7 :star:\nHAAT: Launch at 8pm PST, 24 hour join\nHPIT: Simmed, 24 hr join\nHSTR: 8pm PST, 24 hr join",//rogue
  "Led by <@561197891310321674>\n600 Tickets Daily\nTicket reset @ 6:30 EST\nDS HOTH- 44 :star: \nLS HOTH- 43 :star: \nDS GEO- 29 :star: 44 Wat shards <:watshard:709573349579161705>\nLS GEO- 13 :star: 3 KAM shards\nHSTR: Launch at 7pm EST, 24 hr join\nHAAT: Launch at 9pm EST, 24 hr join\nHPIT:Launch at 7pm EST",//order
  "Led by <@604489911248355353>\n450 Tickets Daily\nTicket reset @ 6:30 EST\nDS HOTH- 38 :star: \nLS HOTH- 35 :star: \nDS GEO- 18 :star: 16 Wat shards <:watshard:709573349579161705>\nLS GEO- 7 :star:\nHAAT: 8pm est, 24 hr join\nHPIT: Simmed, 24 hr join\nHSTR:Launch at 9pm EST, 24 hour join"]//uprising
var ggLink = ["filler",
  "\nhttps://swgoh.gg/g/35906/phantomrebellion/",
  "\nhttps://swgoh.gg/g/51323/phantomempire/",
  "\nhttps://swgoh.gg/g/29918/phantomhavoc/",
  "\nhttps://swgoh.gg/g/61585/phantomrogue/",
  "\nhttps://swgoh.gg/g/61714/phantomorder/",
  "\nhttps://swgoh.gg/g/63155/phantom-uprising/"]
var mainChans = ['596613040879960065', '596613066108698650', '596613090557034497', '596613114036748299', '602869523741409310', '604044611995828247']//message ids to edit
var recruitChans = ['596613040762388480', '596613065907109888', '596613090900967440', '596613113957187586', '602869523661455381', '604044611505094657']//message ids to edit
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const swapi = new ApiSwgohHelp({
  "username": process.env.SWGOH_HELP_USERNAME,
  "password": process.env.SWGOH_HELP_PASSWORD
});
(async () => {
  var acquiredToken = await swapi.connect();
})();
//Bot Logged in
client.on('ready', () => {
  console.log("logged in as : " + client.user.username);
  console.log(Discord.version);
  client.user.setActivity(prefix + 'help', {
    type: 'LISTENING'
  });
  console.log("servers:")
  client.guilds.cache.forEach((guild) => {
    console.log(" - " + guild.name)
  });
  (async () => {
    update();
  })();
  
});
//join messages
client.on('guildMemberAdd', member => {
  if (member.guild.id == '484182766271856651') {
    member.guild.channels.cache.find('567116459684397076').send("Welcome to "+member.guild.name+" " + member + ". Enjoy your stay.\nPing Vorwerk if you need help with something.");
    if (!member.bot) {
      member.addRole('484848526757593119');/*
    (async() =>{
      await addAndRemoveRole(member,'484848526757593119');
    })();*/
    }
  }
  if (member.guild.id == '483433483109138433') {
  }
});
//leaves
client.on('guildMemberRemove', member => {

});
client.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel = client.channels.cache.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.cache.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    channel.fetchMessage(packet.d.message_id).then(message => {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.get(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.set(packet.d.user_id, client.users.cache.get(packet.d.user_id));
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.cache.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.cache.get(packet.d.user_id));
        }
    });
});
client.on('messageReactionAdd', (messageReaction, user) => {
        let tempMessage = messageReaction.message, emoji = messageReaction.emoji;
      if( tempMessage.id == '680209739304534016'){
        if (emoji.id == '643666169965969419') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('680209821743841348');
                });
        }}
        if( tempMessage.id == '770329266444435457'){
        if (emoji == '🌷') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('749637495703994388');
                });
        }if (emoji == '🖌️') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770323827783630879');
                });
        }if (emoji == '🎮') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770323901645324368');
                });
        }if (emoji == '🤓') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770323941046091818');
                });
        }if (emoji == '🔫') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770324002228011089');
                });
        }if (emoji == '💣') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770324045035733042');
                });
        }if (emoji == '🟨') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770324102194921542');
                });
        }if (emoji == '👽') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770324126115037194');
                });
        }if (emoji == '👻') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770324180658552873');
                });
        }if (emoji == '🍔') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770324226905079908');
                });
        }if (emoji == '️️️️❤️') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770324260258316308');
                });
        }if (emoji.id == '️️️️770326879713886208') {
                tempMessage.guild.fetchMember(user.id).then(member => {
                        member.addRole('770326487156785271');
                });
        }}
});
client.on('messageReactionRemove', (reaction, user) => {
  (async () => {
    let messageReaction = reaction; 
      if(messageReaction.emoji.id=='643666169965969419'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('680209821743841348');
  });
      }
      if(messageReaction.emoji=='🌷'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('749637495703994388');
  });
      }if(messageReaction.emoji=='🖌️'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770323827783630879');
  });
      }if(messageReaction.emoji=='🎮'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770323901645324368');
  });
      }if(messageReaction.emoji=='🤓'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770323941046091818');
  });
      }if(messageReaction.emoji=='🔫'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770324002228011089');
  });
      }if(messageReaction.emoji=='💣'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770324045035733042');
  });
      }if(messageReaction.emoji=='🟨'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770324102194921542');
  });
      }if(messageReaction.emoji=='👽'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770324126115037194');
  });
      }if(messageReaction.emoji=='👻'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770324180658552873');
  });
      }if(messageReaction.emoji=='🍔'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770324226905079908');
  });
      }if(messageReaction.emoji=='❤️'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770324260258316308');
  });
      }if(messageReaction.emoji.id=='770326879713886208'){
  messageReaction.message.guild.fetchMember(user.id).then(member=> {
    member.removeRole('770326487156785271');
  });
      }
        })();
  
});
//messages
client.on('message', msg => {
  var input = '';
  if (msg.content.startsWith(prefix)) {
    input = msg.content.toLowerCase()//to make all inputs - either command or parameters all uniform - if a command needs uppercase parameters etc, put above this line
    var oldInput = input;
    var inputRes = input.split(' ');
    var inputResCom = inputRes[0].substring(1);
    b = FuzzySet(commands);
    const inCom = b.get(inputResCom);
    const inCom2 = inCom[0];
    if (inCom2[0] >= 0.625) {
      input = inCom2[1];
      input = prefix + input + " " + inputRes[1];
    }
    else {
      console.log("not a command")
    }
  }
  /*
  UPDATES THE ROSTERS FILE
  */
  //FLAG
  var regex = /\[([\d\w]+)\]/g;
  if(input.startsWith(prefix+"test")){
 msg.channel.send("@everyone");
  }
  if(input.startsWith(prefix+"addtochannel")){
    if(msg.guild.id=='679517421111214084'){
    if(msg.member.roles.cache.has('485783034961068042')){
    const chan = msg.mentions.channels.first();
    const members = msg.mentions.members.array();
    let outputString = "Down here!";
  for(var x = 0; x<members.length;x++){
    outputString +=" <@"+members[x].id+">";
  }
    const fetchedChannel = msg.guild.channels.cache.find(r => r.name === chan.name);
members.forEach(member=>{
  fetchedChannel.overwritePermissions(member.id,{VIEW_CHANNEL: true,SEND_MESSAGES :true})
});
fetchedChannel.send(outputString);
client.channels.cache.find('680240713270689814').send(msg.author.username+" is adding members to "+chan.name);
    }else{
      msg.reply("Sorry you do not have the correct permissions")
    }
    }
    if(msg.guild.id=='484508095469584384'){

  
    if(msg.member.roles.cache.has('485783034961068042')){
    const chan = msg.mentions.channels.first();
    const members = msg.mentions.members.array();
    let outputString = "Down here!";
  for(var x = 0; x<members.length;x++){
    outputString +=" <@"+members[x].id+">";
  }
    const fetchedChannel = msg.guild.channels.cache.find(r => r.name === chan.name);
members.forEach(member=>{
  fetchedChannel.overwritePermissions(member.id,{VIEW_CHANNEL: true,SEND_MESSAGES :true})
});
fetchedChannel.send(outputString);
client.channels.cache.find('485932045860732932').send(msg.author.username+" is adding members to "+chan.name);
    }else{
      msg.reply("Sorry you do not have the correct permissions")
    }
    }}
  if(input.startsWith(prefix+ "deletechannel")){
    if(msg.guild.id=='679517421111214084'){
      const chan = msg.mentions.channels.first();
      if (msg.member.roles.some(r => ["Recruiter"].includes(r.name))){
    const fetchedChannel = msg.guild.channels.cache.find(r => r.name === chan.name);
    fetchedChannel.delete();
    client.channels.cache.find('680240713270689814').send(msg.author.username+" is deleting "+chan.name);
      }else{
    msg.reply("You do not have the correct permissions to use this!");
  }

    }
    if(msg.guild.id=='484508095469584384'){
    const chan = msg.mentions.channels.first();
    if (msg.member.roles.cache.has('485783034961068042')){
    const fetchedChannel = msg.guild.channels.cache.find(r => r.name === chan.name);
    fetchedChannel.delete();
    client.channels.cache.find('485932045860732932').send(msg.author.username+" is deleting "+chan.name);
    }else{
    msg.reply("You do not have the correct permissions to use this!");
      }
    }
    
  }
  if (input.startsWith(prefix + "createchannel")) {
    
    const authorId =msg.author.id;
    const guild =msg.guild;
  
    if(guild.id=='484508095469584384'){
    if (msg.member.roles.cache.has('485783034961068042')){
      var members = msg.mentions.members.array();
      let outputString = "Down here!";
      for(var x = 0; x<members.length;x++){
        outputString +=" <@"+members[x].id+">";
      }
      const memberName = msg.mentions.members.first().displayName;
      var chanName = "Waiting room "+memberName;
        var perms = [{
          id: guild.roles.everyone.id,
          deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }, {
          id: '485783034961068042',
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }]
        for (var x = 0; x < members.length; x++) {
          perms.push({
            id: members[x].id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
          });
        }
        (async () => {
      let fetchedChannel = await guild.channels.create(chanName,{type:'text',parent:'485772452060987392',permissionOverwrites:perms});
      fetchedChannel.send(outputString);
      client.channels.cache.find('485932045860732932').send(msg.author.username+" is creating "+chanName);
        })();
        
    }else{
      msg.reply("You dont have the correct permissions");
    }
    }if(guild.id=='679517421111214084'){
      if (msg.member.roles.some(r => ["Recruiter"].includes(r.name))){
      var members = msg.mentions.members.array();
      let outputString = "Down here!";
      for(var x = 0; x<members.length;x++){
        outputString +=" <@"+members[x].id+">";
      }
      const memberName = msg.mentions.members.first().displayName;
      var chanName = "Waiting room "+memberName;
        var perms = [{
          id: guild.roles.everyone.id,
          deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }, {
          id: '680183855059042352',
          allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        }]
        for (var x = 0; x < members.length; x++) {
          perms.push({
            id: members[x].id,
            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
          });
        }
        (async () => {
      let fetchedChannel = await guild.createChannel(chanName,{type:'text',parent:'679517421111214085',permissionOverwrites:perms});
      fetchedChannel.send(outputString);
      client.channels.cache.find('680240713270689814').send(msg.author.username+" is creating "+chanName);
        })();
        
    }else{
      msg.reply("You dont have the correct permissions");
    }
    }  
  }//user
  if (input.startsWith(prefix + "user")) {
    const user = msg.author.id
    const guild = msg.guild
    const guildMessageUser = msg.guild.member(user)
    var joinDate = new Date(guildMessageUser.joinedAt);
    var date = joinDate.getDate();
    var month = joinDate.getMonth();
    var year = joinDate.getFullYear();
    dateString = (month + 1) + "/" + date + "/" + year;
    const embed = new Discord.RichEmbed()
      .setTitle("User Stats:")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor(guildMessageUser.displayColor)
      .setDescription("Some basic user stats WIP")
      .setFooter("Made by Vorwerk")
      //.setImage("http://i.imgur.com/yVpymuV.png")
      .setThumbnail(msg.author.avatarURL)
      .setTimestamp()
      .addField("Joined at: ", dateString)
      .addField("ALL ROLES WIP", guildMessageUser.roles)
      .addField("ID: ", guildMessageUser.id)
    //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed"
    msg.channel.send({ embed });
  }
  //reverse
  if (input.startsWith(prefix + "reverse")) {
    res = input.substring(9);
    var splitString = res.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    msg.reply(joinArray);
  }

  if (input.startsWith(prefix + "update")) {
    (async () => {
      update();
      msg.react('✅');
    })();
  }
  /*
  GG COMMAND
  */
  if (input.startsWith(prefix + "gg")) {
    const member = msg.mentions.members.first();
    var res = ""
    if (member == null) {
      res = input.substring(4);
    }
    else {
      res = member.displayName.toLowerCase().replace(' {empire}', '').replace(' {rebellion}', '').replace(' {rogue}', '').replace(' {havoc}', '');
    }
    if (res == null) {
      msg.channel.send("No input detected, please input or mention a valid user")
      return
    }
    (async () => {
      const data = await fs.readFileSync('array.txt', 'utf8');
      var newArr = data.split(',');
      var names = [];
      for (var x = 0; x < newArr.length; x += 2) {
        names.push(newArr[x]);
      }
      console.log(res);
      res =res.toString();
      var matchedArray = getNames(res, names);
      if (matchedArray.length == 0) {
        msg.channel.send("No user found, please input or mention a valid user");
        res.replace(/-/g,'');
        var match = res.match(/(\d+)/);
        console.log(match);

      }
      for (var x = 0; x < matchedArray.length; x++) {
        if (matchedArray[x].startsWith("redo")) {
          var newName = matchedArray[x].substring(4, matchedArray[x].length - 1) + characters.charAt(Math.floor(Math.random() * characters.length));
          var matchedArray = getNames(newName, names)
        }
        var codeRec = newArr[newArr.indexOf(matchedArray[x]) + 1];
        msg.channel.send("https://swgoh.gg/p/" + codeRec + "/")
      }
    })();
  }
  /*
  console
  */
  if (input.startsWith(prefix + "console")) {
    console.log(input);
  }
  /*
  GUILD NUM for automatic updates of guild numbers
  */
  if (input.startsWith(prefix + "guildnum")) {
    guildNum()
  }
  if (input.startsWith(prefix + "live")) {

    var res = input.split(" ");

    var streamer = res[1];
    (async () => {
      const online = await isStreamLive(streamer);
      if (online) {
        const stream = await getStream(streamer);
        msg.channel.send(streamer + " is live! they're playing " + stream.game + " at " + stream.url);
      }
      else {
        msg.channel.send("Sorry, they are not streaming currently... :(");
      }
    })();
  }
  /*
  FLIP COMMAND
  */
  if (input.startsWith(prefix + "flip")) {

    if (Math.random() >= 0.5)
      msg.reply(`Heads!`)
    else
      msg.reply(`Tails!`)
  }
  //ping
  if ((msg.author.id != client.user.id) && (input.startsWith(prefix + "ping"))) {
    // Check if message is "!ping"
    msg.channel.send("Pinging ...") // Placeholder for pinging ... 
      .then((msg) => { // Resolve promise
        msg.edit("Ping: " + (Date.now() - msg.createdTimestamp))
      })
  }

  //lotto
  if (input.startsWith(prefix + "lotto")) {
    msg.reply("\nYour lotto digits: " + Math.floor(Math.random() * 70 + 1) + " " + Math.floor(Math.random() * 70 + 1) + " " + Math.floor(" " + Math.random() * 70 + 1) + " " + Math.floor(Math.random() * 70 + 1) + " " + Math.floor(Math.random() * 70 + 1) + "\nYour Mega Ball: " + Math.floor(Math.random() * 25 + 1))
  }
  //kick
  if (input.startsWith(prefix + "kick")) {
    if (!msg.member.roles.some(r => ["Admin"].includes(r.name)))
      return msg.reply("Sorry, you don't have permissions to use this!");
    const member = msg.mentions.members.first()

    if (!member) {
      return msg.reply(`Who are you trying to kick? You must mention a user.`)
    }
    if (!member.kickable) {
      return msg.reply(`I can't kick this user. Sorry!`)
    }
    return member
      .kick()
      .then(() => msg.reply(`${member.user.tag} was kicked.`))
      .catch(error => msg.reply(`Sorry, an error occured.`))
  }

  if (input.startsWith(prefix + "reset") && (msg.author.id == 234346145806155776)) {
    console.log('Resetting...' + " In server: " + msg.channel.guild)
    msg.channel.send('Resetting...')
      .then(msg => client.destroy())
      .then(() => client.login(token))
      .then(() => msg.channel.send('Reset Complete... Service Restored...'))
  }
  //poll clear
  //clear chat
  if (input.startsWith(prefix + "clearchat")) {
    if (!msg.member.roles.some(r => ["Admin"].includes(r.name)))
      msg.reply("Sorry, you don't have permissions to use this!");
    else {
      var res = input.split(" ");

      var num = res[1];
      if (num == undefined)
        num = 100;
      console.log(msg.author.username + " is clearing messages in: " + msg.channel.guild)
      msg.channel.bulkDelete(num)
        .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
        .catch(console.error);
    }
  }
  //urban
  if (input.startsWith(prefix + "urban")) {
    var res = oldInput.substring(prefix.length + 6);
    trollface = urban(res);
    console.log(res);
    if (res === ('-r')) {
      urban.random().first(function(JSON) {
        var out = JSON.definition;
        var out2 = out.replace(/\[([^\]]*)\]/g, "$1");
        msg.channel.send({
          embed: {
            color: 0xac38f1,
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            fields: [{
              name: JSON.word,
              value: out2
            }
            ],
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Made by Vorwerk 😊"
            }
          }
        });
      });
    }
    else {
      trollface.first(function(JSON) {
        try {
          var out = JSON.definition;
          var out2 = out.replace(/\[([^\]]*)\]/g, "$1");

          msg.channel.send({
            embed: {
              color: 0xac38f1,
              author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
              },

              fields: [{
                name: JSON.word,
                value: out2
              }
              ],
              timestamp: new Date(),
              footer: {
                icon_url: client.user.avatarURL,
                text: "Made by Vorwerk 😊"
              }
            }
          });
        }
        catch (err) {
          msg.channel.send("This word could not be found from UrbanDictionary.com");
        }
      });
    }
  }

  //help
  if (input.startsWith(prefix + "help")) {
    const embed = new Discord.RichEmbed()
      .setTitle("Command List: ")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor(0xac38f1)
      .setDescription("All Commands are preceded by " + prefix)
      .setFooter("Made by Vorwerk")
      //.setImage("http://i.imgur.com/yVpymuV.png")
      .setThumbnail(msg.author.avatarURL)
      .setTimestamp()
    //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
    
    
      embed.addField("General",
        "**Help** : `You're reading it!`\n**Ping** : `Pongs!`\n**Flip** : `Flips a coin!`\n**Lotto** : `Gives you your lotto numbers- Doesn't gaurentte you win though😉`\n**Urban** : `Searches urban dictionary for a word/phrase. Attach -r for a random word`\n**Reverse** : `Reverses your input`\n**Live** : `Check to see if the given twitch streamer is live`\n**User** : `Gives information on the user`",true)
        embed.addField("Moderation - Requires admin role",
        "**Kick** : `kicks a valid user, just tag them`\n**ClearChat** : `Clears the current channel of messages`",true)
        embed.addField("SWGOH","**GuildNum** : `Updates the guild numbers channels`\n**Update** : `Manually updates the cached guilds`\n**GG** : `Gives the swgoh.gg link of the requested user`\n**CreateChan** : `Creates a channel for phantom recruiting; @ people to add them on creation`\n**DeleteChan** : `Deletes a channel that is mentioned`\n**AddToChan** : `Adds tagged users to the tagged Channel`",false)
        if(msg.author.id == 234346145806155776){
        embed.addField("Bot Admin","**Console** : `Logs the input to the console`\n**Reset** : `Resets the bots login`\n**Test** : `A test command`",true)
        }
    embed.addField("Join Vorwerk's Server at:", " https://discord.gg/GUKXv7j")
    embed.addField("Invite this bot to other servers with:", "https://discordapp.com/oauth2/authorize?&client_id=523260461932740620&scope=bot&permissions=93250!")
    msg.channel.send({ embed });
  }

});
async function isStreamLive(userName) {
  const user = await twitchClient.kraken.users.getUserByName(userName);
  if (!user) {
    return false;
  }
  return await twitchClient.kraken.streams.getStreamByChannel(user.id) !== null;
}

async function getStream(userName) {
  const user = await twitchClient.kraken.users.getUserByName(userName);
  const channel = await user.getChannel();
  return channel;
}

client.login(token);

//CRON JOBS

/*empire
new CronJob('0 30 18 * * *', function() {

  client.channels.get('485184288795656238').send("<@&485169730097774612> 1 hour to tickets! Thank you :smiley: ").catch(function(error) {
    client.users.get('234346145806155776').send(error);
  });

}, null, true, 'America/New_York');
*/
//phantom
new CronJob('0 30 20 * * *', function() {

  client.channels.cache.find('483784255030296589').send("<@&483620584861859850> 1 hour to tickets! Thank you :smiley: ").catch(function(error) {
    client.users.cache.get('234346145806155776').send(error);
  });

}, null, true, 'America/New_York');

//havoc
new CronJob('0 30 18 * * *', function() {

  client.channels.cache.find('586379177331261470').send("<@&586291147169857556> 1 hour to tickets! Thank you :smiley: ").catch(function(error) {
    client.users.cache.get('234346145806155776').send(error);
  });

}, null, true, 'America/New_York');

//uprising
new CronJob('0 30 17 * * *', function() {

  client.channels.cache.find('641094942659444769 ').send("<@&636767322748485652> 1 hour to tickets! Thank you :smiley: ").catch(function(error) {
    client.users.cache.get('234346145806155776').send(error);
  });

}, null, true, 'America/New_York');
//dragon champions
new CronJob('0 30 20 * * *', function() {

  client.channels.cache.find('675376937438543897').send("<@&636767322748485652> 1 hour to tickets! Thank you :smiley:").catch(function(error){ client.users.cache.get('234346145806155776').send(error); });
   
}, null, true, 'America/New_York');
async function addAndRemoveRole(member, role) {
  await member.addRole(role)
  await client.wait(30 * 60 * 1000);//minutes*seconds/min*milliseconds/seconds
  await member.removeRole(role)
}

async function checkLive(streamName) {
  const online = await isStreamLive(streamName);
  if (online) {
    const stream = await getStream(streamName);
    const streamLive = await twitchClient.kraken.streams.getStreamByChannel(stream);
    const now = new Date();

    const dif = now - streamLive.startDate;
    if (dif < 130000) {
      return stream
    }

  } else {
    return null;
  }
}
/*
new CronJob('/2 * * * *', function() {//put a *before/
  (async () => {
    for (var x = 0; x < streams.length; x += 1) {
      const stream = await checkLive(streams[x]);
      for(var y = 0; y < streams[x].length ; y+=1){

 client.channels.get(streams[x][y]).send(streams[x][y][y]+stream.displayName+ " is live! They're playing " + stream.game + " at "+ stream.url);
      }}
  })();
}, null, true, 'America/New_York');
*/
//'0 0 */3 * * '
new CronJob('0 0 3 * * * ', function() {
  guildNum();
  update();

}, null, true, 'America/New_York');

new CronJob('0 */5 * * * * ', function() {
  update();
}, null, true, 'America/New_York');

new CronJob('0 30 6 * * *', function() {
  dailyEvents('614475604871348224');
}, null, true, 'America/New_York');


function guildNum() {
  var x = 0;
  var currentDate = new Date();
  var date = currentDate.getDate();
  var month = currentDate.getMonth();
  var year = currentDate.getFullYear();

  var dateString = (month + 1) + "/" + date + "/" + year;
  (async () => {
    for (x; x < codes.length;) {
      let payload = {
        allycode: codes[x],
        language: 'eng_us'
      }//
      let { result, error, warning } = await swapi.fetchGuild(payload);
      console.log(result);
      console.log(result.roster);
      result.forEach(player => {
        for (var x = 0; x < player.roster.length; x++) {
          console.log(player.roster[x])
          var name = player.roster[x].name.toLowerCase()
          var code = player.roster[x].gp
          console.log(name+" : "+code)
        }
      })
      var guildGp = result[0].gp / 1000000
      var roundGp = guildGp.toFixed(1)
      var avgGp = result[0].gp / result[0].members;
      console.log("avg GP : "+avgGp);
      client.channels.cache.find('485246576751673354').fetchMessage(mainChans[x]).then((msg) => {
        // Resolve promise
        msg.edit(result[0].name + " -\n" + result[0].members + "/50 " + roundGp + "mil gp\n" + texts[x]  + ggLink[x] + "\nUpdated on " + dateString)
      });
      client.channels.cache.find('595255366644924440').fetchMessage(recruitChans[x]).then((msg) => { // Resolve promise
        msg.edit(result[0].name + " -\n" + result[0].members + "/50 " + roundGp + "mil gp\n" + texts[x] + ggLink[x] + "\nUpdated on " + dateString)
      });
      x += 1;
    }
  })();

}

function update() {
  return;
  (async () => {
    const data = await fs.readFileSync('array.txt', 'utf8');
    if (!data.includes(',')) {
      isUpdated = false;
    }
  })();
  
  if (!isUpdating && !isUpdated) {
    isUpdating = true;
    console.log("UPDATING");
    (async () => {
    (async () => {
      let payload1 = {
        allycode: codes1,
        language: 'eng_us'
      }
      let { result1, error1, warning1 } = await swapi.fetchGuild(payload1);
        console.log("payload1");
      result1.forEach(player => {
        for (var x = 0; x < player.roster.length; x++) {
          var name = player.roster[x].name.toLowerCase()
          var code = player.roster[x].allyCode
          rosters.push(name);
          rosters.push(code);
          names.push(name);
        }
      })
    })();
    (async () => {
      let payload2 = {
        allycode: codes2,
        language: 'eng_us'
      }
      let { result2, error2, warning2 } = await swapi.fetchGuild(payload2);
        console.log("payload2");
      result2.forEach(player => {
        for (var x = 0; x < player.roster.length; x++) {
          var name = player.roster[x].name.toLowerCase()
          var code = player.roster[x].allyCode
          rosters.push(name);
          rosters.push(code);
          names.push(name);
        }
      })
    })();
    (async () => {
      let payload3 = {
        allycode: codes3,
        language: 'eng_us'
      }
      let { result3, error3, warning3 } = await swapi.fetchGuild(payload3);
        console.log("payload3");
      result3.forEach(player => {
        for (var x = 0; x < player.roster.length; x++) {
          var name = player.roster[x].name.toLowerCase()
          var code = player.roster[x].allyCode
          rosters.push(name);
          rosters.push(code);
          names.push(name);
        }
      })
    })();
    
      
      var file = fs.createWriteStream('array.txt');
      file.on('error', function(err) { /* error handling */ });
      for (var x = 0; x < rosters.length; x++) {
        var toBeWrite = rosters[x];
        if (typeof toBeWrite === 'string')
          var toBeWrite = toBeWrite.replace(' ', '');
        file.write(toBeWrite + ",");
      }
      file.end();
      console.log("DONE")
      client.user.setActivity(prefix + 'help ✔️', {
        type: 'LISTENING'
      });
      isUpdated = true;
    })();
    isUpdating = false;
  } else if (isUpdating)
    console.log("We are already updating")
}

function getNames(input, arrayInput) {

  a = FuzzySet(arrayInput);
  if (input == 'brown')
    input = 'brown discord 6964';
  if (input == 'dips')
    input = 'dipsscanner';
  const out = a.get(input)
  var outMatch;
  var outName;
  var outScore;
  var output = [];
  var resultsSent = false;
  for (var x = 0; x < out.length; x++) {
    outMatch = out[x];
    outName = outMatch[1];
    outScore = outMatch[0];
    if (outScore == 1) {
      output.push("redo" + outName)
    } else if (outScore >= 0.5 && outScore != 1) {
      output.push(outName);
      resultsSent = true;
    }
  }
  return output;
}


function listMembers(member) {
  if (!member.user.bot) {
    var memberName = member.displayName.toLowerCase().replace(' {empire}', '').replace(' {rebellion}', '').replace(' {rogue}', '').replace(' {havoc}', '').replace(' {order}', '').replace(' {uprising}', '').replace(' {røgue}', '').replace(' ', '');
    allianceUsers.push(memberName);
  }
}

function dayConvert(day) {
  day = daysOfWeek[day]
  return day;
}
function monthConvert(month) {
  month = months[month];
  return month;
}
function dailyEvents(chanID) {
  (async () => {
    let payload = {
      language: 'eng_us',
      enums: 'true',
      structure: 'true'
    }
    let { result, error, warning } = await swapi.fetchEvents(payload);
    var events = result.events
    var liveEvents = [];
    var liveEventsDes = [];
    var milliseconds = (new Date).getTime();
    var currentDate = new Date();
    var day = currentDate.getDay();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var dayString = dayConvert(day) + ", " + date + "th of " + monthConvert(month);
    var dateString = (month + 1) + "/" + date + "/" + year;
    liveEvents.push(wakeups[day]);
    liveEventsDes.push("Lets get those tickets in! 1 LS/DS/Cantina energy = 1 ticket !\nThe more tickets we earn means the more often we raid!\nThe Guild Activity today is: " + activities[day]);
    //liveEvents.push("Today is: "+dayConvert(day)+" the "+date+"th of "+monthConvert(month)+"\nThe Guild Activity today is:");
    //liveEventsDes.push(activities[day]);
    for (var x = 0; x < events.length; x++) {
      var eventName = events[x].nameKey
      var eventDes = events[x].summaryKey
      var list = events[x].instanceList
      for (var y = 0; y < list.length; y++) {
        var listStartTime = list[y].startTime;
        var listEndTime = list[y].endTime;
        if (milliseconds < listEndTime && milliseconds > listStartTime) {
          if ((!eventName.includes("MODS")) && (!eventName.includes("Commander") && (!eventName.includes("TEST")) && (!eventName.includes("TERRITORY"))&&(!eventName.includes("Legendary"))&&(!eventName.includes("Journey"))&&(!eventName.includes("SEASON")))) {
            var pushedName = eventName.replace(/\[([\d\w\-\/]+)\]/g, '').replace(/\\n/g, " ")
            var pushedDes = eventDes.replace(/\[([\d\w\-\/]+)\]/g, '').replace(/\\n/g, " ")
            liveEvents.push(pushedName)
            liveEventsDes.push(pushedDes)
            //console.log("BING");
          }
        }
      }
    }
    //console.log(events[7]);
    //console.log(liveEvents);

    const embed = new Discord.RichEmbed()
      .setTitle("__SWGOH Today: " + dayString + "__")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setFooter("Made by Vorwerk")
      .setTimestamp()
    for (var z = 0; z < liveEvents.length; z++) {
      embed.addField(liveEvents[z], liveEventsDes[z])
    }
    client.channels.cache.find(chanID).send({ embed })
  })();
}

function createWait(guild, members) {
  //var channels = guild.channel.size
  //var numChannels=channels.length

}
/* client.channels.get('485246576751673354').send("test");
  client.channels.get('595255366644924440').send("test");
const list = client.guilds.get("483433483109138433");
list.members.forEach(listMembers);
(async() => {
    const data = await fs.readFileSync('array.txt','utf8');
  var newArr = data.split(',');
var names=[];
for(var x = 0; x<newArr.length;x+=2){
names.push(newArr[x]);
}
console.log("DISCORD NAMES NOT IN GAME");
var gameNot=[];
for(var x = 0 ; x<allianceUsers.length;x++){
  if(!names.includes(allianceUsers[x])){
  console.log(allianceUsers[x]);
  gameNot.push(allianceUsers[x]);
}}
console.log("IN GAME NAMES NOT IN DISCORD");
var discordNot=[];
for(var x = 0; x<names.length;x++){
  if(!allianceUsers.includes(names[x])){
  console.log(names[x]);
  discordNot.push(names[x]);
}}
var names1 = discordNot.slice(0,names.length/2);
var names2= discordNot.slice(names.length/2,names.length);
var allianceUsers1 = gameNot.slice(0,allianceUsers.length/2);
var allianceUsers2 = gameNot.slice(allianceUsers.length/2,allianceUsers.length);

msg.channel.send("INGAME NAMES NOT IN DISCORD")
msg.channel.send(names1);
msg.channel.send(names2);
msg.channel.send("DISCORD USERS NOT IN GAME");
msg.channel.send(allianceUsers1);
msg.channel.send(allianceUsers2);

})();
  }*/
