const servantList = require("../data/servant_db.json");

exports.run = (client, message, args) => {

  let classSearch = checkServantClass(args[0]);
  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!riyo (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  let servantSearch = findServant(classSearch, searchString);

  if (servantSearch.length > 0) {
    for (let j = 0; j < servantSearch.length; j++) {
      let servnum = pad(servantSearch[j].id, 3);
      let imgurl = `https://raw.githubusercontent.com/maketakunai/fgo-test/master/images/aprilfools/`+ servnum + `.png`;
      let name = `${servantSearch[j].name}`;
      let desc = '';

      if (servantSearch[j].hiddenname) {
        //name = `${servantSearch[j].name}/||${servantSearch[j].alias}||`
        desc = `||${servantSearch[j].alias}||`;
      }

      if (servantSearch[j].aprilfools) {
        message.channel.send({
          "embed": {
            "title": `${servantSearch[j].name}`,
            "description": desc,
            "color": 16756224,
            "image": {
            "url": `${imgurl}`
            }
          }
        }).catch(console.error);
      }
      else message.channel.send(`Riyo April Fools art is unavailable for ${servantSearch[j].class} ${servantSearch[j].name}.`).catch(console.error);
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
  name: 'riyo',
  description: `Find a particular servant's april fool artwork.`,
  usage: '!riyo [class] [servantname]'
};
