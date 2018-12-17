const servantList = require("../db/servantdb.json")
const newList = require("../db/new_servdb.json")
const dmgList = require("../db/npdamage.json")
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
      for (var x = 0; x < newList.length; x++){
        if (newList[x].id == servnum) {var foundID = x;}
      }
      for (var z = 0; z < dmgList.length; z++){
        if (dmgList[z].ID == servnum) {var dmgID = z;}
      }
      console.log("dmgid "+dmgID);
      console.log("foundid "+foundID);
      console.log("servnum "+servnum);

      var deck = ``;
      for (var y = 0; y < 5; y++){
        switch (newList[foundID].deck[y]){
          case "Q":
            deck += emoji["Quick"];
            break;
          case "A":
            deck += emoji["Arts"];
            break;
          case "B":
            deck += emoji["Buster"];
            break;
        }
      }
      let hitcount = newList[foundID].hitcount.split(',');
      var hits = `${emoji["Quickhit"]} ${hitcount[0]}  ${emoji["Artshit"]} ${hitcount[1]}  ${emoji["Busterhit"]} ${hitcount[2]}  ${emoji["Extrahit"]} ${hitcount[3]}  ${emoji["NP"]} ${hitcount[4]}`;
      let npgen = newList[foundID].npcharge.split(',');
      let stars = newList[foundID].starabsorb.split(',');
      let hp = newList[foundID].hp.split(',');
      let attack = newList[foundID].attack.split(',');
      message.channel.send({
        "embed": {
          "color": 8817876,
          "thumbnail": {
            "url": `${servantSearch[j]["image"]}`
          },
          //"url": "https://discordapp.com",
          //"footer": {
            //"text": `'!skills ${newList[foundID].id}' for skills, '!mats ${newList[foundID].id}' to see ascension and skill materials`,
          //},
          "author": {
            "name": `${servantSearch[j]["name"]}`
          },
          "fields": [
            {
              "name": "Class",
              "value": `${emoji[newList[foundID].class]} ${newList[foundID].class}`,
              "inline": true
            },
            {
              "name": "Rarity",
              "value": `${newList[foundID].rarity}★`,
              "inline": true
            },
            {
              "name": "Min/Max/Grailed HP",
              "value": `${hp[0]}\n${hp[1]}\n${hp[2]}`,
              "inline": true
            },
            {
              "name": "Min/Max/Grailed ATK",
              "value": `${attack[0]}\n${attack[1]}\n${attack[2]}`,
              "inline": true
            },
            {
              "name": "Growth",
              "value": `${newList[foundID].growth}`,
              "inline": true
            },
            {
              "name": "Alignment",
              "value": `${newList[foundID].alignment}`,
              "inline": true
            },
            {
              "name": "Illustrator",
              "value": `${newList[foundID].illustrator}`,
              "inline": true
            },
            {
              "name": "Voice",
              "value": `${newList[foundID].voice}`,
              "inline": true
            },
            {
              "name": "NP Gain",
              "value": `On attack: ${npgen[0]}%\nOn defense: ${npgen[1]}%`,
              "inline": true
            },
            {
              "name": "Crit Stars",
              "value": `Generation: ${stars[1]}%\nAbsorption: ${stars[0]}`,
              "inline": true
            },
            {
              "name": "Traits",
              "value": `${newList[foundID].trait}`,
            },
            {
              "name": "Deck",
              "value": `${deck} NP: ${emoji[dmgList[dmgID].Type]}`,
            },
            /*{
              "name": "NP Details",
              "value": `${emoji[dmgList[dmgID].Type]} ${dmgList[dmgID].Type}, ${dmgList[dmgID].Target}: **${newList[foundID].npname}**`,
            },*/
            {
              "name": "Hitcount",
              "value": `${hits}`,
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
  aliases: ["servantinfo"]
};

exports.help = {
  name: 'servinfo',
  description: `Shows basic information about a particular servant.`,
  usage: '!servinfo [class] [servantname]'
};
