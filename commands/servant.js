const servantList = require("../db/servantdb.json");

exports.run = (client, message, args) => {

  //var searchResult = findServant(searchString);
  var classSearch = checkServantClass(args[0]);
  var searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!servant (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  var servantSearch = findServant(classSearch, searchString);

  if (servantSearch.length > 0) {
    for (var j = 0; j < servantSearch.length; j++){
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
            "name": ``,
          },
          "fields": [
            {
              "name": `${servantSearch[j]["name"]}`,
              "value": `${servantSearch[j]["link"]}`
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
          servantsFound.push(classSearchResults[key])
        }
      }
      if (parameter == "alias"){
        var sAlias = classSearchResults[key]["alias"];
        sAlias = sAlias.replace(/\W/g, '');
        sAlias = sAlias.toLowerCase();
        if (sAlias.search(input) != -1){
          servantsFound.push(classSearchResults[key])
        }
      }
    }
  }
  return servantsFound;
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: []
};

exports.help = {
  name: 'servant',
  description: `Search for a particular servant.`,
  usage: '!servant [class] [servantname]'
};
