const servantList = require("../data/servant_db.json")
const emoji = require("../data/emoji.json")
const master = require("../data/master.json")

exports.run = (client, message, args) => {
  if ( Number(args[0]) && (args.length == 1)){
    for (let i = 0; i < servantList.length; i++){
      if (Number(servantList[i].id) == Number(args[0])){
        printServantInfo(servantList, i, message);
        return;
      }
    }
  }
  if (args.length == 0) {
    message.channel.send("Stop, stop please! Please type '!npvid (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner").then(m => m.delete(20000));
    return;
  }

  let classSearch = checkServantClass(args[0]);

  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.replace(/\W/g, '').toLowerCase();
  //console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!npvid (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner").then(m => m.delete(20000));
    return;
  }
  let servantSearch = findServant(classSearch, searchString);
  let responseList = [];
  let numList = [];

  if (servantSearch.length == 1){
    for (let j = 0; j < servantSearch.length; j++){
      printServantInfo(servantSearch, j, message);
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
    message.channel.send(`Reply with the ID number of the servant you want(example:\`001\`), or type \`showall\` to show all:\n${responseList.join('\r\n')}\nYou can also search via servant ID (example: \`!npvid 123\`)`)
      .then(m => {
        m.delete(20000);
        numList.push('showall');
        message.channel.awaitMessages(response => numList.indexOf(response.content) != -1, {
        max: 1,
        time: 15000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content.toLowerCase() == 'showall') {
          for (let j = 0; j < servantSearch.length; j++){
            printServantInfo(servantSearch, j, message);
          }
        }
        else {
          for (let j = 0; j < servantSearch.length; j++){
            if (Number(collected.first().content) == Number(servantSearch[j].id)){
              printServantInfo(servantSearch, j, message);
            }
          }
        }
      })
      .catch(() => {
        message.channel.send(message.author.username +', you did not respond within the time limit. Please try searching again.').then(m => m.delete(20000));;
      });
    });
  }
  else
    message.channel.send("Sorry, I couldn't find that servant. Please try again, or use a search term longer than two characters.").then(m => m.delete(20000));;
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

function printServantInfo(servantSearch, j, message) {

  if ( !servantSearch[j].youtube ) {
    message.channel.send("Sorry, it doesn't look like I have a link to that NP video.").then(m => m.delete(15000));;
    return;
  }

  urls = servantSearch[j].youtube.split(',');
  for (let i = 0; i < urls.length; i++) {
    let videourl = `https://www.youtube.com/watch?v=` + urls[i].trim();
    message.channel.send(videourl);
  }
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

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["npvideo", "youtube"]
};

exports.help = {
  name: 'npvid',
  description: `Shows official NP video clip of a servant, if one exists.`,
  usage: '!npvid [class] [servantname]  or  !npvid [ID number]'
};
