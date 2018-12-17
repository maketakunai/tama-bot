const ccList = require("../db/command_codes.json");

exports.run = (client, message, args) => {
  var tempargs = args;
  console.log(tempargs, args);
  var searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  console.log(`Searching for ${searchString}...`);

  var ccSearch = findCC(searchString, tempargs);
  console.log(tempargs, args);
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
              "value": `${ccSearch[j]["effect"]}`,
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
  else if (ccSearch.length > 5)
    message.channel.send("Too many matches found. Please try to be more specific. You can search by the CC number or its name.");
  else
    message.channel.send("Sorry, I couldn't find that CC. Please try again by searching for the CC number or its name.");
}


function findCC(input, args){
  var ccFound = [];
  if (input == ""){
    return ccFound;
  }
  var tempargs = args;
  tempargs = tempargs.join('');
  tempargs = tempargs.toLowerCase();
  tempargs = tempargs.replace(/\W/g, '');
  for (var key in ccList){
    if (Number(input) == Number(key)) {ccFound.push(ccList[key]);}
    for (var parameter in ccList[key]){
      if (parameter == "name_eng"){
        var ccName = ccList[key]["name_eng"];
        ccName = ccName.replace(/\W/g, '');
        ccName = ccName.toLowerCase();
        if (ccName.search(input) != -1){
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
  usage: '!cc [cc name] or !cc [cc number]'
};
