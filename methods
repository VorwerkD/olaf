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