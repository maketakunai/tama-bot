const servantList = require("../data/servant_db.json")
//const newList = require("../data/new_servdb.json")
//const dmgList = require("../data/npdamage.json")
const emoji = require("../data/emoji.json")
const itememoji = require("../data/item-emoji.json")

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
      //replace the material names with the discord emoji markdown thingies
      var ascensionmats = servantSearch[j].ascension.split(';');
      for (var k = 0; k < ascensionmats.length; k++){
        for (var key in itememoji) {
          ascensionmats[k] = ascensionmats[k].replace(key, itememoji[key]);
        }
      }
      var skillmats = servantSearch[j].skillmats.split(';');
      for (var m = 0; m < skillmats.length; m++){
        for (var key in itememoji) {
          skillmats[m] = skillmats[m].replace(key, itememoji[key]);
        }
      }

      //generate url for embed image
      let servnum = pad(servantSearch[j].id, 3);
      let imgurl = `http://fate-go.cirnopedia.org/icons/servant/servant_`+ servnum +`1.png`;

      //console.log(skillmats);
      message.channel.send({
        "embed": {
          "color": 000000,
          "thumbnail": {
            "url": `${imgurl}`
          },
          "title": `${servantSearch[j].name}, ${servantSearch[j].rarity} ★ ${emoji[servantSearch[j].class]} ${servantSearch[j].class}`,
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
  let classResults = [];
  let cleanedInput = input.toLowerCase();
  for (let i = 0; i < servantList.length; i++){
    if (servantList[i].class.toLowerCase().search(cleanedInput) != -1){
      classResults.push(servantList[i]);
    }
  }
  return classResults;
}

function findServant(classSearchResults, input){
  let servantsFound = [];
  if (input == "" || input.length < 2){
    return servantsFound;
  }
  for (let i = 0; i < classSearchResults.length; i++){
    let sName = classSearchResults[i].name;
    let sAlias = classSearchResults[i].alias;
    sAlias = sAlias.replace(/\W/g, '').toLowerCase();
    sName = sName.replace(/\W/g, '').toLowerCase();
    if ((sName.search(input) != -1) || (sAlias.search(input) != -1)){
      servantsFound.push(classSearchResults[i]);
    }
  }
  return servantsFound;
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
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
