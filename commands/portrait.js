const servantList = require("../data/servant_db.json");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const emoji = require("../data/emoji.json");

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
  let responseList = [];
  let numList = [];

  if (servantSearch.length == 1){
    for (let j = 0; j < servantSearch.length; j++){
      let servnum = pad(servantSearch[j].id, 3);
      showPortrait(servantSearch[j], ascensionNumber, servnum, message);
    }
    return;
  }
  else if (servantSearch.length > 1) {
    for (let i = 0; i < servantSearch.length; i++){
      let servnum = pad(servantSearch[i].id, 3);
      numList.push(servnum);
      let serv = `${servnum}: ${servantSearch[i].name}, ${servantSearch[i].rarity} ★ ${emoji[servantSearch[i].class]} ${servantSearch[i].class}`
      responseList.push(serv);
    }

    message.channel.send(`Reply with the ID number of the servant you want (example:\`001\`), or type \`showall\` to show all:\n${responseList.join('\r\n')}`)
      .then(() => {
        numList.push('showall');
        message.channel.awaitMessages(response => numList.indexOf(response.content) != -1, {
        max: 1,
        time: 15000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content == 'showall') {
          for (let j = 0; j < servantSearch.length; j++){
            let servnum = pad(servantSearch[j].id, 3);
            showPortrait(servantSearch[j], ascensionNumber, servnum, message);
          }
        }
        else {
          for (let j = 0; j < servantSearch.length; j++){
            if (Number(collected.first().content) == Number(servantSearch[j].id)){
              let servnum = pad(servantSearch[j].id, 3);
              showPortrait(servantSearch[j], ascensionNumber, servnum, message);
            }
          }
        }
      })
      .catch(() => {
        message.channel.send(message.author.username +', you did not respond within the time limit. Please try searching again.');
      });
    });
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

function showPortrait(servantSearch, ascensionNumber, servnum, message) {
  let name = `${servantSearch.name}`;
  let desc = '';
  if (servantSearch.hiddenname) {
    //name = `${servantSearch[j].name}/||${servantSearch[j].alias}||`
    desc = `||${servantSearch.alias}||`;
  }
  let imgurl = `https://cirnopedia.org/fate-go/icons/servant_card/`+ servnum + ascensionNumber + `.jpg`;
  console.log(imgurl);
  let exists = imageExists(imgurl);
  if (exists){
    message.channel.send({
      "embed": {
        "title": `${servantSearch.name}`,
        "description": desc,
        "color": 000000,
        "image": {
        "url": `${imgurl}`
        }
      }
    }).catch(console.error);
  }
  else
    message.channel.send(`<:mikon:585658891808014337> Oops, it looks like ascension artwork ${ascensionNumber} for ${servantSearch.name} doesn't exist!`);
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
