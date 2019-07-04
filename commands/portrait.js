const servantList = require("../data/servant_db.json");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

exports.run = (client, message, args) => {
  if (args.length == 0) {
    message.channel.send("Stop, stop please! Please type '!portrait (number) (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  let classSearch = checkServantClass(args[1]);
  let ascensionNumber = args.shift();
  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0 || isNaN(ascensionNumber)){
    message.channel.send("Stop, stop please! Please type '!portrait (number) (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner")
    return;
  }
  let servantSearch = findServant(classSearch, searchString);


  if (servantSearch.length > 0 && servantSearch.length < 6) {
    for (let j = 0; j < servantSearch.length; j++) {
      let servnum = pad(servantSearch[j].id, 3);
      let imgurl = `https://cirnopedia.org/fate-go/icons/servant_card/`+ servnum + ascensionNumber + `.jpg`;
      let name = `${servantSearch[j].name}`;
      let desc = '';
      if (servantSearch[j].hiddenname) {
        //name = `${servantSearch[j].name}/||${servantSearch[j].alias}||`
        desc = `||${servantSearch[j].alias}||`;
      }
      let exists = imageExists(imgurl);
      if (exists){
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
      else
        message.channel.send(`Sorry, it doesn't look like ascension artwork ${ascensionNumber} exists for ${servantSearch[j].name} (${servnum}).`);

    }
  }
  else if (servantSearch.length >= 6)
    message.channel.send("Too many results found. Please try to be more specific.");
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
    let sAlias = classSearchResults[i].alias.split(',');
    sName = sName.replace(/\W/g, '').toLowerCase();
    for (let j = 0; j < sAlias.length; j++){
      sAlias[j] = sAlias[j].replace(/\W/g, '').toLowerCase();
      if ((sName.search(input) != -1) || (sAlias[j].search(input) != -1)){
        servantsFound.push(classSearchResults[i]);
        break;
      }
    }
  }
  return servantsFound;
}


function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function imageExists(image_url){

  var http = new XMLHttpRequest();

  http.open('HEAD', image_url, false);
  http.send();

  return http.status != 404;
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ascension"]
};


exports.help = {
  name: 'portrait',
  description: `Find a particular servant's ascension artwork. Choose from 1-4, or if the servant has extra costumes, 5+.`,
  usage: '!portrait [number] [class] [servantname]'
};
