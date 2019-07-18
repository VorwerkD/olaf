//bot stuffs
const Discord = require('discord.js');
const client = new Discord.Client();
const FuzzySet = require('fuzzyset.js');
const token = process.env.DISCORD_BOT_SECRET;
var urban = require('urban');
var prefix="."
const fs = require('fs');
var isUpdating;
var isUpdated;
client.wait = require('util').promisify(setTimeout);
var CronJob = require('cron').CronJob;
var commands = ["help","support","ping","flip","lotto","kick","clearChat","live","urban","console","guildnum","gg","reset"];
var commandHelp = ["You're reading it!","Join our support server!",
"Pongs!","Flips a coin","Gives you your lotto numbers- Doesn't gaurentte you win though :wink:",
"kicks a valid user, just tag them `.kick @notVorwerk#6126` for example\nRequires Admin role",
"Clears the current channel of messages <14 days old add a number<100 to clear - defaults to 100 `.clearChat 50` for example \nRequires Admin role",
"check to see if the given twitch streamer is live `.live Vorwerk_D` for example","Searches urban dictionary for a word/phrase. Attach -r for a random word",
"Updates the guild numbers channels","Logs the input to the console ","Gives the swgoh.gg link of the requested user `.gg Vorwerk17` for example","shuts down and resets the bots login. Vorwerk only"]
var olafTest = '570738555773648897'//chan id
//twitch stuffs
var streamList = ["mL7support","yautjaridley"]
var streamChan = [olafTest,"547923999552700436"]
const TwitchClient = require('twitch').default;
const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;
const twitchClient = TwitchClient.withClientCredentials(clientId, clientSecret);
//swgoh stuffs
const ApiSwgohHelp = require('api-swgoh-help');
var rosters=["Name","allyCode"]
var numGuilds= 4;
var names=["Names"]
var codes = [135718294,466484534,399663774,861239843]
var texts = ["filler","Ticket reset @ 6:30 PST\nDSTB- 42 :star:\nLSTB- 41 :star:\nGEOTB-12 :star:\nhttps://swgoh.gg/g/35906/phantomrebellion/","Ticket reset @ 7:30 CST\nDSTB- 34 :star:\nLSTB- 34 :star:\nGEOTB-7 :star:\nhttps://swgoh.gg/g/51323/phantomempire/","Ticket reset @ 6:30 CST\nDSTB- 34 :star:\nLSTB- 34 :star:\nGEOTB-9 :star:\nhttps://swgoh.gg/g/29918/phantomhavoc/","Ticket reset @ 6:30 PST\nDSTB- 5 :star:\nLSTB- ? :star:\nGEOTB-yet to be attempted\nhttps://swgoh.gg/g/61585/phantomrogue/"]
var mainChans=['596613040879960065','596613066108698650','596613090557034497','596613114036748299']//message ids to edit
var recruitChans=['596613040762388480','596613065907109888','596613090900967440','596613113957187586']//message ids to edit
var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const swapi = new ApiSwgohHelp({
    "username":process.env.SWGOH_HELP_USERNAME,
    "password":process.env.SWGOH_HELP_PASSWORD
});
(async() =>{
      var acquiredToken = await swapi.connect();
    })();
//Bot Logged in
client.on('ready', () => {
  console.log("logged in as : "+client.user.username);
  client.user.setActivity(prefix+'help', { type: 'LISTENING' 
  });
    console.log("servers:")  
    client.guilds.forEach((guild)=>{
      console.log(" - "+guild.name)
    });
  (async()=>{
  update();})();
});
//join messages
client.on('guildMemberAdd',member =>{
  if(member.guild.id=='484182766271856651'){
  member.guild.channels.get('567116459684397076').send("Welcome to Vorwerks Bot testing server "+member+". Enjoy your stay.\nPing Vorwerk if you need help with something.");
  if(!member.bot){
    member.addRole('484848526757593119');/*
    (async() =>{
      await addAndRemoveRole(member,'484848526757593119');
    })();*/
  }}});
