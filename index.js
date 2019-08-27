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
var commands = ["help","ping","flip","lotto","kick","clearChat","live","urban","guildnum","console","gg","reset","update","reverse","test","user"];
var commandHelp = ["You're reading it!",
"Pongs!","Flips a coin","Gives you your lotto numbers- Doesn't gaurentte you win though :wink:",
"kicks a valid user, just tag them `.kick @notVorwerk#6126` for example\nRequires Admin role",
"Clears the current channel of messages <14 days old add a number<100 to clear - defaults to 100 `.clearChat 50` for example \nRequires Admin role",
"check to see if the given twitch streamer is live `.live Vorwerk_D` for example","Searches urban dictionary for a word/phrase. Attach -r for a random word",
"Updates the guild numbers channels","Logs the input to the console ","Gives the swgoh.gg link of the requested user `.gg Vorwerk17` for example","shuts down and resets the bots login. Vorwerk only","Manually updates the cached guilds","Reverses your input","A test command","Gives information on the user"]
var olafTest = '570738555773648897'//chan id
//twitch stuffs
var streamList = ["yautjaridley","Vorwerk_D"]
var streamChan = ["547923999552700436",olafTest]
var daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months=["January","Febuary","March","April","May","June","July","August","September","October","November","December"]
var activities = ["\nBefore Reset: Complete Arena Battles\nAfter Reset: Spend Cantina Energy",
"\nBefore Reset: Spend Cantina Energy\nAfter Reset: Spend Energy on Light Side Battles",
"\nBefore Reset: Spend Energy on Light Side Battles\nAfter Reset: Complete Galactic War",
"\nBefore Reset: Complete Galactic War\nAfter Reset: Spend Energy on Hard Mode Battles",
"\nBefore Reset: Spend Normal Energy on Hard Mode Battles\nAfter Reset: Complete Challenges",
"\nBefore Reset: Complete Challenges\nAfter Reset: Spend Energy on Dark Side Battles",
"\nBefore Reset: Spend Energy on Dark Side Battles\nAfter Reset: Complete Arena Battles"
];
var wakeups=["Morning Phantom!","Monday morning, you sure look fine.","You will never have this day again Phantom so make it count!","Rise up and attack the day with enthusiasm!","Rise and shine Phantom","Happy Friday Phantom! It's almost the weekend!","Happy Weekend Phantom, enjoy the days off"];
const TwitchClient = require('twitch').default;
const clientId = process.env.TWITCH_CLIENT_ID;
const clientSecret = process.env.TWITCH_CLIENT_SECRET;
const twitchClient = TwitchClient.withClientCredentials(clientId, clientSecret);
//swgoh stuffs
const ApiSwgohHelp = require('api-swgoh-help');
var rosters=["Name","allyCode"]
var names=["Names"];
var allianceUsers=[];
var codes = [135718294,466484534,399663774,618277879,484271262,922288553]
var texts = ["filler",
"600 Tickets Daily\nTicket reset @ 6:30 PST\nDSTB- 45 :star:\nLSTB- 41 :star:\nGEOTB- 16 :star:\nhttps://swgoh.gg/g/35906/phantomrebellion/",
"600 Tickets Daily\nTicket reset @ 7:30 CST\nDSTB- 34 :star:\nLSTB- 37 :star:\nGEOTB- 12 :star:\nhttps://swgoh.gg/g/51323/phantomempire/",
"600 Tickets Daily\nTicket reset @ 6:30 CST\nDSTB- 41 :star:\nLSTB- 41 :star:\nGEOTB- 9 :star:\nhttps://swgoh.gg/g/29918/phantomhavoc/",
"400 Tickets Daily\nTicket reset @ 6:30 PST\nDSTB- 5 :star:\nLSTB- 30 :star:\nGEOTB- 6 :star: \nhttps://swgoh.gg/g/61585/phantomrogue/",
"600 Tickets Daily\nTicket reset @ 6:30 EST\nDSTB- ? :star: \nLSTB- ? :star: \n GEOTB- 17 :star:\nhttps://swgoh.gg/g/61714/phantomorder/",
"400 Tickets Daily\nTicket reset @ 6:30 EST\nDSTB- 30 :star: \nLSTB- 28 :star: \n GEOTB- ? :star:\nhttps://swgoh.gg/g/63155/phantom-uprising/"]
var mainChans=['596613040879960065','596613066108698650','596613090557034497','596613114036748299','602869523741409310','604044611995828247']//message ids to edit
var recruitChans=['596613040762388480','596613065907109888','596613090900967440','596613113957187586','602869523661455381','604044611505094657']//message ids to edit
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
var oldInput = input;
var inputRes =input.split(' ');
var inputResCom= inputRes[0].substring(1);
b = FuzzySet(commands);
const inCom =b.get(inputResCom);
const inCom2 = inCom[0];
if(inCom2[0]>=0.625){
input=inCom2[1];
input=prefix+input+" "+inputRes[1];
}
else{
  console.log("not a command")
}
}
/*
UPDATES THE ROSTERS FILE
*/
//FLAG
var regex = /\[([\d\w]+)\]/g;
if(input.startsWith(prefix+"test")){
  if(msg.author.id==234346145806155776){
    dailyEvents(olafTest);
  }
}//user
if(input.startsWith(prefix+"user")){
  const user = msg.author.id
  const guild =msg.guild
  const guildMessageUser=msg.guild.member(user)
  var joinDate=new Date(guildMessageUser.joinedAt);
var date = joinDate.getDate();
var month = joinDate.getMonth();
var year = joinDate.getFullYear();
  dateString = (month+1)+ "/" +date + "/" + year;
const embed = new Discord.RichEmbed()
  .setTitle("User Stats:")
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(guildMessageUser.displayColor)
  .setDescription("Some basic user stats WIP")
  .setFooter("Made by Vorwerk")
  //.setImage("http://i.imgur.com/yVpymuV.png")
  .setThumbnail(msg.author.avatarURL)
  .setTimestamp()
  .addField("Joined at: ",dateString)
  .addField("ALL ROLES WIP",guildMessageUser.roles)
  .addField("ID: ",guildMessageUser.id)
    //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed"
  msg.channel.send({embed});
}
//reverse
if(input.startsWith(prefix+"reverse")){
  res = input.substring(9); 
  var splitString = res.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join("");
    msg.reply(joinArray);
}

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
if(res==null){
msg.channel.send("No input detected, please input or mention a valid user")
return}
    (async() => {
    const data = await fs.readFileSync('array.txt','utf8');
  var newArr = data.split(',');
var names=[];
for(var x = 0; x<newArr.length;x+=2){
names.push(newArr[x]);
}
var matchedArray = getNames(res,names);
if(matchedArray.length==0){
  msg.channel.send("No user found, please input or mention a valid user");
}
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
  var res = oldInput.substring(prefix.length+6);
  trollface = urban(res);
  console.log(res);
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
  
//help
  if(input.startsWith(prefix+"help")) {
  const embed = new Discord.RichEmbed()
  .setTitle("Command List: ")
  .setAuthor(client.user.username,client.user.avatarURL)
  .setColor(0xac38f1)
  .setDescription("All Commands are preceded by "+prefix)
  .setFooter("Made by Vorwerk")
  //.setImage("http://i.imgur.com/yVpymuV.png")
  .setThumbnail(msg.author.avatarURL)
  .setTimestamp()
  //.setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
  for( var x =0;x<commands.length;x++){
  embed.addField(commands[x],
    commandHelp[x])
}
embed.addField("Join Vorwerk's Server at:"," https://discord.gg/GUKXv7j")
embed.addField("Invite this bot to other servers with:","https://discordapp.com/oauth2/authorize?&client_id=523260461932740620&scope=bot&permissions=93250!")
  msg.channel.send({embed});
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

new CronJob('0 30 6 * * *',function(){
  dailyEvents('614475604871348224');
}, null, true, 'America/New_York');

function guildNum() {
  var x =0;
  var currentDate = new Date();
var date = currentDate.getDate();
var month = currentDate.getMonth();
var year = currentDate.getFullYear();

var dateString = (month+1)+ "/" +date + "/" + year;
  (async() => {
    for(x; x<codes.length;){
    let payload = {
  allycode: codes[x],
  language: 'eng_us'
}//
let { result, error, warning } = await swapi.fetchGuild( payload );
console.log(result);
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
  allycode: codes,
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
  var toBeWrite= rosters[x];
  if(typeof toBeWrite === 'string')
  var toBeWrite=toBeWrite.replace(' ','');
 file.write(toBeWrite+",");
}
file.end();
console.log("DONE")
client.user.setActivity(prefix+'help ✔️', { type: 'LISTENING' 
  });
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


function listMembers(member){
  if(!member.user.bot){
    var memberName = member.displayName.toLowerCase().replace(' {empire}','').replace(' {rebellion}','').replace(' {rogue}','').replace(' {havoc}','').replace(' {order}','').replace(' {uprising}','').replace(' {røgue}','').replace(' ','');
    allianceUsers.push(memberName);
  }
}

function dayConvert(day){
  day = daysOfWeek[day]
  return day;
}
function monthConvert(month){
  month = months[month];
  return month;
}
function dailyEvents(chanID){
(async() =>{
    let payload = {
  language: 'eng_us',
  enums:'true',
  structure:'true'
    }
let { result, error, warning } = await swapi.fetchEvents( payload );
var events = result.events
var liveEvents =[];
var liveEventsDes=[];
var milliseconds = (new Date).getTime();
var currentDate = new Date();
var day = currentDate.getDay();
var date = currentDate.getDate();
var month = currentDate.getMonth();
var year = currentDate.getFullYear();
var dayString = dayConvert(day)+", "+date+"th of "+monthConvert(month);
var dateString = (month+1)+ "/" +date + "/" + year;
liveEvents.push(wakeups[day]);
liveEventsDes.push("Lets get those tickets in! 1 LS/DS/Cantina energy = 1 ticket !\nThe more tickets we earn means the more often we raid!\nThe Guild Activity today is: "+activities[day]);
//liveEvents.push("Today is: "+dayConvert(day)+" the "+date+"th of "+monthConvert(month)+"\nThe Guild Activity today is:");
//liveEventsDes.push(activities[day]);
for(var x = 0; x<events.length;x++){
var eventName = events[x].nameKey
var eventDes = events[x].summaryKey
var list = events[x].instanceList
for(var y = 0; y<list.length;y++){
var listStartTime=list[y].startTime;
var listEndTime=list[y].endTime;
var isDeleting =false;
if(milliseconds<listEndTime&&milliseconds>listStartTime){
  if((!eventName.includes("MODS"))&&(!eventName.includes("Commander"))){
  var pushedName= eventName.replace(/\[([\d\w\-\/]+)\]/g,'').replace(/\\n/g," ")
  var pushedDes=eventDes.replace(/\[([\d\w\-\/]+)\]/g,'').replace(/\\n/g," ")
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
  .setTitle("__SWGOH Today: "+dayString+"__")
  .setAuthor(client.user.username,client.user.avatarURL)
  .setFooter("Made by Vorwerk")
  .setTimestamp()
  for(var z=0;z<liveEvents.length;z++){
  embed.addField(liveEvents[z],liveEventsDes[z])
}
client.channels.get(chanID).send({embed})
  })();
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
