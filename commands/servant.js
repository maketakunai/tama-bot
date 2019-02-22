const servantList = require("../data/servant_db.json");
const emoji = require("../data/emoji.json");

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
      let servnum = pad(servantSearch[j].id, 3);
      let imgurl = `http://fate-go.cirnopedia.org/icons/servant/servant_`+ servnum +`1.png`;
      let cirno = `http://fate-go.cirnopedia.org/servant_profile.php?servant=` + servnum;
      message.channel.send({
        "embed": {
          "color": 16756224,
          "thumbnail": {
            "url": `${imgurl}`
          },
          "image": {
          "url": ""
          },
          "author": {
            "name": ``,
          },
          "fields": [
            {
              "name": `${servantSearch[j].name}, ${servantSearch[j].rarity} ★ ${emoji[servantSearch[j].class]} ${servantSearch[j].class}`,
              "value": `${cirno}`
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
    if (servantList[i].class.toLowerCase().replace(/\s/g, '').search(cleanedInput) != -1){
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
  aliases: []
};

exports.help = {
  name: 'servant',
  description: `Search for a particular servant.`,
  usage: '!servant [class] [servantname]'
};