//messages
client.on('message', msg => {
var input='';
if(msg.content.startsWith(prefix)){
input=msg.content.toLowerCase()//to make all inputs - either command or parameters all uniform - if a command needs uppercase parameters etc, put above this line
var inputRes =input.split(' ');
var inputResCom= inputRes[0].substring(1);
b = FuzzySet(commands);
const inCom =b.get(inputResCom);
const inCom2 = inCom[0];
input=inCom2[1];
input=prefix+input+" "+inputRes[1];
}


if (input.startsWith(prefix+"support"))
  msg.channel.send("Join Vorwerk's Server at: https://discord.gg/GUKXv7j");
/*
UPDATES THE ROSTERS FILE
*/
if(input.startsWith(prefix+"update")){
  (async() =>{
update();
msg.react('✅');
    })();
}
/*
GG COMMAND
*/
if(input.startsWith(prefix+"gg")){
   const member = msg.mentions.members.first();
   var res = ""
if(member == null){
res = input.substring(4); 
}
else{
res = member.displayName.toLowerCase().replace(' {empire}','').replace(' {rebellion}','').replace(' {rogue}','').replace(' {havoc}','');
}
    (async() => {
    const data = await fs.readFileSync('array.txt','utf8');
  var newArr = data.split(',');
var names=[];
for(var x = 0; x<newArr.length;x+=2){
names.push(newArr[x]);
}
var matchedArray = getNames(res,names);
for(var x =0;x<matchedArray.length;x++){
  if(matchedArray[x].startsWith("redo")){
    var newName = matchedArray[x].substring(4,matchedArray[x].length-1)+characters.charAt(Math.floor(Math.random() * characters.length));
    var matchedArray = getNames(newName,names)
  }
var codeRec=newArr[newArr.indexOf(matchedArray[x])+1];
msg.channel.send("https://swgoh.gg/p/"+codeRec+"/")
}
})();
}
/*
console
*/
if(input.startsWith(prefix+"console")){
console.log(input);
}
/*
GUILD NUM for automatic updates of guild numbers
*/
if(input.startsWith(prefix+"guildnum")){
guildNum()
}
  if (input.startsWith(prefix+"live")){
    
     var res = input.split(" ");
      
      var streamer=res[1];
   (async () => {
    const online = await isStreamLive(streamer);
    if(online){
const stream = await getStream(streamer);
msg.channel.send(streamer+" is live! they're playing "+stream.game+" at "+stream.url);
    }
    else{
      msg.channel.send("Sorry, they are not streaming currently... :(");
    }})(); 
  }
  /*
  FLIP COMMAND
  */
    if (input.startsWith(prefix+"flip")) {
      
      if(Math.random() >= 0.5)
      msg.reply(`Heads!`)
      else
     msg.reply(`Tails!`)
    }
//ping
if ((msg.author.id != client.user.id)&&(input.startsWith(prefix+"ping"))) {
 // Check if message is "!ping"
 			msg.channel.send("Pinging ...") // Placeholder for pinging ... 
			.then((msg) => { // Resolve promise
				msg.edit("Ping: " + (Date.now() - msg.createdTimestamp))
        })}

//lotto
if (input.startsWith(prefix+"lotto")) {
 msg.reply("\nYour lotto digits: "+Math.floor(Math.random() * 70+1)+" "+Math.floor(Math.random() * 70+1)+" "+Math.floor(" "+Math.random() * 70+1)+" "+Math.floor(Math.random() * 70+1)+" "+Math.floor(Math.random() * 70+1)+"\nYour Mega Ball: "+Math.floor(Math.random() * 25+1))
}
//invite
if (input.startsWith(prefix+"invite")) {
 if(msg.author.id == 234346145806155776)
 {
   msg.reply("https://discordapp.com/oauth2/authorize?&client_id=523260461932740620&scope=bot&permissions=93250!")
}
    else(msg.reply("You do not have the required permissions."))
}

//kick
if(input.startsWith(prefix+"kick")) {
  if(!msg.member.roles.some(r=>["Admin"].includes(r.name)) )
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

  //help

  if(input.startsWith(prefix+"help")) {
  const embed = new Discord.RichEmbed()
  .setTitle("Command List: all commands are preceded by"+prefix)
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(0xac38f1)
  .setDescription("This is the main body of text, it can hold 2048 characters.")
  .setFooter("Made by Vorwerk")
  //.setImage("http://i.imgur.com/yVpymuV.png")
  .setThumbnail(msg.author.avatarURL)
  .setTimestamp()
  //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
  for( var x =0;x<commands.length;x++){
  embed.addField(commands[x],
    commandHelp[x])
}
  msg.channel.send({embed});
}
  

  if(input.startsWith(prefix+"reset")&&(msg.author.id==234346145806155776)) {
    console.log('Resetting...'+" In server: "+msg.channel.guild)
    msg.channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(token))
    .then(() => msg.channel.send('Reset Complete... Service Restored...'))
  }
//poll clear
//clear chat
    if (input.startsWith(prefix+"clearchat")) {
      if(!msg.member.roles.some(r=>["Admin"].includes(r.name)))
      msg.reply("Sorry, you don't have permissions to use this!");
      else{
      var res = input.split(" ");
      
      var num=res[1];
      if (num==undefined)
        num=100;
      console.log(msg.author.username+" is clearing messages in: "+msg.channel.guild)
        msg.channel.bulkDelete(num)
  .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
  .catch(console.error);
    }}
//urban
if(input.startsWith(prefix+"urban")) {
  var res = input.substring(prefix.length+6);
  trollface = urban(res);
  if(res===('-r')){
urban.random().first(function(JSON) {
  var out=JSON.definition;
  var out2=out.replace(/\[([^\]]*)\]/g, "$1");
    msg.channel.send({embed: {
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
  else{
trollface.first(function(JSON) {
  try{
  var out=JSON.definition;
  var out2=out.replace(/\[([^\]]*)\]/g, "$1");
    
    msg.channel.send({embed: {
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
  catch(err){
msg.channel.send("This word could not be found from UrbanDictionary.com");
  }
});
  }}

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

//empire
new CronJob('0 30 19 * * *', function() {

  client.channels.get('485184288795656238').send("<@&485169730097774612> 1 hour to tickets! Thank you :smiley: ").catch(function(error) {
  client.users.get('234346145806155776').send(error);
});
  
}, null, true, 'America/New_York');
//phantom
new CronJob('0 30 20 * * *', function() {

  client.channels.get('483784255030296589').send("<@&483620584861859850> 1 hour to tickets! Thank you :smiley: ").catch(function(error) {
  client.users.get('234346145806155776').send(error);
});
  
}, null, true, 'America/New_York');

async function addAndRemoveRole(member, role) {
  await member.addRole(role)
  await client.wait(30*60*1000);//minutes*seconds/min*milliseconds/seconds
  await member.removeRole(role)
}

async function checkLive(streamName){
const online = await isStreamLive(streamName);
    if(online){
      const stream = await getStream(streamName);
      const streamLive = await twitchClient.kraken.streams.getStreamByChannel(stream);
      const now = new Date();

      const dif = now-streamLive.startDate;
      if (dif <130000){
       return stream
      }
      
      }else{
        return null;
      }}

  new CronJob('*/2 * * * *', function(){
  (async() => {
    for (var x = 0; x <streamList.length;x+=1 ){
    const stream = await checkLive(streamList[x]);
    if(stream != null){
        client.channels.get(streamChan[x]).send(stream.displayName+" is live! They're playing "+stream.game+" at "+stream.url)
  }
    }
  })();
}, null, true, 'America/New_York');

//'0 0 */3 * * '
new CronJob('0 0 3 * * * ', function(){
  guildNum();
  update();
  
}, null, true, 'America/New_York');

new CronJob('0 */5 * * * * ', function(){
    update();
}, null, true, 'America/New_York');

function guildNum() {
  var x =0;
  var currentDate = new Date();
var date = currentDate.getDate();
var month = currentDate.getMonth();
var year = currentDate.getFullYear();

var dateString = (month+1)+ "/" +date + "/" + year;
  (async() => {
    for(x; x<numGuilds;){
    let payload = {
  allycode: codes[x],
  language: 'eng_us'
}//
let { result, error, warning } = await swapi.fetchGuild( payload );
var guildGp =result[0].gp/1000000
var roundGp=guildGp.toFixed(1)
client.channels.get('485246576751673354').fetchMessage(mainChans[x]).then((msg) => {
// Resolve promise
				msg.edit(result[0].name+" -\n"+result[0].members+"/50 "+roundGp+"mil gp\n"+texts[x]+"\nUpdated on "+dateString)
        });    
client.channels.get('595255366644924440').fetchMessage(recruitChans[x]).then((msg) => { // Resolve promise
				msg.edit(result[0].name+" -\n"+result[0].members+"/50 "+roundGp+"mil gp\n"+texts[x]+"\nUpdated on "+dateString)
        });
        x+=1;
    }  
  })();

}

function update(){
  (async() => {
    const data = await fs.readFileSync('array.txt','utf8');
  if (!data.includes(',')){
    isUpdated=false;
  }
})();
    if(!isUpdating&&!isUpdated){
        isUpdating=true;
  console.log("UPDATING");
  (async() => {
    let payload ={
  allycode: [135718294,466484534,399663774,861239843],
  language: 'eng_us'
}
let { result, error, warning } = await swapi.fetchGuild( payload );

result.forEach(player =>{
  for(var x=0;x<player.roster.length;x++){
    var name = player.roster[x].name.toLowerCase()
    var code = player.roster[x].allyCode
rosters.push(name);
rosters.push(code);
names.push(name);
  }
})
var file = fs.createWriteStream('array.txt');
file.on('error', function(err) { /* error handling */ });
for(var x = 0 ; x<rosters.length;x++){
 file.write(rosters[x]+",");
}
file.end();
console.log("DONE")
isUpdated=true;
})(); 
isUpdating=false;
}else if(isUpdating)
console.log("We are already updating")
}

function getNames(input,arrayInput){

a = FuzzySet(arrayInput);
if(input == 'brown')
  input = 'brown discord 6964';
if(input == 'dips')
  input= 'dipsscanner';
const out = a.get(input)
var outMatch;
var outName;
var outScore;
var output=[];
var resultsSent=false;
for(var x =0; x<out.length;x++){
outMatch=out[x];
outName=outMatch[1];
outScore=outMatch[0];
if(outScore==1){
output.push("redo"+outName)
}else if(outScore>=0.5&&outScore!=1){
output.push(outName);
resultsSent=true;
}}
return output;
}
