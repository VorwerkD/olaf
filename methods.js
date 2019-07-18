<<<<<<< HEAD
const FuzzySet = require('fuzzyset.js');
const ApiSwgohHelp = require('api-swgoh-help');
var rosters=["Name","allyCode"]
var numGuilds= 4;
var names=["Names"]
var codes = [135718294,466484534,399663774,861239843]
var texts = ["filler","Ticket reset @ 6:30 PST\nDSTB- 42 :star:\nLSTB- 41 :star:\nGEOTB-12 :star:\nhttps://swgoh.gg/g/35906/phantomrebellion/","Ticket reset @ 7:30 CST\nDSTB- 34 :star:\nLSTB- 34 :star:\nGEOTB-7 :star:\nhttps://swgoh.gg/g/51323/phantomempire/","Ticket reset @ 6:30 CST\nDSTB- 34 :star:\nLSTB- 34 :star:\nGEOTB-9 :star:\nhttps://swgoh.gg/g/29918/phantomhavoc/","Ticket reset @ 6:30 PST\nDSTB- 5 :star:\nLSTB- ? :star:\nGEOTB-yet to be attempted\nhttps://swgoh.gg/g/61585/phantomrogue/"]
var mainChans=['596613040879960065','596613066108698650','596613090557034497','596613114036748299']
var recruitChans=['596613040762388480','596613065907109888','596613090900967440','596613113957187586']
var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const swapi = new ApiSwgohHelp({
    "username":process.env.SWGOH_HELP_USERNAME,
    "password":process.env.SWGOH_HELP_PASSWORD
});
(async() =>{
      var acquiredToken = await swapi.connect();
    })();

var methods = {
	getNames: function(input,arrayInput){

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
},
	update: function(){
=======
var methods = {
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
},
	function update(){
>>>>>>> refs/heads/master
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
};