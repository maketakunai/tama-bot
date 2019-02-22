const ccList = require("../data/command_codes.json");

exports.run = (client, message, args) => {
  var tempargs = args;
  console.log(tempargs, args);
  var searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  console.log(`Searching for ${searchString}...`);

  var ccSearch = findCC(searchString, tempargs);
  console.log(tempargs, args);
  if (ccSearch.length == 0){
    message.channel.send(`No results found.\nPlease type '!cc (CC name)' or '!cc (CC number) or '!cc effect (desired_effect) to search for a particular command code.\nNumbers need leading zeroes up to 100. ex)'!cc 007'`)
  return;
  }
  if (ccSearch.length > 0 && ccSearch.length < 6) {
    for (var j = 0; j < ccSearch.length; j++){
      console.log(ccSearch[j]);
      message.channel.send({
        "embed": {
          "color": 16756224,
          "thumbnail": {
            "url": `${ccSearch[j]["image"]}`
          },
          "image": {
          "url": ""
          },
          "author": {
            "name": `${ccSearch[j]["name_eng"]} / ${ccSearch[j]["name_jp"]}`
          },
          "fields": [
            {
              "name": "Number",
              "value": `${ccSearch[j]["number"]}`,
              "inline": true
            },
            {
              "name": "Rarity",
              "value": `${ccSearch[j]["rarity"]}`,
              "inline": true
            },
            {
              "name": `Effects`,
              "value": `${ccSearch[j]["emoji"]} ${ccSearch[j]["effect"]}`,
              "inline": false
            },
            {
              "name": `Obtained`,
              "value": `${ccSearch[j]["obtained"]}`,
              "inline": false
            }
          ]
        }
      }).catch(console.error);
    }
  }
  else if (ccSearch.length > 5 && ccSearch.length < 21) {
    var results = "";
    for (var j = 0; j < ccSearch.length; j++){
      results += `${ccSearch[j]["number"]}: ${ccSearch[j]["name_eng"]}\n`
    }
    message.channel.send(`${ccSearch.length} results found. Please try to be more specific. You can also search by CC number.\n${results}`).catch(console.error);
  }
  else if (ceSearch.length >= 21){
    message.channel.send(`${ccSearch.length} results found. Please try to be more specific. You can also search by CC number.`).catch(console.error);
  }
}


function findCC(input, args){
  var ccFound = [];
  if (input == ""){
    return ccFound;
  }
  var tempargs = args;
  var effect = args.shift()
  effect = effect.toLowerCase();
  tempargs = tempargs.join('');
  tempargs = tempargs.toLowerCase();
  tempargs = tempargs.replace(/\W/g, '');
  for (var key in ccList){
    if (Number(input) == Number(key)){
      ccFound.push(ccList[key]);
    }
    for (var parameter in ccList[key]){
      if (parameter == "name_eng"){
        var ccName = ccList[key]["name_eng"];
        ccName = ccName.replace(/\W/g, '');
        ccName = ccName.toLowerCase();
        if (ccName.search(input) != -1){
          ccFound.push(ccList[key]);
        }
      }
      if (parameter == "effect" && effect == "effect" && tempargs.length >= 2){
        var ccDesc = ccList[key]["effect"];
        ccDesc = ccDesc.replace(/\W/g, '');
        ccDesc = ccDesc.toLowerCase();
        if (ccDesc.search(tempargs) != -1){
          ccFound.push(ccList[key]);
        }
      }
    }
  }
  return ccFound;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'cc',
  description: `Shows Command Code information.`,
  usage: '!cc [cc name] or !cc [cc number] or !cc effect [desired_effect]'
};
