const servantList = require("../db/servantdb.json");
const dmglist = require("../db/npdamage.json")
const emoji = require("../db/emoji.json")
exports.run = (client, message, args) => {
  //var searchResult = findServant(searchString);
  var classSearch = checkServantClass(args[0]);
  var searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!npdmg (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  var servantSearch = findServant(classSearch, searchString);

  if (servantSearch.length > 0) {
    for (var j = 0; j < servantSearch.length; j++){

      var servnum = servantSearch[j]["id"];
      for (var x = 0; x < dmglist.length; x++){
        if (dmglist[x].ID == servnum) {var foundID = x;}
      }

      message.channel.send({
        "embed": {
          "color": 16756224,
          "thumbnail": {
            "url": `${servantSearch[j]["image"]}`
          },
          "image": {
          "url": ""
          },
          "author": {
            "name": `${servantSearch[j]["name"]}`
          },
          "fields": [
            {
              "name": "Class",
              "value": `${emoji[dmglist[foundID].Class]} ${dmglist[foundID].Class}`,
              "inline": true
            },
            {
              "name": "Rarity",
              "value": `${dmglist[foundID].Rarity}★`,
              "inline": true
            },
            {
              "name": "NP Type",
              "value": `${emoji[dmglist[foundID].Type]} ${dmglist[foundID].Type}`,
              "inline": true
            },
            {
              "name": "NP Target",
              "value": `${dmglist[foundID].Target}`,
              "inline": true
            },
            {
              "name": "NP Damage",
              "value": `NP1: ${dmglist[foundID].NP1}\nNP2: ${dmglist[foundID].NP2}\nNP3: ${dmglist[foundID].NP3}\nNP4: ${dmglist[foundID].NP4}\nNP5: ${dmglist[foundID].NP5}\n`,
              "inline": true
            },
            {
              "name": `Special: ${dmglist[foundID].SpecialEffect}` ,
              "value": `NP1: ${dmglist[foundID].SE1}\nNP2: ${dmglist[foundID].SE2}\nNP3: ${dmglist[foundID].SE3}\nNP4: ${dmglist[foundID].SE4}\nNP5: ${dmglist[foundID].SE5}\n`,
              "inline": true
            },
            {
              "name": `Notes on damage values`,
              "value": `Max level, +1000 fous, without grails.\nDamage values shown are vs. neutral targets.\nSelf buffs are added at level 10.\nPassive skills are applied.\n100% overcharge only.\nClass attack multipliers and traits are included.\nClass triangle mods are not included.\nInterludes and strengthening quests are included.`,
              "inline": false
            }
          ]
        }
      }).catch(console.error);
    }
  }
  else
    message.channel.send("Sorry, I couldn't find that servant. Please try again, or use a search term longer than two characters.");
}

function checkServantClass(input){
  console.log(`Searching ${Object.keys(servantList).length} entries...`);
  var classResults = [];
  var cleanedInput = input.toLowerCase();
  for (var key in servantList){
    for (var parameter in servantList[key]){
      if (parameter == "servantClass"){
        var cName = servantList[key]["servantClass"];
        cName = cName.toLowerCase();
        if (cName.search(cleanedInput) != -1){
          classResults.push(servantList[key]);
        }
      }
    }
  }
  return classResults;
}



function findServant(classSearchResults, input){
  var servantsFound = [];
  if (input == "" || input.length < 2){
    return servantsFound;
  }
  for (var key in classSearchResults){
    for (var parameter in classSearchResults[key]){
      if (parameter == "name"){
        var sName = classSearchResults[key]["name"];
        sName = sName.replace(/\W/g, '');
        sName = sName.toLowerCase();
        if (sName.search(input) != -1){
          servantsFound.push(classSearchResults[key]);
          break;
        }
      }
      else if (parameter == "alias"){
        var sAlias = classSearchResults[key]["alias"];
        sAlias = sAlias.replace(/\W/g, '');
        sAlias = sAlias.toLowerCase();
        if (sAlias.search(input) != -1){
          servantsFound.push(classSearchResults[key]);
          break;
        }
      }
    }
  }
  return servantsFound;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["npdamage","npdamages"]
};

exports.help = {
  name: 'npdmg',
  description: `Shows NP damage for a particular servant.`,
  usage: '!npdmg [class] [servantname]'
};
