const servantList = require("../data/servant_db.json");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const emoji = require("../data/emoji.json");

exports.run = (client, message, args) => {
  if ( args.length == 0 ) {
    message.channel.send("Stop, stop please! Please type '!riyo (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner.\nYou can also search by servant number (282 to 287 for Learning with Manga)").then(m => m.delete(20000));
    return;
  }
  else if ( !isNaN(args[0]) ) {
    showByNumber(args[0], message);
    return;
  }
  let classSearch = checkServantClass(args[0]);
  let searchString = args.shift()
  searchString = args.join('');
  searchString = searchString.toLowerCase();
  searchString = searchString.replace(/\W/g, '');
  //console.log(`Searching for ${searchString}...`);
  if (classSearch.length == 0){
    message.channel.send("Stop, stop please! Please type '!riyo (class) (servantname)' to search for a particular servant.\nThe available servant classes are: Saber, Archer, Lancer, Rider, Caster, Assassin, Berserker, Shielder, Ruler, Avenger, MoonCancer, AlterEgo, Foreigner.\nYou can also search by servant number (282 to 287 for Learning with Manga)").then(m => m.delete(20000));
    return;
  }
  let servantSearch = findServant(classSearch, searchString);
  let responseList = [];
  let numList = [];

  if (servantSearch.length == 1){
    for (let j = 0; j < servantSearch.length; j++){
      let servnum = pad(servantSearch[j].id, 3);
      showPortrait(servantSearch[j], servnum, message);
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
      .then(m => {
        m.delete(25000);
        numList.push('showall');
        message.channel.awaitMessages(response => numList.indexOf(response.content) != -1, {
        max: 1,
        time: 25000,
        errors: ['time'],
      })
      .then((collected) => {
        if (collected.first().content == 'showall') {
          for (let j = 0; j < servantSearch.length; j++){
            let servnum = pad(servantSearch[j].id, 3);
            showPortrait(servantSearch[j], servnum, message);
          }
        }
        else {
          for (let j = 0; j < servantSearch.length; j++){
            if (Number(collected.first().content) == Number(servantSearch[j].id)){
              let servnum = pad(servantSearch[j].id, 3);
              showPortrait(servantSearch[j], servnum, message);
            }
          }
        }
      })
      .catch(() => {
        message.channel.send(message.author.username +', you did not respond within the time limit. Please try searching again.').then(m => m.delete(20000));
      });
    });
  }
  else
    message.channel.send("Sorry, I couldn't find that servant. Please try again, or use a search term longer than two characters.").then(m => m.delete(20000));
}


function showByNumber(input, message) {
  let servNum = input-1;
  let name = '';

  if (Number(input) == 1) { //special case mashu
    let desc = ''
    let imgurl = `https://raw.githubusercontent.com/maketakunai/tama-bot/master/images/aprilfools/001a.png`;
    message.channel.send({
      "embed": {
        "title": `${servantList[servNum].name}`,
        "description": desc,
        "color": 000000,
        "image": {
        "url": `${imgurl}`
        }
      }
    }).catch(console.error);
    let imgurl2 = `https://raw.githubusercontent.com/maketakunai/tama-bot/master/images/aprilfools/001b.png`;
    message.channel.send({
      "embed": {
        "title": `${servantList[servNum].name} Ortinax`,
        "description": desc,
        "color": 000000,
        "image": {
        "url": `${imgurl2}`
        }
      }
    }).catch(console.error);
    return;
  }


  switch(input) {
    case "282":
      name = 'Riyo Assassin'
      break;
    case "283":
      name = 'Riyo Rider'
      break;
    case "284":
      name = 'Riyo Lancer'
      break;
    case "285":
      name = 'Riyo Archer'
      break;
    case "286":
      name = 'Riyo Caster'
      break;
    case "287":
      name = 'Riyo Saber'
      break;
    default:
      try {
        name = servantList[servNum].name;
      }
      catch(err) {
        message.channel.send(`Riyo April Fools art is unavailable for servant ${input}.\nThe Learning with Manga servants are 282 through 287.`).then(m => m.delete(20000));
        return;
      }
  }
  let desc = '';
  let imgurl = `https://raw.githubusercontent.com/maketakunai/tama-bot/master/images/aprilfools/`+ pad(input,3) + `.png`;
  let exists = imageExists(imgurl);
  if (exists){
    message.channel.send({
      "embed": {
        "title": `${name}`,
        "description": desc,
        "color": 000000,
        "image": {
        "url": `${imgurl}`
        }
      }
    }).catch(console.error);
  }
  else
    message.channel.send(`Riyo April Fools art is unavailable for servant ${input}.\nThe Learning with Manga servants are 282 through 287.`).then(m => m.delete(20000));
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

function showPortrait(servantSearch, servnum, message) {
  let name = `${servantSearch.name}`;
  let desc = '';
  if (servantSearch.hiddenname) {
    //name = `${servantSearch[j].name}/||${servantSearch[j].alias}||`
    desc = `||${servantSearch.alias.split(',')[0]}||`;
  }

  if (servnum == 001) { //special case mashu
    let imgurl = `https://raw.githubusercontent.com/maketakunai/tama-bot/master/images/aprilfools/`+ servnum + `a.png`;
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
    let imgurl2 = `https://raw.githubusercontent.com/maketakunai/tama-bot/master/images/aprilfools/`+ servnum + `b.png`;
    message.channel.send({
      "embed": {
        "title": `${servantSearch.name} Ortinax`,
        "description": desc,
        "color": 000000,
        "image": {
        "url": `${imgurl2}`
        }
      }
    }).catch(console.error);
    return;
  }

  let imgurl = `https://raw.githubusercontent.com/maketakunai/tama-bot/master/images/aprilfools/`+ servnum + `.png`;

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
    message.channel.send(`Riyo April Fools art is unavailable for ${servantSearch.class} ${servantSearch.name}.`).then(m => m.delete(20000));
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
  aliases: []
};


exports.help = {
  name: 'riyo',
  description: `Find a particular servant's april fool artwork. Search by number (282 through 287) for Learning with Manga.`,
  usage: '!riyo [class] [servant_name] or !riyo [servant_number]'
};
