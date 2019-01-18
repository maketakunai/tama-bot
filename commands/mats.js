const servantList = require("../db/servantdb.json")
const newList = require("../db/new_servdb.json")
const dmgList = require("../db/npdamage.json")
const emoji = require("../db/emoji.json")
const itememoji = require("../db/item-emoji.json")

exports.run = (client, message, args) => {
  //var searchResult = findServant(searchString);
  var classSearch = checkServantClass(args[0]);
  var searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!mats (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  var servantSearch = findServant(classSearch, searchString);
  if (servantSearch.length > 4) {
    message.channel.send(`${servantSearch.length} matches found. Try to be more specific.`);
    return;
  }
  if (servantSearch.length > 0) {
    for (var j = 0; j < servantSearch.length; j++){
      var servnum = servantSearch[j]["id"];
      for (var x = 0; x < newList.length; x++){
        if (newList[x].id == servnum) {var foundID = x;}
      }
      for (var z = 0; z < dmgList.length; z++){
        if (dmgList[z].ID == servnum) {var dmgID = z;}
      }

      var ascensionmats = newList[foundID].ascension.split(';');
      //console.log(ascensionmats);
      for (var k = 0; k < ascensionmats.length; k++){
        for (var key in itememoji) {
          ascensionmats[k] = ascensionmats[k].replace(key, itememoji[key]);
          //.console.log(key, itememoji[key]);
        }
      }
      var skillmats = newList[foundID].skillmats.split(';');
      for (var m = 0; m < skillmats.length; m++){
        for (var key in itememoji) {
          skillmats[m] = skillmats[m].replace(key, itememoji[key]);
        }
      }

      console.log(skillmats);
      message.channel.send({
        "embed": {
          "color": 000000,
          "thumbnail": {
            "url": `${servantSearch[j]["image"]}`
          },
          "title": `${servantSearch[j]["name"]}, ${newList[foundID].rarity} ★ ${emoji[newList[foundID].class]} ${newList[foundID].class}`,
          "fields": [
            {
              "name": "Ascensions",
              "value": `1st:${ascensionmats[0]}\n2nd:${ascensionmats[1]}\n3rd:${ascensionmats[2]}\n4th:${ascensionmats[3]}`,
            },
            {
              "name": "Skills",
              "value": `1→2:${skillmats[0]}\n2→3:${skillmats[1]}\n3→4:${skillmats[2]}\n4→5:${skillmats[3]}\n5→6:${skillmats[4]}\n6→7:${skillmats[5]}\n7→8:${skillmats[6]}\n8→9:${skillmats[7]}\n9→10:${skillmats[8]}`,
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
  aliases: ["materials"]
};

exports.help = {
  name: 'mats',
  description: `Shows materials necessary for a particular servant.`,
  usage: '!mats [class] [servantname]'
};
